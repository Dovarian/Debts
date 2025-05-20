export class TokenIncorrectError extends Error {
	constructor(token: string) {
		super(`Token: ${token} incorrect`)
		this.name = 'TokenIncorrectError'
	}
}
