"use client";

import { useEffect, useState } from "react";
import { InputName } from "./input-name";
import { DebtClass } from "../../../../../lib/debt-class";
import { StaticName } from "./static-name";

export function Name({
    name,
    variability = false,
    debtClass,
    type,
    userID,
}: {
    name: string;
    variability: boolean;
    debtClass?: DebtClass;
    type?: "user" | "creditor";
    userID?: number | null;
}) {
    const [edit, setEdit] = useState<boolean>(false);
    const [username, setUsername] = useState(name);

    useEffect(() => {
        setUsername(name);
    }, [name]);

    return edit ? (
        <InputName
            placeholder={username}
            setUsername={setUsername}
            setEdit={setEdit}
            debtClass={debtClass}
            type={type}
            userID={userID}
        />
    ) : (
        <StaticName variability={variability} name={username} setEdit={setEdit} />
    );
}
