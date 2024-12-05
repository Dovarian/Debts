import { useState } from "react";
import { debts } from "../../constants/debts";

export function useDebts() {
    const [debtsList, setDebts] = useState(debts);
    const addDebt = (debt) => {
        setDebts((lastDebts) => [...lastDebts, debt]);
    };
    const delDebt = (id) => {
        console.log(id);

        setDebts((lastDebts) => lastDebts.filter((_, i) => i != id));
    };

    return { debtsList, addDebt, delDebt };
}
