import { DebtsInterface } from "../interfaces/interfaces";

type State = React.Dispatch<React.SetStateAction<DebtsInterface[]>>;

export class DebtsClass {
    _debts: DebtsInterface[];
    _setDebts: State;
    _userID: number | null;

    constructor(debts: DebtsInterface[], setDebts: State, userID: number | null) {
        this._debts = debts;
        this._setDebts = setDebts;
        this._userID = userID;
    }

    get debts(): DebtsInterface[] {
        return this._debts;
    }

    get setDebts(): State {
        return this._setDebts;
    }

    get userID(): number | null {
        return this._userID;
    }

    addDebt(debt: DebtsInterface) {
        fetch(`${window.location.host}/api/users/${this._userID}?type=create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ name: debt.name, avatar: debt.avatar }),
        })
            .then((response) => response.json())
            .then(async (response) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                debt.id = response.id;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                debt.userId = response.userId;
                this._setDebts((prev) => [...prev, debt]);

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await fetch(`${window.location.host}/api/users/${this._userID}/${response.id}?type=create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({ amount: Number(debt.debtsList[0].amount), date: debt.debtsList[0].date }),
                });
            });
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
