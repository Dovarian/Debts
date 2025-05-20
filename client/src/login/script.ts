const transformDataFromLoginForm = (form: HTMLFormElement) => {
	const formData = new FormData(form)

	return {
		loginOrEmail: formData.get('loginOrEmail'),
		password: formData.get('password'),
	}
}

const handleLoginSubmit = async (e: Event) => {
	e.preventDefault()

	const user = transformDataFromLoginForm(e.target as HTMLFormElement)

	await axios.post('/api/auth/login', user)
	window.location.href = '/'
}

document
	.querySelector('#login-form')
	?.addEventListener('submit', handleLoginSubmit)
