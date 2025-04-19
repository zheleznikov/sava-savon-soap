import {FC} from "react";
import {useSoapRecipe} from "../../../hooks/useSoapRecipe";
import {SmartNumberInput} from "../../SmartNumberInput";
import {useSoapCalculations} from "../../../hooks/useSoapCalculations";

export const InputModeBlock: FC = () => {
    const {
        inputType,setInputType, userDefinedTotalWeight, setUserDefinedTotalWeight
    } = useSoapRecipe();

    const {totalResultWeight }  = useSoapCalculations();

    const isGramMode = inputType === "gram";

    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-sm mb-4">
            <div className="flex flex-wrap gap-4 items-end">
                {/* Режим ввода */}
                <div className="flex flex-col min-w-[160px]">
                    <label className="text-sm text-gray-600 mb-1">Режим ввода</label>
                    <div className="flex border border-gray-300 rounded-md overflow-hidden w-fit">
                        <button
                            type="button"
                            onClick={() => setInputType("gram")}
                            className={`px-4 py-1 text-sm transition ${
                                isGramMode
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            Граммы
                        </button>
                        <button
                            type="button"
                            onClick={() => setInputType("percent")}
                            className={`px-4 py-1 text-sm transition ${
                                inputType === "percent"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            Проценты
                        </button>
                    </div>
                </div>

                {/* Общий вес мыла */}
                <div className="flex flex-col min-w-[160px]">
                    <label className="text-sm text-gray-600 mb-1">Общий вес мыла</label>
                    <div className="flex items-center gap-1">
                        <SmartNumberInput
                            decimalPlaces={0}
                            value={isGramMode ? totalResultWeight : userDefinedTotalWeight}
                            onChange={isGramMode ? () => {} : setUserDefinedTotalWeight}
                            disabled={isGramMode}
                            placeholder="граммы"
                            min={10}
                            max={10000}
                            className={`w-full max-w-[120px] text-sm ${
                                isGramMode ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
                            }`}
                        />
                        <span className="text-gray-500">г</span>
                    </div>

                    {/* Подсказка */}
                    <p
                        className={`text-xs mt-1 transition-opacity duration-200 h-[1rem] ${
                            isGramMode ? "text-gray-400 opacity-100 visible" : "opacity-0 invisible"
                        }`}
                    >
                        Рассчитывается автоматически по сумме масел
                    </p>
                </div>

            </div>
        </div>
    );
};
