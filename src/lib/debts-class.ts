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

    addDebt(debt: DebtsInterface): void {
        this._setDebts((prev) => [...prev, debt]);
    }
}
