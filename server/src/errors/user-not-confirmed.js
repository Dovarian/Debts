"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotConfirmed = void 0;
class UserNotConfirmed extends Error {
    constructor(id) {
        super(`User with id ${id} not confirmed`);
        this.name = 'UserNotConfirmed';
    }
}
exports.UserNotConfirmed = UserNotConfirmed;
