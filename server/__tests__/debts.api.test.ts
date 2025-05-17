import { DebtViewType } from './../types/debts-types'
import {
	CreateDebtApiType,
	UpdateDebtApiType,
} from './../api-types/debts-api-types'
import { app } from '../app'
import { client, debtsCollection } from '../repositories/db'
import request from 'supertest'

const createTestDebts = async (count: 1 | 2 | 3) => {
	const debtsData: CreateDebtApiType[] = [
		{
			creditorId: '6827b26980f6c0b0e672cf9a',
			amount: 1000,
			date: +new Date(),
		},
		{
			creditorId: '6827b26980f6c0b0e672cf9a',
			amount: 2000,
			date: +new Date(),
		},
		{
			creditorId: '6827b26980f6c0b0e672cf1a',
			amount: 3000,
			date: +new Date(),
		},
	]

	const createdDebts: DebtViewType[] = []

	for (let i = 0; i < count; i++) {
		createdDebts[i] = (
			await request(app).post('/api/debts').send(debtsData[i]).expect(201)
		).body

		expect(createdDebts[i]).toMatchObject({
			id: expect.any(String),
			creditorId: debtsData[i].creditorId,
			amount: debtsData[i].amount,
			date: debtsData[i].date,
		})
	}

	return createdDebts
}

describe('/api/debts', () => {
	beforeEach(async () => {
		await debtsCollection.deleteMany({})
	})

	afterAll(async () => {
		await client.close()
	})

	describe('get debts', () => {
		it('return 200 and empty array', async () => {
			await request(app).get('/api/debts?page=1&pageSize=4').expect(200, [])
		})

		it('return filtered array', async () => {
			const createdDebts: DebtViewType[] = await createTestDebts(3)

			await request(app)
				.get(
					`/api/debts?creditorId=${createdDebts[2]?.creditorId}&page=1&pageSize=4`
				)
				.expect(200, [createdDebts[2]])
		})

		it('return two debts with pageSize equal 2 and page equal 1', async () => {
			const createdDebts: DebtViewType[] = await createTestDebts(3)

			await request(app)
				.get(`/api/debts?page=1&pageSize=2`)
				.expect([createdDebts[0], createdDebts[1]])
		})

		it('return one debt with pageSize equal 2 and page equal 2', async () => {
			const createdDebts: DebtViewType[] = await createTestDebts(3)

			await request(app)
				.get(`/api/debts?page=2&pageSize=2`)
				.expect([createdDebts[2]])
		})
	})

	describe('get debt', () => {
		it('return 404 for note existing debt', async () => {
			await request(app).get('/api/debts/000000000000000000000000').expect(404)
		})

		it('return 200 and certain debt', async () => {
			const createdDebts: DebtViewType[] = await createTestDebts(2)

			await request(app)
				.get(`/api/debts/${createdDebts[0]!.id}`)
				.expect(200, createdDebts[0])

			await request(app)
				.get(`/api/debts/${createdDebts[1]!.id}`)
				.expect(200, createdDebts[1])
		})
	})

	describe('post debt', () => {
		it('create debt with correct data', async () => {
			const createdDebts: DebtViewType[] = await createTestDebts(3)

			await request(app)
				.get('/api/debts?page=1&pageSize=4')
				.expect(200, [createdDebts[0], createdDebts[1], createdDebts[2]])
		})

		it('don`t create debt with empty data', async () => {
			const debtData: CreateDebtApiType = {
				creditorId: '',
				amount: 0,
				date: +new Date(),
			}
			await request(app).post('/api/debts').send(debtData).expect(400)
			await request(app).get('/api/debts?page=1&pageSize=4').expect(200, [])
		})

		it('don`t create debt with invalid userId', async () => {
			const debtData: CreateDebtApiType = {
				creditorId: '',
				amount: 1000,
				date: +new Date(),
			}
			await request(app).post('/api/debts').send(debtData).expect(400)
			await request(app).get('/api/debts?page=1&pageSize=4').expect(200, [])
		})
	})

	describe('update debt', () => {
		it('don`t update debt with incorrect data', async () => {
			const createdDebts: DebtViewType[] = await createTestDebts(1)
			const update: UpdateDebtApiType = { amount: 10000 }

			await request(app)
				.patch(`/api/debts/${createdDebts[0]!.id}`)
				.send(update)
				.expect(400)

			await request(app)
				.get(`/api/debts/${createdDebts[0]!.id}`)
				.expect(200, createdDebts[0])
		})

		it('don`t update debt that not exist', async () => {
			const debtData: UpdateDebtApiType = { amount: 10000 }

			await request(app)
				.put('/api/users/000000000000000000000000')
				.send(debtData)
				.expect(404)
		})

		it('update debt with correct data', async () => {
			const createdDebts: DebtViewType[] = await createTestDebts(2)

			const update: UpdateDebtApiType = {
				amount: 10000,
				date: +new Date(),
			}

			await request(app)
				.patch(`/api/debts/${createdDebts[0]!.id}`)
				.send(update)
				.expect(204)

			createdDebts[0].amount = update.amount!
			createdDebts[0].date = update.date!

			await request(app)
				.get(`/api/debts/${createdDebts[0]!.id}`)
				.expect(200, createdDebts[0])

			await request(app)
				.get(`/api/debts/${createdDebts[1]!.id}`)
				.expect(200, createdDebts[1])
		})
	})

	describe('delete debt', () => {
		it('don`t delete debt that not exist', async () => {
			await request(app)
				.delete('/api/debts/000000000000000000000000')
				.expect(404)
		})

		it('delete both debts', async () => {
			const createdDebts: DebtViewType[] = await createTestDebts(3)

			await request(app).delete(`/api/debts/${createdDebts[0].id}`).expect(204)
			await request(app).get(`/api/debts/${createdDebts[0].id}`).expect(404)

			await request(app).delete(`/api/debts/${createdDebts[2].id}`).expect(204)
			await request(app).get(`/api/debts/${createdDebts[2].id}`).expect(404)

			await request(app)
				.get('/api/debts?page=1&pageSize=4')
				.expect([createdDebts[1]])
		})
	})
})
