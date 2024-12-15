export function displayDebtsMenu() {
    const hideMenu = (el) => {
        el?.classList.add("hidden");
    };

    const showMenu = (el) => {
        el?.classList.remove("hidden");
    };

    return { hideMenu, showMenu };
}
