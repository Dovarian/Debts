import { NextFunction, Router } from 'express'
import { authorizationMiddleware } from '../middlewares/authorization-middleware'

export const getPagesRouter = () => {
	const router = Router()

	router.get('/', authorizationMiddleware, async (req, res) => {
		res.status(200).sendFile(process.cwd() + '/client/pages/main.html')
	})

	router.get('/registration', async (req, res) => {
		res.status(200).sendFile(process.cwd() + '/client/pages/registration.html')
	})

	router.get('/login', async (req, res) => {
		res.status(200).sendFile(process.cwd() + '/client/pages/login.html')
	})

	router.get('/account-confirmation', async (req, res) => {
		res
			.status(200)
			.sendFile(process.cwd() + '/client/pages/account-confirmation.html')
	})

	return router
}
