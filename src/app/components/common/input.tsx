import clsx from "clsx";
import starIcon from "../../../../public/icons/star-icon.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Input({
    required,
    className,
    maxWidth = "auto",
    placeholder,
    adaptive = true,
    onKeyUp,
    onChange,
    ...props
}: {
    required: boolean;
    type: string;
    adaptive?: boolean;
    className?: string;
    placeholder?: string;
    maxWidth?: number | string;
    name?: string;
    id?: string;
    defaultValue?: string;
    maxLength?: number;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
    const requiredProp = required ? { required: true } : {};
    const [value, setValue] = useState<string | number>("");
    const ref = useRef<HTMLElement | null>(null);
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        setWidth((ref.current as HTMLElement).offsetWidth);
    }, []);

    return (
        <div
            className="relative overflow-x-hidden"
            style={
                adaptive
                    ? {
                          width: width > 0 ? width : "auto",
                          minWidth: value == "" ? "100%" : "auto",
                          maxWidth: maxWidth,
                      }
                    : {}
            }
        >
            <span className="opacity-0 fixed -top-96" ref={ref}>
                {value + "00000"}
            </span>

            <input
                {...props}
                placeholder={placeholder}
                className={clsx(
                    "outline-none bg-slate-50 shadow p-2 transition focus:bg-slate-100 focus:shadow-sm",
                    className
                )}
                style={
                    adaptive
                        ? {
                              width: width > 0 ? width : "auto",
                              maxWidth: maxWidth,
                              minWidth: value == "" ? "100%" : "auto",
                          }
                        : {}
                }
                onKeyUp={onKeyUp}
                onChange={onChange}
                {...requiredProp}
                value={value}
                onInput={(e) => {
                    setValue((e.target as HTMLInputElement).value);
                    setWidth(((e.target as HTMLInputElement).parentElement!.children[0] as HTMLElement).offsetWidth);
                }}
                onInputCapture={(e) => {
                    setValue((e.target as HTMLInputElement).value);
                    setWidth(((e.target as HTMLInputElement).parentElement!.children[0] as HTMLElement).offsetWidth);
                }}
            />

            <Image className={clsx(required ? "absolute top-2 right-2" : "hidden")} src={starIcon} alt="star" />
        </div>
    );
}
