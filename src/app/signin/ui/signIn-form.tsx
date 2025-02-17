import { useState } from "react";
import { Input } from "../../components/common/input";
import { Button } from "./btn";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { MessengerButton } from "./messenger-btn";

export function SignInForm() {
    const [error, setError] = useState("");
    const router = useRouter();

    return (
        <div className="flex flex-col gap-6 text-center">
            <form action="#" id="signIn-form" className="flex flex-col mt-12 gap-4">
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
                <span className="text-red-500 font-medium text-lg">{error}</span>
                <Button
                    type="submit"
                    onClick={async (e) => {
                        e.preventDefault();
                        const form = document.querySelector("#signIn-form")!.children;
                        const email = (form[0].children[1].children[0] as HTMLInputElement).value;
                        const password = (form[1].children[1].children[0] as HTMLInputElement).value;
                        const userPassword = (
                            await (await fetch(`http://localhost:3000/api/users?email=${email}`)).json()
                        )?.password;

                        if (
                            userPassword &&
                            (await bcrypt.compare(
                                password,
                                (
                                    await (await fetch(`http://localhost:3000/api/users?email=${email}`)).json()
                                )?.password
                            ))
                        ) {
                            setError("");
                            const res = await signIn("credentials", {
                                email,
                                password: userPassword,
                                redirect: false,
                            });
                            if (res && !res.error) {
                                router.push("/");
                            }
                        } else {
                            setError("Поля не заполнены или заполнены не верно");
                        }
                    }}
                >
                    Войти
                </Button>
            </form>
            <span className="text-xl">или</span>
            <MessengerButton messenger="yandex" className="text-slate-800 bg-red-500 hover:shadow-md">
                Войти с помощью Яндекса
            </MessengerButton>
        </div>
    );
}
