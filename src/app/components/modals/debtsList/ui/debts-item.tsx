import clsx from "clsx";
import editIcon1Svg from "../../../../../../public/icons/edit-icon-1.svg";
import Image from "next/image";
import { DebtClass } from "../../../../../lib/debt-class";

export function DebtsItem({
    className,
    debtClass,
    index,
    setEdit,
}: {
    className?: string;
    debtClass: DebtClass;
    index: number;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div
            className={clsx(
                "py-2 px-4 border flex justify-center items-center hover:bg-slate-50 transition relative group debtListItem",
                className
            )}
            onClick={(event) => {
                if (!(event.target as HTMLElement).closest(".close")) {
                    setEdit(true);
                }
            }}
        >
            <div className="absolute top-1/5 left-2 cursor-pointer transition p-2">
                <Image
                    src={editIcon1Svg}
                    alt="edit"
                    className="size-[22px] opacity-0 group-hover:opacity-100 transition"
                    height={22}
                    width={22}
                />
            </div>
            <span className="flex flex-wrap justify-center gap-x-[7px]">
                <div
                    className={clsx(
                        "font-medium whitespace-nowrap",
                        debtClass.debt.debtsList[index].debt < 0 ? "text-red-600" : "text-green-600"
                    )}
                >
                    {debtClass.debt.debtsList[index].debt}₽
                </div>{" "}
                <div className="whitespace-nowrap">до {debtClass.debt.debtsList[index].date}</div>
            </span>
            <div
                className="absolute top-1/5 right-2 text-red-600
                             select-none cursor-pointer opacity-50 transition hover:opacity-100 p-2 close"
                onClick={() => debtClass.delDebtsListItem(index)}
            >
                x
            </div>
        </div>
    );
}
