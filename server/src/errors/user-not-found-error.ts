export class UserNotFoundError extends Error {
	constructor(idOrEmailOrLogin: string) {
		super(`User with ${idOrEmailOrLogin} not found`)
		this.name = 'UserNotFoundError'
	}
}
