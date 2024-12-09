import clsx from "clsx";

export function Currency({ className, ...props }) {
    return (
        <div
            className={clsx("shadow rounded-full size-8 flex items-center justify-center cursor-pointer", className)}
            {...props}
        >
            ₽
        </div>
    );
}
