import { body, param, query } from 'express-validator'

export const debtsValidators = {
	idValidation(validator: typeof body | typeof param | typeof query) {
		return validator('id').trim().isLength({ min: 24, max: 24 }).isString()
	},
	creditorIdValidation(validator: typeof body | typeof param | typeof query) {
		return validator('creditorId')
			.trim()
			.isLength({ min: 24, max: 24 })
			.isString()
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
	amountValidator(validator: typeof body | typeof param | typeof query) {
		return validator('amount')
			.trim()
			.isLength({ min: 1, max: 100 })
			.escape()
			.isNumeric()
	},
	dateValidator(validator: typeof body | typeof param | typeof query) {
		return validator('date').trim().isLength({ max: 100 }).escape().isNumeric()
	},
}
