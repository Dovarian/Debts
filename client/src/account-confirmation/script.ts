const transformDataFromAccountConfirmationForm = (form: HTMLFormElement) => {
	const formData = new FormData(form)

	return formData.get('code')
}

const handleAccountConfirmationSubmit = async (e: Event) => {
	const code = transformDataFromAccountConfirmationForm(
		e.target as HTMLFormElement
	)

	await axios.patch(`/api/auth/confirm-account/${code}`)

	window.location.href = '/login'
}

document
	.querySelector('#account-confirmation-form')
	?.addEventListener('submit', handleAccountConfirmationSubmit)

const handleResendClick = async (e: Event) => {
	;(e.target as HTMLButtonElement).disabled = true
	startTimer(e.target as HTMLButtonElement)
	updateTimer(60)

	const params = new URLSearchParams(window.location.search)

	await axios.post(`/api/email/account-confirmation/${params.get('userId')}`)
}

const updateTimer = (seconds: number) => {
	const timer = document.querySelector('#account-confirmation-form__timer')

	timer!.textContent = String(seconds)

	if (seconds == 0) timer!.textContent = ''
}

let intervalId: any = null

const startTimer = (button: HTMLButtonElement) => {
	if (intervalId !== null) return
	let totalSeconds = 60

	intervalId = setInterval(() => {
		totalSeconds--
		updateTimer(totalSeconds)

		if (totalSeconds <= 0) {
			clearInterval(intervalId)
			intervalId = null
			button.disabled = false
		}
	}, 1000)
}

document
	.querySelector('#account-confirmation-form__resend-btn')
	?.addEventListener('click', handleResendClick)
