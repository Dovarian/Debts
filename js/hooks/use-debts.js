import { useState } from "react";
import { debts } from "../constants/debts";

export function useDebts() {
    const [debtsList, setDebts] = useState(debts);

    const addDebt = (debt) => {
        setDebts((lastDebt) => [...lastDebt, debt]);
    };

    const delDebt = (id) => {
        setDebts((lastDebts) => [...lastDebts.filter((_, i) => i != id)]);
    };

    const replaceDebt = (id, key, value) => {
        let newDebtsList = debtsList.slice();
        newDebtsList[id][key] = value;
        setDebts(newDebtsList);
    };

    const delDebtsList = (id, i) => {
        if (debtsList[id].debtsList.length > 1) {
            let newDebtsList = debtsList.slice();
            newDebtsList[id].debtsList.splice(i, 1);
            setDebts(newDebtsList);
        }
    };

    const addDebtsList = (id) => {
        let newDebtsList = debtsList.slice();
        newDebtsList[id].debtsList.push({ debt: 0, date: "00.00.0000" });
        setDebts(newDebtsList);
    };

    return { debtsList, addDebt, delDebt, replaceDebt, delDebtsList, addDebtsList };
}
