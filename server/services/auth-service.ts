import { WithId } from 'mongodb'
import { UserHasAlreadyBeenConfirmed } from '../errors/user-has-already-been-confirmed'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UserDBType } from '../types/users-types'
import { CodeExpiredError } from '../errors/code-expired'
import { usersRepository } from '../repositories/users-repository'

export const authService = {
	async confirmUser(code: string) {
		const user: WithId<UserDBType> | null =
			await usersRepository.findUserByConfirmationCode(code)

		if (!user) throw new UserNotFoundError(code)
		if (user.emailConfirmation.isConfirmed)
			throw new UserHasAlreadyBeenConfirmed(user._id.toHexString())
		if (user.emailConfirmation.expirationDate < new Date())
			throw new CodeExpiredError(user._id.toHexString())

		return await usersRepository.updateConfirmation(user._id.toHexString())
	},
}
