import { body, param, query } from 'express-validator'

export const authValidators = {
	codeValidation(validator: typeof body | typeof param | typeof query) {
		return validator('code').trim().isLength({ min: 1, max: 100 }).isString()
	},
}
