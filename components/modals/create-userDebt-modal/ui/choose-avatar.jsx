import Image from "next/image";
import { useState } from "react";

export function ChooseAvatar({ avatar, ...props }) {
    const [image, setImage] = useState(avatar);
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Image src={image} alt="avatar" className="rounded-full h-20 w-20" height={80} width={80} />
            <label htmlFor="file_input" className="bg-slate-100 px-12 py-2 shadow hover:bg-slate-200 transition">
                Выбрать
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                            setImage(URL.createObjectURL(event.target.files[0]));
                        }
                    }}
                    id="file_input"
                    className="hidden"
                    {...props}
                />
            </label>
        </div>
    );
}
