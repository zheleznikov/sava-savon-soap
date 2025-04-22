import {FC} from "react";
import {useSoapRecipe} from "../recipe-calculation/model/useSoapRecipe";
import {formatNumber} from "../../shared/lib/utils";
import {InputType} from "../../app/providers/SoapRecipeContext.types";

export const OilWeightSummary: FC = () => {
    const {selectedOils, inputType} = useSoapRecipe();

    const rawPercentSum = selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);
    const percentSum = parseFloat(formatNumber(rawPercentSum));
    const isPercentMode = inputType === InputType.Percent;
    const isPercentInvalid = isPercentMode && (percentSum < 99 || percentSum > 101);

    const getProgressBarColor = (percent: number) => {
        if (percent < 50) return "bg-red-700";
        if (percent < 60) return "bg-red-600";
        if (percent < 70) return "bg-orange-600";
        if (percent < 80) return "bg-orange-500";
        if (percent < 90) return "bg-yellow-400";
        if (percent < 95) return "bg-yellow-300";
        if (percent < 99) return "bg-yellow-300";
        if (percent <= 101) return "bg-emerald-400";
        if (percent <= 105) return "bg-yellow-300";
        if (percent <= 110) return "bg-yellow-300";
        if (percent <= 115) return "bg-yellow-400";
        if (percent <= 120) return "bg-orange-500";
        if (percent <= 130) return "bg-orange-600";
        return "bg-red-700";
    };


    return (
        <div className="mt-2">
            {/* Прогрессбар */}
            <div className="h-6 sm:h-7 relative transition-all duration-300">
                {isPercentMode && (
                    <div className="w-full border b-stone-200 rounded-full h-full relative overflow-hidden">
                        {/* Заливка */}
                        <div
                            className={`absolute top-0 left-0 h-full transition-all duration-300 ${getProgressBarColor(percentSum)}`}
                            style={{width: `${Math.min(percentSum, 120)}%`}}
                        />
                        {/* Текст поверх */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-xs font-semibold drop-shadow text-gray-800">
              Общий процент — {formatNumber(percentSum, 0)}%
            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Подсказка — всегда рендерим, но скрываем */}
            <div className="h-4 sm:h-5 mt-1 text-center text-xs transition-all duration-300">
                {isPercentInvalid ? (
                    <p className="text-gray-500">
                        Для правильного расчёта общий процент масел должен быть от 99% до 101%.{" "}
                        {percentSum < 99 && (
                            <span className="text-gray-700 font-bold">
              Добавьте {Math.round(99 - percentSum)}%.
            </span>
                        )}
                        {percentSum > 101 && (
                            <span className="text-gray-700 font-bold">
              Убавьте {Math.round(percentSum - 101)}%.
            </span>
                        )}
                    </p>
                ) : (
                    <p className="invisible select-none">&nbsp;</p>
                )}
            </div>
        </div>
    );

};
