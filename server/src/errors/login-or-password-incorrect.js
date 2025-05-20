"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginOrPasswordIncorrect = void 0;
class LoginOrPasswordIncorrect extends Error {
    constructor(id) {
        super(`User with id ${id} has incorrect login or password`);
        this.name = 'LoginOrPasswordIncorrect';
    }
}
exports.LoginOrPasswordIncorrect = LoginOrPasswordIncorrect;
