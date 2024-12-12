import { User } from "./../../uikit/user";
import { VertLine } from "../../uikit/vert-line";
import { useState } from "react";

export function Debt({ debt, delDebt, id, replaceDebt }) {
    const [edit, setEdit] = useState({
        user: false,
        total: false,
    });

    return (
        <div className="bg-white shadow py-4 px-10 text-2xl flex items-center justify-between group/debt">
            <User
                src={debt.avatar}
                userName={debt.name}
                variability={true}
                onClickName={() => setEdit((prev) => ({ ...prev, user: !prev.user }))}
                edit={edit}
                id={id}
                replaceDebt={replaceDebt}
            />
            <VertLine className="h-8" />
            <div className="font-medium text-red-600" onClick={() => setEdit({ ...edit, total: true })}>
                {debt.total}₽
            </div>
            <VertLine className="h-8" />
            <div className="border py-2 px-4 cursor-pointer select-none">
                <span className="font-medium text-green-600">{debt.debtsList[0].debt}₽</span> до{" "}
                {debt.debtsList[0].date}
            </div>
            <div
                className="text-4xl font-bold text-red-600 select-none cursor-pointer opacity-50 group-hover/debt:opacity-100 transition"
                onClick={() => delDebt(id)}
            >
                X
            </div>
        </div>
    );
}
