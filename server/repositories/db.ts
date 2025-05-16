import { MongoClient } from 'mongodb'
import { settings } from '../settings'
import { UserDbType } from '../types/users-types'
import { RefreshTokenPayloadDbType } from '../types/jwt-types'
import { CreditorDbType } from '../types/creditors-types'

export const client = new MongoClient(settings.MONGO_URI)
const db = client.db(settings.DB_NAME)
export const usersCollection = db.collection<UserDbType>('users')
// export const debtsCollection = db.collection<DebtDbType>('debts')
export const creditorsCollection = db.collection<CreditorDbType>('creditors')
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
