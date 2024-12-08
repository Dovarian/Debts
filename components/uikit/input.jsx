import clsx from "clsx";
import { StarIcon } from "./icons/star-icon";

export function Input({ placeholder, required, type }) {
    return (
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                className="outline-none bg-slate-50 shadow p-2 transition focus:bg-slate-100 focus:shadow-sm"
            />
            <StarIcon className={clsx(required ? "absolute top-2 right-2" : "hidden")} />
        </div>
    );
}
