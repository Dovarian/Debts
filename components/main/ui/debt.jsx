import { User } from "./../../uikit/user";
import { VertLine } from "../../uikit/vert-line";
import { useEffect, useState } from "react";
import { DebtsMenu } from "../../modals";
import { displayDebtsMenu } from "../../../js/handles/display-debts-menu";
import clsx from "clsx";

export function Debt({ debt, delDebt, id, replaceDebt, delDebtsList, addDebtsList }) {
    const [edit, setEdit] = useState({
        user: false,
    });
    const [isClient, setIsClient] = useState(false);
    const { showMenu, hideMenu } = displayDebtsMenu();
    const total = debt.debtsList.reduce((acc, item) => (acc += Number(item.debt)), 0);

    useEffect(() => {
        setIsClient(true);
        window.addEventListener("click", (e) => {
            console.log(e.target.closest("#debtsList"));

            if (!e.target.closest("#debtsList") && !e.target.closest(".debtsMenu")) {
                hideMenu(document.querySelectorAll(".debtsMenu")[id]);
            }
        });
    }, [hideMenu, id]);

    if (!isClient) {
        return null;
    }

    if (typeof window === "object") {
        return (
            <div className="bg-white shadow py-4 px-10 text-2xl flex items-center justify-between group/debt">
                <User
                    src={debt.avatar}
                    userName={debt.name}
                    variability={true}
                    onClickName={() => setEdit((prev) => ({ ...prev, user: !prev.user }))}
                    edit={edit}
                    id={id}
                    replaceDebt={replaceDebt}
                />
                <VertLine className="h-8" />
                <div className={clsx("font-medium", total < 0 ? "text-red-600" : "text-green-600")}>{total}₽</div>
                <VertLine className="h-8" />
                <div
                    className="border py-2 px-4 cursor-pointer select-none relative"
                    onClick={() => showMenu(document.querySelectorAll(".debtsMenu")[id])}
                    id="debtsList"
                >
                    <span
                        className={clsx("font-medium", debt.debtsList[0].debt < 0 ? "text-red-600" : "text-green-600")}
                    >
                        {debt.debtsList[0].debt}₽
                    </span>{" "}
                    до {debt.debtsList[0].date}
                    <DebtsMenu
                        debtsList={debt.debtsList}
                        replaceDebt={replaceDebt}
                        id={id}
                        delDebtsList={delDebtsList}
                        addDebtsList={addDebtsList}
                    />
                </div>
                <div
                    className="text-4xl font-bold text-red-600 select-none cursor-pointer opacity-50 group-hover/debt:opacity-100 transition"
                    onClick={() => delDebt(id)}
                >
                    X
                </div>
            </div>
        );
    }
}
