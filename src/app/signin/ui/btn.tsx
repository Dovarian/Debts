export function Button({
    children,
    onClick,
    ...props
}: {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    type?: "button" | "submit" | "reset" | undefined;
}) {
    return (
        <button
            className="py-2 px-12 bg-slate-100 shadow mx-auto text-xl hover:bg-slate-200 max-2xl:px-4"
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
