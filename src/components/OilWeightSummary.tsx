import { FC } from "react";
import { useSoapRecipe } from "../context/useSoapRecipe";
import { useSoapCalculations } from "../hooks/useSoapCalculations";
import { formatNumber } from "../utils/utils";

export const OilWeightSummary: FC = () => {
    const { selectedOils, inputType } = useSoapRecipe();
    const { totalOilWeight } = useSoapCalculations();

    const percentSum = selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);
    const isPercentMode = inputType === "percent";
    const isPercentInvalid = isPercentMode && (percentSum < 99 || percentSum > 101);

    return (
        <div className="mt-2">
            <div className="grid grid-cols-3 gap-2 pt-1 font-semibold text-gray-800 bg-stone-100 rounded-md px-2 py-2 items-center">
                <span className="font-medium">Масса масел</span>
                <span className="text-center text-gray-800 font-medium">
                    {formatNumber(percentSum)}%
                </span>
                <span className="text-center font-semibold">
                    {formatNumber(totalOilWeight)} г
                </span>
            </div>

            {isPercentInvalid && (
                <p className="text-xs text-orange-500 mt-1 text-center">
                    Для правильного расчёта общий процент масел должен быть от 99% до 101%
                </p>
            )}
        </div>
    );
};
