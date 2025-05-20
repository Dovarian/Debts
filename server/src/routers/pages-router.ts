import { Router } from 'express'

export const getPagesRouter = () => {
	const router = Router()

	router.get('/', async (req, res) => {
		res.status(200).sendFile(process.cwd() + '/client/pages/main.html')
	})

	router.get('/registration', async (req, res) => {
		res.status(200).sendFile(process.cwd() + '/client/pages/registration.html')
	})

	router.get('/login', async (req, res) => {
		res.status(200).sendFile(process.cwd() + '/client/pages/login.html')
	})

	return router
}
