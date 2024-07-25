import { expect, Page } from '@playwright/test';

export class NotebooksPage {

  readonly page: Page
  readonly notebookItems: string
  readonly basketContainer: string
  readonly basketDropdownMenu: string

  constructor(page: Page) {
    this.page = page
    this.notebookItems = '.note-item' // больше 1
    this.basketContainer = '#basketContainer'
    this.basketDropdownMenu = '.dropdown-menu.show'
  }

  async isReady(): Promise<void> {
    await expect(this.page.locator(this.notebookItems).first()).toBeVisible()
  }

  async openBasketContainerInHeader(): Promise<void> {
    await this.page.locator(this.basketContainer).click()
    await expect(this.page.locator(this.basketDropdownMenu)).toBeVisible()
  }

  async addItemInBasketByAPI(productId: number, token: string, itemQuantity?: number): Promise<void> {
    const response = await this.page.request.post(process.env.CREATE_BASKET_URL as string, {
      headers: {
        'X-CSRF-Token': token
      },
      form: {
        product: productId,
        count: itemQuantity || 1
      }
    })
    expect(response.status()).toBe(200)
  }

  async checkTotalItemsQuantityInBasketByAPI(count: number): Promise<void> {
    const getBasketItems = await (await this.page.request.post(process.env.GET_BASKET_URL as string)).json()
    expect(getBasketItems.basketCount).toBe(count)
  }
}
