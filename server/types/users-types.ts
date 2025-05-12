import { Request } from 'express'

export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithQuery<T> = Request<{}, {}, {}, T>
export type RequestWithParams<T> = Request<T>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>

export type UserDBType = {
	userData: {
		login: string
		email: string
		passwordHash: string
		nickname: string
		avatarUrl: string
		createdAt: Date
	}
	emailConfirmation: {
		confirmationCode: string
		expirationDate: Date
		isConfirmed: boolean
	}
}

export type UserViewType = {
	id: string
	email: string
	nickname: string
	avatarUrl: string
	createdAt: Date
}
