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
                    placeholder={String(debtClass.debt.debtsList.find((item) => item.id == i)!.amount)}
                    required={false}
                    type="number"
                    maxWidth={300}
                    onKeyUp={async (event) => {
                        if (event.key == "Enter") {
                            const fetchData: { amount?: number; date?: string } = {};
                            if ((event.target as HTMLInputElement).value != "") {
                                debtClass.replaceDebt(Number((event.target as HTMLInputElement).value), i);
                                fetchData.amount = Number((event.target as HTMLInputElement).value);
                            }
                            const dateInput = (event.target as HTMLElement)
                                .closest(".debtListInput")
                                ?.querySelector("input[type=date]");
                            if ((dateInput as HTMLInputElement).value != "") {
                                debtClass.replaceDate(convertDate((dateInput as HTMLInputElement).value), i);
                                fetchData.date = convertDate((dateInput as HTMLInputElement).value);
                            }

                            setEdit(false);
                            debtsClass.setDebts((prev) => debtsClass.filter(prev));

                            await fetch(
                                `${
                                    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
                                }/api/users/1/${debtClass.index}?id=${i}`,
                                {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json;charset=utf-8",
                                    },
                                    body: JSON.stringify(fetchData),
                                }
                            );
                        }
                    }}
                    // styleInput={{
                    //     width:
                    //         (String(debtClass.debt.debtsList.find((item) => item.id == i)!.amount).length + 1) * 16 +
                    //         15,
                    // }}
                    // styleDiv={{
                    //     maxWidth: 200,
                    // }}
                    // onChange={(event) => {
                    //     const widthValue = (event.target.value.length + 1) * 16 + 15;
                    //     const widthPlaceholder =
                    //         (String(debtClass.debt.debtsList.find((item) => item.id == i)!.amount).length + 1) * 16 +
                    //         15;
                    //     event.target.style.width =
                    //         widthValue < widthPlaceholder ? widthPlaceholder + "px" : widthValue + "px";
                    // }}
                />
                ₽
            </span>
            <span className="flex items-center gap-1">
                до{" "}
                <Input
                    defaultValue={convertDate(debtClass.debt.debtsList.find((item) => item.id == i)!.date)}
                    required={false}
                    type="date"
                    onKeyUp={async (event) => {
                        if (event.key == "Enter") {
                            const fetchData: { amount?: number; date?: string } = {};

                            if ((event.target as HTMLInputElement).value != "") {
                                debtClass.replaceDate(convertDate((event.target as HTMLInputElement).value), i);
                                fetchData.date = convertDate((event.target as HTMLInputElement).value);
                            }
                            const debtInput = (event.target as HTMLElement)
                                .closest(".debtListInput")
                                ?.querySelector("input[type=number]");
                            if ((debtInput as HTMLInputElement).value != "") {
                                debtClass.replaceDebt(Number((debtInput as HTMLInputElement).value), i);
                                fetchData.amount = Number((debtInput as HTMLInputElement).value);
                            }
                            setEdit(false);
                            debtsClass.setDebts((prev) => debtsClass.filter(prev));
                            await fetch(
                                `${
                                    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
                                }/api/users/1/${debtClass.index}?id=${i}`,
                                {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json;charset=utf-8",
                                    },
                                    body: JSON.stringify(fetchData),
                                }
                            );
                        }
                    }}
                />
            </span>
        </div>
    );
}
