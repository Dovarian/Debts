import clsx from "clsx";
import { Name } from "./ui/name";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Avatar } from "./ui/avatar";
import { DebtClass } from "../../../../lib/debt-class";

export function User({
    src,
    userName,
    debtClass,
    variability = false,
}: {
    src: StaticImport | string;
    userName: string;
    debtClass?: DebtClass;
    variability: boolean;
}) {
    return (
        <div className="text-2xl flex items-center gap-3">
            <div className={clsx("group relative w-10 h-10")}>
                <Avatar src={src} variability={variability} debtClass={debtClass} />
            </div>
            <Name name={userName} variability={variability} debtClass={debtClass} />
        </div>
    );
}
