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
	login: string
	avatarUrl: string
	createdAt: Date
}
