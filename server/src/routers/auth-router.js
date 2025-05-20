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
exports.getAuthRouter = void 0;
const express_1 = require("express");
const auth_validations_1 = require("../validators/auth-validations");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const auth_service_1 = require("../services/auth-service");
const authorization_middleware_1 = require("../middlewares/authorization-middleware");
const getAuthRouter = () => {
    const router = (0, express_1.Router)();
    router.patch('/confirm-account/:code', auth_validations_1.authValidators.codeValidation(express_validator_1.param), input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield auth_service_1.authService.confirmUser(req.params.code);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post('/login', [
        auth_validations_1.authValidators.loginOrEmailValidation(express_validator_1.body),
        auth_validations_1.authValidators.passwordValidation(express_validator_1.body),
    ], input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = yield auth_service_1.authService.checkCredentials(req.body.loginOrEmail, req.body.password);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                // secure: true,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            res.cookie('accessToken', accessToken, {
                // secure: true,
                sameSite: 'strict',
                maxAge: 30 * 60 * 1000,
            });
            res.sendStatus(200);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post('/refresh-token', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const oldRefreshToken = req.cookies.refreshToken;
            const { accessToken, refreshToken } = yield auth_service_1.authService.getNewTokens(oldRefreshToken);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                // secure: true,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            res.cookie('accessToken', accessToken, {
                // secure: true,
                sameSite: 'strict',
                maxAge: 30 * 60 * 1000,
            });
            res.sendStatus(200);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post('/forget-password/:token', authorization_middleware_1.authorizationMiddleware, [
        auth_validations_1.authValidators.tokenValidation(express_validator_1.param),
        auth_validations_1.authValidators.passwordValidation(express_validator_1.body),
    ], input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield auth_service_1.authService.passwordRecovery(req.params.token, req.body.password);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }));
    return router;
};
exports.getAuthRouter = getAuthRouter;
