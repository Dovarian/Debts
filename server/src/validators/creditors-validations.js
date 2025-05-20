"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditorsValidators = void 0;
exports.creditorsValidators = {
    idValidation(validator) {
        return validator('id').trim().isLength({ min: 24, max: 24 }).isString();
    },
    userIdValidation(validator) {
        return validator('userId').trim().isLength({ min: 24, max: 24 }).isString();
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
    creditorNameValidator(validator) {
        return validator('creditorName')
            .trim()
            .isLength({ min: 1, max: 100 })
            .escape();
    },
    creditorAvatarValidator(validator) {
        return validator('creditorAvatar').trim().isLength({ max: 100 }).escape();
    },
};
