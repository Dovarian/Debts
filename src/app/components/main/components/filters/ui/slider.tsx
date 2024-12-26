export function Slider() {
    return (
        <label
            htmlFor="slider-input"
            className="block bg-[--div-bg] w-16 h-8 p-2 rounded-3xl shadow relative cursor-pointer"
        >
            <input type="checkbox" id="slider-input" className="hidden peer" />
            <div
                className="
                bg-slate-200 w-6 h-6 rounded-full absolute top-1 left-1 transition
                peer-checked:bg-green-400 peer-checked:translate-x-8"
            />
        </label>
    );
}
