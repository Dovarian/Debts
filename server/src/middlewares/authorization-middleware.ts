import jwt from 'jsonwebtoken'
import { NextFunction, Response } from 'express'
import { TokenNotFoundError } from '../errors/token-not-found-error'
import { settings } from '../settings'
import { TokenIncorrectError } from '../errors/token-incorrect-error'
import { usersRepository } from '../repositories/users-repository'
import { UserNotConfirmed } from '../errors/user-not-confirmed'
import { UserNotLoggedInError } from '../errors/user-not-logged-in-error'

export const authorizationMiddleware = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const accessToken = req.cookies.accessToken

		if (!accessToken) throw new UserNotLoggedInError()

		const payload: any = jwt.verify(accessToken, settings.JWT_SECRET)

		if (!payload) throw new UserNotLoggedInError()

		const user = await usersRepository.findUser(payload.userId)

		if (!user?.emailConfirmation.isConfirmed)
			throw new UserNotConfirmed(payload.userId)

		req.context = {}
		req.context.user = payload
		next()
	} catch (err) {
		next(err)
	}
}
