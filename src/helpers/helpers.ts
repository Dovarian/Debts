export const getAdaptiveSize = (e: React.ChangeEvent<HTMLInputElement>, fontSize: number, value: string) => {
    const widthValue = (e.target.value.length + 0.35) * fontSize;
    const widthPlaceholder = (value.length + 0.35) * fontSize;
    console.log(widthValue, widthPlaceholder);

    e.target!.style.width = widthValue < widthPlaceholder ? widthPlaceholder + "px" : widthValue + "px";
};

export const convertDate = (date: string) => {
    if (date.includes("-")) {
        return date.split("-").reverse().join(".");
    } else {
        return date.split(".").reverse().join("-");
    }
};
