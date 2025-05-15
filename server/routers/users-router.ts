import { usersValidators } from './../validators/users-validators'
import { NextFunction, Response, Router } from 'express'
import { body, oneOf, param, query } from 'express-validator'
import {
	RequestWithBody,
	RequestWithParams,
	RequestWithParamsAndBody,
	RequestWithQuery,
} from '../types/request-types'
import { usersService } from '../services/users-service'
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware'
import {
	CreateUserApiType,
	QueryLoginOrEmailUserApiType,
	QueryUserApiType,
	UpdateUserApiType,
	UriParamUserApiType,
} from '../api-types/user-api-types'
import { UserViewType } from '../types/users-types'

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
			req: RequestWithQuery<QueryUserApiType>,
			res: Response<(UserViewType | null)[]>
		) => {
			res
				.status(200)
				.json(
					await usersService.findUsers(
						req.query.page,
						req.query.pageSize,
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
			req: RequestWithParams<UriParamUserApiType>,
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
			req: RequestWithQuery<QueryLoginOrEmailUserApiType>,
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
			req: RequestWithBody<CreateUserApiType>,
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
			req: RequestWithParamsAndBody<UriParamUserApiType, UpdateUserApiType>,
			res: Response,
			next: NextFunction
		) => {
			try {
				await usersService.patchUser(req.params.id, {
					login: req.body.login,
					email: req.body.email,
					nickname: req.body.nickname,
					avatarUrl: req.body.avatarUrl,
					password: req.body.password,
				})

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
			req: RequestWithParams<UriParamUserApiType>,
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
