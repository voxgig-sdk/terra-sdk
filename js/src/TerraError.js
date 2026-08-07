

class TerraError extends Error {

  isTerraError = true

  sdk = 'Terra'

  constructor(code, msg, ctx) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

module.exports = {
  TerraError
}

