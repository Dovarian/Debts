import { DebtsInterface } from "../interfaces/interfaces";

type State = React.Dispatch<React.SetStateAction<DebtsInterface[]>>;

export class DebtsClass {
    _debts: DebtsInterface[];
    _setDebts: State;

    constructor(debts: DebtsInterface[], setDebts: State) {
        this._debts = debts;
        this._setDebts = setDebts;
    }

    get debts(): DebtsInterface[] {
        return this._debts;
    }

    get setDebts(): State {
        return this._setDebts;
    }

    addDebt(debt: DebtsInterface): void {
        this._setDebts((prev) => [...prev, debt]);
    }

    filter(array: DebtsInterface[]): DebtsInterface[] {
        const slider = (document.querySelector(".slider") as HTMLInputElement)?.checked;
        const from = (document.querySelector(".from") as HTMLInputElement)?.value;
        const to = (document.querySelector(".to") as HTMLInputElement)?.value;
        return [...array].map((item) => {
            const total = item.debtsList.reduce((acc, item) => (acc += Number(item.amount)), 0);
            const isForMe = slider ? total >= 0 : true;
            const isFromLess = from != "" ? Number(from) <= total : true;
            const isToMore = to != "" ? total <= Number(to) : true;

            if (isFromLess && isForMe && isToMore) {
                item.hidden = false;
                return item;
            } else {
                item.hidden = true;
                return item;
            }
        });
    }
}
