
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TerraSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TerraSDK.test()
    equal(null !== testsdk, true)
  })

})
