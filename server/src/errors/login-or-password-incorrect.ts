export class LoginOrPasswordIncorrect extends Error {
	constructor(id: string) {
		super(`User with id ${id} has incorrect login or password`)
		this.name = 'LoginOrPasswordIncorrect'
	}
}
