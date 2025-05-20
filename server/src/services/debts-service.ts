import { WithId } from 'mongodb'
import { DebtDbType, DebtViewType } from '../types/debts-types'
import { debtsRepository } from '../repositories/debts-repository'
import { DebtNotFoundError } from '../errors/debt-not-found-error'

const mapDebtDBTypeToDebtViewType = (
	debt: WithId<DebtDbType> | null
): DebtViewType | null => {
	if (
		!!debt?._id.toHexString() ||
		!!debt?.creditorId ||
		!!debt?.amount ||
		!!debt?.date
	) {
		return {
			id: debt._id.toHexString(),
			creditorId: debt.creditorId,
			amount: debt.amount,
			date: debt.date,
		}
	} else {
		return null
	}
}

export const debtsService = {
	async findDebts(page: string, pageSize: string, creditorId?: string) {
		return (await debtsRepository.findDebts(+page, +pageSize, creditorId)).map(
			mapDebtDBTypeToDebtViewType
		)
	},
	async findDebt(id: string) {
		const debt = mapDebtDBTypeToDebtViewType(await debtsRepository.findDebt(id))
		if (!debt) throw new DebtNotFoundError(id)
		return debt
	},
	async addDebt(creditorId: string, amount: number, date: number) {
		const debt: DebtDbType = {
			creditorId: creditorId,
			amount: amount,
			date: date,
		}

		return (await debtsRepository.addDebt(debt)).toHexString()
	},
	async patchDebt(
		id: string,
		{
			amount,
			date,
		}: {
			amount?: number
			date?: number
		}
	) {
		const res = await debtsRepository.patchDebt(id, {
			amount: amount,
			date: date,
		})

		if (!res) throw new DebtNotFoundError(id)

		return res
	},
	async deleteDebt(id: string) {
		const res = await debtsRepository.deleteDebt(id)

		if (!res) throw new DebtNotFoundError(id)

		return res
	},
}
