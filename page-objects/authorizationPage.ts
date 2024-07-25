import { expect, Locator, Page } from '@playwright/test';

export class AuthorizationPage {

  readonly page: Page
  readonly validBorderColor: string
  readonly invalidBorderColor: string
  readonly loginFieldPlaceholder: string
  readonly passwordFieldPlaceholder: string
  readonly submitButtonText: string

  constructor(page: Page) {
    this.page = page
    this.validBorderColor = 'rgb(40, 167, 69)'
    this.invalidBorderColor = 'rgb(220, 53, 69)'
    this.loginFieldPlaceholder = 'Логин клиента'
    this.passwordFieldPlaceholder = 'Пароль клиента'
    this.submitButtonText = 'Вход'
  }

  get loginField(): Locator {
    return this.page.getByPlaceholder(this.loginFieldPlaceholder)
  }

  get passwordField(): Locator {
    return this.page.getByPlaceholder(this.passwordFieldPlaceholder)
  }

  get button(): Locator {
    return this.page.getByRole('button', { name: this.submitButtonText })
  }

  async fillLoginField(login: string | undefined): Promise<void> {
    if (!login) throw new Error('TEST_USER_LOGIN is not set in environment variables')
    await this.loginField.pressSequentially(login)
  }

  async fillPasswordField(pass: string | undefined): Promise<void> {
    if (!pass) throw new Error('TEST_USER_PASSWORD is not set in environment variables')
    await this.passwordField.pressSequentially(pass)
  }

  async submit() {
    this.button.click()
  }
}
