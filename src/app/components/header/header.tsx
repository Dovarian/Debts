"use client";

import { useEffect, useState } from "react";
import { User } from "../common/user/user";
import { VertLine } from "../common/vert-line";
import { DebtsInterface } from "../../../interfaces/interfaces";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header({ userID }: { userID: number | null }) {
    const [userData, setUserData] = useState({ avatar: "", userName: "Loading..." });
    const session = useSession();

    useEffect(() => {
        const fetchData = async () => {
            const data = (
                await (
                    await fetch(
                        `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/api/users`
                    )
                ).json()
            ).find((item: DebtsInterface) => item.id == userID);

            setUserData({ avatar: (await data)?.avatar, userName: (await data)?.username });
        };
        fetchData();
    }, [userID]);

    return (
        <header className="bg-[--div-bg] py-4 px-8 border-gray-500 shadow flex justify-between items-center mx-[20vw] mt-6 max-xl:mx-[5vw] max-md:px-2">
            <div className="text-5xl max-xl:text-4xl">Долги</div>
            {session.status == "authenticated" && (
                <div className="flex items-center gap-10">
                    <VertLine className="h-12 max-md:hidden" />
                    <Link href="/profile">
                        <User
                            src={userData.avatar}
                            userName={userData.userName}
                            variability={false}
                            avatarClassName="cursor-pointer"
                        />
                    </Link>
                    <VertLine className="h-12 max-md:hidden" />
                    <Link
                        href="#"
                        className="font-light text-2xl py-2 px-4 border border-gray-500 rounded
                        hover:bg-red-500 hover:text-slate-100 hover:border-slate-100 transition max-md:hidden"
                        onClick={() => {
                            signOut({ callbackUrl: "/" });
                        }}
                    >
                        Выйти
                    </Link>
                </div>
            )}
            {session.status == "unauthenticated" && (
                <div>
                    <Link
                        href="/api/auth/signin"
                        className="font-light text-3xl py-2 px-6 border border-gray-500 rounded hover:bg-slate-50 transition"
                    >
                        Войти
                    </Link>
                </div>
            )}
        </header>
    );
}
