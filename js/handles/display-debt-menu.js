export function displayDebtMenu() {
    const hideDebtMenu = () => {
        const modals = document.querySelector("#modals");
        const createDebtMenu = document.querySelector("#createDebt");
        modals.classList.add("hidden");
        createDebtMenu.classList.add("hidden");
    };

    const showDebtMenu = () => {
        const modals = document.querySelector("#modals");
        const createDebtMenu = document.querySelector("#createDebt");
        modals.classList.remove("hidden");
        createDebtMenu.classList.remove("hidden");
    };

    return { hideDebtMenu, showDebtMenu };
}
