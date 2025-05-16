import { NextFunction, Request, Response } from 'express'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UserHasAlreadyBeenConfirmed } from '../errors/user-has-already-been-confirmed'
import { CodeExpiredError } from '../errors/code-expired-error'
import { UserNotConfirmed } from '../errors/user-not-confirmed'
import { LoginOrPasswordIncorrect } from '../errors/login-or-password-incorrect'
import { TokenNotFoundError } from '../errors/token-not-found-error'
import { TokenIncorrectError } from '../errors/token-incorrect-error'
import { DataIncorrectError } from '../errors/data-incorrect-error'

export const errorHandlerMiddleware = (
	err: UserNotFoundError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof UserNotFoundError) {
		res.status(404).json({ message: err.message })
	}

	if (err instanceof UserHasAlreadyBeenConfirmed) {
		res.status(400).json({ message: err.message })
	}

	if (err instanceof CodeExpiredError) {
		res.status(410).json({ message: err.message })
	}

	if (err instanceof UserNotConfirmed) {
		res.status(403).json({ message: err.message })
	}

	if (err instanceof LoginOrPasswordIncorrect) {
		res.status(401).json({ message: err.message })
	}

	if (err instanceof TokenNotFoundError) {
		res.status(401).json({ message: err.message })
	}

	if (err instanceof TokenIncorrectError) {
		res.status(401).json({ message: err.message })
	}

	if (err instanceof DataIncorrectError) {
		res.status(400).json({ message: err.message })
	}

	res.status(500).json({ message: 'Internal Server Error' })
}
