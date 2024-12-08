import clsx from "clsx";
import "../styles/global.css";
import { Inter } from "next/font/google";
import { CreateDebtMenu } from "../components/modals/create-debt-menu/create-debt-menu";
const inter = Inter({ subsets: ["latin", "cyrillic"] });
export default function App({ Component, pageProps }) {
    return (
        <div className={clsx(inter.className, "text-slate-800")}>
            <Component {...pageProps} />
            <div id="modals" className="flex justify-center h-screen w-screen absolute top-0 hidden">
                <CreateDebtMenu />
                <div className="bg-black opacity-40 h-full w-full z-10"></div>
            </div>
        </div>
    );
}
