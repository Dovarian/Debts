import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
export const inputValidationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const error = validationResult(req)

	if (!error.isEmpty()) {
		res.status(400).json({ errors: error.array() })
	} else {
		next()
	}
}
