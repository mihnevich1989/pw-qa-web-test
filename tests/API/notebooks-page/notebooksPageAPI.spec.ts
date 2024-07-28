import { test } from '../../../test-options'

test.describe('Notebook page API', async () => {

  let csrfToken: string

  test.beforeEach(async ({ pm }) => {
    await pm.loginViaAPI(process.env.TEST_USER_LOGIN, process.env.TEST_USER_PASS)
    csrfToken = await pm.getCsrfToken()
    await pm.clearBasket()
  });

  test('adding 1 item and verifying quantity in the basket', async ({ pm }) => {
    const count = 1;

    await pm.onNotebookPage().addItemInBasketByAPI(1, csrfToken, count)
    await pm.onNotebookPage().checkTotalItemsQuantityInBasketByAPI(count)
  })

  test('adding 5 different items and verifying their quantity in the basket', async ({ pm }) => {
    const count = 5;

    await test.step(`add ${count} items in basket`, async () => {
      for (let i = 1; i <= count; i++) {
        await pm.onNotebookPage().addItemInBasketByAPI(i, csrfToken)
      }
    })
    await test.step('check quantity in basket', async () => {
      await pm.onNotebookPage().checkTotalItemsQuantityInBasketByAPI(count)
    })
  })

  test('adding 9 quantity of one item and verifying their quantity in the basket', async ({ pm }) => {
    const count = 9;

    await pm.onNotebookPage().addItemInBasketByAPI(1, csrfToken, count)
    await pm.onNotebookPage().checkTotalItemsQuantityInBasketByAPI(count)
  })

  test('adding 10 quantity of one item and verifying their quantity in the basket', async ({ pm }) => {
    const count = 10;

    await pm.onNotebookPage().addItemInBasketByAPI(1, csrfToken, count)
    await pm.onNotebookPage().checkTotalItemsQuantityInBasketByAPI(count)
  })
})
