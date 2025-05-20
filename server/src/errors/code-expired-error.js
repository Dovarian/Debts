"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeExpiredError = void 0;
class CodeExpiredError extends Error {
    constructor(id) {
        super(`User with id: ${id} is expired`);
        this.name = 'CodeExpiredError';
    }
}
exports.CodeExpiredError = CodeExpiredError;
