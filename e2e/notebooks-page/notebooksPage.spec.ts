import { test, expect } from '../../test-options'

test.describe('Notebook page', () => {

  test.beforeEach(async ({ page, pm }) => {
    const csrfToken = await pm.getCsrfToken()
    await pm.loginViaAPI(csrfToken, process.env.TEST_USER_LOGIN, process.env.TEST_USER_PASS)
    await pm.clearBasket()
    await page.goto('/')
    await pm.onNotebookPage().isReady()
  });

  test('should expand the empty basket, and navigate to the basket page', async ({ page, pm }) => {
    page.on('pageerror', exception => {
      expect(exception.message).not.toContain('showToast is not defined')
    });
    await pm.onNotebookPage().openBasketContainerInHeader()
  })

  

})
