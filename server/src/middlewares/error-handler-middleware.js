"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const user_not_found_error_1 = require("../errors/user-not-found-error");
const user_has_already_been_confirmed_1 = require("../errors/user-has-already-been-confirmed");
const code_expired_error_1 = require("../errors/code-expired-error");
const user_not_confirmed_1 = require("../errors/user-not-confirmed");
const login_or_password_incorrect_1 = require("../errors/login-or-password-incorrect");
const token_not_found_error_1 = require("../errors/token-not-found-error");
const token_incorrect_error_1 = require("../errors/token-incorrect-error");
const data_incorrect_error_1 = require("../errors/data-incorrect-error");
const creditor_not_found_error_1 = require("../errors/creditor-not-found-error");
const debt_not_found_error_1 = require("../errors/debt-not-found-error");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof user_not_found_error_1.UserNotFoundError) {
        res.status(404).json({ message: err.message });
    }
    if (err instanceof user_has_already_been_confirmed_1.UserHasAlreadyBeenConfirmed) {
        res.status(400).json({ message: err.message });
    }
    if (err instanceof code_expired_error_1.CodeExpiredError) {
        res.status(410).json({ message: err.message });
    }
    if (err instanceof user_not_confirmed_1.UserNotConfirmed) {
        res.status(403).json({ message: err.message });
    }
    if (err instanceof login_or_password_incorrect_1.LoginOrPasswordIncorrect) {
        res.status(401).json({ message: err.message });
    }
    if (err instanceof token_not_found_error_1.TokenNotFoundError) {
        res.status(401).json({ message: err.message });
    }
    if (err instanceof token_incorrect_error_1.TokenIncorrectError) {
        res.status(401).json({ message: err.message });
    }
    if (err instanceof data_incorrect_error_1.DataIncorrectError) {
        res.status(400).json({ message: err.message });
    }
    if (err instanceof creditor_not_found_error_1.CreditorNotFoundError) {
        res.status(404).json({ message: err.message });
    }
    if (err instanceof debt_not_found_error_1.DebtNotFoundError) {
        res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Internal Server Error' });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
