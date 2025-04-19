import {FC} from "react";
import {InputBlock} from "./input/InputBlock";
import {RecipeSummaryBlock} from "./output/RecipeSummaryBlock";


export const Calculator: FC = () => {
    return (
        <>
            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-8 text-center tracking-tight drop-shadow-sm">
                🧼 Калькулятор мыла
            </h1>

            <div className="flex flex-col lg:flex-row gap-4 relative z-0">
                <InputBlock/>
                <RecipeSummaryBlock/>
            </div>

        </>
    );
};

