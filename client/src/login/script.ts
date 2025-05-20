declare const axios: any

const transformDataFromForm = (form: HTMLFormElement) => {
	const formData = new FormData(form)

	return {
		loginOrEmail: formData.get('loginOrEmail'),
		password: formData.get('password'),
	}
}

const handleSubmit = async (e: Event) => {
	e.preventDefault()

	const user = transformDataFromForm(e.target as HTMLFormElement)

	const res = await axios.post('http://localhost:3500/api/auth/login', user)
	console.log(res)

	return false
}

document.querySelector('#login-form')?.addEventListener('submit', handleSubmit)
