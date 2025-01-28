"use client";

import Image from "next/image";
import clsx from "clsx";
import { DebtClass } from "../../../../../lib/debt-class";
import editIcon2Src from "../../../../../../public/icons/edit-icon-2.svg";
import { useState } from "react";
import { encodeImageFileAsURL, getCompressImage } from "../../../../../helpers/helpers";

export function Avatar({
    src,
    variability = false,
    debtClass,
}: {
    src: string;
    variability: boolean;
    debtClass?: DebtClass;
}) {
    const [image, setImage] = useState<string>(src);
    const labelVariability = !variability ? { htmlFor: "htmlFor" } : "";

    return (
        <label {...labelVariability} className={clsx("group relative w-10 h-10", variability && "cursor-pointer")}>
            <Image src={image} alt="avatar" height={40} width={40} className="rounded-full h-10 w-10 resize-none" />
            <Image
                src={editIcon2Src}
                alt="edit"
                className={clsx(
                    "opacity-0 absolute top-px left-px bg-slate-400 size-full p-[3px] rounded-full transition",
                    variability && "group-hover:opacity-60"
                )}
            />
            <input
                type="file"
                accept="image/*"
                onChange={async (event) => {
                    if (event.target.files && event.target.files[0]) {
                        encodeImageFileAsURL(await getCompressImage(event.target.files[0]), async (reader) => {
                            const res = reader.result as string;
                            setImage(res);
                            debtClass?.replace("avatar", res);
                            await fetch(`http://localhost:3000/api/users/1?id=${debtClass?.index}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json;charset=utf-8",
                                },
                                body: JSON.stringify({
                                    avatar: res,
                                }),
                            });
                        });
                    }
                }}
                className="hidden"
            />
        </label>
    );
}
