export type QueryCreditorApiType = {
	page: string
	pageSize: string
	userId?: string
}

export type CreateCreditorApiType = {
	userId: string
	creditorName: string
	creditorAvatar: string
}

export type UpdateCreditorApiType = {
	creditorName?: string
	creditorAvatar?: string
}

export type UriParamCreditorApiType = {
	id: string
}
