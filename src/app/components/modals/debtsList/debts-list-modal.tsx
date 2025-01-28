import { useEffect } from "react";
import { DebtClass } from "../../../../lib/debt-class";
import { Item } from "./ui/item";
import { compareObjects } from "../../../../helpers/helpers";
import { DebtsClass } from "../../../../lib/debts-class";

export function DebtsListModal({ debtClass, debtsClass }: { debtClass: DebtClass; debtsClass: DebtsClass }) {
    const closeModal = (e: MouseEvent) => {
        if (
            !(e.target as HTMLElement)?.closest(`#debtsList-btn-${debtClass.index}`) &&
            !(e.target as HTMLElement)?.closest(".debtListItem") &&
            !(e.target as HTMLElement)?.closest(".debtsListInput")
        ) {
            debtClass.closeDebtsList();
        }
    };

    if (
        !compareObjects(
            debtClass.sortDebtsList().find((item) => item.id == debtClass.index)!.debtsList,
            debtClass.debt.debtsList
        )
    ) {
        debtClass.setDebts(debtClass.sortDebtsList());
    }

    useEffect(() => {
        document.addEventListener("click", closeModal);

        return () => {
            document.removeEventListener("click", closeModal);
        };
    });

    return (
        <div
            className="bg-white shadow w-[150%] left-[-25%] top-[-1px] min-h-full absolute flex flex-col z-50 hidden"
            id={`debtsList-${debtClass.index}`}
        >
            {debtClass.debt.debtsList.map((item, i) => (
                <Item
                    basicEdit={item.defaultEdit}
                    i={debtClass.debt.debtsList[i].id!}
                    debtClass={debtClass}
                    key={i}
                    debtsClass={debtsClass}
                />
            ))}
            <div
                className="py-2 px-4 border flex justify-center items-center
            hover:bg-slate-50 transition font-bold text-5xl text-slate-400"
                onClick={() => {
                    debtClass.addDebtsListItem();
                }}
            >
                +
            </div>
        </div>
    );
}
