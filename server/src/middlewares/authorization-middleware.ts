import jwt from 'jsonwebtoken'
import { NextFunction, Response } from 'express'
import { TokenNotFoundError } from '../errors/token-not-found-error'
import { settings } from '../settings'
import { TokenIncorrectError } from '../errors/token-incorrect-error'
import { usersRepository } from '../repositories/users-repository'
import { UserNotConfirmed } from '../errors/user-not-confirmed'
import { DataIncorrectError } from '../errors/data-incorrect-error'

export const authorizationMiddleware = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		// const authHeader = req.headers.authorization

		// if (!authHeader) throw new TokenNotFoundError()

		// const accessToken = authHeader.split(' ')[1]

		// if (!accessToken) throw new TokenNotFoundError()

		const accessToken = req.cookies.accessToken

		if (!accessToken) throw new TokenNotFoundError()

		const payload: any = jwt.verify(accessToken, settings.JWT_SECRET)

		if (!payload) throw new TokenIncorrectError(accessToken)

		const user = await usersRepository.findUser(payload.userId)

		if (!user?.emailConfirmation.isConfirmed)
			throw new UserNotConfirmed(payload.userId)

		req.context = {}
		req.context.user = payload
		next()
	} catch (err) {
		console.log(err)
		next(err)
	}
}
