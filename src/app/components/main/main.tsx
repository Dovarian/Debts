"use client";

import { debtsConstant } from "../../../constants/debts";
import { DebtsInterface } from "../../../interfaces/interfaces";
import { DebtsClass } from "../../../lib/debts-class";
import { DebtsList } from "./components/debts-list/debts-list";
import { Filters } from "./components/filters/filters";
import { useState } from "react";

export function Main({}) {
    const [debts, setDebts] = useState<DebtsInterface[]>(debtsConstant);
    const debtsClass = new DebtsClass(debts, setDebts);

    return (
        <main className="mx-[20vw] mt-24">
            <Filters debtsClass={debtsClass} />
            <DebtsList debtsClass={debtsClass} setDebts={setDebts} debts={debts} />
        </main>
    );
}
