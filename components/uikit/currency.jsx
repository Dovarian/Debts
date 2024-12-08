import clsx from "clsx";

export function Currency({ className }) {
    return (
        <div className={clsx("shadow rounded-full size-8 flex items-center justify-center cursor-pointer", className)}>
            ₽
        </div>
    );
}
