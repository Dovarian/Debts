const showMore = (e: Event, debtorAdditionalInfo: Element) => {
	;(e.target as HTMLImageElement).src = '/assets/icons/markdown-black.svg'
	debtorAdditionalInfo!.className = 'debtor__additional-info_open'
}

const hideMore = (e: Event, debtorAdditionalInfo: Element) => {
	;(e.target as HTMLImageElement).src = '/assets/icons/arrow-right-black.svg'
	debtorAdditionalInfo!.className = 'debtor__additional-info'
}

const moreController = (e: Event) => {
	const debtorAdditionalInfo = (e.target as HTMLElement).closest('.debtor')
		?.children[1]

	if (debtorAdditionalInfo?.classList.contains('debtor__additional-info')) {
		showMore(e, debtorAdditionalInfo)
	} else if (
		debtorAdditionalInfo?.classList.contains('debtor__additional-info_open')
	) {
		hideMore(e, debtorAdditionalInfo)
	}
}

document
	.querySelectorAll('.more-arrow')
	.forEach(item => item.addEventListener('click', moreController))

const showAddDebtorModal = () => {
	;(document.querySelector(
		'#add-debtor-modal'
	) as HTMLDialogElement)!.showModal()
}

const hideAddDebtorModal = () => {
	;(document.querySelector('#add-debtor-modal') as HTMLDialogElement)!.close()
}

const handleSubmitClick = () => {
	hideAddDebtorModal()
}

document
	.querySelector('#main__debtor-add-btn')
	?.addEventListener('click', showAddDebtorModal)

document
	.querySelector('#add-debtor-form__cancel-btn')
	?.addEventListener('click', hideAddDebtorModal)

document
	.querySelector('#add-debtor-form__submit-btn')
	?.addEventListener('click', handleSubmitClick)

const handleLogout = async (e: Event) => {
	await axios.post('/api/auth/logout')
	window.location.href = '/login'
}

document
	.querySelector('#header__logout-btn')
	?.addEventListener('click', handleLogout)
