import { Currency } from "../../../common/currency";
import { VertLine } from "../../../common/vert-line";
import { ChooseAvatar } from "./choose-avatar";
import defaultAvatar from "../../../../../../public/images/default-avatar.png";
import { Input } from "../../../common/input";

export function Form() {
    return (
        <form className="flex items-center justify-around" name="debt" id="debtForm">
            <ChooseAvatar name="avatar" avatar={defaultAvatar} />
            <div className="flex flex-col gap-4">
                <Input placeholder="Имя" required={true} type="text" name="userName" />
                <Input placeholder="Фамилия" required={false} type="text" name="surname" />
            </div>
            <VertLine className="h-24" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Input placeholder="Сумма" required={false} type="number" name="amount" />
                    <Currency className="bg-slate-100 hover:bg-slate-200 transition" name="currency" />
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="date">До</label> <Input required={false} type="date" id="date" name="date" />
                </div>
            </div>
        </form>
    );
}
