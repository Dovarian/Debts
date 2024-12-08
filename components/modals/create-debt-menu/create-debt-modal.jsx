import { VertLine } from "../../uikit/vert-line";
import { Input } from "../../uikit/input";
import { ChooseAvatar } from "./ui/choose-avatar";
import { Currency } from "../../uikit/currency";
import { displayModal } from "../../../js/handles/display-modal";
import { useDebts } from "../../../js/hooks/use-debts";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export function CreateDebtModal() {
    const { addDebt } = useDebts();
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
            <dialog id="create-debt-modal" className="w-[50vw] bg-white shadow-lg border-slate-200 p-4 text-lg">
                <div className="flex items-center justify-around">
                    <ChooseAvatar />
                    <div className="flex flex-col gap-4">
                        <Input placeholder="Имя" required={true} type="text" />
                        <Input placeholder="Фамилия" required={false} type="text" />
                    </div>
                    <VertLine className="h-24" />
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Input placeholder="Сумма" required={false} type="number" />
                            <Currency className="bg-slate-100 hover:bg-slate-200 transition" />
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="date">До</label> <Input required={false} type="date" id="date" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        className="bg-lime-400 shadow px-36 py-2 transition hover:shadow-sm hover:bg-[#b4e95f]"
                        onClick={() => {
                            addDebt();
                            hideModal(document.querySelector("#create-debt-modal"));
                        }}
                    >
                        Создать
                    </button>
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
