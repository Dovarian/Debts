export class RefreshTokenNotFoundError extends Error {
	constructor(userId: string, jti: string) {
		super(`Refresh token with userId: ${userId} and jti: ${jti} not found`)
		this.name = 'RefreshTokenNotFoundError'
	}
}
