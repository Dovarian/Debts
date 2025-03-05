import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Form } from "./ui/form";
import { DisplayModalClass } from "../../../../lib/display-modal";
import { CreateDebtClass } from "../../../../lib/create-debt-class";
import { DebtsClass } from "../../../../lib/debts-class";

export function CreateDebtModal({
    ref,
    displayCreateDebtClass,
    debtsClass,
}: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref;
    displayCreateDebtClass: DisplayModalClass;
    debtsClass: DebtsClass;
}) {
    const [isClient, setIsClient] = useState<boolean>(false);
    const createDebtClass = new CreateDebtClass();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (isClient) {
        return createPortal(
            <dialog className="w-[900px] bg-white shadow-lg border-slate-200 p-6 text-lg" ref={ref}>
                <div>
                    <Form />
                </div>
                <div className="flex justify-center mt-6 gap-2 pl-72">
                    <button
                        className="bg-lime-400 shadow px-36 py-2 transition hover:shadow-sm hover:bg-[#b4e95f]"
                        onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            const form = document.forms.debt.elements;
                            const error = document.querySelector("#error")!;

                            if (form.userName.value != "") {
                                error.classList.add("opacity-0");
                                debtsClass.addDebt(createDebtClass.getDebt(form));
                                debtsClass.setDebts((prev) => debtsClass.filter(prev));
                                displayCreateDebtClass.closeModal();
                            } else {
                                error.classList.remove("opacity-0");
                            }
                        }}
                    >
                        Создать
                    </button>
                    <span className="opacity-0 flex items-center text-red-600" id="error">
                        Введите имя
                    </span>
                </div>
                <div
                    className="text-2xl font-bold text-red-600 select-none cursor-pointer opacity-50 hover:opacity-100 transition
                    absolute top-2 right-2"
                    onClick={() => displayCreateDebtClass.closeModal()}
                >
                    X
                </div>
            </dialog>,
            document.querySelector("#modals")!
        );
    }
}
