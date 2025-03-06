import { DebtsClass } from "../../../../../lib/debts-class";
import { Currency } from "../../../common/currency";
import { Limit } from "./ui/limit";
import { Slider } from "./ui/slider";

export function Filters({ debtsClass }: { debtsClass: DebtsClass }) {
    return (
        <section className="flex justify-between text-lg items-center max-md:flex-col max-md:gap-12">
            <div className="flex items-center gap-2">
                <Slider debtsClass={debtsClass} />
                <span>Только свои</span>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Limit hint="От" className="from" debtsClass={debtsClass} />
                    <Currency className="bg-[--div-bg]" />
                </div>
                <div className="flex gap-2">
                    <Limit hint="До" className="to" debtsClass={debtsClass} />
                    <Currency className="bg-[--div-bg]" />
                </div>
            </div>
        </section>
    );
}
