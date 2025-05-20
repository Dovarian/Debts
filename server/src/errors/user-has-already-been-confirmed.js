"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHasAlreadyBeenConfirmed = void 0;
class UserHasAlreadyBeenConfirmed extends Error {
    constructor(id) {
        super(`User with id: ${id} has already been confirmed`);
        this.name = 'UserHasAlreadyBeenConfirmed';
    }
}
exports.UserHasAlreadyBeenConfirmed = UserHasAlreadyBeenConfirmed;
