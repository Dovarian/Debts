"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debtsValidators = void 0;
exports.debtsValidators = {
    idValidation(validator) {
        return validator('id').trim().isLength({ min: 24, max: 24 }).isString();
    },
    creditorIdValidation(validator) {
        return validator('creditorId')
            .trim()
            .isLength({ min: 24, max: 24 })
            .isString();
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
    amountValidator(validator) {
        return validator('amount')
            .trim()
            .isLength({ min: 1, max: 100 })
            .escape()
            .isNumeric();
    },
    dateValidator(validator) {
        return validator('date').trim().isLength({ max: 100 }).escape().isNumeric();
    },
};
