import { expect, Page } from '@playwright/test';


export class CommonComponents {
  readonly page: Page
  readonly navbarUserMenu: string

  constructor(page: Page) {
    this.page = page
    this.navbarUserMenu = '#dropdownUser'
  }

  async checkLoggedIn(user: string | undefined) {
    if (!user) throw new Error('USER is undefined')
    await expect(this.page.locator(this.navbarUserMenu)).toHaveText(user, { ignoreCase: true })
  }
}

