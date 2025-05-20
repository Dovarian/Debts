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
exports.debtsService = void 0;
const debts_repository_1 = require("../repositories/debts-repository");
const debt_not_found_error_1 = require("../errors/debt-not-found-error");
const mapDebtDBTypeToDebtViewType = (debt) => {
    if (!!(debt === null || debt === void 0 ? void 0 : debt._id.toHexString()) ||
        !!(debt === null || debt === void 0 ? void 0 : debt.creditorId) ||
        !!(debt === null || debt === void 0 ? void 0 : debt.amount) ||
        !!(debt === null || debt === void 0 ? void 0 : debt.date)) {
        return {
            id: debt._id.toHexString(),
            creditorId: debt.creditorId,
            amount: debt.amount,
            date: debt.date,
        };
    }
    else {
        return null;
    }
};
exports.debtsService = {
    findDebts(page, pageSize, creditorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield debts_repository_1.debtsRepository.findDebts(+page, +pageSize, creditorId)).map(mapDebtDBTypeToDebtViewType);
        });
    },
    findDebt(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const debt = mapDebtDBTypeToDebtViewType(yield debts_repository_1.debtsRepository.findDebt(id));
            if (!debt)
                throw new debt_not_found_error_1.DebtNotFoundError(id);
            return debt;
        });
    },
    addDebt(creditorId, amount, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const debt = {
                creditorId: creditorId,
                amount: amount,
                date: date,
            };
            return (yield debts_repository_1.debtsRepository.addDebt(debt)).toHexString();
        });
    },
    patchDebt(id_1, _a) {
        return __awaiter(this, arguments, void 0, function* (id, { amount, date, }) {
            const res = yield debts_repository_1.debtsRepository.patchDebt(id, {
                amount: amount,
                date: date,
            });
            if (!res)
                throw new debt_not_found_error_1.DebtNotFoundError(id);
            return res;
        });
    },
    deleteDebt(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield debts_repository_1.debtsRepository.deleteDebt(id);
            if (!res)
                throw new debt_not_found_error_1.DebtNotFoundError(id);
            return res;
        });
    },
};
