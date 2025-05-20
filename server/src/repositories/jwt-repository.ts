import { RefreshTokenPayloadType } from '../types/jwt-types'
import { refreshTokensCollection } from './db'

export const jwtRepository = {
	async findRefreshTokenByPayload(payload: RefreshTokenPayloadType) {
		return await refreshTokensCollection.findOne({
			userId: payload.userId,
			jti: payload.jti,
			expireAt: payload.exp,
		})
	},

	async addRefreshToken(payload: RefreshTokenPayloadType) {
		return (
			await refreshTokensCollection.insertOne({
				userId: payload.userId,
				jti: payload.jti,
				expireAt: payload.exp,
			})
		).insertedId
	},

	async deleteRefreshTokenByPayload(payload: RefreshTokenPayloadType) {
		return !!(
			await refreshTokensCollection.deleteOne({
				userId: payload.userId,
				jti: payload.jti,
				expireAt: payload.exp,
			})
		).deletedCount
	},

	async deleteRefreshTokensByUserId(userId: string) {
		return !!(
			await refreshTokensCollection.deleteMany({
				userId: userId,
			})
		).deletedCount
	},
}
