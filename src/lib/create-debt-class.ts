import defaultAvatar from "../../public/images/default-avatar.png";
import { convertDate } from "../helpers/helpers";

export class CreateDebtClass {
    getDebt(form: HTMLFormElement) {
        return {
            avatar:
                typeof form.avatar.files[0] == "undefined" ? defaultAvatar : URL.createObjectURL(form.avatar.files[0]),
            name: form.userName.value + " " + form.surname.value,
            debtsList: [
                {
                    debt: form.amount.value != "" ? form.amount.value : 0,
                    date: form.date.value != "" ? convertDate(form.date.value) : "00.00.0000",
                    defaultEdit: false,
                },
            ],
            hidden: false,
        };
    }
}
