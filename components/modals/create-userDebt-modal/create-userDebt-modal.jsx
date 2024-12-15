import { VertLine } from "../../uikit/vert-line";
import { Input } from "../../uikit/input";
import { ChooseAvatar } from "./ui/choose-avatar";
import { Currency } from "../../uikit/currency";
import { displayModal } from "../../../js/handles/display-modal";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import defaultAvatar from "../../../imgs/default-avatar.png";

export function CreateUserDebtModal({ addDebt }) {
    const { hideModal } = displayModal();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    if (typeof window === "object") {
        return createPortal(
            <dialog id="create-debt-modal" className="w-[900px] bg-white shadow-lg border-slate-200 p-4 text-lg">
                <div>
                    <form className="flex items-center justify-around" name="debt">
                        <ChooseAvatar name="avatar" avatar={defaultAvatar} />
                        <div className="flex flex-col gap-4">
                            <Input placeholder="Имя" required={true} type="text" name="name" />
                            <Input placeholder="Фамилия" required={false} type="text" name="surname" />
                        </div>
                        <VertLine className="h-24" />
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <Input placeholder="Сумма" required={false} type="number" name="amount" />
                                <Currency className="bg-slate-100 hover:bg-slate-200 transition" name="currency" />
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="date">До</label>{" "}
                                <Input required={false} type="date" id="date" name="date" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center mt-6 gap-2 pl-72">
                    <button
                        className="bg-lime-400 shadow px-36 py-2 transition hover:shadow-sm hover:bg-[#b4e95f]"
                        onClick={() => {
                            if (document.forms.debt.elements.name.value === "") {
                                document.querySelector("#error").classList.remove("opacity-0");
                            } else {
                                document.querySelector("#error").classList.add("opacity-0");
                                const form = document.forms.debt.elements;

                                addDebt({
                                    avatar:
                                        typeof form.avatar.files[0] == "undefined"
                                            ? defaultAvatar
                                            : URL.createObjectURL(form.avatar.files[0]),
                                    name: form.name.value + " " + form.surname.value,
                                    debtsList: [
                                        {
                                            debt: form.amount.value != "" ? form.amount.value : 0,
                                            date:
                                                form.date.value != ""
                                                    ? form.date.value.split("-").reverse().join(".")
                                                    : "00.00.0000",
                                        },
                                    ],
                                });
                                hideModal(document.querySelector("#create-debt-modal"));
                            }
                        }}
                    >
                        Создать
                    </button>
                    <span className="opacity-0 flex items-center text-red-600" id="error">
                        введите имя
                    </span>
                </div>
                <div
                    className="text-2xl font-bold text-red-600 select-none cursor-pointer opacity-50 hover:opacity-100 transition
                    absolute top-2 right-2"
                    onClick={() => hideModal(document.querySelector("#create-debt-modal"))}
                >
                    X
                </div>
            </dialog>,
            document.querySelector("#modals")
        );
    }
}
