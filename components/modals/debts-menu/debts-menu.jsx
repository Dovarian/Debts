import { useState } from "react";
import { EditIcon_1 } from "../../../icons/edit_1-icon";
import { Input } from "../../uikit/input";
import clsx from "clsx";

export function DebtsMenu({ debtsList, replaceDebt, id, delDebtsList, addDebtsList }) {
    const [edit, setEdit] = useState(new Array(debtsList.length).fill(false));

    return (
        <div className="bg-white shadow w-[150%] left-[-25%] top-[-1px] min-h-full absolute hidden flex flex-col z-50 debtsMenu">
            {debtsList.map((debt, i) => {
                if (edit[i]) {
                    return (
                        <>
                            <ItemInput
                                key={i}
                                debtsList={debtsList}
                                debt={debt}
                                edit={edit}
                                replaceDebt={replaceDebt}
                                id={id}
                                i={i}
                                setEdit={setEdit}
                            />
                            <Item
                                key={i}
                                debt={debt}
                                edit={edit}
                                setEdit={setEdit}
                                i={i}
                                id={id}
                                className="hidden"
                                delDebtsList={delDebtsList}
                            />
                        </>
                    );
                } else {
                    return (
                        <>
                            <ItemInput
                                key={i}
                                debtsList={debtsList}
                                debt={debt}
                                edit={edit}
                                replaceDebt={replaceDebt}
                                id={id}
                                i={i}
                                setEdit={setEdit}
                                className="hidden"
                            />
                            <Item
                                key={i}
                                debt={debt}
                                edit={edit}
                                setEdit={setEdit}
                                i={i}
                                id={id}
                                delDebtsList={delDebtsList}
                            />
                        </>
                    );
                }
            })}
            <div
                className="py-2 px-4 border flex justify-center items-center
            hover:bg-slate-50 transition font-bold text-5xl text-slate-400"
                onClick={() => {
                    const newEdit = edit.slice();
                    newEdit.push(true);
                    setEdit(newEdit);
                    addDebtsList(id);
                }}
            >
                +
            </div>
        </div>
    );
}

function Item({ debt, i, edit, setEdit, className, id, delDebtsList }) {
    return (
        <div
            className={clsx(
                "py-2 px-4 border flex justify-center items-center hover:bg-slate-50 transition relative group",
                className
            )}
            key={i}
            onClick={(event) => {
                if (!event.target.closest(".close")) {
                    let newEdit = [...edit];
                    newEdit[i] = true;
                    setEdit(newEdit);
                }
            }}
        >
            <div className="absolute top-1/5 left-2 cursor-pointer transition p-2">
                <EditIcon_1 className="size-[22px] opacity-0 group-hover:opacity-100 transition" />
            </div>
            <span className="flex flex-wrap justify-center gap-x-[7px]">
                <div
                    className={clsx("font-medium whitespace-nowrap", debt.debt < 0 ? "text-red-600" : "text-green-600")}
                >
                    {debt.debt}₽
                </div>{" "}
                <div className="whitespace-nowrap">до {debt.date}</div>
            </span>
            <div
                className="absolute top-1/5 right-2 text-red-600
                             select-none cursor-pointer opacity-50 transition hover:opacity-100 p-2 close"
                onClick={() => delDebtsList(id, i)}
            >
                x
            </div>
        </div>
    );
}

function ItemInput({ debt, replaceDebt, edit, setEdit, id, i, className, debtsList }) {
    return (
        <div className={clsx("flex items-center flex-col gap-2 justify-between py-2 px-4 border", className)}>
            <span className="flex items-center gap-1">
                <Input
                    placeholder={debt.debt}
                    required={false}
                    type="number"
                    onKeyUp={(event) => {
                        if (event.key == "Enter") {
                            if (event.target.value != "") {
                                const inputDate =
                                    event.target.parentNode.parentNode.parentNode.lastChild.lastChild.firstChild;

                                let newEdit = edit.slice();
                                newEdit[i] = false;
                                let newDebtsList = debtsList.slice();
                                newDebtsList[i].debt = event.target.value;
                                setEdit(newEdit);
                                console.log(inputDate.value == "");
                                if (inputDate.value != "") {
                                    console.log(inputDate);

                                    newDebtsList[i].date = inputDate.value.split("-").reverse().join(".");
                                }
                                replaceDebt(id, "debtsList", newDebtsList);
                            } else {
                                let newEdit = edit.slice();
                                newEdit[i] = false;
                                console.log(newEdit);
                                setEdit(newEdit);
                            }
                        }
                    }}
                    styleInput={{
                        width: (String(debt.debt).length + 1) * 16 + 15,
                    }}
                    styleDiv={{
                        maxWidth: 200,
                    }}
                    onChange={(event) => {
                        const widthValue = (event.target.value.length + 1) * 16 + 15;
                        const widthPlaceholder = (String(debt.debt).length + 1) * 16 + 15;
                        event.target.style.width =
                            widthValue < widthPlaceholder ? widthPlaceholder + "px" : widthValue + "px";
                    }}
                />
                ₽
            </span>
            <span className="flex items-center gap-1">
                до{" "}
                <Input
                    placeholder={debt.date}
                    required={false}
                    type="date"
                    className="w-[180px]"
                    onKeyUp={(event) => {
                        if (event.key == "Enter") {
                            if (event.target.value != "") {
                                const inputDebt =
                                    event.target.parentNode.parentNode.parentNode.firstChild.firstChild.firstChild;
                                let newEdit = edit.slice();
                                newEdit[i] = false;
                                let newDebtsList = debtsList.slice();
                                newDebtsList[i].date = event.target.value.split("-").reverse().join(".");
                                setEdit(newEdit);
                                console.log(inputDebt);
                                if (inputDebt.value != "") {
                                    newDebtsList[i].debt = inputDebt.value;
                                }
                                replaceDebt(id, "date", newDebtsList);
                            } else {
                                let newEdit = edit.slice();
                                newEdit[i] = false;
                                console.log(newEdit);
                                setEdit(newEdit);
                            }
                        }
                    }}
                />
            </span>
        </div>
    );
}
