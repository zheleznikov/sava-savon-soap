import {FC} from "react";
import {InputType} from "../../app/providers/SoapRecipeContext.types";
import {SmartNumberInput} from "@/shared/smart-number-input";
import {InputBlockWrapper} from "../../shared/ui/InputBlockWrapper";


interface ScaleRecipeBlockProps {
    inputType: InputType;
    setInputType: (val: InputType) => void;
    userDefinedTotalWeight: number;
    setUserDefinedTotalWeight: (val: number) => void;
    totalResultAmount: number;
}

export const ScaleRecipeBlock: FC<ScaleRecipeBlockProps> = ({
                                                                inputType,
                                                                setInputType,
                                                                userDefinedTotalWeight,
                                                                setUserDefinedTotalWeight,
                                                                totalResultAmount,
                                                            }) => {


    const isGramMode = inputType === InputType.Gram;

    const handleInputChange = (value: number) => {
        // Переключаем только если введено новое значение, отличное от текущего
        if (isGramMode && value !== totalResultAmount) {
            setInputType(InputType.Percent);
        }
        setUserDefinedTotalWeight(value);
    };

    return (
        <InputBlockWrapper>
            <div className="flex flex-col gap-2 mb-4">
                <h2 className="text-lg font-bold text-gray-800 text-center">
                    Масштабирование рецепта
                </h2>
                <p className="text-sm text-gray-600">
                    Измените общий вес готового мыла — рецепт пересчитается автоматически.
                </p>
            </div>

            <div className="flex items-center gap-3">
                <SmartNumberInput
                    decimalPlaces={0}
                    value={isGramMode ? totalResultAmount : userDefinedTotalWeight}
                    onChange={handleInputChange}
                    placeholder="Вес мыла, г"
                    min={10}
                    max={10000}
                    className="text-lg px-4 py-2 w-full h-14 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                />
                <span className="text-md text-gray-500">г</span>
            </div>
        </InputBlockWrapper>
    );
};