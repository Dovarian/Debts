import clsx from "clsx";
import { Input } from "../../../common/input";
import { DebtClass } from "../../../../../lib/debt-class";
import { convertDate } from "../../../../../helpers/helpers";
import { DebtsClass } from "../../../../../lib/debts-class";

export function DebtsInputItem({
    className,
    debtClass,
    i,
    setEdit,
    debtsClass,
}: {
    className?: string;
    debtClass: DebtClass;
    i: number;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    debtsClass: DebtsClass;
}) {
    return (
        <div
            className={clsx(
                "flex items-center flex-col gap-2 justify-between py-2 px-4 border debtListInput",
                className
            )}
        >
            <span className="flex items-center gap-1">
                <Input
                    placeholder={String(debtClass.debt.debtsList[i].debt)}
                    required={false}
                    type="number"
                    onKeyUp={(event) => {
                        if (event.key == "Enter") {
                            if ((event.target as HTMLInputElement).value != "") {
                                debtClass.replaceDebt(Number((event.target as HTMLInputElement).value), i);
                            }
                            const dateInput = (event.target as HTMLElement)
                                .closest(".debtListInput")
                                ?.querySelector("input[type=date]");
                            if ((dateInput as HTMLInputElement).value != "") {
                                debtClass.replaceDate(convertDate((dateInput as HTMLInputElement).value), i);
                            }
                            setEdit(false);
                            debtsClass.setDebts((prev) => debtsClass.filter(prev));
                        }
                    }}
                    styleInput={{
                        width: (String(debtClass.debt.debtsList[i].debt).length + 1) * 16 + 15,
                    }}
                    styleDiv={{
                        maxWidth: 200,
                    }}
                    onChange={(event) => {
                        const widthValue = (event.target.value.length + 1) * 16 + 15;
                        const widthPlaceholder = (String(debtClass.debt.debtsList[i].debt).length + 1) * 16 + 15;
                        event.target.style.width =
                            widthValue < widthPlaceholder ? widthPlaceholder + "px" : widthValue + "px";
                    }}
                />
                ₽
            </span>
            <span className="flex items-center gap-1">
                до{" "}
                <Input
                    defaultValue={convertDate(debtClass.debt.debtsList[i].date)}
                    required={false}
                    type="date"
                    className="w-[180px]"
                    onKeyUp={(event) => {
                        if (event.key == "Enter") {
                            if ((event.target as HTMLInputElement).value != "") {
                                debtClass.replaceDate(convertDate((event.target as HTMLInputElement).value), i);
                            }
                            const debtInput = (event.target as HTMLElement)
                                .closest(".debtListInput")
                                ?.querySelector("input[type=number]");
                            if ((debtInput as HTMLInputElement).value != "") {
                                debtClass.replaceDebt(Number((debtInput as HTMLInputElement).value), i);
                            }
                            setEdit(false);
                        }
                    }}
                />
            </span>
        </div>
    );
}
