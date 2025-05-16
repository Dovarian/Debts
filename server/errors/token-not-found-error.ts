export class TokenNotFoundError extends Error {
	constructor(userId?: string, jti?: string) {
		super(`Token not found`)

		if (userId && jti) {
			super(`Token with userId: ${userId} and jti: ${jti} not found`)
		}

		this.name = 'TokenNotFoundError'
	}
}
