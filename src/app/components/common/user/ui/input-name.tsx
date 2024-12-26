import { getAdaptiveSize } from "../../../../../helpers/helpers";
import { DebtClass } from "../../../../../lib/debt-class";
import { Input } from "../../input";

export function InputName({
    placeholder,
    setEdit,
    debtClass,
}: {
    placeholder: string;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    debtClass?: DebtClass;
}) {
    return (
        <span>
            <Input
                placeholder={placeholder}
                required={false}
                type="text"
                onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key == "Enter") {
                        if ((event.target as HTMLInputElement).value != "") {
                            debtClass?.replace("name", (event.target as HTMLInputElement).value);
                        }
                        setEdit(false);
                    }
                }}
                styleInput={{
                    width: (placeholder.length + 1) * 16,
                }}
                styleDiv={{
                    maxWidth: 320,
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => getAdaptiveSize(event, 16, placeholder)}
            />
        </span>
    );
}
