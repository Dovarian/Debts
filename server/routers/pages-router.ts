import { Router } from 'express'
import { authorizationMiddleware } from '../middlewares/authorization-middleware'

export const getPagesRouter = () => {
	const router = Router()

	router.get('/', authorizationMiddleware, async (req, res) => {
		res.status(200).sendFile(process.cwd() + '/client/pages/main/index.html')
	})

	return router
}
