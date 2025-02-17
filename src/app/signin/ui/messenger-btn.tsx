import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function MessengerButton({
    messenger,
    children,
    className,
}: {
    messenger: string;
    children: React.ReactNode;
    className?: string;
}) {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    console.log(children);

    return (
        <button
            onClick={() => signIn(messenger.toLowerCase(), { callbackUrl })}
            className={clsx("px-6 py-4 bg-slate-100 shadow rounded text-lg transition", className)}
        >
            {children}
        </button>
    );
}
