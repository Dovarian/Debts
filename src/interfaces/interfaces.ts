export interface DebtsInterface {
    [index: string]: unknown;
    avatar: string;
    name: string;
    debtsList: DebtsList[];
    hidden: boolean;
    id?: number;
    userId?: number;
}

interface DebtsList {
    id?: number;
    user_id?: number;
    creditor_id?: number;
    amount: number;
    date: string;
    defaultEdit: boolean;
}
