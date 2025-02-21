import { getAdaptiveSize } from "../../../../../helpers/helpers";
import { DebtClass } from "../../../../../lib/debt-class";
import { Input } from "../../input";

export function InputName({
    placeholder,
    setEdit,
    debtClass,
    type,
    userID,
    setUsername,
}: {
    placeholder: string;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    debtClass?: DebtClass;
    type?: "user" | "creditor";
    userID?: number | null;
}) {
    return (
        <span>
            <Input
                placeholder={placeholder}
                required={false}
                type="text"
                onKeyUp={async (event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key == "Enter") {
                        const username = (event.target as HTMLInputElement).value;
                        if (username != "") {
                            setUsername(username);
                            if (type == "creditor") {
                                debtClass?.replace("name", username);
                                await fetch(`${window.location.origin}/api/users/${userID}?id=${debtClass?.index}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json;charset=utf-8",
                                    },
                                    body: JSON.stringify({ name: username }),
                                });
                            } else {
                                await fetch(`${window.location.origin}/api/users?id=${userID}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json;charset=utf-8",
                                    },
                                    body: JSON.stringify({ username }),
                                });
                            }
                        }
                        setEdit(false);
                    }
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => getAdaptiveSize(event, 16, placeholder)}
            />
        </span>
    );
}
