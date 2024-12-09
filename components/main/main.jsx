import { Debt } from "./ui/debt";
import { Filter } from "./ui/filter";
import { useDebts } from "../../js/hooks/use-debts";
import { displayModal } from "../../js/handles/display-modal";
import { CreateDebtModal } from "../modals/create-debt-menu/create-debt-modal";
import { useEffect } from "react";

export function Main() {
    const { debtsList, addDebt, delDebt } = useDebts();
    const { showModal } = displayModal();

    useEffect(() => {
        console.log(debtsList);
    }, [debtsList]);

    return (
        <div className="w-2/4 flex flex-col gap-14">
            <div>
                <Filter />
            </div>
            <div className="flex flex-col gap-6 justify-center items-center">
                {debtsList.map((debt, i) => {
                    return (
                        <>
                            <Debt debt={debt} key={i} delDebt={delDebt} id={i} />
                        </>
                    );
                })}
                <span
                    className="select-none cursor-pointer font-bold text-8xl text-slate-300 hover:text-slate-400 transition"
                    onClick={() => showModal(document.querySelector("#create-debt-modal"))}
                >
                    +
                </span>
            </div>
            <CreateDebtModal addDebt={addDebt} />
        </div>
    );
}
