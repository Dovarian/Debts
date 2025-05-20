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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = require("../settings");
const uuid_1 = require("uuid");
const jwt_repository_1 = require("../repositories/jwt-repository");
const token_incorrect_error_1 = require("../errors/token-incorrect-error");
exports.jwtService = {
    createAccessToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ userId: id, jti: (0, uuid_1.v4)() }, settings_1.settings.JWT_SECRET, {
                expiresIn: '30m',
            });
            return token;
        });
    },
    createRefreshToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const payloadData = { userId: id, jti: (0, uuid_1.v4)() };
            const token = jsonwebtoken_1.default.sign(payloadData, settings_1.settings.JWT_SECRET, {
                expiresIn: '30d',
            });
            const payload = yield this.getPayloadByToken(token);
            yield jwt_repository_1.jwtRepository.deleteRefreshTokensByUserId(id);
            yield jwt_repository_1.jwtRepository.addRefreshToken(payload);
            return token;
        });
    },
    createPasswordRecoveryToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ userId: id, jti: (0, uuid_1.v4)() }, settings_1.settings.JWT_SECRET, {
                expiresIn: '1h',
            });
            return token;
        });
    },
    getPayloadByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = jsonwebtoken_1.default.verify(token, settings_1.settings.JWT_SECRET);
                return payload;
            }
            catch (err) {
                throw new token_incorrect_error_1.TokenIncorrectError(token);
            }
        });
    },
};
