import { test, expect } from '../../../test-options'

test.describe('Authorization page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  });

  test('should be able all elements', async ({ page, pm }) => {
    await expect(pm.onAuthPage().loginField).toBeVisible()
    await expect(pm.onAuthPage().passwordField).toBeVisible()
    await expect(pm.onAuthPage().button).toBeVisible()
  })

  test('should be visible correct validation border', async ({ page, pm }) => {
    await test.step('fill login and password', async () => {
      await pm.onAuthPage().fillLoginField(process.env.TEST_USER_LOGIN)
      await pm.onAuthPage().fillPasswordField(process.env.TEST_USER_PASS)
    })

    await test.step('verify valid border color on both fields', async () => {
      await expect(pm.onAuthPage().loginField).toHaveCSS('border-color', pm.onAuthPage().validBorderColor)
      await expect(pm.onAuthPage().passwordField).toHaveCSS('border-color', pm.onAuthPage().validBorderColor)
    })
  })

  test('should be logged in via web form', async ({ pm }) => {
    await test.step('fill login and password', async () => {
      await pm.onAuthPage().fillLoginField(process.env.TEST_USER_LOGIN)
      await pm.onAuthPage().fillPasswordField(process.env.TEST_USER_PASS)
    })

    await test.step('submit form and check logged in', async () => {
      await pm.onAuthPage().submit()
      await pm.onCommonComponents().checkLoggedIn(process.env.TEST_USER_LOGIN)
    })
  })
})
