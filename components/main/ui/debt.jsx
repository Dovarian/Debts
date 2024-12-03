import { User } from "./../../uikit/user";
import avatarSrc from "./../../../imgs/avatar.png";
import { VertLine } from "../../uikit/vert-line";

// Из объекта user будем получать данные

export function Debt({ user }) {
    return (
        <div className="bg-white shadow p-8 w-full h-14 text-2xl flex items-center gap-4 group/debt">
            <User src={avatarSrc} name="Дмитрий Болтенков" variability={true} />
            <VertLine height="8" />
            <div className="font-medium text-red-600">-10₽</div>
            <VertLine height="8" />
            <div className="border p-1 cursor-pointer select-none">
                <span className="font-medium text-green-600">10000₽</span> до 31.12.2024
            </div>
            <div className="text-4xl font-bold text-red-600 select-none cursor-pointer ml-auto opacity-50 group-hover/debt:opacity-100 transition">
                X
            </div>
        </div>
    );
}
