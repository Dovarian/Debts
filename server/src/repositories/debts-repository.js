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
exports.debtsRepository = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("./db");
exports.debtsRepository = {
    findDebts(page, pageSize, creditorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = [];
            if (creditorId) {
                filter.push({ creditorId: { $regex: creditorId } });
            }
            else {
                filter.push({});
            }
            return yield db_1.debtsCollection
                .find({ $or: filter })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .toArray();
        });
    },
    findDebt(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.debtsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    addDebt(debt) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.debtsCollection.insertOne(debt)).insertedId;
        });
    },
    patchDebt(id_1, _a) {
        return __awaiter(this, arguments, void 0, function* (id, { amount, date }) {
            const updates = {};
            !!amount ? (updates.amount = amount) : '';
            !!date ? (updates.date = date) : '';
            return ((yield db_1.debtsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updates })).matchedCount === 1);
        });
    },
    deleteDebt(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield db_1.debtsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) }))
                .deletedCount;
        });
    },
};
