export class DataIncorrectError extends Error {
	constructor(data: string) {
		super(`${data} incorrect`)
		this.name = 'DataIncorrectError'
	}
}
