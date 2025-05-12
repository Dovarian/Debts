import express from 'express'
import { getPagesRouter } from './routers/pages-router'
import { getUsersRouter } from './routers/users-router'
import { errorHandlerMiddleware } from './middlewares/error-handler-middleware'

export const app = express()

app.use(express.json())
app.use('/', getPagesRouter())
app.use('/api/users', getUsersRouter())
app.use(errorHandlerMiddleware)
