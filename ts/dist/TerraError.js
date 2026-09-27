"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerraError = void 0;
class TerraError extends Error {
    isTerraError = true;
    sdk = 'Terra';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.TerraError = TerraError;
//# sourceMappingURL=TerraError.js.map