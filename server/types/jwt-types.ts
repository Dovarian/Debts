export type RefreshTokenPayloadType = {
	userId: string
	jti: string
	exp: Date
}

export type RefreshTokenPayloadDbType = {
	userId: string
	jti: string
	expireAt: Date
}
