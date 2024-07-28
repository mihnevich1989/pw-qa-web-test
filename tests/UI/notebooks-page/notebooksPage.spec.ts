import { test, expect } from '../../../test-options'

test.describe('Notebook page UI', () => {

  test.beforeEach(async ({ page, pm }) => {
    await pm.loginViaAPI(process.env.TEST_USER_LOGIN, process.env.TEST_USER_PASS)
    await pm.clearBasket()
    await page.goto('/')
    await pm.onNotebookPage().isReady()
  });

  test('should expand the empty basket, and navigate to the basket page', async ({ page, pm }) => {
    await test.step('caught exception and check it', async () => {
      page.on('pageerror', exception => {
        expect(exception.message).not.toContain('showToast is not defined')
      });
    })

    await test.step('open basket menu and go to basket page', async () => {
      await pm.onNotebookPage().openBasketContainerInHeader()
    })
  })
})
