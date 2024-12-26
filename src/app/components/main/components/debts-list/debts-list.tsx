"use client";

import { DebtsClass } from "../../../../../lib/debts-class";
import { DebtClass } from "../../../../../lib/debt-class";
import { Debt } from "./ui/debt";
import { CreateDebtModal } from "../../../modals/createDebt/createDebt-modal";
import { DisplayModalClass } from "../../../../../lib/display-modal";
import { useRef, useState } from "react";
import { DebtsInterface } from "../../../../../interfaces/interfaces";
import { debtsConstant } from "../../../../../constants/debts";

export function DebtsList() {
    const [debts, setDebts] = useState<DebtsInterface[]>(debtsConstant);
    const debtsClass = new DebtsClass(debts, setDebts);
    const modal = useRef<HTMLDialogElement | string>("");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    const displayCreateDebtClass = new DisplayModalClass(modal);

    return (
        <section className="flex flex-col gap-6 mt-20">
            {debtsClass.debts.map((_, i) => {
                const debtClass = new DebtClass(debts, setDebts, i);
                return <Debt key={i} debtClass={debtClass} />;
            })}
            <span
                className="select-none cursor-pointer font-bold text-8xl text-[--disabled-text] hover:text-[--h-disabled-text] transition mx-auto"
                onClick={() => {
                    displayCreateDebtClass.openModal();
                }}
            >
                +
            </span>
            <CreateDebtModal ref={modal} displayCreateDebtClass={displayCreateDebtClass} debtsClass={debtsClass} />
        </section>
    );
}
