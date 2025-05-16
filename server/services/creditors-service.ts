import { CreditorNotFoundError } from './../errors/creditor-not-found-error'
import { WithId } from 'mongodb'
import { usersRepository } from '../repositories/users-repository'
import { CreditorDbType, CreditorViewType } from '../types/creditors-types'
import { creditorsRepository } from '../repositories/creditors-repository'

const mapCreditorDBTypeToCreditorViewType = (
	creditor: WithId<CreditorDbType> | null
): CreditorViewType | null => {
	if (
		!!creditor?._id.toHexString() ||
		!!creditor?.creditorName ||
		!!creditor?.creditorAvatar ||
		!!creditor?.userId
	) {
		return {
			id: creditor._id.toHexString(),
			creditorName: creditor.creditorName,
			creditorAvatar: creditor.creditorAvatar,
			userId: creditor.userId,
		}
	} else {
		return null
	}
}

export const creditorsService = {
	async findCreditors(page: string, pageSize: string, userId?: string) {
		return (
			await creditorsRepository.findCreditors(+page, +pageSize, userId)
		).map(mapCreditorDBTypeToCreditorViewType)
	},
	async findCreditor(id: string) {
		const creditor = mapCreditorDBTypeToCreditorViewType(
			await creditorsRepository.findCreditor(id)
		)
		if (!creditor) throw new CreditorNotFoundError(id)
		return creditor
	},
	async addCreditor(
		userId: string,
		creditorName: string,
		creditorAvatar: string
	) {
		const creditor: CreditorDbType = {
			userId: userId,
			creditorAvatar: creditorAvatar,
			creditorName: creditorName,
		}

		return (await creditorsRepository.addCreditor(creditor)).toHexString()
	},
	async patchCreditor(
		id: string,
		{
			creditorName,
			creditorAvatar,
		}: {
			creditorName?: string
			creditorAvatar?: string
		}
	) {

		const res = await creditorsRepository.patchCreditor(
			id,
			creditorName,
			creditorAvatar
		)

		if (!res) throw new CreditorNotFoundError(id)

		return res
	},
	async deleteCreditor(id: string) {
		const res = await creditorsRepository.deleteCreditor(id)

		if (!res) throw new CreditorNotFoundError(id)

		return res
	},
}
