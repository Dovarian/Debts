"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtNotFoundError = void 0;
class DebtNotFoundError extends Error {
    constructor(id) {
        super(`Debt with id: ${id} not found`);
        this.name = 'DebtNotFoundError';
    }
}
exports.DebtNotFoundError = DebtNotFoundError;
