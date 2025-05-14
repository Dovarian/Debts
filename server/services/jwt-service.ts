import jwt from 'jsonwebtoken'
import { settings } from '../settings'
import { v4 as uuidv4 } from 'uuid'
import { jwtRepository } from '../repositories/jwt-repository'
import { RefreshTokenIncorrectError } from '../errors/refresh-token-incorrect-error'

export const jwtService = {
	async createAccessToken(id: string) {
		const token = jwt.sign({ userId: id, jti: uuidv4() }, settings.JWT_SECRET, {
			expiresIn: '30m',
		})

		return token
	},

	async createRefreshToken(id: string) {
		const payloadData = { userId: id, jti: uuidv4() }

		const token = jwt.sign(payloadData, settings.JWT_SECRET, {
			expiresIn: '30d',
		})

		const payload = await this.getPayloadByToken(token)

		await jwtRepository.deleteRefreshTokensByUserId(id)
		await jwtRepository.addRefreshToken(payload)

		return token
	},

	async getPayloadByToken(token: string) {
		try {
			const payload = jwt.verify(token, settings.JWT_SECRET)

			return payload as any
		} catch (err) {
			throw new RefreshTokenIncorrectError(token)
		}
	},
}
