export class CreditorNotFoundError extends Error {
	constructor(id: string) {
		super(`Creditor with id: ${id} not found`)
		this.name = 'CreditorNotFoundError'
	}
}
