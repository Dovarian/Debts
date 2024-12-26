import clsx from "clsx";
import { User } from "../../../../common/user/user";
import { VertLine } from "../../../../common/vert-line";
import { DebtClass } from "../../../../../../lib/debt-class";
import { DebtsListModal } from "../../../../modals/debtsList/debts-list-modal";
import { DebtsClass } from "../../../../../../lib/debts-class";

export function Debt({ debtClass, debtsClass }: { debtClass: DebtClass; debtsClass: DebtsClass }) {
    return (
        <div className="bg-white shadow py-4 px-10 text-2xl flex items-center justify-between group/debt">
            <User src={debtClass.debt.avatar} userName={debtClass.debt.name} debtClass={debtClass} variability={true} />
            <VertLine className="h-8" />
            <div className={clsx("font-medium", debtClass.calcAmount() < 0 ? "text-red-600" : "text-green-600")}>
                {debtClass.calcAmount()}₽
            </div>
            <VertLine className="h-8" />
            <div
                className="border py-2 px-4 cursor-pointer select-none relative"
                id={`debtsList-btn-${debtClass.index}`}
            >
                <div onClick={() => debtClass.openDebtsList()}>
                    <span
                        className={clsx(
                            "font-medium",
                            debtClass.debt.debtsList[0].debt < 0 ? "text-red-600" : "text-green-600"
                        )}
                    >
                        {debtClass.debt.debtsList[0].debt}₽
                    </span>{" "}
                    до {debtClass.debt.debtsList[0].date}
                </div>
                <DebtsListModal debtClass={debtClass} debtsClass={debtsClass} />
            </div>
            <div
                className="text-4xl font-bold text-red-600 select-none cursor-pointer opacity-50 group-hover/debt:opacity-100 transition"
                onClick={() => debtClass.delete()}
            >
                X
            </div>
        </div>
    );
}
