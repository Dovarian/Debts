import { DebtsInterface } from "../interfaces/interfaces";

type State = React.Dispatch<React.SetStateAction<DebtsInterface[]>>;

export class FilterClass {
    _setDebts: State
    _debts: DebtsInterface[]

    constructor(setDebts: State, debts: DebtsInterface[]) {
        this._setDebts = setDebts
        this._debts = debts
    }

    filter(slider: HTMLInputElement, from: HTMLInputElement, to: HTMLInputElement){
        
    }
}
