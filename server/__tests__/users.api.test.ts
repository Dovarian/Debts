import { app } from '../app'
import { client, usersCollection } from '../repositories/db'
import request from 'supertest'
import { UserViewType } from '../types/users-types'
import {
	CreateUserApiType,
	UpdateUserApiType,
} from '../api-types/users-api-types'

const createTestUsers = async (count: 1 | 2 | 3) => {
	const usersData: CreateUserApiType[] = [
		{
			login: 'Andrey',
			email: 'email1@mail.ru',
			nickname: 'Great Conqueror',
			password: '123456Xx',
		},
		{
			login: 'Kirill',
			email: 'email2@mail.ru',
			nickname: 'Great Sailor',
			password: '234567Xx',
		},
		{
			login: 'Dima',
			email: 'email3@mail.ru',
			nickname: 'Great Warrior',
			password: '345678Xx',
		},
	]

	const createdUsers: UserViewType[] = []

	for (let i = 0; i < count; i++) {
		createdUsers[i] = (
			await request(app).post('/api/users').send(usersData[i]).expect(201)
		).body

		expect(createdUsers[i]).toMatchObject({
			id: expect.any(String),
			email: usersData[i].email,
			nickname: usersData[i].nickname,
		})
	}

	return createdUsers
}

describe('/api/users', () => {
	beforeEach(async () => {
		await usersCollection.deleteMany({})
	})

	afterAll(async () => {
		await client.close()
	})

	describe('get users', () => {
		it('return 200 and empty array', async () => {
			await request(app).get('/api/users?page=1&pageSize=4').expect(200, [])
		})

		it('return filtered array', async () => {
			const createdUsers: UserViewType[] = await createTestUsers(3)
			await request(app)
				.get(
					`/api/users?nickname=${createdUsers[1]?.nickname}&page=1&pageSize=4`
				)
				.expect(200, [createdUsers[1]])
		})

		it('return two users with pageSize equal 2 and page equal 1', async () => {
			const createdUsers: UserViewType[] = await createTestUsers(3)

			await request(app)
				.get(`/api/users?page=1&pageSize=2`)
				.expect([createdUsers[0], createdUsers[1]])
		})

		it('return one users with pageSize equal 2 and page equal 2', async () => {
			const createdUsers: UserViewType[] = await createTestUsers(3)

			await request(app)
				.get(`/api/users?page=2&pageSize=2`)
				.expect([createdUsers[2]])
		})
	})

	describe('get user', () => {
		it('return 404 for note existing user', async () => {
			await request(app).get('/api/users/000000000000000000000000').expect(404)
		})

		it('return 200 and certain user', async () => {
			const createdUsers: UserViewType[] = await createTestUsers(2)

			await request(app)
				.get(`/api/users/${createdUsers[0]!.id}`)
				.expect(200, createdUsers[0])

			await request(app)
				.get(`/api/users/${createdUsers[1]!.id}`)
				.expect(200, createdUsers[1])
		})
	})

	describe('post user', () => {
		it('create users with correct data', async () => {
			const createdUsers: UserViewType[] = await createTestUsers(3)

			await request(app)
				.get('/api/users?page=1&pageSize=4')
				.expect(200, [createdUsers[0], createdUsers[1], createdUsers[2]])
		})

		it('don`t create user with empty data', async () => {
			const userData: CreateUserApiType = {
				login: '',
				email: '',
				password: '',
				nickname: '',
			}
			await request(app).post('/api/users').send(userData).expect(400)
			await request(app).get('/api/users?page=1&pageSize=4').expect(200, [])
		})

		it('don`t create user with invalid email', async () => {
			const userData: CreateUserApiType = {
				login: 'negr',
				email: 'invalidEmail',
				password: '123456Xx',
				nickname: 'Dovarian',
			}
			await request(app).post('/api/users').send(userData).expect(400)
			await request(app).get('/api/users?page=1&pageSize=4').expect(200, [])
		})

		it('don`t create user with invalid password', async () => {
			const userData: CreateUserApiType = {
				login: 'negr',
				email: 'validEmail@mail.ru',
				password: '1234',
				nickname: 'Dovarian',
			}
			await request(app).post('/api/users').send(userData).expect(400)
			await request(app).get('/api/users?page=1&pageSize=4').expect(200, [])
		})
	})

	describe('update user', () => {
		it('don`t update user with incorrect data', async () => {
			const createdUsers: UserViewType[] = await createTestUsers(1)
			const update: UpdateUserApiType = { nickname: '' }

			await request(app)
				.patch(`/api/users/${createdUsers[0]!.id}`)
				.send(update)
				.expect(400)

			await request(app)
				.get(`/api/users/${createdUsers[0]!.id}`)
				.expect(200, createdUsers[0])
		})

		it('don`t update user that not exist', async () => {
			const userData: UpdateUserApiType = { nickname: 'Negr' }

			await request(app)
				.put('/api/users/000000000000000000000000')
				.send(userData)
				.expect(404)
		})

		it('update user with correct data', async () => {
			const createdUsers: UserViewType[] = await createTestUsers(2)

			const update: UpdateUserApiType = {
				nickname: 'Negr',
				login: 'GoodBoy',
				email: 'supermail@mail.ru',
				avatarUrl: 'hbfdbfhjg',
			}

			await request(app)
				.patch(`/api/users/${createdUsers[0]!.id}`)
				.send(update)
				.expect(204)

			createdUsers[0].nickname = update.nickname!
			createdUsers[0].login = update.login!
			createdUsers[0].email = update.email!
			createdUsers[0].avatarUrl = update.avatarUrl!

			await request(app)
				.get(`/api/users/${createdUsers[0]!.id}`)
				.expect(200, createdUsers[0])

			await request(app)
				.get(`/api/users/${createdUsers[1]!.id}`)
				.expect(200, createdUsers[1])
		})
	})

	describe('delete user', () => {
		it('don`t delete user that not exist', async () => {
			await request(app)
				.delete('/api/users/000000000000000000000000')
				.expect(404)
		})

		it('delete both users', async () => {
			const createdUsers: UserViewType[] = await createTestUsers(3)

			await request(app).delete(`/api/users/${createdUsers[0].id}`).expect(204)
			await request(app).get(`/api/users/${createdUsers[0].id}`).expect(404)

			await request(app).delete(`/api/users/${createdUsers[2].id}`).expect(204)
			await request(app).get(`/api/users/${createdUsers[2].id}`).expect(404)

			await request(app)
				.get('/api/users?page=1&pageSize=4')
				.expect([createdUsers[1]])
		})
	})
})
