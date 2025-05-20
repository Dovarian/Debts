"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenIncorrectError = void 0;
class TokenIncorrectError extends Error {
    constructor(token) {
        super(`Token: ${token} incorrect`);
        this.name = 'TokenIncorrectError';
    }
}
exports.TokenIncorrectError = TokenIncorrectError;
