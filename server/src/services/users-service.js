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
exports.usersService = void 0;
const users_repository_1 = require("../repositories/users-repository");
const user_not_found_error_1 = require("../errors/user-not-found-error");
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const bcrypt_1 = require("bcrypt");
const mapUserDBTypeToUserViewType = (user) => {
    if (!!(user === null || user === void 0 ? void 0 : user._id.toHexString()) ||
        !!(user === null || user === void 0 ? void 0 : user.userData.avatarUrl) ||
        !!(user === null || user === void 0 ? void 0 : user.userData.email) ||
        !!(user === null || user === void 0 ? void 0 : user.userData.nickname) ||
        !!(user === null || user === void 0 ? void 0 : user.userData.createdAt)) {
        return {
            id: user._id.toHexString(),
            avatarUrl: user.userData.avatarUrl,
            login: user.userData.login,
            email: user.userData.email,
            nickname: user.userData.nickname,
            createdAt: user.userData.createdAt,
        };
    }
    else {
        return null;
    }
};
exports.usersService = {
    findUsers(page, pageSize, nickname, login) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield users_repository_1.usersRepository.findUsers(+page, +pageSize, nickname, login)).map(mapUserDBTypeToUserViewType);
        });
    },
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = mapUserDBTypeToUserViewType(yield users_repository_1.usersRepository.findUser(id));
            if (!user)
                throw new user_not_found_error_1.UserNotFoundError(id);
            return user;
        });
    },
    findUserByLoginOrEmail(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = mapUserDBTypeToUserViewType(yield users_repository_1.usersRepository.findUser(loginOrEmail));
            if (!user)
                throw new user_not_found_error_1.UserNotFoundError(loginOrEmail);
            return user;
        });
    },
    addUser(login, email, password, nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                userData: {
                    avatarUrl: '',
                    email: email,
                    login: login,
                    passwordHash: yield (0, bcrypt_1.hash)(password, 10),
                    nickname: nickname,
                    createdAt: new Date(),
                },
                emailConfirmation: {
                    confirmationCode: (0, uuid_1.v4)(),
                    expirationDate: (0, date_fns_1.add)(new Date(), {
                        hours: 1,
                    }),
                    isConfirmed: false,
                },
            };
            return (yield users_repository_1.usersRepository.addUser(user)).toHexString();
        });
    },
    patchUser(id_1, _a) {
        return __awaiter(this, arguments, void 0, function* (id, { login, email, nickname, avatarUrl, password, }) {
            let passwordHash = '';
            if (!!password)
                passwordHash = yield (0, bcrypt_1.hash)(password, 10);
            const res = yield users_repository_1.usersRepository.patchUser(id, login, email, nickname, avatarUrl, passwordHash);
            if (!res)
                throw new user_not_found_error_1.UserNotFoundError(id);
            return res;
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield users_repository_1.usersRepository.deleteUser(id);
            if (!res)
                throw new user_not_found_error_1.UserNotFoundError(id);
            return res;
        });
    },
};
