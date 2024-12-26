import avatarSrc from "../../public/images/dovarian-avatar.png";
import { DebtsInterface } from "../interfaces/interfaces";

export const debtsConstant: DebtsInterface[] = [
    {
        avatar: avatarSrc,
        name: "Дима Болтенков",
        total: -1000,
        debtsList: [
            { debt: -1000, date: "31.12.2024", defaultEdit: false },
            { debt: 1000, date: "31.12.2025", defaultEdit: false },
            { debt: 1500, date: "31.12.2026", defaultEdit: false },
            { debt: 2000, date: "31.12.2027", defaultEdit: false },
            { debt: 3000, date: "31.12.2028", defaultEdit: false },
        ],
    },
];
