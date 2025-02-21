import { convertDate } from "../helpers/helpers";
import { DebtsInterface } from "../interfaces/interfaces";

type State = React.Dispatch<React.SetStateAction<DebtsInterface[]>>;

export class DebtClass {
    _debts: DebtsInterface[];
    _setDebts: State;
    _index: number;
    _userID: number | null;

    constructor(debts: DebtsInterface[], setDebts: State, i: number, userID: number | null) {
        this._debts = debts;
        this._setDebts = setDebts;
        this._index = i;
        this._userID = userID;
    }

    get debt(): DebtsInterface {
        return this._debts.find((item) => item.id == this._index)!;
    }

    get index(): number {
        return this._index;
    }

    get setDebts(): State {
        return this._setDebts;
    }

    replace(name: string, value: string) {
        const newDebts = this._debts.slice();
        newDebts.find((item) => item.id == this._index)![name] = value;
        this._setDebts(newDebts);
    }

    replaceDebt(value: number, i: number) {
        const newDebts = this._debts.slice();
        newDebts.find((item) => item.id == this._index)!.debtsList.find((item) => item.id == i)!.amount = value;
        newDebts.find((item) => item.id == this._index)!.debtsList.find((item) => item.id == i)!.defaultEdit = false;
        this._setDebts(newDebts);
    }

    replaceDate(value: string, i: number) {
        const newDebts = this._debts.slice();
        newDebts.find((item) => item.id == this._index)!.debtsList.find((item) => item.id == i)!.date = value;
        newDebts.find((item) => item.id == this._index)!.debtsList.find((item) => item.id == i)!.defaultEdit = false;
        this._setDebts(newDebts);
    }

    async addDebtsListItem() {
        await fetch(`${window.location.host}/api/users/${this._userID}/${this._index}?type=create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ amount: 0, date: "01.01.0000" }),
        })
            .then((response) => response.json())
            .then((response) => {
                const newDebts = this._debts.slice();
                newDebts
                    .find((item) => item.id == this._index)!
                    .debtsList.push({
                        amount: 0,
                        date: "01.01.0000",
                        defaultEdit: true,
                        id: response.id,
                        creditor_id: this._index,
                        user_id: 1,
                    });
                this._setDebts(newDebts);
            });
    }

    async delDebtsListItem(index: number) {
        if (this._debts.find((item) => item.id == this._index)!.debtsList.length - 1 > 0) {
            const newDebts = this._debts.slice();
            newDebts.find((item) => item.id == this._index)!.debtsList = newDebts
                .find((item) => item.id == this._index)!
                .debtsList.filter((item) => item.id != index);
            this._setDebts(newDebts);

            await fetch(`${window.location.host}/api/users/${this._userID}/${this._index}?type=delete&id=${index}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({}),
            });
        }
    }

    sortDebtsList() {
        const newDebts = this._debts.slice();
        newDebts
            .find((item) => item.id == this._index)!
            .debtsList.sort((a, b) => {
                return Number(new Date(convertDate(a.date))) - Number(new Date(convertDate(b.date)));
            });
        return newDebts;
    }

    openDebtsList() {
        document.querySelector(`#debtsList-${this._index}`)?.classList.remove("hidden");
    }

    closeDebtsList() {
        document.querySelector(`#debtsList-${this._index}`)?.classList.add("hidden");
    }

    calcAmount(): number {
        return this._debts
            .find((item) => item.id == this._index)!
            .debtsList.reduce((acc, item) => (acc += Number(item.amount)), 0);
    }

    async delete() {
        this._setDebts((prev) => prev.filter((item) => item.id != this._index));

        await fetch(`${window.location.host}/api/users/${this._userID}?type=delete&id=${this._index}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({}),
        });
    }
}
