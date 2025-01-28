import imageCompression from "browser-image-compression";

export const getAdaptiveSize = (e: React.ChangeEvent<HTMLInputElement>, fontSize: number, value: string) => {
    const widthValue = (e.target.value.length + 0.35) * fontSize;
    const widthPlaceholder = (value.length + 0.35) * fontSize;

    e.target!.style.width = widthValue < widthPlaceholder ? widthPlaceholder + "px" : widthValue + "px";
};

export const convertDate = (date: string) => {
    if (date.includes("-")) {
        return date.split("-").reverse().join(".");
    } else {
        return date.split(".").reverse().join("-");
    }
};

export const compareObjects = (a: object, b: object) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

// export const encodeImageFileAsURL = (file: File, setState: React.Dispatch<React.SetStateAction<string>>) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = function () {
//         setState(reader.result as string);
//     };
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encodeImageFileAsURL = (file: File, onLoadFunc: (reader: FileReader) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => onLoadFunc(reader);
};

export const getCompressImage = async (image: File) => {
    try {
        return await imageCompression(image, {
            maxSizeMB: 0.05,
            maxWidthOrHeight: 80,
            useWebWorker: true,
        });
    } catch (err) {
        console.error("Ошибка при обработке изображения:", err);
        throw err;
    }
};
