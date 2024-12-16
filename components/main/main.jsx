import { Debt } from "./ui/debt";
import { Filter } from "./ui/filter";
import { useDebts } from "../../js/hooks/use-debts";
import { displayModal } from "../../js/handles/display-modal";
import { CreateUserDebtModal } from "../modals/create-userDebt-modal/create-userDebt-modal";

export function Main() {
    const { debtsList, addDebt, delDebt, replaceDebt, delDebtsList, addDebtsList, sortDebtsList } = useDebts();
    const { showModal } = displayModal();
    return (
        <div className="w-2/4 flex flex-col gap-14">
            <div>
                <Filter />
            </div>
            <div className="flex flex-col gap-6">
                {debtsList.map((debt, i) => {
                    return (
                        <>
                            <Debt
                                debt={debt}
                                key={i}
                                delDebt={delDebt}
                                id={i}
                                replaceDebt={replaceDebt}
                                delDebtsList={delDebtsList}
                                addDebtsList={addDebtsList}
                                sortDebtsList={sortDebtsList}
                            />
                        </>
                    );
                })}
                <span
                    className="select-none cursor-pointer font-bold text-8xl text-slate-300 hover:text-slate-400 transition mx-auto"
                    onClick={() => showModal(document.querySelector("#create-debt-modal"))}
                >
                    +
                </span>
            </div>
            <CreateUserDebtModal addDebt={addDebt} />
        </div>
    );
}
