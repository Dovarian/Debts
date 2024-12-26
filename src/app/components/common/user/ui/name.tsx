"use client";

import { useState } from "react";
import { InputName } from "./input-name";
import { DebtClass } from "../../../../../lib/debt-class";
import { StaticName } from "./static-name";

export function Name({
    name,
    variability = false,
    debtClass,
}: {
    name: string;
    variability: boolean;
    debtClass?: DebtClass;
}) {
    const [edit, setEdit] = useState<boolean>(false);

    return edit ? (
        <InputName placeholder={name} setEdit={setEdit} debtClass={debtClass} />
    ) : (
        <StaticName variability={variability} name={name} setEdit={setEdit} />
    );
}
