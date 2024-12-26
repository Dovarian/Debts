export function Limit({ hint }: { hint: string }) {
    return (
        <div className="flex gap-2">
            <span>{hint}</span>
            <input type="number" className="appearance-none outline-0 bg-transparent border-b w-32" />
        </div>
    );
}
