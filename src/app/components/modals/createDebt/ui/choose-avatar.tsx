import Image from "next/image";
import { useState } from "react";
import { encodeImageFileAsURL, getCompressImage } from "../../../../../helpers/helpers";

export function ChooseAvatar({ avatar, ...props }: { avatar: string; name: string }) {
    const [image, setImage] = useState<string>(avatar);
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Image src={image} alt="avatar" className="rounded-full h-20 w-20" height={80} width={80} />
            <label htmlFor="file_input" className="bg-slate-100 px-12 py-2 shadow hover:bg-slate-200 transition">
                Выбрать
                <input
                    data-url={image}
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                        if (event.target.files && event.target.files[0]) {
                            encodeImageFileAsURL(await getCompressImage(event.target.files[0]), (reader) => {
                                setImage(reader.result as string);
                            });
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
