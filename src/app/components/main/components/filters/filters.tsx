import { Currency } from "../../../common/currency";
import { Limit } from "./ui/limit";
import { Slider } from "./ui/slider";

export function Filters() {
    return (
        <section className="flex justify-between text-lg items-center">
            <div className="flex items-center gap-2">
                <Slider />
                <span>Только свои</span>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Limit hint="От" />
                    <Currency className="bg-[--div-bg]" />
                </div>
                <div className="flex gap-2">
                    <Limit hint="До" />
                    <Currency className="bg-[--div-bg]" />
                </div>
            </div>
        </section>
    );
}
