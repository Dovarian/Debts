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
exports.creditorsService = void 0;
const creditor_not_found_error_1 = require("./../errors/creditor-not-found-error");
const creditors_repository_1 = require("../repositories/creditors-repository");
const mapCreditorDBTypeToCreditorViewType = (creditor) => {
    if (!!(creditor === null || creditor === void 0 ? void 0 : creditor._id.toHexString()) ||
        !!(creditor === null || creditor === void 0 ? void 0 : creditor.creditorName) ||
        !!(creditor === null || creditor === void 0 ? void 0 : creditor.creditorAvatar) ||
        !!(creditor === null || creditor === void 0 ? void 0 : creditor.userId)) {
        return {
            id: creditor._id.toHexString(),
            creditorName: creditor.creditorName,
            creditorAvatar: creditor.creditorAvatar,
            userId: creditor.userId,
        };
    }
    else {
        return null;
    }
};
exports.creditorsService = {
    findCreditors(page, pageSize, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield creditors_repository_1.creditorsRepository.findCreditors(+page, +pageSize, userId)).map(mapCreditorDBTypeToCreditorViewType);
        });
    },
    findCreditor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const creditor = mapCreditorDBTypeToCreditorViewType(yield creditors_repository_1.creditorsRepository.findCreditor(id));
            if (!creditor)
                throw new creditor_not_found_error_1.CreditorNotFoundError(id);
            return creditor;
        });
    },
    addCreditor(userId, creditorName, creditorAvatar) {
        return __awaiter(this, void 0, void 0, function* () {
            const creditor = {
                userId: userId,
                creditorAvatar: creditorAvatar,
                creditorName: creditorName,
            };
            return (yield creditors_repository_1.creditorsRepository.addCreditor(creditor)).toHexString();
        });
    },
    patchCreditor(id_1, _a) {
        return __awaiter(this, arguments, void 0, function* (id, { creditorName, creditorAvatar, }) {
            const res = yield creditors_repository_1.creditorsRepository.patchCreditor(id, creditorName, creditorAvatar);
            if (!res)
                throw new creditor_not_found_error_1.CreditorNotFoundError(id);
            return res;
        });
    },
    deleteCreditor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield creditors_repository_1.creditorsRepository.deleteCreditor(id);
            if (!res)
                throw new creditor_not_found_error_1.CreditorNotFoundError(id);
            return res;
        });
    },
};
