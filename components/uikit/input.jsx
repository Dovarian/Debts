import clsx from "clsx";
import { StarIcon } from "../../icons/star-icon";

export function Input({ required, className, placeholder, styleInput, styleDiv, ...props }) {
    return (
        <div className="relative overflow-x-auto" style={styleDiv}>
            <input
                {...props}
                placeholder={placeholder}
                className={clsx(
                    "outline-none bg-slate-50 shadow p-2 transition focus:bg-slate-100 focus:shadow-sm inline",
                    className
                )}
                style={styleInput}
            />
            <StarIcon className={clsx(required ? "absolute top-2 right-2" : "hidden")} />
        </div>
    );
}
