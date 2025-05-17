import { NextFunction, Response, Router } from 'express'
import { body, param, query } from 'express-validator'
import {
	RequestWithBody,
	RequestWithParams,
	RequestWithParamsAndBody,
	RequestWithQuery,
} from '../types/request-types'
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware'
import { debtsValidators } from '../validators/debts-validations'
import {
	CreateDebtApiType,
	QueryDebtApiType,
	UpdateDebtApiType,
	UriParamDebtApiType,
} from '../api-types/debts-api-types'
import { DebtViewType } from '../types/debts-types'
import { debtsService } from '../services/debts-service'

export const getDebtsRouter = () => {
	const router = Router()

	router.get(
		'/',
		[
			debtsValidators.pageValidator(query),
			debtsValidators.pageSizeValidator(query),
			debtsValidators.creditorIdValidation(query).optional(),
		],
		inputValidationMiddleware,
		async (
			req: RequestWithQuery<QueryDebtApiType>,
			res: Response<(DebtViewType | null)[]>
		) => {
			res
				.status(200)
				.json(
					await debtsService.findDebts(
						req.query.page,
						req.query.pageSize,
						req.query.creditorId
					)
				)
		}
	)

	router.get(
		'/:id',
		debtsValidators.idValidation(param),
		inputValidationMiddleware,
		async (
			req: RequestWithParams<UriParamDebtApiType>,
			res: Response<DebtViewType>,
			next: NextFunction
		) => {
			try {
				res.status(200).json(await debtsService.findDebt(req.params.id))
			} catch (err) {
				next(err)
			}
		}
	)

	router.post(
		'/',
		[
			debtsValidators.creditorIdValidation(body),
			debtsValidators.amountValidator(body),
			debtsValidators.dateValidator(body),
		],
		inputValidationMiddleware,
		async (
			req: RequestWithBody<CreateDebtApiType>,
			res: Response<DebtViewType>
		) => {
			const id = await debtsService.addDebt(
				req.body.creditorId,
				+req.body.amount,
				+req.body.date
			)

			const debt = await debtsService.findDebt(id)

			res.status(201).json(debt)
		}
	)

	router.patch(
		'/:id',
		[
			debtsValidators.idValidation(param),
			debtsValidators.amountValidator(body),
			debtsValidators.dateValidator(body),
		],
		inputValidationMiddleware,
		async (
			req: RequestWithParamsAndBody<UriParamDebtApiType, UpdateDebtApiType>,
			res: Response,
			next: NextFunction
		) => {
			try {
				await debtsService.patchDebt(req.params.id, {
					amount: Number(req.body.amount),
					date: Number(req.body.date),
				})

				res.sendStatus(204)
			} catch (err) {
				next(err)
			}
		}
	)

	router.delete(
		'/:id',
		debtsValidators.idValidation(param),
		inputValidationMiddleware,
		async (
			req: RequestWithParams<UriParamDebtApiType>,
			res: Response<DebtViewType>,
			next: NextFunction
		) => {
			try {
				await debtsService.deleteDebt(req.params.id)

				res.sendStatus(204)
			} catch (err) {
				next(err)
			}
		}
	)

	return router
}
