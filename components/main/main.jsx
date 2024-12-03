import { Debt } from "./ui/debt";
import { Filter } from "./ui/filter";

export function Main() {
    return (
        <div className="w-2/4 flex flex-col gap-14">
            <div>
                <Filter />
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
                <Debt />
                <Debt />
                <Debt />
                <Debt />
                <Debt />
                <span className="select-none cursor-pointer font-bold text-8xl text-green-500">+</span>
            </div>
        </div>
    );
}
