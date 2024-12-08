import { Debt } from "./ui/debt";
import { Filter } from "./ui/filter";
import { useDebts } from "../../js/hooks/use-debts";
import { displayDebtMenu } from "../../js/handles/display-debt-menu";

export function Main() {
    const { debtsList, delDebt } = useDebts();
    const { showDebtMenu } = displayDebtMenu();

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
                    onClick={() => showDebtMenu()}
                >
                    +
                </span>
            </div>
        </div>
    );
}
