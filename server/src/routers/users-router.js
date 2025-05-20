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
exports.getUsersRouter = void 0;
const users_validators_1 = require("./../validators/users-validators");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_service_1 = require("../services/users-service");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const getUsersRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', [
        users_validators_1.usersValidators.pageValidator(express_validator_1.query),
        users_validators_1.usersValidators.pageSizeValidator(express_validator_1.query),
        users_validators_1.usersValidators.nicknameValidation(express_validator_1.query).optional(),
        users_validators_1.usersValidators.loginValidation(express_validator_1.query).optional(),
    ], input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res
            .status(200)
            .json(yield users_service_1.usersService.findUsers(req.query.page, req.query.pageSize, req.query.nickname, req.query.login));
    }));
    router.get('/:id', users_validators_1.usersValidators.idValidation(express_validator_1.param), input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.status(200).json(yield users_service_1.usersService.findUser(req.params.id));
        }
        catch (err) {
            next(err);
        }
    }));
    router.get('/', users_validators_1.usersValidators.loginOrEmailValidation(express_validator_1.query), input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res
                .status(200)
                .json(yield users_service_1.usersService.findUserByLoginOrEmail(req.query.loginOrEmail));
        }
        catch (err) {
            next(err);
        }
    }));
    router.post('/', [
        users_validators_1.usersValidators.emailValidation(express_validator_1.body),
        users_validators_1.usersValidators.loginValidation(express_validator_1.body),
        users_validators_1.usersValidators.nicknameValidation(express_validator_1.body),
        users_validators_1.usersValidators.passwordValidator(express_validator_1.body),
    ], input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = yield users_service_1.usersService.addUser(req.body.login, req.body.email, req.body.password, req.body.nickname);
        const user = yield users_service_1.usersService.findUser(id);
        res.status(201).json(user);
    }));
    router.patch('/:id', [
        users_validators_1.usersValidators.idValidation(express_validator_1.param),
        (0, express_validator_1.oneOf)([
            users_validators_1.usersValidators.emailValidation(express_validator_1.body),
            users_validators_1.usersValidators.loginValidation(express_validator_1.body),
            users_validators_1.usersValidators.nicknameValidation(express_validator_1.body),
            users_validators_1.usersValidators.passwordValidator(express_validator_1.body),
            users_validators_1.usersValidators.avatarValidator(express_validator_1.body),
        ]),
    ], input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield users_service_1.usersService.patchUser(req.params.id, {
                login: req.body.login,
                email: req.body.email,
                nickname: req.body.nickname,
                avatarUrl: req.body.avatarUrl,
                password: req.body.password,
            });
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }));
    router.delete('/:id', users_validators_1.usersValidators.idValidation(express_validator_1.param), input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield users_service_1.usersService.deleteUser(req.params.id);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }));
    return router;
};
exports.getUsersRouter = getUsersRouter;
