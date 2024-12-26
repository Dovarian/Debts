import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface DebtsInterface {
    [index: string]: unknown;
    avatar: StaticImport | string;
    name: string;
    debtsList: DebtsList[];
    hidden: boolean;
}

interface DebtsList {
    debt: number;
    date: string;
    defaultEdit: boolean;
}
