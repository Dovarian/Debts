import { User } from "./../../uikit/user";
import { VertLine } from "../../uikit/vert-line";

export function Debt({ debt, delDebt, id }) {
    return (
        <div className="bg-white shadow p-8 w-full h-14 text-2xl flex items-center gap-4 group/debt">
            <User src={debt.avatar} name="Дмитрий Болтенков" variability={true} />
            <VertLine height="8" />
            <div className="font-medium text-red-600">{debt.total}₽</div>
            <VertLine height="8" />
            <div className="border p-1 cursor-pointer select-none">
                <span className="font-medium text-green-600">{debt.debtsList[0].debt}₽</span> до{" "}
                {debt.debtsList[0].date}
            </div>
            <div
                className="text-4xl font-bold text-red-600 select-none cursor-pointer ml-auto opacity-50 group-hover/debt:opacity-100 transition"
                onClick={() => delDebt(id)}
            >
                X
            </div>
        </div>
    );
}
