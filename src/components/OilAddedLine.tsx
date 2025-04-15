import {FC, useState} from "react";
import {SmartNumberInput} from "./SmartNumberInput";

export const OilAddedLine: FC = () => {
    const [inputMode, setInputMode] = useState<"grams" | "percent">("grams");

    return (
        <div
            className={`border border-purple-100 bg-white/70 backdrop-blur-sm 
                  rounded-md p-1 xs:p-2 mb-4 xs:mb-3 shadow-sm relative text-sm sm:text-lg`}
        >
            {/* ❌ Кнопка удаления */}
            <button
                onClick={() => {
                    // TODO: удалить
                }}
                className="absolute top-0.5 right-0.5 text-gray-400 hover:text-red-500 transition text-xl"
                title="Удалить масло"
            >
                ✖️
            </button>

            <div className="flex flex-col">
                {/* 🫒 Название масла */}
                <div className="text-gray-700 font-medium truncate mb-2">
                    🫒 Оливковое масло
                </div>

                {/* ⚙️ Строка с режимом и инпутами */}
                <div className="flex flex-row justify-between items-end text-sm sm:text-base">

                    {/* 📍 Левая часть — выбор режима */}
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input
                                type="radio"
                                name="inputMode"
                                value="grams"
                                checked={inputMode === "grams"}
                                onChange={() => setInputMode("grams")}
                                className="text-gray-600 focus:ring-purple-500"
                            />
                            г
                        </label>

                        <label className="flex items-center gap-1 cursor-pointer">
                            <input
                                type="radio"
                                name="inputMode"
                                value="percent"
                                checked={inputMode === "percent"}
                                onChange={() => setInputMode("percent")}
                                className="text-gray-600 focus:ring-purple-500"
                            />
                            %
                        </label>
                    </div>

                    {/* ✏️ Правая часть — инпуты */}
                    <div className="flex items-center gap-4">
                        {/* Проценты */}
                        <div className="flex items-center gap-1">
                            <SmartNumberInput
                                placeholder="Введите %"
                                value={0}
                                onChange={() => {
                                }}
                                className="w-20 sm:w-24 border border-gray-300 rounded px-2 py-1 text-gray-800
              placeholder:text-xxs sm:placeholder:text-xs placeholder:text-gray-400"
                            />
                            <span className="text-gray-500">%</span>
                        </div>

                        {/* Граммы */}
                        <div className="flex items-center gap-1">
                            <SmartNumberInput
                                placeholder="Введите граммы"
                                value={0}
                                onChange={() => {
                                }}
                                className="w-20 sm:w-24 border border-gray-300 rounded px-2 py-1 text-gray-800
              placeholder:text-xxs sm:placeholder:text-xs placeholder:text-gray-400"
                            />
                            <span className="text-gray-500">г</span>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}