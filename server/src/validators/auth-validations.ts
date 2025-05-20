import { body, param, query } from 'express-validator'

export const authValidators = {
	codeValidation(validator: typeof body | typeof param | typeof query) {
		return validator('code')
			.trim()
			.isLength({ min: 1, max: 100 })
			.isString()
			.escape()
	},
	loginOrEmailValidation(validator: typeof body | typeof param | typeof query) {
		return validator('loginOrEmail')
			.trim()
			.isLength({ min: 1, max: 100 })
			.isString()
			.escape()
	},
	passwordValidation(validator: typeof body | typeof param | typeof query) {
		return validator('password')
			.trim()
			.isLength({ min: 6, max: 100 })
			.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
			.escape()
	},
	tokenValidation(validator: typeof body | typeof param | typeof query) {
		return validator('token')
			.trim()
			.isLength({ min: 1, max: 300 })
			.isString()
			.escape()
	},
}
