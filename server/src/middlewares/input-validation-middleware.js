"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ errors: error.array() });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
