export class UserNotConfirmed extends Error {
	constructor(id: string) {
		super(`User with id ${id} not confirmed`)
		this.name = 'UserNotConfirmed'
	}
}
