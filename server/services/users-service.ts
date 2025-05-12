import { WithId } from 'mongodb'
import { usersRepository } from '../repositories/users-repository'
import { UserDBType, UserViewType } from '../types/users-types'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { v4 as uuidv4 } from 'uuid'
import { add } from 'date-fns'
import { hash } from 'bcrypt'

const mapUserDBTypeToUserViewType = (
	user: WithId<UserDBType> | null
): UserViewType | null => {
	if (
		!!user?._id.toHexString() ||
		!!user?.userData.avatarUrl ||
		!!user?.userData.email ||
		!!user?.userData.nickname ||
		!!user?.userData.createdAt
	) {
		return {
			id: user._id.toHexString(),
			avatarUrl: user.userData.avatarUrl,
			login: user.userData.login,
			email: user.userData.email,
			nickname: user.userData.nickname,
			createdAt: user.userData.createdAt,
		}
	} else {
		return null
	}
}

export const usersService = {
	async findUsers(
		page: number,
		pageSize: number,
		nickname?: string,
		login?: string
	) {
		return (
			await usersRepository.findUsers(page, pageSize, nickname, login)
		).map(mapUserDBTypeToUserViewType)
	},
	async findUser(id: string) {
		const user = mapUserDBTypeToUserViewType(await usersRepository.findUser(id))
		if (!user) throw new UserNotFoundError(id)
		return user
	},
	async findUserByLoginOrEmail(loginOrEmail: string) {
		const user = mapUserDBTypeToUserViewType(
			await usersRepository.findUser(loginOrEmail)
		)
		if (!user) throw new UserNotFoundError(loginOrEmail)
		return user
	},
	async addUser(
		login: string,
		email: string,
		password: string,
		nickname: string
	) {
		const user: UserDBType = {
			userData: {
				avatarUrl: '',
				email: email,
				login: login,
				passwordHash: await hash(password, 10),
				nickname: nickname,
				createdAt: new Date(),
			},
			emailConfirmation: {
				confirmationCode: uuidv4(),
				expirationDate: add(new Date(), {
					hours: 1,
				}),
				isConfirmed: false,
			},
		}

		return (await usersRepository.addUser(user)).toHexString()
	},
	async patchUser(
		id: string,
		login?: string,
		email?: string,
		nickname?: string,
		avatarUrl?: string,
		password?: string
	) {
		let passwordHash = ''
		if (!!password) passwordHash = await hash(password, 10)

		const res = await usersRepository.patchUser(
			id,
			login,
			email,
			nickname,
			avatarUrl,
			passwordHash
		)

		if (!res) throw new UserNotFoundError(id)

		return res
	},
	async deleteUser(id: string) {
		const res = await usersRepository.deleteUser(id)

		if (!res) throw new UserNotFoundError(id)

		return res
	},
}
