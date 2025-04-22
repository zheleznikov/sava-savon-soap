import {FC} from "react";
import {InputType} from "../../app/providers/SoapRecipeContext.types";
import {SmartNumberInput} from "../../shared/ui/SmartNumberInput";
import {useSoapRecipe} from "../recipe-calculation/model/useSoapRecipe";
import {useSoapCalculations} from "../recipe-calculation/model/useSoapCalculations";

export const ScaleRecipeBlock: FC = () => {
    const { totalResultAmount } = useSoapCalculations();

    const {
        inputType,
        setInputType,
        userDefinedTotalWeight,
        setUserDefinedTotalWeight,
    } = useSoapRecipe();

    const isGramMode = inputType === InputType.Gram;

    const handleInputChange = (value: number) => {
        // Переключаем только если введено новое значение, отличное от текущего
        if (isGramMode && value !== totalResultAmount) {
            setInputType(InputType.Percent);
        }
        setUserDefinedTotalWeight(value);
    };

    return (
        <div className="mt-4 w-fit">
            <div className="flex items-center gap-1 mb-1">
                <label className="text-sm text-gray-700"
                       title="Измените, чтобы задать точный вес готового мыла. Рецепт пересчитается автоматически.">Общий вес мыла — можно изменить</label>

            </div>


            <div className="flex items-center gap-1"
                 title="Измените, чтобы задать точный вес готового мыла. Рецепт пересчитается автоматически."
            >
                <SmartNumberInput
                    decimalPlaces={0}
                    value={isGramMode ? totalResultAmount : userDefinedTotalWeight}
                    onChange={handleInputChange}
                    placeholder="Например, 600"
                    min={10}
                    max={10000}
                    className="text-sm px-2 py-1 w-[240px]" // 👈 ширина под текст лейбла

                />
                <span className="text-gray-500 text-sm">г</span>
            </div>
        </div>


    );

};
