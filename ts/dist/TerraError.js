"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerraError = void 0;
class TerraError extends Error {
    isTerraError = true;
    sdk = 'Terra';
    code;
    ctx;
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.TerraError = TerraError;
//# sourceMappingURL=TerraError.js.map