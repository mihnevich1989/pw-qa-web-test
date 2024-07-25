import { expect, Page } from '@playwright/test';
import { AuthorizationPage } from './authorizationPage';
import { CommonComponents } from './commonComponents';
import { NotebooksPage } from './notebooksPage';

export class PageManager {

  private readonly page: Page
  private readonly commonComponents: CommonComponents
  private readonly authorizationPage: AuthorizationPage
  private readonly notebookPage: NotebooksPage

  constructor(page: Page) {
    this.page = page
    this.commonComponents = new CommonComponents(page)
    this.authorizationPage = new AuthorizationPage(page)
    this.notebookPage = new NotebooksPage(page)
  }

  onCommonComponents(): CommonComponents {
    return this.commonComponents
  }

  onAuthPage(): AuthorizationPage {
    return this.authorizationPage
  }

  onNotebookPage(): NotebooksPage {
    return this.notebookPage
  }

  async getCsrfToken(): Promise<string> {
    const responseAsText = await (await this.page.request.get('/')).text();
    const csrfToken = responseAsText.match(/<meta name="csrf-token" content="(.+?)"/)
    if (csrfToken) {
      return csrfToken[1];
    } else {
      throw new Error('CSRF token not found');
    }
  }

  async loginViaAPI(login: string | undefined, pass: string | undefined): Promise<void> {
    if (!login) throw new Error('Login is undefined')
    if (!pass) throw new Error('Password is undefined')

    const csrfToken = await this.getCsrfToken()
    const response = await this.page.request.post(process.env.LOGIN_URL as string, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      form: {
        _csrf: csrfToken,
        'LoginForm[username]': login,
        'LoginForm[password]': pass,
        'LoginForm[rememberMe]': 1,
        'login-button': ''
      }
    })
    expect(response.status()).toBe(200)
  }

  async clearBasket(): Promise<void> {
    const clearResponse = await this.page.request.post(process.env.CLEAR_BASKET_URL as string)
    expect(clearResponse.status()).toBe(200)
    await this.onNotebookPage().checkTotalItemsQuantityInBasketByAPI(0)
  }
}
