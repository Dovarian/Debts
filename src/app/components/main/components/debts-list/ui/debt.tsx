import clsx from "clsx";
import { User } from "../../../../common/user/user";
import { VertLine } from "../../../../common/vert-line";
import { DebtClass } from "../../../../../../lib/debt-class";
import { DebtsListModal } from "../../../../modals/debtsList/debts-list-modal";
import { DebtsClass } from "../../../../../../lib/debts-class";
import defaultAvatar from "../../../../../../../public/images/default-avatar.png";

export function Debt({ debtClass, debtsClass }: { debtClass: DebtClass; debtsClass: DebtsClass }) {
    return (
        <div className="bg-white shadow py-4 px-10 text-2xl flex items-center gap-[2.5vw] group/debt overflow-auto max-md:flex-col max-md:gap-5 max-md:items-start">
            <div className="flex items-center w-1/2 gap-[2.5vw] max-md:justify-between max-md:w-full">
                <User
                    src={!debtClass.debt.avatar ? defaultAvatar.src : debtClass.debt.avatar}
                    userName={debtClass.debt.name}
                    debtClass={debtClass}
                    variability={true}
                />
                <VertLine className="h-8 max-md:hidden" />
                <div className={clsx("font-medium", debtClass.calcAmount() < 0 ? "text-red-600" : "text-green-600")}>
                    {debtClass.calcAmount()}₽
                </div>
            </div>
            <VertLine className="h-8 max-md:hidden" />
            <div
                className="border py-2 px-4 cursor-pointer select-none relative max-md:mx-auto"
                id={`debtsList-btn-${debtClass.index}`}
            >
                <div onClick={() => debtClass.openDebtsList()}>
                    <span
                        className={clsx(
                            "font-medium",
                            debtClass.sortDebtsList().find((item) => item.id == debtClass.index)!.debtsList[0].amount <
                                0
                                ? "text-red-600"
                                : "text-green-600"
                        )}
                    >
                        {debtClass.sortDebtsList().find((item) => item.id == debtClass.index)!.debtsList[0].amount}₽
                    </span>{" "}
                    до {debtClass.sortDebtsList().find((item) => item.id == debtClass.index)!.debtsList[0].date}
                </div>
                <DebtsListModal debtClass={debtClass} debtsClass={debtsClass} />
            </div>
            <div
                className="text-4xl font-bold text-red-600 select-none cursor-pointer opacity-50 group-hover/debt:opacity-100 transition max-md:mx-auto"
                onClick={() => {
                    debtClass.delete();
                }}
            >
                X
            </div>
        </div>
    );
}
