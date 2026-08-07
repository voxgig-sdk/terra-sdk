
import { Context } from './Context'


class TerraError extends Error {

  isTerraError = true

  sdk = 'Terra'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  TerraError
}

