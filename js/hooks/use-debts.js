import { useState } from "react";
import { debts } from "../constants/debts";

export function useDebts() {
    const [debtsList, setDebts] = useState(debts);

    const addDebt = (debt) => {
        setDebts((lastDebt) => [...lastDebt, debt]);
    };

    const delDebt = (id) => {
        console.log(id);

        setDebts((lastDebts) => [...lastDebts.filter((_, i) => i != id)]);
    };

    const replaceDebt = (id, key, value) => {
        let newDebtsList = debtsList.slice();
        newDebtsList[id][key] = value;
        setDebts(newDebtsList);
    };

    return { debtsList, addDebt, delDebt, replaceDebt };
}
