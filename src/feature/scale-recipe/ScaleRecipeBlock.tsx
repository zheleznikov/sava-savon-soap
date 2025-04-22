import {FC} from "react";
import {InputType} from "../../app/providers/SoapRecipeContext.types";
import {SmartNumberInput} from "../../shared/ui/SmartNumberInput";
import {useSoapRecipe} from "../recipe-calculation/model/useSoapRecipe";
import {useSoapCalculations} from "../recipe-calculation/model/useSoapCalculations";

export const ScaleRecipeBlock:FC = () => {

    const {
        totalResultAmount,

    } = useSoapCalculations();

    const {
        inputType, setInputType,
        userDefinedTotalWeight, setUserDefinedTotalWeight
    } = useSoapRecipe();

    const isGramMode = inputType === InputType.Gram;

    return (
        <div className="mt-4 flex flex-wrap gap-4 items-center">
            {/* Кнопка смены режима */}
            <button
                onClick={() => {
                    if (inputType === InputType.Gram) {
                        setUserDefinedTotalWeight(totalResultAmount);
                        setInputType(InputType.Percent);
                    } else {
                        setInputType(InputType.Gram);
                    }
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded transition whitespace-nowrap"
            >
                {inputType === InputType.Gram ? "Изменить общий вес" : "Изменить вес масел"}
            </button>

            {/* Поле ввода общего веса мыла */}
            <div
                className="flex flex-col"
                style={{ minWidth: "160px", maxWidth: "200px", flex: "1 1 auto" }}
            >
                <div className="flex items-center gap-1">
                    <SmartNumberInput
                        decimalPlaces={0}
                        value={isGramMode ? totalResultAmount : userDefinedTotalWeight}
                        onChange={isGramMode ? () => {} : setUserDefinedTotalWeight}
                        placeholder="граммы"
                        min={10}
                        max={10000}
                        className="w-full max-w-[120px] text-sm"
                    />
                    <span className="text-gray-500">г</span>
                </div>
            </div>
        </div>
    );
};