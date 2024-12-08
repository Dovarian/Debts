export function displayModal() {
    const hideModal = (modal) => {
        modal.close();
    };

    const showModal = (modal) => {
        modal.showModal();
    };

    return { hideModal, showModal };
}
