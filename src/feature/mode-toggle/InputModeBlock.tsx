import {FC} from "react";
import {useSoapRecipe} from "../recipe-calculation/model/useSoapRecipe";
import {SmartNumberInput} from "../../shared/ui/SmartNumberInput";
import {useSoapCalculations} from "../recipe-calculation/model/useSoapCalculations";
import {InputType} from "../../app/providers/SoapRecipeContext.types";

export const InputModeBlock: FC = () => {
    const {
        inputType,setInputType, userDefinedTotalWeight, setUserDefinedTotalWeight
    } = useSoapRecipe();

    const {totalResultWeight }  = useSoapCalculations();

    const isGramMode = inputType === InputType.Gram;

    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-sm mb-4">
            <div className="flex flex-wrap gap-6 sm:gap-8">
                {/* Режим ввода */}
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Режим ввода</label>
                    <div className="flex border border-gray-300 rounded-md overflow-hidden w-fit">
                        <button
                            type="button"
                            onClick={() => setInputType(InputType.Gram)}
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
                            onClick={() => setInputType(InputType.Percent)}
                            className={`px-4 py-1 text-sm transition ${
                                inputType === InputType.Percent
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            Проценты
                        </button>
                    </div>
                </div>

                {/* Общий вес мыла */}
                <div className="flex flex-col">
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
                            className={`w-[120px] text-sm ${
                                isGramMode ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
                            }`}
                        />
                        <span className="text-gray-500">г</span>
                    </div>
                    <p
                        className={`text-xs mt-1 transition-opacity duration-200 min-h-[1rem] ${
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
