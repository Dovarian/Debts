import 'dotenv/config'

import express from 'express'
import { getPagesRouter } from './routers/pages-router'
import { getUsersRouter } from './routers/users-router'
import { errorHandlerMiddleware } from './middlewares/error-handler-middleware'
import { getEmailRouter } from './routers/email-router'
import { getAuthRouter } from './routers/auth-router'
import cookieParser from 'cookie-parser'

export const app = express()

app.use(cookieParser())
app.use(express.json())
app.use('/', getPagesRouter())
app.use('/api/users', getUsersRouter())
app.use('/api/email', getEmailRouter())
app.use('/api/auth', getAuthRouter())
app.use(errorHandlerMiddleware)
