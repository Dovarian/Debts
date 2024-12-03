import { Header } from "../components/header";
import { Main } from "../components/main";
export default function HomePage() {
    return (
        <div className="h-full">
            <header className="pt-8 flex justify-center">
                <Header />
            </header>
            <main className="pt-14 flex justify-center">
                <Main />
            </main>
        </div>
    );
}
