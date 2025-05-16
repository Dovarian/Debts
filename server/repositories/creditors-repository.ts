import { ObjectId } from 'mongodb'
import { creditorsCollection } from './db'
import { CreditorDbType } from '../types/creditors-types'

export const creditorsRepository = {
	async findCreditors(page: number, pageSize: number, userId?: string) {
		const filter: any = []

		if (userId) {
			filter.push({ userId: { $regex: userId } })
		} else {
			filter.push({})
		}

		return await creditorsCollection
			.find({ $or: filter })
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.toArray()
	},
	async findCreditor(id: string) {
		return await creditorsCollection.findOne({ _id: new ObjectId(id) })
	},
	async addCreditor(creditor: CreditorDbType) {
		return (await creditorsCollection.insertOne(creditor)).insertedId
	},
	async patchCreditor(
		id: string,
		creditorName?: string,
		creditorAvatar?: string
	) {
		const updates: any = {}

		!!creditorName ? (updates.creditorName = creditorName) : ''
		!!creditorAvatar ? (updates.creditorAvatar = creditorAvatar) : ''

		return (
			(
				await creditorsCollection.updateOne(
					{ _id: new ObjectId(id) },
					{ $set: updates }
				)
			).matchedCount === 1
		)
	},
	async deleteCreditor(id: string) {
		return !!(await creditorsCollection.deleteOne({ _id: new ObjectId(id) }))
			.deletedCount
	},
}
