import { useState } from "react";
import { DebtsItem } from "./debts-item";
import { DebtsInputItem } from "./debts-item-input";
import { DebtClass } from "../../../../../lib/debt-class";

export function Item({ basicEdit, i, debtClass }: { basicEdit: boolean; i: number; debtClass: DebtClass }) {
    const [edit, setEdit] = useState<boolean>(basicEdit);
    return (
        <div>
            {edit ? (
                <>
                    <DebtsInputItem debtClass={debtClass} i={i} setEdit={setEdit} />
                    <DebtsItem index={i} debtClass={debtClass} setEdit={setEdit} className="hidden" />
                </>
            ) : (
                <>
                    <DebtsItem index={i} debtClass={debtClass} setEdit={setEdit} />
                    <DebtsInputItem debtClass={debtClass} i={i} setEdit={setEdit} className="hidden" />
                </>
            )}
        </div>
    );
}
