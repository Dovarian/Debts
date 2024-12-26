"use client";

import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import clsx from "clsx";
import { DebtClass } from "../../../../../lib/debt-class";
import editIcon2Src from "../../../../../../public/icons/edit-icon-2.svg";

export function Avatar({
    src,
    variability = false,
    debtClass,
}: {
    src: StaticImport | string;
    variability: boolean;
    debtClass?: DebtClass;
}) {
    const labelVariability = !variability ? { htmlFor: "htmlFor" } : "";

    return (
        <label {...labelVariability} className={clsx("group relative w-10 h-10", variability && "cursor-pointer")}>
            <Image src={src} alt="avatar" height={40} width={40} className="rounded-full h-10 w-10 resize-none" />
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
                onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                        debtClass?.replace("avatar", URL.createObjectURL(event.target.files[0]));
                    }
                }}
                className="hidden"
            />
        </label>
    );
}
