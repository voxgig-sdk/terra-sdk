
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TerraSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TerraSDK.test()
    equal(testsdk instanceof TerraSDK, true,
      'TerraSDK.test() must return a client synchronously')
  })

})
