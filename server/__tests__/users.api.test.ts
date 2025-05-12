import { app } from '../app'
import { client, usersCollection } from '../repositories/db'
import request from 'supertest'

const createTestUsers = async () => {
	const userData1 = {
		login: 'Andrey',
		email: 'email1@mail.ru',
		nickname: 'Great Conqueror',
		password: '123456Xx',
	}
	const createdUser1 = (
		await request(app).post('/api/users').send(userData1).expect(201)
	).body
	expect(createdUser1).toMatchObject({
		id: expect.any(String),
		email: userData1.email,
		nickname: userData1.nickname,
	})

	const userData2 = {
		login: 'Kirill',
		email: 'email2@mail.ru',
		nickname: 'Great Sailor',
		password: '234567Xx',
	}
	const createdUser2 = (
		await request(app).post('/api/users').send(userData2).expect(201)
	).body
	expect(createdUser2).toMatchObject({
		id: expect.any(String),
		email: userData2.email,
		nickname: userData2.nickname,
	})

	const userData3 = {
		login: 'Dima',
		email: 'email3@mail.ru',
		nickname: 'Great Warrior',
		password: '345678Xx',
	}
	const createdUser3 = (
		await request(app).post('/api/users').send(userData3).expect(201)
	).body
	expect(createdUser3).toMatchObject({
		id: expect.any(String),
		email: userData3.email,
		nickname: userData3.nickname,
	})

	return { createdUser1, createdUser2, createdUser3 }
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
			const createdUsers = await createTestUsers()
			await request(app)
				.get(
					`/api/users?nickname=${createdUsers.createdUser2?.nickname}&page=1&pageSize=4`
				)
				.expect(200, [createdUsers.createdUser2])
		})

		it('return two users with pageSize equal 2 and page equal 1', async () => {
			const createdUsers = await createTestUsers()

			await request(app)
				.get(`/api/users?page=1&pageSize=2`)
				.expect([createdUsers.createdUser1, createdUsers.createdUser2])
		})

		it('return one users with pageSize equal 2 and page equal 2', async () => {
			const createdUsers = await createTestUsers()

			await request(app)
				.get(`/api/users?page=2&pageSize=2`)
				.expect([createdUsers.createdUser3])
		})
	})

	describe('post users', () => {
		it('create users with correct data', async () => {
			const createdUsers = await createTestUsers()

			await request(app)
				.get('/api/users?page=1&pageSize=4')
				.expect(200, [
					createdUsers.createdUser1,
					createdUsers.createdUser2,
					createdUsers.createdUser3,
				])
		})

		it('don`t create user with empty data', async () => {
			const userData = { login: '', email: '', password: '', nickname: '' }
			await request(app).post('/api/users').send(userData).expect(400)
			await request(app).get('/api/users?page=1&pageSize=4').expect(200, [])
		})

		it('don`t create user with invalid email', async () => {
			const userData = {
				login: 'negr',
				email: 'invalidEmail',
				password: '123456Xx',
				nickname: 'Dovarian',
			}
			await request(app).post('/api/users').send(userData).expect(400)
			await request(app).get('/api/users?page=1&pageSize=4').expect(200, [])
		})

		it('don`t create user with invalid password', async () => {
			const userData = {
				login: 'negr',
				email: 'validEmail@mail.ru',
				password: '1234',
				nickname: 'Dovarian',
			}
			await request(app).post('/api/users').send(userData).expect(400)
			await request(app).get('/api/users?page=1&pageSize=4').expect(200, [])
		})
	})
})
