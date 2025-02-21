"use client";

import { useState } from "react";
import { Input } from "../../components/common/input";
import { Button } from "./btn";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export function RegistrationForm() {
    const [error, setError] = useState("");
    const router = useRouter();

    return (
        <form action="#" id="reg-form" className="flex flex-col mt-12 gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-xl">
                    Имя пользователя
                </label>
                <Input type="text" required={true} placeholder="Имя" id="username" className="w-full" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xl">
                    Почта
                </label>
                <Input type="email" required={true} placeholder="Почта" id="email" className="w-full" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-xl">
                    Пароль
                </label>
                <Input type="text" required={true} placeholder="Пароль" id="password" className="w-full" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="confirm-password" className="text-xl">
                    Подтвердите пароль
                </label>
                <Input
                    type="text"
                    required={true}
                    placeholder="Подтвердите пароль"
                    id="confirm-password"
                    className="w-full"
                />
            </div>
            <span className="text-red-500 font-medium text-lg">{error}</span>
            <Button
                type="submit"
                onClick={async (e) => {
                    e.preventDefault();
                    const form = document.querySelector("#reg-form")!.children;
                    const username = (form[0].children[1].children[0] as HTMLInputElement).value;
                    const email = (form[1].children[1].children[0] as HTMLInputElement).value;
                    const password = (form[2].children[1].children[0] as HTMLInputElement).value;
                    const confirmPassword = (form[3].children[1].children[0] as HTMLInputElement).value;

                    if (username && password && confirmPassword && email) {
                        if (password == confirmPassword) {
                            if (
                                (await (await fetch(`${process.env.DOMAIN}/api/users?email=${email}`)).json()) == null
                            ) {
                                setError("");
                                const hashPassword = await bcrypt.hash(password, 10);
                                await fetch(`${process.env.DOMAIN}/api/users?type=create`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json;charset=utf-8",
                                    },
                                    body: JSON.stringify({
                                        username,
                                        email,
                                        password: hashPassword,
                                        avatar: "",
                                    }),
                                });
                                const res = await signIn("credentials", {
                                    email,
                                    password: hashPassword,
                                    redirect: false,
                                });
                                if (res && !res.error) {
                                    router.push("/");
                                }
                            } else {
                                setError("Аккаунт с такой почтой уже существует");
                            }
                        } else {
                            setError("Пароли не совпадают");
                        }
                    } else {
                        setError("Заполните все поля");
                    }
                }}
            >
                Зарегистрироваться
            </Button>
        </form>
    );
}
