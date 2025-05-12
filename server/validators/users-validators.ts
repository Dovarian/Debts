import { body, param, query } from 'express-validator'

export const usersValidators = {
	idValidation(validator: typeof body | typeof param | typeof query) {
		return validator('userID').trim().isLength({ min: 24, max: 24 }).isString()
	},
	pageValidator(validator: typeof body | typeof param | typeof query) {
		return validator('page')
			.trim()
			.isLength({ min: 1, max: 9 })
			.isNumeric()
			.escape()
	},
	pageSizeValidator(validator: typeof body | typeof param | typeof query) {
		return validator('pageSize')
			.trim()
			.isLength({ min: 1, max: 9 })
			.isNumeric()
			.escape()
	},
	nicknameValidation(validator: typeof body | typeof param | typeof query) {
		return validator('nickname').trim().isLength({ min: 1, max: 100 }).escape()
	},
	emailValidation(validator: typeof body | typeof param | typeof query) {
		return validator('email')
			.trim()
			.isLength({ min: 1, max: 100 })
			.isEmail()
			.escape()
	},
	loginValidation(validator: typeof body | typeof param | typeof query) {
		return validator('login').trim().isLength({ min: 1, max: 100 }).escape()
	},
	loginOrEmailValidation(validator: typeof body | typeof param | typeof query) {
		return validator('loginOrEmail')
			.trim()
			.isLength({ min: 1, max: 100 })
			.escape()
	},
	passwordValidator(validator: typeof body | typeof param | typeof query) {
		return validator('password')
			.trim()
			.isLength({ min: 6, max: 100 })
			.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
			.escape()
	},
	avatarValidator(validator: typeof body | typeof param | typeof query) {
		return validator('avatar').trim().isLength({ min: 1, max: 100 }).escape()
	},
}
