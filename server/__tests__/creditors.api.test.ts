import {
	CreateCreditorApiType,
	UpdateCreditorApiType,
} from './../api-types/creditors-api-types'
import { app } from '../app'
import { client, creditorsCollection } from '../repositories/db'
import request from 'supertest'
import { CreditorViewType } from '../types/creditors-types'

const createTestCreditors = async (count: 1 | 2 | 3) => {
	const creditorsData: CreateCreditorApiType[] = [
		{
			userId: '6827b26980f6c0b0e672cf9a',
			creditorName: 'Dmitriy',
			creditorAvatar: '',
		},
		{
			userId: '6827b26980f6c0b0e672cf9a',
			creditorName: 'Alex',
			creditorAvatar: '',
		},
		{
			userId: '6827b26980f6c0b0e672cf1a',
			creditorName: 'Oleg',
			creditorAvatar: '',
		},
	]

	const createdCreditors: CreditorViewType[] = []

	for (let i = 0; i < count; i++) {
		createdCreditors[i] = (
			await request(app)
				.post('/api/creditors')
				.send(creditorsData[i])
				.expect(201)
		).body

		expect(createdCreditors[i]).toMatchObject({
			id: expect.any(String),
			userId: creditorsData[i].userId,
			creditorName: creditorsData[i].creditorName,
			creditorAvatar: creditorsData[i].creditorAvatar,
		})
	}

	return createdCreditors
}

describe('/api/creditors', () => {
	beforeEach(async () => {
		await creditorsCollection.deleteMany({})
	})

	afterAll(async () => {
		await client.close()
	})

	describe('get creditors', () => {
		it('return 200 and empty array', async () => {
			await request(app).get('/api/creditors?page=1&pageSize=4').expect(200, [])
		})

		it('return filtered array', async () => {
			const createdCreditors: CreditorViewType[] = await createTestCreditors(3)

			await request(app)
				.get(
					`/api/creditors?userId=${createdCreditors[2]?.userId}&page=1&pageSize=4`
				)
				.expect(200, [createdCreditors[2]])
		})

		it('return two creditors with pageSize equal 2 and page equal 1', async () => {
			const createdCreditors: CreditorViewType[] = await createTestCreditors(3)

			await request(app)
				.get(`/api/creditors?page=1&pageSize=2`)
				.expect([createdCreditors[0], createdCreditors[1]])
		})

		it('return one creditor with pageSize equal 2 and page equal 2', async () => {
			const createdCreditors: CreditorViewType[] = await createTestCreditors(3)

			await request(app)
				.get(`/api/creditors?page=2&pageSize=2`)
				.expect([createdCreditors[2]])
		})
	})

	describe('get creditor', () => {
		it('return 404 for note existing creditor', async () => {
			await request(app)
				.get('/api/creditors/000000000000000000000000')
				.expect(404)
		})

		it('return 200 and certain creditor', async () => {
			const createdCreditors: CreditorViewType[] = await createTestCreditors(2)

			await request(app)
				.get(`/api/creditors/${createdCreditors[0]!.id}`)
				.expect(200, createdCreditors[0])

			await request(app)
				.get(`/api/creditors/${createdCreditors[1]!.id}`)
				.expect(200, createdCreditors[1])
		})
	})

	describe('post creditor', () => {
		it('create creditor with correct data', async () => {
			const createdCreditors: CreditorViewType[] = await createTestCreditors(3)

			await request(app)
				.get('/api/creditors?page=1&pageSize=4')
				.expect(200, [
					createdCreditors[0],
					createdCreditors[1],
					createdCreditors[2],
				])
		})

		it('don`t create creditor with empty data', async () => {
			const creditorData: CreateCreditorApiType = {
				userId: '',
				creditorName: '',
				creditorAvatar: '',
			}
			await request(app).post('/api/creditors').send(creditorData).expect(400)
			await request(app).get('/api/creditors?page=1&pageSize=4').expect(200, [])
		})

		it('don`t create creditor with invalid userId', async () => {
			const creditorData: CreateCreditorApiType = {
				userId: '',
				creditorName: 'Andrey',
				creditorAvatar: 'hgdfrh',
			}
			await request(app).post('/api/creditors').send(creditorData).expect(400)
			await request(app).get('/api/creditors?page=1&pageSize=4').expect(200, [])
		})
	})

	describe('update creditor', () => {
		it('don`t update creditor with incorrect data', async () => {
			const createdCreditors: CreditorViewType[] = await createTestCreditors(1)
			const update: UpdateCreditorApiType = { creditorName: '' }

			await request(app)
				.patch(`/api/creditors/${createdCreditors[0]!.id}`)
				.send(update)
				.expect(400)

			await request(app)
				.get(`/api/creditors/${createdCreditors[0]!.id}`)
				.expect(200, createdCreditors[0])
		})

		it('don`t update creditor that not exist', async () => {
			const creditorData: UpdateCreditorApiType = { creditorName: 'Ivan' }

			await request(app)
				.put('/api/users/000000000000000000000000')
				.send(creditorData)
				.expect(404)
		})

		it('update creditor with correct data', async () => {
			const createdCreditors: CreditorViewType[] = await createTestCreditors(2)

			const update: UpdateCreditorApiType = {
				creditorName: 'Ivan',
				creditorAvatar: 'hdhdfhdfh',
			}

			await request(app)
				.patch(`/api/creditors/${createdCreditors[0]!.id}`)
				.send(update)
				.expect(204)

			createdCreditors[0].creditorName = update.creditorName!
			createdCreditors[0].creditorAvatar = update.creditorAvatar!

			await request(app)
				.get(`/api/creditors/${createdCreditors[0]!.id}`)
				.expect(200, createdCreditors[0])

			await request(app)
				.get(`/api/creditors/${createdCreditors[1]!.id}`)
				.expect(200, createdCreditors[1])
		})
	})

	describe('delete creditor', () => {
		it('don`t delete creditor that not exist', async () => {
			await request(app)
				.delete('/api/creditors/000000000000000000000000')
				.expect(404)
		})

		it('delete both creditors', async () => {
			const createdCreditors: CreditorViewType[] = await createTestCreditors(3)

			await request(app)
				.delete(`/api/creditors/${createdCreditors[0].id}`)
				.expect(204)
			await request(app)
				.get(`/api/creditors/${createdCreditors[0].id}`)
				.expect(404)

			await request(app)
				.delete(`/api/creditors/${createdCreditors[2].id}`)
				.expect(204)
			await request(app)
				.get(`/api/creditors/${createdCreditors[2].id}`)
				.expect(404)

			await request(app)
				.get('/api/creditors?page=1&pageSize=4')
				.expect([createdCreditors[1]])
		})
	})
})
