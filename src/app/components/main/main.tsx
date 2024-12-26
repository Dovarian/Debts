import { DebtsList } from "./components/debts-list/debts-list";
import { Filters } from "./components/filters/filters";

export function Main({}) {
    return (
        <main className="mx-[20vw] mt-24">
            <Filters />
            <DebtsList />
        </main>
    );
}
