import clsx from "clsx";
import Image from "next/image";
import editIcon1Src from "../../../../../../public/icons/edit-icon-1.svg";

export function StaticName({
    variability,
    name,
    setEdit,
}: {
    variability: boolean;
    name: string;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <span
            className={clsx("group flex items-center gap-1 whitespace-nowrap", variability && "cursor-pointer")}
            onClick={() => variability && setEdit(true)}
        >
            <span className="max-w-80 overflow-x-auto">{name}</span>
            <Image
                src={editIcon1Src}
                alt="edit"
                className={clsx("opacity-0 transition", variability && "group-hover:opacity-100")}
            />
        </span>
    );
}
