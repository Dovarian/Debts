import { NextFunction, Request, Response } from 'express'
import { UserNotFoundError } from '../errors/user-not-found-error'

export const errorHandlerMiddleware = (
	err: UserNotFoundError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof UserNotFoundError) {
		res.status(404).json({ message: err.message })
	}

	res.status(500).json({ message: 'Internal Server Error' })
}
