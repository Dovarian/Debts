import clsx from "clsx";
import { DebtsClass } from "../../../../../../lib/debts-class";

export function Limit({ hint, className, debtsClass }: { hint: string; className?: string; debtsClass: DebtsClass }) {
    return (
        <div className="flex gap-2">
            <span>{hint}</span>
            <input
                onInput={() => debtsClass.setDebts((prev) => debtsClass.filter(prev))}
                type="number"
                className={clsx("appearance-none outline-0 bg-transparent border-b w-32", className)}
            />
        </div>
    );
}
