export class UserHasAlreadyBeenConfirmed extends Error {
	constructor(id: string) {
		super(`User with id: ${id} has already been confirmed`)
		this.name = 'UserHasAlreadyBeenConfirmed'
	}
}
