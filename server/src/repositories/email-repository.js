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
exports.emailRepository = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const settings_1 = require("../settings");
exports.emailRepository = {
    sendEmail(email, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = nodemailer_1.default.createTransport({
                host: 'smtp.mail.ru',
                port: 465,
                secure: true,
                auth: {
                    user: settings_1.settings.EMAIL_USER,
                    pass: settings_1.settings.EMAIL_PASS,
                },
            });
            const msgData = yield transport.sendMail({
                from: '"The Debts" <simplerucoder@mail.ru>',
                to: email,
                subject: subject,
                html: message,
            });
            return msgData;
        });
    },
};
