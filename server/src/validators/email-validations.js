"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidators = void 0;
exports.emailValidators = {
    idValidation(validator) {
        return validator('id').trim().isLength({ min: 24, max: 24 }).isString();
    },
};
