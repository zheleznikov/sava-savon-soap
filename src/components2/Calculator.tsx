import {FC} from "react";
import {InputBlock} from "./InputBlock";
import {RecipeSummaryBlock} from "../components/RecipeSummaryBlock";


export const Calculator: FC = () => {
    return (
        <>
            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-8 text-center tracking-tight drop-shadow-sm">
                🧼 Калькулятор мыла
            </h1>


            <div className="flex flex-col lg:flex-row gap-4 relative z-0">
                {/* Блок ввода */}
                <div className="w-full lg:w-1/2 border border-green-200 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow relative z-10"

                >
                    {/*<h2 className="text-center text-xl font-semibold mb-4">Ввод параметров</h2>*/}
                    <InputBlock />
                </div>

                {/* Блок результата */}
                {/*<div className="w-full lg:w-1/2 border border-purple-200 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow relative z-0">*/}
                    {/* ResultBlock (пока пустой) */}
                    <RecipeSummaryBlock/>
                {/*</div>*/}
            </div>

        </>
    );
};

