export type QueryDebtApiType = {
	page: string
	pageSize: string
	creditorId?: string
}

export type CreateDebtApiType = {
	creditorId: string
	amount: number
	date: number
}

export type UpdateDebtApiType = {
	amount?: number
	date?: number
}

export type UriParamDebtApiType = {
	id: string
}
