"use client";

import { DebtsInterface } from "../../../interfaces/interfaces";
import { DebtsClass } from "../../../lib/debts-class";
import { DebtsList } from "./components/debts-list/debts-list";
import { Filters } from "./components/filters/filters";
import { useEffect, useState } from "react";

export function Main({ userID }: { userID: number | null }) {
    const [debts, setDebts] = useState<DebtsInterface[]>([]);
    const debtsClass = new DebtsClass(debts, setDebts, userID);

    useEffect(() => {
        async function fetchData() {
            if (userID != null) {
                const debtsFetch = (await fetch(`${process.env.DOMAIN}/api/users/${userID}/transform`)).json();
                setDebts(await debtsFetch);
            }
        }
        fetchData();
    }, [userID]);

    return (
        <main className="mx-[20vw] mt-24">
            <Filters debtsClass={debtsClass} />
            <DebtsList debtsClass={debtsClass} setDebts={setDebts} debts={debts} />
        </main>
    );
}
