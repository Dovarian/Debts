const transformDataFromRegistrationForm = (form: HTMLFormElement) => {
	const formData = new FormData(form)

	return {
		login: formData.get('login'),
		email: formData.get('email'),
		nickname: formData.get('nickname'),
		password: formData.get('password'),
	}
}

const handleRegistrationSubmit = async (e: Event) => {
	e.preventDefault()

	const user = transformDataFromRegistrationForm(e.target as HTMLFormElement)

	const createdUser = await axios.post('/api/users/', user)

	await axios.post(`/api/email/account-confirmation/${createdUser.data.id}`)

	window.location.href = `/account-confirmation?userId=${createdUser.data.id}`
}

document
	.querySelector('#create-user-form')
	?.addEventListener('submit', handleRegistrationSubmit)
