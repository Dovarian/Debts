import { Debt } from "./ui/debt";
import { Filter } from "./ui/filter";

export function Main() {
    return (
        <div className="w-2/4 flex flex-col gap-14">
            <div>
                <Filter />
            </div>
            <div className="flex flex-col gap-4">
                <Debt />
                <Debt />
                <Debt />
                <Debt />
                <Debt />
            </div>
        </div>
    );
}
