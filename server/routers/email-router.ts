import { NextFunction, Response, Router } from 'express'
import { RequestWithParams } from '../types/users-types'
import { CreateEmailApiType } from '../api-types/email-api-types'
import { emailValidators } from '../validators/email-validation'
import { param } from 'express-validator'
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware'
import { emailService } from '../services/email-service'

export const getEmailRouter = () => {
	const router = Router()

	router.post(
		'/passwordRecovery/:id',
		emailValidators.idValidation(param),
		inputValidationMiddleware,
		async (
			req: RequestWithParams<CreateEmailApiType>,
			res: Response,
			next: NextFunction
		) => {
			try {
				res
					.status(200)
					.json(await emailService.sendPasswordRecoveryEmail(req.params.id))
			} catch (err) {
				next(err)
			}
		}
	)

	router.post(
		'/accountConfirmation/:id',
		emailValidators.idValidation(param),
		inputValidationMiddleware,
		async (
			req: RequestWithParams<CreateEmailApiType>,
			res: Response,
			next: NextFunction
		) => {
			try {
				res
					.status(200)
					.json(await emailService.sendAccountConfirmationEmail(req.params.id))
			} catch (err) {
				next(err)
			}
		}
	)

	return router
}
