"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataIncorrectError = void 0;
class DataIncorrectError extends Error {
    constructor(data) {
        super(`${data} incorrect`);
        this.name = 'DataIncorrectError';
    }
}
exports.DataIncorrectError = DataIncorrectError;
