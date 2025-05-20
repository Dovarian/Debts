"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersValidators = void 0;
exports.usersValidators = {
    idValidation(validator) {
        return validator('id').trim().isLength({ min: 24, max: 24 }).isString();
    },
    pageValidator(validator) {
        return validator('page')
            .trim()
            .isLength({ min: 1, max: 9 })
            .isNumeric()
            .escape();
    },
    pageSizeValidator(validator) {
        return validator('pageSize')
            .trim()
            .isLength({ min: 1, max: 9 })
            .isNumeric()
            .escape();
    },
    nicknameValidation(validator) {
        return validator('nickname').trim().isLength({ min: 1, max: 100 }).escape();
    },
    emailValidation(validator) {
        return validator('email')
            .trim()
            .isLength({ min: 1, max: 100 })
            .isEmail()
            .escape();
    },
    loginValidation(validator) {
        return validator('login').trim().isLength({ min: 1, max: 100 }).escape();
    },
    loginOrEmailValidation(validator) {
        return validator('loginOrEmail')
            .trim()
            .isLength({ min: 1, max: 100 })
            .escape();
    },
    passwordValidator(validator) {
        return validator('password')
            .trim()
            .isLength({ min: 6, max: 100 })
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
            .escape();
    },
    avatarValidator(validator) {
        return validator('avatar').trim().isLength({ min: 1, max: 100 }).escape();
    },
};
