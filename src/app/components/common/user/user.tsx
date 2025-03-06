import clsx from "clsx";
import { Name } from "./ui/name";
import { Avatar } from "./ui/avatar";
import { DebtClass } from "../../../../lib/debt-class";

export function User({
    src,
    userName = "loading...",
    debtClass,
    variability = false,
    avatarClassName,
    type = "creditor",
    userID = null,
    className,
}: {
    src: string;
    userName: string;
    debtClass?: DebtClass;
    variability: boolean;
    avatarClassName?: string;
    type?: "user" | "creditor";
    userID?: number | null;
    className?: string;
}) {
    return (
        <div className={clsx("text-2xl flex items-center gap-3 max-md:text-xl", className)}>
            <div className={clsx("group relative w-10 h-10  cursor-pointer")}>
                <Avatar
                    src={src}
                    variability={variability}
                    debtClass={debtClass}
                    className={avatarClassName}
                    type={type}
                    userID={userID}
                />
            </div>
            <Name name={userName} variability={variability} debtClass={debtClass} type={type} userID={userID} />
        </div>
    );
}
