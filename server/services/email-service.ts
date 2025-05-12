import { UserNotFoundError } from '../errors/user-not-found-error'
import { emailRepository } from '../repositories/email-repository'
import { usersRepository } from '../repositories/users-repository'

export const emailService = {
	async sendPasswordRecoveryEmail(id: string) {
		const user = await usersRepository.findUser(id)

		if (!user) throw new UserNotFoundError(id)

		return await emailRepository.sendEmail(
			user.userData.email,
			'Password Recovery',
			'We send you password recovery code'
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
