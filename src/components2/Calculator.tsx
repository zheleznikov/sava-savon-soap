import {FC} from "react";
import {InputBlock} from "./InputBlock";


export const Calculator: FC = () => {
    return (
        <>
            <h1 className="text-3xl sm:text-4xl font-semibold text-purple-700 mb-6 text-center tracking-wide">
                Калькулятор мыла
            </h1>

            <div className="flex flex-col lg:flex-row gap-4 relative z-0">
                {/* Блок ввода */}
                <div className="w-full lg:w-1/2 border border-purple-200 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow relative z-10">
                    <h2 className="text-xl font-semibold text-purple-600 mb-4">Ввод параметров</h2>
                    <InputBlock />
                </div>

                {/* Блок результата */}
                <div className="w-full lg:w-1/2 border border-green-200 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow relative z-0">
                    <h2 className="text-xl font-semibold text-green-600 mb-4">Рецепт</h2>
                    {/* ResultBlock (пока пустой) */}
                </div>
            </div>

        </>
    );
};

