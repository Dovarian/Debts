import avatarSrc from "../../../../public/images/dovarian-avatar.png";
import { User } from "../common/user/user";
import { VertLine } from "../common/vert-line";

export default function Header() {
    return (
        <header className="bg-[--div-bg] py-4 px-8 border-gray-500 shadow flex justify-between items-center mx-[20vw] mt-6">
            <div className="text-5xl">Долги</div>
            <div className="flex items-center gap-10">
                <VertLine className="h-12" />
                <User src={avatarSrc} userName="Кирилл В" variability={false} />
            </div>
        </header>
    );
}
