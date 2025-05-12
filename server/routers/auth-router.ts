import { NextFunction, Response, Router } from 'express'
import { RequestWithParams } from '../types/users-types'
import { ConfirmAccountApiType } from '../api-types/auth-api-types'
import { authValidators } from '../validators/auth-validations'
import { param } from 'express-validator'
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware'
import { authService } from '../services/auth-service'

export const getAuthRouter = () => {
	const router = Router()

	router.patch(
		'/confirmAccount/:code',
		authValidators.codeValidation(param),
		inputValidationMiddleware,
		async (
			req: RequestWithParams<ConfirmAccountApiType>,
			res: Response,
			next: NextFunction
		) => {
			try {
				await authService.confirmUser(req.params.code)
				res.sendStatus(204)
			} catch (err) {
				next(err)
			}
		}
	)

	return router
}
