import { usersValidators } from './../validators/users-validators'
import { NextFunction, Response, Router } from 'express'
import { body, oneOf, param, query } from 'express-validator'
import {
	RequestWithBody,
	RequestWithParams,
	RequestWithParamsAndBody,
	RequestWithQuery,
	UserViewType,
} from '../types/users-types'
import { usersService } from '../services/users-service'
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware'

export const getUsersRouter = () => {
	const router = Router()

	router.get(
		'/',
		[
			usersValidators.pageValidator(query),
			usersValidators.pageSizeValidator(query),
			usersValidators.nicknameValidation(query).optional(),
			usersValidators.loginValidation(query).optional(),
		],
		inputValidationMiddleware,
		async (
			req: RequestWithQuery<{
				page: string
				pageSize: string
				nickname?: string
				login?: string
			}>,
			res: Response<(UserViewType | null)[]>
		) => {
			res
				.status(200)
				.json(
					await usersService.findUsers(
						Number(req.query.page),
						Number(req.query.pageSize),
						req.query.nickname,
						req.query.login
					)
				)
		}
	)

	router.get(
		'/:id',
		usersValidators.idValidation(param),
		inputValidationMiddleware,
		async (
			req: RequestWithParams<{ id: string }>,
			res: Response<UserViewType>,
			next: NextFunction
		) => {
			try {
				res.status(200).json(await usersService.findUser(req.params.id))
			} catch (err) {
				next(err)
			}
		}
	)

	router.get(
		'/',
		usersValidators.loginOrEmailValidation(query),
		inputValidationMiddleware,
		async (
			req: RequestWithQuery<{ loginOrEmail: string }>,
			res: Response<UserViewType>,
			next: NextFunction
		) => {
			try {
				res
					.status(200)
					.json(
						await usersService.findUserByLoginOrEmail(req.query.loginOrEmail)
					)
			} catch (err) {
				next(err)
			}
		}
	)

	router.post(
		'/',
		[
			usersValidators.emailValidation(body),
			usersValidators.loginValidation(body),
			usersValidators.nicknameValidation(body),
			usersValidators.passwordValidator(body),
		],
		inputValidationMiddleware,
		async (
			req: RequestWithBody<{
				email: string
				login: string
				nickname: string
				password: string
			}>,
			res: Response<UserViewType>
		) => {
			const id = await usersService.addUser(
				req.body.login,
				req.body.email,
				req.body.password,
				req.body.nickname
			)

			const user = await usersService.findUser(id)

			res.status(201).json(user)
		}
	)

	router.patch(
		'/:id',
		[
			usersValidators.idValidation(param),
			oneOf([
				usersValidators.emailValidation(body),
				usersValidators.loginValidation(body),
				usersValidators.nicknameValidation(body),
				usersValidators.passwordValidator(body),
				usersValidators.avatarValidator(body),
			]),
		],
		inputValidationMiddleware,
		async (
			req: RequestWithParamsAndBody<
				{ id: string },
				{
					login?: string
					email?: string
					nickname?: string
					avatarUrl?: string
					password?: string
				}
			>,
			res: Response,
			next: NextFunction
		) => {
			try {
				await usersService.patchUser(
					req.params.id,
					req.body.login,
					req.body.email,
					req.body.nickname,
					req.body.avatarUrl,
					req.body.password
				)

				res.sendStatus(204)
			} catch (err) {
				next(err)
			}
		}
	)

	router.delete(
		'/:id',
		usersValidators.idValidation(param),
		inputValidationMiddleware,
		async (
			req: RequestWithParams<{ id: string }>,
			res: Response<UserViewType>,
			next: NextFunction
		) => {
			try {
				await usersService.deleteUser(req.params.id)

				res.sendStatus(204)
			} catch (err) {
				next(err)
			}
		}
	)

	return router
}
