import {FC} from "react";
import {InputBlock} from "./input/InputBlock";
import {RecipeSummaryBlock} from "./output/RecipeSummaryBlock";


export const Calculator: FC = () => {
    return (
        <section className="flex flex-col w-full max-w-4xl bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-2 sm:p-8 flex-grow">

            <header className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-8 text-center tracking-tight drop-shadow-sm">
                Калькулятор мыла
            </header>

            <div className="flex flex-col lg:flex-row gap-4 relative">
                <InputBlock/>
                <RecipeSummaryBlock/>
            </div>

        </section>
    );
};

