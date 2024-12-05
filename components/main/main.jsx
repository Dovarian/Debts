import { Debt } from "./ui/debt";
import { Filter } from "./ui/filter";
import { useDebts } from "./use-debts";
import avatarSrc from "../../imgs/avatar.png";

export function Main() {
    const { debtsList, addDebt, delDebt } = useDebts();

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
                    onClick={() =>
                        addDebt({
                            avatar: avatarSrc,
                            name: "Дима Болтенков",
                            total: -10000,
                            debtsList: [{ debt: 1000, date: "31.12.2024" }],
                            id: 0,
                        })
                    }
                >
                    +
                </span>
            </div>
        </div>
    );
}
