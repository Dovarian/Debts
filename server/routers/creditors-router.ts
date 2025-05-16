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
} from '../api-types/users-api-types'
import { UserViewType } from '../types/users-types'
import { creditorsValidators } from '../validators/creditors-validations'
import {
	CreateCreditorApiType,
	QueryCreditorApiType,
	UpdateCreditorApiType,
	UriParamCreditorApiType,
} from '../api-types/creditors-api-types'
import { CreditorViewType } from '../types/creditors-types'
import { creditorsService } from '../services/creditors-service'

export const getCreditorsRouter = () => {
	const router = Router()

	router.get(
		'/',
		[
			creditorsValidators.pageValidator(query),
			creditorsValidators.pageSizeValidator(query),
			creditorsValidators.userIdValidation(query).optional(),
		],
		inputValidationMiddleware,
		async (
			req: RequestWithQuery<QueryCreditorApiType>,
			res: Response<(CreditorViewType | null)[]>
		) => {
			res
				.status(200)
				.json(
					await creditorsService.findCreditors(
						req.query.page,
						req.query.pageSize,
						req.query.userId
					)
				)
		}
	)

	router.get(
		'/:id',
		creditorsValidators.idValidation(param),
		inputValidationMiddleware,
		async (
			req: RequestWithParams<UriParamCreditorApiType>,
			res: Response<CreditorViewType>,
			next: NextFunction
		) => {
			try {
				res.status(200).json(await creditorsService.findCreditor(req.params.id))
			} catch (err) {
				next(err)
			}
		}
	)

	router.post(
		'/',
		[
			creditorsValidators.userIdValidation(body),
			creditorsValidators.creditorNameValidator(body),
			creditorsValidators.creditorAvatarValidator(body),
		],
		inputValidationMiddleware,
		async (
			req: RequestWithBody<CreateCreditorApiType>,
			res: Response<CreditorViewType>
		) => {
			const id = await creditorsService.addCreditor(
				req.body.userId,
				req.body.creditorName,
				req.body.creditorAvatar
			)

			const creditor = await creditorsService.findCreditor(id)

			res.status(201).json(creditor)
		}
	)

	router.patch(
		'/:id',
		[
			creditorsValidators.idValidation(param),
			creditorsValidators.creditorNameValidator(body),
			creditorsValidators.creditorAvatarValidator(body),
		],
		inputValidationMiddleware,
		async (
			req: RequestWithParamsAndBody<
				UriParamCreditorApiType,
				UpdateCreditorApiType
			>,
			res: Response,
			next: NextFunction
		) => {
			try {
				await creditorsService.patchCreditor(req.params.id, {
					creditorName: req.body.creditorName,
					creditorAvatar: req.body.creditorAvatar,
				})

				res.sendStatus(204)
			} catch (err) {
				next(err)
			}
		}
	)

	router.delete(
		'/:id',
		creditorsValidators.idValidation(param),
		inputValidationMiddleware,
		async (
			req: RequestWithParams<UriParamCreditorApiType>,
			res: Response<CreditorViewType>,
			next: NextFunction
		) => {
			try {
				await creditorsService.deleteCreditor(req.params.id)

				res.sendStatus(204)
			} catch (err) {
				next(err)
			}
		}
	)

	return router
}
