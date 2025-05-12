import { body, param, query } from 'express-validator'

export const emailValidators = {
	idValidation(validator: typeof body | typeof param | typeof query) {
		return validator('id').trim().isLength({ min: 24, max: 24 }).isString()
	},
}
