import defaultAvatar from "../../public/images/default-avatar.png";
import { convertDate } from "../helpers/helpers";
import { DebtsInterface } from "../interfaces/interfaces";

export class CreateDebtClass {
    getDebt(form: HTMLFormElement): DebtsInterface {
        return {
            avatar:
                typeof form.avatar.files[0] == "undefined"
                    ? defaultAvatar.src
                    : !(form.avatar.getAttribute("data-url").split(";")[0].split("/")[1] == "gif")
                    ? form.avatar.getAttribute("data-url")
                    : "",
            name: form.userName.value + " " + form.surname.value,
            debtsList: [
                {
                    amount: form.amount.value != "" ? form.amount.value : 0,
                    date: form.date.value != "" ? convertDate(form.date.value) : "01.01.0000",
                    defaultEdit: false,
                },
            ],
            hidden: false,
        };
    }
}
