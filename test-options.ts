import { test as base } from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

type TestOptions = {
  pm: PageManager;
}

export const test = base.extend<TestOptions>({
  pm: async ({ page }, use) => {
    await use(new PageManager(page))
  }
})

export { expect } from '@playwright/test'
