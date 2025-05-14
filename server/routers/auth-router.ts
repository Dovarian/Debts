import { NextFunction, Request, Response, Router } from 'express'
import { RequestWithBody, RequestWithParams } from '../types/request-types'
import {
	ConfirmAccountApiType,
	LoginAccountApiType,
} from '../api-types/auth-api-types'
import { authValidators } from '../validators/auth-validations'
import { body, param } from 'express-validator'
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

	router.post(
		'/login',
		[
			authValidators.loginOrEmailValidation(body),
			authValidators.passwordValidation(body),
		],
		inputValidationMiddleware,
		async (
			req: RequestWithBody<LoginAccountApiType>,
			res: Response,
			next: NextFunction
		) => {
			try {
				const { accessToken, refreshToken } =
					await authService.checkCredentials(
						req.body.loginOrEmail,
						req.body.password
					)

				res.cookie('refreshToken', refreshToken, {
					httpOnly: true,
					// secure: true,
					sameSite: 'strict',
					maxAge: 30 * 24 * 60 * 60 * 1000,
				})

				res.cookie('accessToken', accessToken, {
					// secure: true,
					sameSite: 'strict',
					maxAge: 30 * 60 * 1000,
				})

				res.sendStatus(200)
			} catch (err) {
				next(err)
			}
		}
	)

	router.post(
		'/refresh-token',
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const oldRefreshToken = req.cookies.refreshToken

				const { accessToken, refreshToken } = await authService.getNewTokens(
					oldRefreshToken
				)

				res.cookie('refreshToken', refreshToken, {
					httpOnly: true,
					// secure: true,
					sameSite: 'strict',
					maxAge: 30 * 24 * 60 * 60 * 1000,
				})

				res.cookie('accessToken', accessToken, {
					// secure: true,
					sameSite: 'strict',
					maxAge: 30 * 60 * 1000,
				})

				res.sendStatus(200)
			} catch (err) {
				next(err)
			}
		}
	)

	return router
}
