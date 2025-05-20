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
exports.runDB = exports.refreshTokensCollection = exports.creditorsCollection = exports.debtsCollection = exports.usersCollection = exports.client = void 0;
const mongodb_1 = require("mongodb");
const settings_1 = require("../settings");
exports.client = new mongodb_1.MongoClient(settings_1.settings.MONGO_URI);
const db = exports.client.db(settings_1.settings.DB_NAME);
exports.usersCollection = db.collection('users');
exports.debtsCollection = db.collection('debts');
exports.creditorsCollection = db.collection('creditors');
exports.refreshTokensCollection = db.collection('refresh-tokens-payload');
exports.refreshTokensCollection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const runDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        yield exports.client.db('products').command({ ping: 1 });
        console.log('Connected successfully to mongo server');
    }
    catch (_a) {
        yield exports.client.close();
        console.log('Can`t connect to db');
    }
});
exports.runDB = runDB;
