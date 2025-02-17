"use client";

import { useEffect, useState } from "react";
import { User } from "../components/common/user/user";
import { useSession } from "next-auth/react";
import { UsersClass } from "../../lib/users-class";
import { debts, users } from "@prisma/client";
import { VertLine } from "../components/common/vert-line";
import clsx from "clsx";
import Link from "next/link";

export default function Profile() {
    const [userID, setUserID] = useState<number | null>(null);
    const [user, setUser] = useState<users>();
    const [amount, setAmount] = useState(0);
    const [myDebts, setMyDebts] = useState(0);
    const [debtsToMe, setDebtsToMe] = useState(0);
    const session = useSession();

    useEffect(() => {
        const usersClass = new UsersClass();

        async function fetchData() {
            if (session.status == "authenticated") {
                setUser(
                    await (await fetch(`http://localhost:3000/api/users?email=${session.data.user?.email}`)).json()
                );
                const user = await (
                    await fetch(`http://localhost:3000/api/users?email=${session.data.user?.email}`)
                ).json();

                const userID = await user.id;

                if (!!(await user)?.email) {
                    setUserID(userID);
                } else {
                    const newUser = await (
                        await usersClass.addUser({
                            username: session.data.user?.name as string,
                            email: session.data.user?.email as string,
                            avatar: session.data.user?.image as string,
                        })
                    ).json();
                    setUser(newUser);
                    setUserID(newUser.id);
                }

                const credentials = await (await fetch(`http://localhost:3000/api/users/${userID}`)).json();
                for (const credential of credentials) {
                    const debt = await (
                        await fetch(`http://localhost:3000/api/users/${userID}/${credential.id}`)
                    ).json();

                    const credentialAmount = [...debt].reduce((acc: number, item: debts) => acc + item.amount, 0);
                    setAmount((prev) => prev + credentialAmount);

                    const myDebts = [...debt]
                        .filter((item: debts) => item.amount < 0)
                        .reduce((acc: number, item: debts) => acc + item.amount, 0);
                    setMyDebts((prev) => prev + myDebts);

                    const debtsToMe = [...debt]
                        .filter((item: debts) => item.amount > 0)
                        .reduce((acc: number, item: debts) => acc + item.amount, 0);
                    setDebtsToMe((prev) => prev + debtsToMe);
                }
            }
        }
        fetchData();
    }, [session]);

    return (
        <div className="bg-white mx-auto w-[50vw] h-80 mt-64 p-8 flex shadow">
            <div className="flex flex-col gap-4 w-1/2 pr-4">
                <span className="border-b border-b-slate-600 py-2">
                    <User
                        src={user?.avatar || ""}
                        userName={user?.username || "Loading..."}
                        variability={true}
                        userID={userID}
                        type="user"
                    ></User>
                </span>
                <span className="text-xl">Почта: {user?.email || "Loading..."}</span>
                <span className="text-xl">
                    Сумма:{" "}
                    <span className={clsx("font-medium", amount >= 0 ? "text-green-600" : "text-red-600")}>
                        {amount}
                    </span>
                </span>
                <span className="text-xl">
                    Вы: <span className="text-red-600 font-medium">{myDebts}</span>
                </span>
                <span className="text-xl">
                    Вам: <span className="text-green-600 font-medium">{debtsToMe}</span>
                </span>
            </div>
            <VertLine className="h-full" />
            <div className="w-1/2 flex flex-col gap-6">
                <Link
                    href="/"
                    className="text-xl px-6 py-[10px] bg-slate-100 ml-8 border border-white hover:bg-slate-50 hover:border-slate-200 hover:shadow-sm transition text-center"
                >
                    <button>Назад</button>
                </Link>
                <Link
                    href="/signin"
                    className="text-xl px-6 py-[10px] bg-slate-100 ml-8 hover:bg-red-500 hover:text-slate-100 transition text-center"
                >
                    <button
                        onClick={async () => {
                            console.log(
                                await fetch(`http://localhost:3000/api/users?type=delete&id=${userID}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json;charset=utf-8",
                                    },
                                    body: JSON.stringify({}),
                                })
                            );
                        }}
                    >
                        Удалить аккаунт
                    </button>
                </Link>
            </div>
        </div>
    );
}
