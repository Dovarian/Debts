import { useState } from "react";
import { debts } from "../constants/debts";

export function useDebts() {
    const [debtsList, setDebts] = useState(debts);

    const addDebt = (debt) => {
        setDebts((lastDebts) => [...lastDebts, debt]);
    };

    const delDebt = (id) => {
        setDebts((lastDebts) => lastDebts.filter((_, i) => i != id));
    };

    return { debtsList, delDebt, addDebt };
}
