import Image from "next/image";
import avatarSrc from "./imgs/avatar.png";

export function User() {
    return (
        <div className="text-2xl flex items-center gap-3">
            <Image src={avatarSrc} alt="avatar" height={40} width={40} /> <span>Кирилл В</span>
        </div>
    );
}
