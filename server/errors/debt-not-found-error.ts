export class DebtNotFoundError extends Error {
	constructor(id: string) {
		super(`Debt with id: ${id} not found`)
		this.name = 'DebtNotFoundError'
	}
}
