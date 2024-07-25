import { expect, Locator, Page } from '@playwright/test';


export class NotebooksPage {

  readonly page: Page
  readonly notebookItems: string
  readonly basketContainer: string
  readonly basketDropdownMenu: string

  constructor(page: Page){
    this.page = page
    this.notebookItems = '.note-item' // больше 1
    this.basketContainer = '#basketContainer'
    this.basketDropdownMenu = '.dropdown-menu.show'
  }

  async isReady() {
    await expect(this.page.locator(this.notebookItems).first()).toBeVisible()
  }

  async openBasketContainerInHeader() {
    await this.page.locator(this.basketContainer).click()
    await expect(this.page.locator(this.basketDropdownMenu)).toBeVisible()
  }
}

