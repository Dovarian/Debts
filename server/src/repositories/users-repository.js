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
exports.usersRepository = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("./db");
exports.usersRepository = {
    findUsers(page, pageSize, nickname, login) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = [];
            if (nickname) {
                filter.push({ 'userData.nickname': { $regex: nickname } });
            }
            else if (login) {
                filter.push({ 'userData.login': { $regex: login } });
            }
            else {
                filter.push({});
            }
            return yield db_1.usersCollection
                .find({ $or: filter })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .toArray();
        });
    },
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.usersCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    findUserByLoginOrEmail(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.usersCollection.findOne({
                $or: [
                    { 'userData.login': loginOrEmail },
                    { 'userData.email': loginOrEmail },
                ],
            });
        });
    },
    findUserByConfirmationCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.usersCollection.findOne({
                'emailConfirmation.confirmationCode': code,
            });
        });
    },
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield db_1.usersCollection.insertOne(user)).insertedId;
        });
    },
    patchUser(id, login, email, nickname, avatarUrl, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = {};
            !!login ? (updates['userData.login'] = login) : '';
            !!email ? (updates['userData.email'] = email) : '';
            !!nickname ? (updates['userData.nickname'] = nickname) : '';
            !!avatarUrl ? (updates['userData.avatarUrl'] = avatarUrl) : '';
            !!passwordHash ? (updates['userData.passwordHash'] = passwordHash) : '';
            return ((yield db_1.usersCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updates })).matchedCount === 1);
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield db_1.usersCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) }))
                .deletedCount;
        });
    },
    updateConfirmation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield db_1.usersCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { 'emailConfirmation.isConfirmed': true } })).matchedCount === 1);
        });
    },
};
