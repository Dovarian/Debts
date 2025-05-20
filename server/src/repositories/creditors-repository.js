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
exports.creditorsRepository = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("./db");
exports.creditorsRepository = {
    findCreditors(page, pageSize, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = [];
            if (userId) {
                filter.push({ userId: { $regex: userId } });
            }
            else {
                filter.push({});
            }
            return yield db_1.creditorsCollection
                .find({ $or: filter })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .toArray();
        });
    },
    findCreditor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.creditorsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    addCreditor(creditor) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.creditorsCollection.insertOne(creditor)).insertedId;
        });
    },
    patchCreditor(id, creditorName, creditorAvatar) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = {};
            !!creditorName ? (updates.creditorName = creditorName) : '';
            !!creditorAvatar ? (updates.creditorAvatar = creditorAvatar) : '';
            return ((yield db_1.creditorsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updates })).matchedCount === 1);
        });
    },
    deleteCreditor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield db_1.creditorsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) }))
                .deletedCount;
        });
    },
};
