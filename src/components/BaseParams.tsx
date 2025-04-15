import {FC, useState} from "react";
import {SmartNumberInput} from "./SmartNumberInput";

export const BaseParams:FC = () => {
    const [waterPercent, setWaterPercent] = useState<number>(30);
    const [superfatPercent, setSuperfatPercent] = useState<number>(5);


    return (
        <div className="border border-purple-100 bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-2 mb-2 shadow-sm">
            {/* Подзаголовок */}
            <h3 className="text-lg font-semibold text-purple-700 mb-4 text-center sm:text-left">
                ⚗️ Параметры рецепта
            </h3>

            {/* Вся строка: адаптивная */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">

                {/* Щёлочь */}


                {/* Вода */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap">Вода</label>
                    <SmartNumberInput
                        value={waterPercent}
                        onChange={setWaterPercent}
                        className="w-20"
                    />
                    <span className="text-sm text-gray-500">%</span>
                </div>

                {/* Пережир */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap">Пережир</label>
                    <SmartNumberInput
                        value={superfatPercent}
                        onChange={setSuperfatPercent}
                        className="w-20"
                    />
                    <span className="text-sm text-gray-500">%</span>
                </div>
            </div>
        </div>


    );

};