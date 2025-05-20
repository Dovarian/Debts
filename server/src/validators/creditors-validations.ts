import { body, param, query } from 'express-validator'

export const creditorsValidators = {
	idValidation(validator: typeof body | typeof param | typeof query) {
		return validator('id').trim().isLength({ min: 24, max: 24 }).isString()
	},
	userIdValidation(validator: typeof body | typeof param | typeof query) {
		return validator('userId').trim().isLength({ min: 24, max: 24 }).isString()
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
	creditorNameValidator(validator: typeof body | typeof param | typeof query) {
		return validator('creditorName')
			.trim()
			.isLength({ min: 1, max: 100 })
			.escape()
	},
	creditorAvatarValidator(
		validator: typeof body | typeof param | typeof query
	) {
		return validator('creditorAvatar').trim().isLength({ max: 100 }).escape()
	},
}
