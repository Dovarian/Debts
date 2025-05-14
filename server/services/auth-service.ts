import { WithId } from 'mongodb'
import { UserHasAlreadyBeenConfirmed } from '../errors/user-has-already-been-confirmed'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UserDBType } from '../types/users-types'
import { CodeExpiredError } from '../errors/code-expired'
import { usersRepository } from '../repositories/users-repository'
import { UserNotConfirmed } from '../errors/user-not-confirmed'
import { compare } from 'bcrypt'
import { LoginOrPasswordIncorrect } from '../errors/login-or-password-incorrect'
import { jwtService } from './jwt-service'
import {
	RefreshTokenPayloadDbType,
	RefreshTokenPayloadType,
} from '../types/jwt-types'
import { jwtRepository } from '../repositories/jwt-repository'
import { RefreshTokenNotFoundError } from '../errors/refresh-token-not-found-error'

const mapRefreshTokenPayloadDbTypeToRefreshTokenPayloadType = (
	payload: WithId<RefreshTokenPayloadDbType> | null
): RefreshTokenPayloadType | null => {
	if (!!payload?.userId || !!payload?.jti) {
		return {
			userId: payload.userId,
			jti: payload.jti,
			exp: payload.expireAt,
		}
	} else {
		return null
	}
}

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

	async checkCredentials(loginOrEmail: string, password: string) {
		const user = await usersRepository.findUserByLoginOrEmail(loginOrEmail)

		if (!user) throw new UserNotFoundError(loginOrEmail)

		const id = user._id.toHexString()

		if (!user.emailConfirmation.isConfirmed) throw new UserNotConfirmed(id)
		if (!(await compare(password, user.userData.passwordHash)))
			throw new LoginOrPasswordIncorrect(id)

		const accessToken = await jwtService.createAccessToken(id)
		const refreshToken = await jwtService.createRefreshToken(id)

		return {
			accessToken: accessToken,
			refreshToken: refreshToken,
		}
	},

	async getNewTokens(oldRefreshToken: string) {
		const oldPayload: RefreshTokenPayloadType =
			await jwtService.getPayloadByToken(oldRefreshToken)

		const foundPayload = mapRefreshTokenPayloadDbTypeToRefreshTokenPayloadType(
			await jwtRepository.findRefreshTokenByPayload(oldPayload)
		)

		if (!foundPayload)
			throw new RefreshTokenNotFoundError(oldPayload.userId, oldPayload.jti)
		// if (!(foundPayload.exp > new Date()))
		// 	throw new RefreshTokenNotFoundError(foundPayload.userId, foundPayload.jti)

		await jwtRepository.deleteRefreshTokensByUserId(foundPayload.userId)
		const accessToken = await jwtService.createAccessToken(foundPayload.userId)
		const refreshToken = await jwtService.createRefreshToken(
			foundPayload.userId
		)

		return {
			accessToken: accessToken,
			refreshToken: refreshToken,
		}
	},
}
