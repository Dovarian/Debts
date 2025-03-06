import { Suspense } from "react";
import { RegistrationForm } from "./ui/registration-form";
import { SignInForm } from "./ui/signIn-form";

export default function Registration() {
    return (
        <Suspense fallback={"Loading..."}>
            <div className="w-1/2 bg-white mx-auto mt-48 rounded shadow py-8 px-12 flex justify-between items-center max-2xl:w-[90vw] max-md:px-4 max-md:flex-col max-md:gap-8">
                <div className="w-1/3 max-md:w-auto">
                    <p className="text-4xl max-md:text-center">Регистрация</p>
                    <RegistrationForm></RegistrationForm>
                </div>
                <div className="h-96 bg-gray-300 w-px max-md:hidden"></div>
                <div className="w-1/3 max-md:w-auto">
                    <p className="text-4xl max-md:text-center">Вход</p>
                    <SignInForm></SignInForm>
                </div>
            </div>
        </Suspense>
    );
}
