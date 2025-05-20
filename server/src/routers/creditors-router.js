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
exports.getCreditorsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const creditors_validations_1 = require("../validators/creditors-validations");
const creditors_service_1 = require("../services/creditors-service");
const getCreditorsRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', [
        creditors_validations_1.creditorsValidators.pageValidator(express_validator_1.query),
        creditors_validations_1.creditorsValidators.pageSizeValidator(express_validator_1.query),
        creditors_validations_1.creditorsValidators.userIdValidation(express_validator_1.query).optional(),
    ], input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res
            .status(200)
            .json(yield creditors_service_1.creditorsService.findCreditors(req.query.page, req.query.pageSize, req.query.userId));
    }));
    router.get('/:id', creditors_validations_1.creditorsValidators.idValidation(express_validator_1.param), input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.status(200).json(yield creditors_service_1.creditorsService.findCreditor(req.params.id));
        }
        catch (err) {
            next(err);
        }
    }));
    router.post('/', [
        creditors_validations_1.creditorsValidators.userIdValidation(express_validator_1.body),
        creditors_validations_1.creditorsValidators.creditorNameValidator(express_validator_1.body),
        creditors_validations_1.creditorsValidators.creditorAvatarValidator(express_validator_1.body),
    ], input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = yield creditors_service_1.creditorsService.addCreditor(req.body.userId, req.body.creditorName, req.body.creditorAvatar);
        const creditor = yield creditors_service_1.creditorsService.findCreditor(id);
        res.status(201).json(creditor);
    }));
    router.patch('/:id', [
        creditors_validations_1.creditorsValidators.idValidation(express_validator_1.param),
        creditors_validations_1.creditorsValidators.creditorNameValidator(express_validator_1.body),
        creditors_validations_1.creditorsValidators.creditorAvatarValidator(express_validator_1.body),
    ], input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield creditors_service_1.creditorsService.patchCreditor(req.params.id, {
                creditorName: req.body.creditorName,
                creditorAvatar: req.body.creditorAvatar,
            });
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }));
    router.delete('/:id', creditors_validations_1.creditorsValidators.idValidation(express_validator_1.param), input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield creditors_service_1.creditorsService.deleteCreditor(req.params.id);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }));
    return router;
};
exports.getCreditorsRouter = getCreditorsRouter;
