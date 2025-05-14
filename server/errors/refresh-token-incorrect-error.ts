export class RefreshTokenIncorrectError extends Error {
	constructor(token: string) {
		super(`Refresh token ${token} invalid`)
		this.name = 'RefreshTokenIncorrectError'
	}
}
