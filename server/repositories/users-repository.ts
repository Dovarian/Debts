import { ObjectId } from 'mongodb'
import { usersCollection } from './db'
import { UserDBType } from '../types/users-types'

export const usersRepository = {
	async findUsers(
		page: number,
		pageSize: number,
		nickname?: string,
		login?: string
	) {
		const filter: any = []

		if (nickname) {
			filter.push({ 'userData.nickname': { $regex: nickname } })
		} else if (login) {
			filter.push({ 'userData.login': { $regex: login } })
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
			$or: [
				{ 'userData.login': loginOrEmail },
				{ 'userData.email': loginOrEmail },
			],
		})
	},
	async findUserByConfirmationCode(code: string) {
		return await usersCollection.findOne({
			'emailConfirmation.confirmationCode': code,
		})
	},
	async findUserByConfirmationCode(code: string) {
		return await usersCollection.findOne({
			'emailConfirmation.confirmationCode': code,
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
		avatarUrl?: string,
		passwordHash?: string
	) {
		const updates: any = {}

		!!login ? (updates['userData.login'] = login) : ''
		!!email ? (updates['userData.email'] = email) : ''
		!!nickname ? (updates['userData.nickname'] = nickname) : ''
		!!avatarUrl ? (updates['userData.avatarUrl'] = avatarUrl) : ''
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
	async updateConfirmation(id: string) {
		return (
			(
				await usersCollection.updateOne(
					{ _id: new ObjectId(id) },
					{ $set: { 'emailConfirmation.isConfirmed': true } }
				)
			).matchedCount === 1
		)
	},
}
