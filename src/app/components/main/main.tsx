"use client";

import { DebtsInterface } from "../../../interfaces/interfaces";
import { DebtsClass } from "../../../lib/debts-class";
import { DebtsList } from "./components/debts-list/debts-list";
import { Filters } from "./components/filters/filters";
import { useEffect, useState } from "react";

export function Main({}) {
    const [debts, setDebts] = useState<DebtsInterface[]>([]);
    const debtsClass = new DebtsClass(debts, setDebts);

    useEffect(() => {
        async function fetchData() {
            const debtsFetch = (await fetch("http://localhost:3000/api/users/1/transform")).json();
            setDebts(await debtsFetch);
        }
        fetchData();
    }, []);

    return (
        <main className="mx-[20vw] mt-24">
            <Filters debtsClass={debtsClass} />
            <DebtsList debtsClass={debtsClass} setDebts={setDebts} debts={debts} />
        </main>
    );
}
