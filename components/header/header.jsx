import { User } from "../uikit/user";
import avatarSrc from "../../imgs/avatar.png";
import { VertLine } from "../uikit/vert-line";

export function Header() {
    return (
        <div className="bg-white w-2/4 p-4 px-8 border-gray-500 shadow flex justify-between items-center">
            <div className="text-5xl">Долги</div>
            <div className="flex items-center gap-10">
                <VertLine className="h-12" />
                <User src={avatarSrc} name="Кирилл В" variability={false} />
            </div>
        </div>
    );
}
