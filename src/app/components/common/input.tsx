import clsx from "clsx";
import starIcon from "../../../../public/icons/star-icon.svg";
import Image from "next/image";

export function Input({
    required,
    className,
    styleInput,
    styleDiv,
    onKeyUp,
    onChange,
    ...props
}: {
    required: boolean;
    className?: string;
    placeholder?: string;
    styleInput?: object;
    styleDiv?: object;
    type?: string;
    name?: string;
    id?: string;
    defaultValue?: string;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
    const requiredProp = required ? { required: true } : {};

    return (
        <div className="relative overflow-x-auto" style={styleDiv}>
            <input
                {...props}
                className={clsx(
                    "outline-none bg-slate-50 shadow p-2 transition focus:bg-slate-100 focus:shadow-sm inline",
                    className
                )}
                style={styleInput}
                onKeyUp={onKeyUp}
                onChange={onChange}
                {...requiredProp}
            />
            <Image className={clsx(required ? "absolute top-2 right-2" : "hidden")} src={starIcon} alt="star" />
        </div>
    );
}
