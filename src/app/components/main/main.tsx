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
                const debtsFetch = (
                    await fetch(
                        `${
                            typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
                        }/api/users/${userID}/transform`
                    )
                ).json();
                setDebts(await debtsFetch);
            }
        }
        fetchData();
    }, [userID]);

    return (
        <main className="mx-[20vw] mt-24 max-xl:mx-[5vw]">
            <Filters debtsClass={debtsClass} />
            <DebtsList debtsClass={debtsClass} setDebts={setDebts} debts={debts} />
        </main>
    );
}
