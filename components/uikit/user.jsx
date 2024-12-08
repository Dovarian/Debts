import Image from "next/image";
import { EditIcon_1 } from "./icons/edit_1-icon.jsx";
import { EditIcon_2 } from "./icons/edit_2-icon.jsx";
import clsx from "clsx";

export function User({ src, name, variability }) {
    return (
        <div className="text-2xl flex items-center gap-3">
            <div className={clsx("group relative", variability && "cursor-pointer")}>
                <Image src={src} alt="avatar" height={40} width={40} className="rounded-full h-10 w-10" />
                <EditIcon_2
                    className={clsx(
                        "opacity-0 absolute top-px left-px bg-slate-400 size-full p-[3px] rounded-full transition",
                        variability && "group-hover:opacity-70"
                    )}
                />
            </div>
            <span className={clsx("group flex items-center gap-1", variability && "cursor-pointer")}>
                {name}
                <EditIcon_1 className={clsx("opacity-0 transition", variability && "group-hover:opacity-100")} />
            </span>
        </div>
    );
}
