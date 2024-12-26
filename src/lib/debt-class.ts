import { convertDate } from "../helpers/helpers";
import { DebtsInterface } from "../interfaces/interfaces";

type State = React.Dispatch<React.SetStateAction<DebtsInterface[]>>;

export class DebtClass {
    _debts: DebtsInterface[];
    _setDebts: State;
    _index: number;

    constructor(debts: DebtsInterface[], setDebts: State, i: number) {
        this._debts = debts;
        this._setDebts = setDebts;
        this._index = i;
    }

    get debt(): DebtsInterface {
        return this._debts[this._index];
    }

    get index(): number {
        return this._index;
    }

    replace(name: string, value: string) {
        const newDebts = this._debts.slice();
        newDebts[this._index][name] = value;
        this._setDebts(newDebts);
    }

    replaceDebt(value: number, i: number) {
        const newDebts = this._debts.slice();
        newDebts[this._index].debtsList[i].debt = value;
        newDebts[this._index].debtsList[i].defaultEdit = false;
        this._setDebts(newDebts);
    }

    replaceDate(value: string, i: number) {
        const newDebts = this._debts.slice();
        newDebts[this._index].debtsList[i].date = value;
        newDebts[this._index].debtsList[i].defaultEdit = false;
        this._setDebts(newDebts);
    }

    addDebtsListItem() {
        const newDebts = this._debts.slice();
        newDebts[this._index].debtsList.push({ debt: 0, date: "00.00.0000", defaultEdit: true });
        this._setDebts(newDebts);
    }

    delDebtsListItem(index: number) {
        const newDebts = this._debts.slice();
        newDebts[this._index].debtsList = newDebts[this._index].debtsList.filter((_, i) => i != index);
        this._setDebts(newDebts);
    }

    sortDebtsList() {
        const newDebts = this._debts.slice();
        newDebts[this._index].debtsList = newDebts[this._index].debtsList.sort(
            (a, b) => Number(new Date(convertDate(a.date))) - Number(new Date(convertDate(b.date)))
        );
        this._setDebts(newDebts);
    }

    openDebtsList() {
        document.querySelector(`#debtsList-${this._index}`)?.classList.remove("hidden");
    }

    closeDebtsList() {
        document.querySelector(`#debtsList-${this._index}`)?.classList.add("hidden");
    }

    calcAmount(): number {
        return this._debts[this._index].debtsList.reduce((acc, item) => (acc += Number(item.debt)), 0);
    }

    delete(): void {
        this._setDebts((prev) => prev.filter((_, i) => i != this._index));
    }
}
