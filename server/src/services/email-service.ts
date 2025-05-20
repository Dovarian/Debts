import { UserNotFoundError } from '../errors/user-not-found-error'
import { emailRepository } from '../repositories/email-repository'
import { usersRepository } from '../repositories/users-repository'
import { jwtService } from './jwt-service'

export const emailService = {
	async sendPasswordRecoveryEmail(id: string) {
		const user = await usersRepository.findUser(id)

		if (!user) throw new UserNotFoundError(id)

		const token = await jwtService.createPasswordRecoveryToken(id)

		return await emailRepository.sendEmail(
			user.userData.email,
			'Password Recovery',
			`Click on this <a href='http://localhost:3500/forget-password?token${token}'>link</a> to recover your password`
		)
	},

	async sendAccountConfirmationEmail(id: string) {
		const user = await usersRepository.findUser(id)

		if (!user) throw new UserNotFoundError(id)

		return await emailRepository.sendEmail(
			user.userData.email,
			'Account Confirmation',
			`You are confirmation code: ${user.emailConfirmation.confirmationCode}`
		)
	},
}
