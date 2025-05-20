"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidators = void 0;
exports.authValidators = {
    codeValidation(validator) {
        return validator('code')
            .trim()
            .isLength({ min: 1, max: 100 })
            .isString()
            .escape();
    },
    loginOrEmailValidation(validator) {
        return validator('loginOrEmail')
            .trim()
            .isLength({ min: 1, max: 100 })
            .isString()
            .escape();
    },
    passwordValidation(validator) {
        return validator('password')
            .trim()
            .isLength({ min: 6, max: 100 })
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
            .escape();
    },
    tokenValidation(validator) {
        return validator('token')
            .trim()
            .isLength({ min: 1, max: 300 })
            .isString()
            .escape();
    },
};
