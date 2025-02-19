import clsx from "clsx";
import starIcon from "../../../../public/icons/star-icon.svg";
import Image from "next/image";
import { useState } from "react";

export function Input({
    required,
    className,
    maxWidth = "auto",
    onKeyUp,
    onChange,
    ...props
}: {
    required: boolean;
    type: string;
    className?: string;
    placeholder?: string;
    maxWidth?: number | string;
    name?: string;
    id?: string;
    defaultValue?: string;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
    const requiredProp = required ? { required: true } : {};
    const [value, setValue] = useState<string | number>("");
    const [width, setWidth] = useState<number | string>("auto");

    return (
        <div className="relative overflow-x-hidden inline-block">
            <span className="opacity-0 fixed -top-96">{value + "0000"}</span>
            <input
                {...props}
                className={clsx(
                    "outline-none bg-slate-50 shadow p-2 transition focus:bg-slate-100 focus:shadow-sm",
                    className
                )}
                style={{ width: width, maxWidth: maxWidth }}
                onKeyUp={onKeyUp}
                onChange={onChange}
                {...requiredProp}
                value={value}
                onInput={(e) => {
                    setValue((e.target as HTMLInputElement).value);
                    setWidth(((e.target as HTMLInputElement).parentElement!.children[0] as HTMLElement).offsetWidth);
                }}
            />

            <Image className={clsx(required ? "absolute top-2 right-2" : "hidden")} src={starIcon} alt="star" />
        </div>
    );
}
