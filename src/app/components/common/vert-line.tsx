import clsx from "clsx";

export function VertLine({ className }: { className: string }) {
    return <div className={clsx("w-px bg-slate-500", className)} />;
}
