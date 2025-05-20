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
exports.emailService = void 0;
const user_not_found_error_1 = require("../errors/user-not-found-error");
const email_repository_1 = require("../repositories/email-repository");
const users_repository_1 = require("../repositories/users-repository");
const jwt_service_1 = require("./jwt-service");
exports.emailService = {
    sendPasswordRecoveryEmail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_repository_1.usersRepository.findUser(id);
            if (!user)
                throw new user_not_found_error_1.UserNotFoundError(id);
            const token = yield jwt_service_1.jwtService.createPasswordRecoveryToken(id);
            return yield email_repository_1.emailRepository.sendEmail(user.userData.email, 'Password Recovery', `Click on this <a href='http://localhost:3500/forget-password?token${token}'>link</a> to recover your password`);
        });
    },
    sendAccountConfirmationEmail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_repository_1.usersRepository.findUser(id);
            if (!user)
                throw new user_not_found_error_1.UserNotFoundError(id);
            return yield email_repository_1.emailRepository.sendEmail(user.userData.email, 'Account Confirmation', `You are confirmation code: ${user.emailConfirmation.confirmationCode}`);
        });
    },
};
