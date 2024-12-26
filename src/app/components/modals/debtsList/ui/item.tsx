import { useState } from "react";
import { DebtsItem } from "./debts-item";
import { DebtsInputItem } from "./debts-item-input";
import { DebtClass } from "../../../../../lib/debt-class";
import { DebtsClass } from "../../../../../lib/debts-class";

export function Item({
    basicEdit,
    i,
    debtClass,
    debtsClass,
}: {
    basicEdit: boolean;
    i: number;
    debtClass: DebtClass;
    debtsClass: DebtsClass;
}) {
    const [edit, setEdit] = useState<boolean>(basicEdit);
    return (
        <div>
            {edit ? (
                <>
                    <DebtsInputItem debtClass={debtClass} i={i} setEdit={setEdit} debtsClass={debtsClass} />
                    <DebtsItem index={i} debtClass={debtClass} setEdit={setEdit} className="hidden" />
                </>
            ) : (
                <>
                    <DebtsItem index={i} debtClass={debtClass} setEdit={setEdit} />
                    <DebtsInputItem
                        debtClass={debtClass}
                        i={i}
                        setEdit={setEdit}
                        debtsClass={debtsClass}
                        className="hidden"
                    />
                </>
            )}
        </div>
    );
}
