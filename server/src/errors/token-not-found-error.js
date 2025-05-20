"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenNotFoundError = void 0;
class TokenNotFoundError extends Error {
    constructor(userId, jti) {
        super(`Token not found`);
        if (userId && jti) {
            super(`Token with userId: ${userId} and jti: ${jti} not found`);
        }
        this.name = 'TokenNotFoundError';
    }
}
exports.TokenNotFoundError = TokenNotFoundError;
