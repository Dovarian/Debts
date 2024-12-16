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

    const delDebtsList = (id, i, edit, setEdit) => {
        if (debtsList[id].debtsList.length > 1) {
            let newDebtsList = debtsList.slice();
            newDebtsList[id].debtsList.splice(i, 1);
            let newEdit = edit.slice();
            newEdit.splice(i, 1);
            setEdit(newEdit);
            setDebts(newDebtsList);
        }
    };

    const addDebtsList = (id) => {
        let newDebtsList = debtsList.slice();
        newDebtsList[id].debtsList.push({ debt: 0, date: "00.00.0000" });
        setDebts(newDebtsList);
    };

    const sortDebtsList = (id, currentDebtsList) => {
        currentDebtsList.sort(
            (a, b) => new Date(a.date.split(".").reverse().join("-")) - new Date(b.date.split(".").reverse().join("-"))
        );
        replaceDebt(id, "debtsList", currentDebtsList);
    };

    return { debtsList, addDebt, delDebt, replaceDebt, delDebtsList, addDebtsList, sortDebtsList };
}
