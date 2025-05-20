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
exports.authorizationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_not_found_error_1 = require("../errors/token-not-found-error");
const settings_1 = require("../settings");
const token_incorrect_error_1 = require("../errors/token-incorrect-error");
const users_repository_1 = require("../repositories/users-repository");
const user_not_confirmed_1 = require("../errors/user-not-confirmed");
const authorizationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const authHeader = req.headers.authorization
        // if (!authHeader) throw new TokenNotFoundError()
        // const accessToken = authHeader.split(' ')[1]
        // if (!accessToken) throw new TokenNotFoundError()
        const accessToken = req.cookies.accessToken;
        if (!accessToken)
            throw new token_not_found_error_1.TokenNotFoundError();
        const payload = jsonwebtoken_1.default.verify(accessToken, settings_1.settings.JWT_SECRET);
        if (!payload)
            throw new token_incorrect_error_1.TokenIncorrectError(accessToken);
        const user = yield users_repository_1.usersRepository.findUser(payload.userId);
        if (!(user === null || user === void 0 ? void 0 : user.emailConfirmation.isConfirmed))
            throw new user_not_confirmed_1.UserNotConfirmed(payload.userId);
        req.context = {};
        req.context.user = payload;
        next();
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.authorizationMiddleware = authorizationMiddleware;
