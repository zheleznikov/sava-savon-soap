import { FC } from "react";
import { SmartNumberInput } from "./SmartNumberInput";
import { TOil } from "../data/oils2";
import { Trash2 } from "lucide-react"; // npm install lucide-react

interface Props {
    oil: TOil;
    onRemove: (oil: TOil) => void;
}

export const OilAddedLine: FC<Props> = ({ oil, onRemove }) => {
    return (
        <div
            className="border border-purple-100 bg-white/70 backdrop-blur-sm
      rounded-xl p-3 sm:p-4 shadow-sm relative text-sm sm:text-base"
        >
            {/* Верхняя строка — название и корзина */}
            <div className="flex justify-between items-start mb-3">
                <div className="text-gray-800 font-semibold truncate flex items-center gap-1">
                    {oil.name_rus}
                </div>
                <button
                    onClick={() => onRemove(oil)}
                    className="text-gray-400 hover:text-red-500 transition"
                    title="Удалить масло"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            {/* Нижняя строка — проценты и граммы */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-6">
                {/* Проценты */}
                <div className="flex items-center gap-1">
                    <SmartNumberInput
                        placeholder="Проценты"
                        value={0}
                        onChange={() => {}}
                        className="w-24 sm:w-28 border border-gray-300 rounded px-2 py-1 text-gray-800
              placeholder:text-xs placeholder:text-gray-400"
                    />
                    <span className="text-gray-500">%</span>
                </div>

                {/* Граммы */}
                <div className="flex items-center gap-1">
                    <SmartNumberInput
                        placeholder="Граммы"
                        value={0}
                        onChange={() => {}}
                        className="w-24 sm:w-28 border border-gray-300 rounded px-2 py-1 text-gray-800
              placeholder:text-xs placeholder:text-gray-400"
                    />
                    <span className="text-gray-500">г</span>
                </div>
            </div>
        </div>
    );
};
