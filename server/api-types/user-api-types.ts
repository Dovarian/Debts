export type QueryUserApiType = {
	page: string
	pageSize: string
	nickname?: string
	login?: string
}

export type CreateUserApiType = {
	email: string
	login: string
	nickname: string
	password: string
}

export type UpdateUserApiType = {
	login?: string
	email?: string
	nickname?: string
	avatarUrl?: string
	password?: string
}

export type QueryLoginOrEmailUserApiType = {
	loginOrEmail: string
}

export type UriParamUserApiType = {
	id: string
}
