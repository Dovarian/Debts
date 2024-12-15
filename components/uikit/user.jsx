import Image from "next/image";
import { EditIcon_1 } from "../../icons/edit_1-icon.jsx";
import { EditIcon_2 } from "../../icons/edit_2-icon.jsx";
import clsx from "clsx";
import { useState } from "react";
import { Input } from "./input.jsx";

export function User({ src, userName, variability, onClickName, edit, id, replaceDebt }) {
    const labelVariability = !variability ? { htmlFor: "htmlFor" } : "";

    return (
        <div className="text-2xl flex items-center gap-3">
            <div className={clsx("group relative w-10 h-10", variability && "cursor-pointer")}>
                <label {...labelVariability}>
                    <Image
                        src={src}
                        alt="avatar"
                        height={40}
                        width={40}
                        className="rounded-full h-10 w-10 resize-none"
                    />
                    <EditIcon_2
                        className={clsx(
                            "opacity-0 absolute top-px left-px bg-slate-400 size-full p-[3px] rounded-full transition",
                            variability && "group-hover:opacity-60"
                        )}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            if (event.target.files && event.target.files[0]) {
                                replaceDebt(id, "avatar", URL.createObjectURL(event.target.files[0]));
                            }
                        }}
                        className="hidden"
                    />
                </label>
            </div>
            {edit?.user ? (
                <InputName onClickName={onClickName} name={userName} replaceDebt={replaceDebt} id={id} />
            ) : (
                <Name onClickName={onClickName} name={userName} variability={variability} />
            )}
        </div>
    );
}

function Name({ onClickName, name, variability }) {
    return (
        <span
            className={clsx("group flex items-center gap-1 whitespace-nowrap", variability && "cursor-pointer")}
            onClick={onClickName}
        >
            <span className="max-w-64 overflow-x-auto">{name}</span>
            <EditIcon_1 className={clsx("opacity-0 transition", variability && "group-hover:opacity-100")} />
        </span>
    );
}

function InputName({ onClickName, name, replaceDebt, id }) {
    return (
        <span>
            <Input
                placeholder={name}
                required={false}
                type="text"
                onKeyUp={(event) =>
                    event.key == "Enter" &&
                    (event.target.value != ""
                        ? [onClickName(), replaceDebt(id, "name", event.target.value)]
                        : onClickName())
                }
                styleInput={{
                    width: (name.length + 1) * 16,
                }}
                styleDiv={{
                    maxWidth: 256,
                }}
                onChange={(event) => {
                    const widthValue = (event.target.value.length + 1) * 16;
                    const widthPlaceholder = (name.length + 1) * 16;
                    event.target.style.width =
                        widthValue < widthPlaceholder ? widthPlaceholder + "px" : widthValue + "px";
                }}
            />
        </span>
    );
}
