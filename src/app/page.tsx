"use client";

import { useEffect, useState } from "react";
import Header from "./components/header/header";
import { Main } from "./components/main/main";
import { UsersClass } from "../lib/users-class";
import { useSession } from "next-auth/react";

export default function Home() {
    const [userID, setUserID] = useState<number | null>(null);
    const session = useSession();

    useEffect(() => {
        const usersClass = new UsersClass();

        async function fetchData() {
            if (session.status == "authenticated") {
                console.log(typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

                const user = await (
                    await fetch(
                        `${
                            typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
                        }/api/users?email=${session.data.user?.email}`
                    )
                ).json();

                if (!!(await user)?.email) {
                    setUserID(await user.id);
                } else {
                    setUserID(
                        (
                            await (
                                await usersClass.addUser({
                                    username: session.data.user?.name as string,
                                    email: session.data.user?.email as string,
                                    avatar: session.data.user?.image as string,
                                })
                            ).json()
                        ).id
                    );
                }
            }
        }
        fetchData();
    }, [session]);

    return (
        <div>
            <div id="modals"></div>
            <Header userID={userID} />
            <Main userID={userID} />
        </div>
    );
}
