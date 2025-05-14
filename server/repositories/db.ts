import { MongoClient } from 'mongodb'
import { settings } from '../settings'
import { UserDBType } from '../types/users-types'
import { RefreshTokenPayloadDbType } from '../types/jwt-types'

export const client = new MongoClient(settings.MONGO_URI)
const db = client.db(settings.DB_NAME)
export const usersCollection = db.collection<UserDBType>('users')
export const refreshTokensCollection = db.collection<RefreshTokenPayloadDbType>(
	'refresh-tokens-payload'
)
refreshTokensCollection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const runDB = async () => {
	try {
		await client.connect()
		await client.db('products').command({ ping: 1 })
		console.log('Connected successfully to mongo server')
	} catch {
		await client.close()
		console.log('Can`t connect to db')
	}
}
