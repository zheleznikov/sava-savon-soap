import { FC } from "react";
import {SmartNumberInput} from "../../shared/ui/SmartNumberInput";
import {useSoapRecipe} from "../recipe-calculation/model/useSoapRecipe";
import {LyeType} from "../../app/providers/SoapRecipeContext.types";



export const BasicParamsBlock: FC = () => {

    const {
        lyeType, setLyeType,
        waterPercent, setWaterPercent,
        superfatPercent, setSuperfatPercent,
    } = useSoapRecipe();


    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-sm space-y-4 mb-4">

            {/* Строка 1 — выбор щёлочи */}
            <div className="flex flex-col flex-row gap-1">
                <label className="text-sm text-gray-600">Тип щёлочи</label>
                <div className="flex border border-gray-300 rounded-md overflow-hidden w-fit">
                    {[LyeType.NaOH,LyeType.KOH].map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setLyeType(type as LyeType.NaOH | LyeType.KOH)}
                            className={`px-4 py-1 text-sm transition ${
                                lyeType === type
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Строка 2 — вода и пережир */}
            <div className="flex flex-wrap gap-4 sm:items-center">
                {/* Вода */}
                <div className="flex flex-col min-w-[140px]">
                    <label className="text-sm text-gray-600 mb-1">Процент воды</label>
                    <div className="flex items-center gap-1">
                        <SmartNumberInput
                            decimalPlaces={0}
                            value={waterPercent}
                            onChange={setWaterPercent}
                            placeholder="%"
                            min={10}
                            max={100}
                            className="w-full max-w-[100px] text-sm"
                        />
                        <span className="text-gray-500">%</span>
                    </div>
                </div>

                {/* Пережир */}
                <div className="flex flex-col min-w-[140px]">
                    <label className="text-sm text-gray-600 mb-1">Процент пережира</label>
                    <div className="flex items-center gap-1">
                        <SmartNumberInput
                            decimalPlaces={0}
                            value={superfatPercent}
                            onChange={setSuperfatPercent}
                            placeholder="%"
                            min={0}
                            max={20}
                            className="w-full max-w-[100px] text-sm"
                        />
                        <span className="text-gray-500">%</span>
                    </div>
                </div>
            </div>

        </div>
    );
};