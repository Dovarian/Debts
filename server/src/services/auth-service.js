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
exports.authService = void 0;
const user_has_already_been_confirmed_1 = require("../errors/user-has-already-been-confirmed");
const user_not_found_error_1 = require("../errors/user-not-found-error");
const code_expired_error_1 = require("../errors/code-expired-error");
const users_repository_1 = require("../repositories/users-repository");
const user_not_confirmed_1 = require("../errors/user-not-confirmed");
const bcrypt_1 = require("bcrypt");
const login_or_password_incorrect_1 = require("../errors/login-or-password-incorrect");
const jwt_service_1 = require("./jwt-service");
const jwt_repository_1 = require("../repositories/jwt-repository");
const token_not_found_error_1 = require("../errors/token-not-found-error");
const users_service_1 = require("./users-service");
const mapRefreshTokenPayloadDbTypeToRefreshTokenPayloadType = (payload) => {
    if (!!(payload === null || payload === void 0 ? void 0 : payload.userId) || !!(payload === null || payload === void 0 ? void 0 : payload.jti)) {
        return {
            userId: payload.userId,
            jti: payload.jti,
            exp: payload.expireAt,
        };
    }
    else {
        return null;
    }
};
exports.authService = {
    confirmUser(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_repository_1.usersRepository.findUserByConfirmationCode(code);
            if (!user)
                throw new user_not_found_error_1.UserNotFoundError(code);
            if (user.emailConfirmation.isConfirmed)
                throw new user_has_already_been_confirmed_1.UserHasAlreadyBeenConfirmed(user._id.toHexString());
            if (user.emailConfirmation.expirationDate < new Date())
                throw new code_expired_error_1.CodeExpiredError(user._id.toHexString());
            return yield users_repository_1.usersRepository.updateConfirmation(user._id.toHexString());
        });
    },
    checkCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_repository_1.usersRepository.findUserByLoginOrEmail(loginOrEmail);
            if (!user)
                throw new user_not_found_error_1.UserNotFoundError(loginOrEmail);
            const id = user._id.toHexString();
            if (!user.emailConfirmation.isConfirmed)
                throw new user_not_confirmed_1.UserNotConfirmed(id);
            if (!(yield (0, bcrypt_1.compare)(password, user.userData.passwordHash)))
                throw new login_or_password_incorrect_1.LoginOrPasswordIncorrect(id);
            const accessToken = yield jwt_service_1.jwtService.createAccessToken(id);
            const refreshToken = yield jwt_service_1.jwtService.createRefreshToken(id);
            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        });
    },
    getNewTokens(oldRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldPayload = yield jwt_service_1.jwtService.getPayloadByToken(oldRefreshToken);
            const foundPayload = mapRefreshTokenPayloadDbTypeToRefreshTokenPayloadType(yield jwt_repository_1.jwtRepository.findRefreshTokenByPayload(oldPayload));
            if (!foundPayload)
                throw new token_not_found_error_1.TokenNotFoundError(oldPayload.userId, oldPayload.jti);
            const accessToken = yield jwt_service_1.jwtService.createAccessToken(foundPayload.userId);
            const refreshToken = yield jwt_service_1.jwtService.createRefreshToken(foundPayload.userId);
            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        });
    },
    passwordRecovery(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield jwt_service_1.jwtService.getPayloadByToken(token);
            yield users_service_1.usersService.patchUser(payload.userId, { password: newPassword });
        });
    },
};
