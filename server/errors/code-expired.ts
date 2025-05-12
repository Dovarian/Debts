export class CodeExpiredError extends Error {
	constructor(id: string) {
		super(`User with id: ${id} is expired`)
		this.name = 'CodeExpiredError'
	}
}
