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
exports.getDebtsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const debts_validations_1 = require("../validators/debts-validations");
const debts_service_1 = require("../services/debts-service");
const getDebtsRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', [
        debts_validations_1.debtsValidators.pageValidator(express_validator_1.query),
        debts_validations_1.debtsValidators.pageSizeValidator(express_validator_1.query),
        debts_validations_1.debtsValidators.creditorIdValidation(express_validator_1.query).optional(),
    ], input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res
            .status(200)
            .json(yield debts_service_1.debtsService.findDebts(req.query.page, req.query.pageSize, req.query.creditorId));
    }));
    router.get('/:id', debts_validations_1.debtsValidators.idValidation(express_validator_1.param), input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.status(200).json(yield debts_service_1.debtsService.findDebt(req.params.id));
        }
        catch (err) {
            next(err);
        }
    }));
    router.post('/', [
        debts_validations_1.debtsValidators.creditorIdValidation(express_validator_1.body),
        debts_validations_1.debtsValidators.amountValidator(express_validator_1.body),
        debts_validations_1.debtsValidators.dateValidator(express_validator_1.body),
    ], input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = yield debts_service_1.debtsService.addDebt(req.body.creditorId, +req.body.amount, +req.body.date);
        const debt = yield debts_service_1.debtsService.findDebt(id);
        res.status(201).json(debt);
    }));
    router.patch('/:id', [
        debts_validations_1.debtsValidators.idValidation(express_validator_1.param),
        debts_validations_1.debtsValidators.amountValidator(express_validator_1.body),
        debts_validations_1.debtsValidators.dateValidator(express_validator_1.body),
    ], input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield debts_service_1.debtsService.patchDebt(req.params.id, {
                amount: Number(req.body.amount),
                date: Number(req.body.date),
            });
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }));
    router.delete('/:id', debts_validations_1.debtsValidators.idValidation(express_validator_1.param), input_validation_middleware_1.inputValidationMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield debts_service_1.debtsService.deleteDebt(req.params.id);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }));
    return router;
};
exports.getDebtsRouter = getDebtsRouter;
