import clsx from "clsx";

export function Currency({ className }: { className: string }) {
    return (
        <div className={clsx("shadow rounded-full size-8 flex items-center justify-center select-none", className)}>
            ₽
        </div>
    );
}
