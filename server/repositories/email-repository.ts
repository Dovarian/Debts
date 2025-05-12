import nodemailer from 'nodemailer'
import { settings } from '../settings'

export const emailRepository = {
	async sendEmail(email: string, subject: string, message: string) {
		const transport = nodemailer.createTransport({
			host: 'smtp.mail.ru',
			port: 465,
			secure: true,
			auth: {
				user: settings.EMAIL_USER,
				pass: settings.EMAIL_PASS,
			},
		})

		const msgData = await transport.sendMail({
			from: '"The Debts" <simplerucoder@mail.ru>',
			to: email,
			subject: subject,
			html: message,
		})

		return msgData
	},
}
