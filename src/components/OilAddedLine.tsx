import {FC} from "react";
import {Trash2} from "lucide-react";
import {SmartNumberInput} from "./SmartNumberInput";
import {TOil} from "../data/oils2";
import {useSoapRecipe} from "../context/useSoapRecipe";

interface Props {
    oil: TOil;
}

export const OilAddedLine: FC<Props> = ({ oil }) => {
    const { handleToggleOil, inputType, selectedOils, setSelectedOils } = useSoapRecipe();

    const isGramMode = inputType === "gram";
    const isPercentMode = inputType === "percent";



    return (
        <div
            className="border border-purple-100 bg-white/70 backdrop-blur-sm
      rounded-xl p-3 sm:p-4 shadow-sm relative text-sm sm:text-base mb-2"
        >
            {/* Верхняя строка — название и корзина */}
            <div className="flex justify-between items-start mb-3">
                <div className="text-gray-800 font-semibold truncate flex items-center gap-1">
                    {oil.name_rus}
                </div>
                <button
                    onClick={() => handleToggleOil(oil)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 md:hover:text-red-500 transition"
                    title="Удалить масло"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            {/* Нижняя строка — проценты и граммы */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-6">
                {/* Граммы */}
                <div className="flex items-center gap-1">
                    <SmartNumberInput
                        placeholder="Граммы"
                        value={oil.gram || 0}
                        onChange={(newValue) => {
                            const updatedOils = selectedOils.map((o) =>
                                o.id === oil.id ? { ...o, gram: newValue } : o
                            );
                            setSelectedOils(updatedOils);
                        }}
                        disabled={isPercentMode}
                        className={`w-24 sm:w-28 border rounded px-2 py-1 text-gray-800 placeholder:text-xs placeholder:text-gray-400
              ${isPercentMode ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200" : "border-gray-300"}`}
                    />
                    <span className="text-gray-500">г</span>
                </div>

                {/* Проценты */}
                <div className="flex items-center gap-1">
                    <SmartNumberInput
                        placeholder="Проценты"
                        value={oil.percent || 0}
                        onChange={() => {
                        }}
                        disabled={isGramMode}
                        className={`w-24 sm:w-28 border rounded px-2 py-1 text-gray-800 placeholder:text-xs placeholder:text-gray-400
              ${isGramMode ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200" : "border-gray-300"}`}
                    />
                    <span className="text-gray-500">%</span>
                </div>
            </div>
        </div>
    );
};
