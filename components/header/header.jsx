import { User } from "./ui/user";

export function Header() {
    return (
        <div className="bg-white w-2/4 p-4 px-8 border-gray-500 shadow flex justify-between items-center">
            <div className="text-5xl">Долги</div>
            <div className="flex items-center gap-10">
                <div className="h-24 w-px bg-slate-400" />
                <User />
            </div>
        </div>
    );
}
