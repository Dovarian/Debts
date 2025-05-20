import { ObjectId } from 'mongodb'
import { debtsCollection } from './db'
import { DebtDbType } from '../types/debts-types'

export const debtsRepository = {
	async findDebts(page: number, pageSize: number, creditorId?: string) {
		const filter: any = []

		if (creditorId) {
			filter.push({ creditorId: { $regex: creditorId } })
		} else {
			filter.push({})
		}

		return await debtsCollection
			.find({ $or: filter })
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.toArray()
	},
	async findDebt(id: string) {
		return await debtsCollection.findOne({ _id: new ObjectId(id) })
	},
	async addDebt(debt: DebtDbType) {
		return (await debtsCollection.insertOne(debt)).insertedId
	},
	async patchDebt(
		id: string,
		{ amount, date }: { amount?: number; date?: number }
	) {
		const updates: any = {}

		!!amount ? (updates.amount = amount) : ''
		!!date ? (updates.date = date) : ''

		return (
			(
				await debtsCollection.updateOne(
					{ _id: new ObjectId(id) },
					{ $set: updates }
				)
			).matchedCount === 1
		)
	},
	async deleteDebt(id: string) {
		return !!(await debtsCollection.deleteOne({ _id: new ObjectId(id) }))
			.deletedCount
	},
}
