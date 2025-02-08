"use client";

import { RegistrationForm } from "./ui/registration-form";
import { SignInForm } from "./ui/signIn-form";

export default function Registration() {
    return (
        <div className="w-1/2 h-[65vh] bg-white mx-auto mt-48 rounded shadow py-8 px-12 flex justify-between">
            <div className="w-1/3">
                <p className="text-4xl">Регистрация</p>
                <RegistrationForm></RegistrationForm>
            </div>
            <div className="h-full bg-gray-300 w-px"></div>
            <div className="w-1/3">
                <p className="text-4xl">Вход</p>
                <SignInForm></SignInForm>
            </div>
        </div>
    );
}
