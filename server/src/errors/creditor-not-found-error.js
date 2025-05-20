"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditorNotFoundError = void 0;
class CreditorNotFoundError extends Error {
    constructor(id) {
        super(`Creditor with id: ${id} not found`);
        this.name = 'CreditorNotFoundError';
    }
}
exports.CreditorNotFoundError = CreditorNotFoundError;
