import { Currency } from "./currency";
import { Limit } from "./limit";
import { Slider } from "./slider";

export function Filter() {
    return (
        <div className="flex justify-between text-lg items-center">
            <div className="flex items-center gap-2">
                <Slider />
                <span>Только свои</span>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Limit hint="От" />
                    <Currency />
                </div>
                <div className="flex gap-2">
                    <Limit hint="До" />
                    <Currency />
                </div>
            </div>
        </div>
    );
}
