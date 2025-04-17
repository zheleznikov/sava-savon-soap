import { FC } from "react";
import { SmartNumberInput } from "./SmartNumberInput";

interface Props {
    usePercent: boolean;
    onModeChange: (usePercent: boolean) => void;
    totalWeight: number;
    onTotalWeightChange: (value: number) => void;
}

export const InputModeBlock: FC<Props> = ({
                                              usePercent,
                                              onModeChange,
                                              totalWeight,
                                              onTotalWeightChange,
                                          }) => {
    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-sm mb-4">


            {/* Линия: переключатель + инпут */}
            <div className="flex flex-wrap gap-4 items-end">
                {/* Режим ввода */}
                <div className="flex flex-col min-w-[160px]">
                    <label className="text-sm text-gray-600 mb-1">Режим ввода</label>
                    <div className="flex border border-gray-300 rounded-md overflow-hidden w-fit">
                        <button
                            type="button"
                            onClick={() => onModeChange(false)}
                            className={`px-4 py-1 text-sm transition ${
                                !usePercent
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            Граммы
                        </button>
                        <button
                            type="button"
                            onClick={() => onModeChange(true)}
                            className={`px-4 py-1 text-sm transition ${
                                usePercent
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            Проценты
                        </button>
                    </div>
                </div>

                {/* Общий вес мыла (всегда видим) */}
                <div className="flex flex-col min-w-[160px]">
                    <label className="text-sm text-gray-600 mb-1">Общий вес мыла</label>
                    <div className="flex items-center gap-1">
                        <SmartNumberInput
                            value={totalWeight}
                            onChange={onTotalWeightChange}
                            placeholder="граммы"
                            min={10}
                            max={10000}
                            className="w-full max-w-[120px] text-sm"
                        />
                        <span className="text-gray-500">г</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
