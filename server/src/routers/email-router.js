"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailRouter = void 0;
const express_1 = require("express");
const email_validations_1 = require("../validators/email-validations");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const email_service_1 = require("../services/email-service");
const authorization_middleware_1 = require("../middlewares/authorization-middleware");
const getEmailRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/password-recovery/:id', authorization_middleware_1.authorizationMiddleware, email_validations_1.emailValidators.idValidation(express_validator_1.param), input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res
                .status(200)
                .json(yield email_service_1.emailService.sendPasswordRecoveryEmail(req.params.id));
        }
        catch (err) {
            next(err);
        }
    }));
    router.post('/account-confirmation/:id', email_validations_1.emailValidators.idValidation(express_validator_1.param), input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res
                .status(200)
                .json(yield email_service_1.emailService.sendAccountConfirmationEmail(req.params.id));
        }
        catch (err) {
            next(err);
        }
    }));
    return router;
};
exports.getEmailRouter = getEmailRouter;
