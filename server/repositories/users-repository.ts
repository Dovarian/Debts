import { ObjectId } from 'mongodb'
import { usersCollection } from './db'
import { UserDBType } from '../types/users-types'

export const usersRepository = {
	async findUsers(page: number, pageSize: number, nickname?: string) {
		const filter: any = []

		if (nickname) {
			filter.push({ 'userData.nickname': { $regex: nickname } })
		} else {
			filter.push({})
		}

		return await usersCollection
			.find({ $or: filter })
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.toArray()
	},
	async findUser(id: string) {
		return await usersCollection.findOne({ _id: new ObjectId(id) })
	},
	async findUserByLoginOrEmail(loginOrEmail: string) {
		return await usersCollection.findOne({
			$or: [{ login: loginOrEmail }, { email: loginOrEmail }],
		})
	},
	async addUser(user: UserDBType) {
		return (await usersCollection.insertOne(user)).insertedId
	},
	async patchUser(
		id: string,
		login?: string,
		email?: string,
		nickname?: string,
		avatar?: string,
		passwordHash?: string
	) {
		const updates: any = {}

		!!login ? (updates['userData.login'] = login) : ''
		!!email ? (updates['userData.email'] = email) : ''
		!!nickname ? (updates['userData.nickname'] = nickname) : ''
		!!avatar ? (updates['userData.avatar'] = avatar) : ''
		!!passwordHash ? (updates['userData.passwordHash'] = passwordHash) : ''

		return (
			(
				await usersCollection.updateOne(
					{ _id: new ObjectId(id) },
					{ $set: updates }
				)
			).matchedCount === 1
		)
	},
	async deleteUser(id: string) {
		return !!(await usersCollection.deleteOne({ _id: new ObjectId(id) }))
			.deletedCount
	},
}
