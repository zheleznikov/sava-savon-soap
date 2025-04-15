import {FC, useState} from "react";

export const ResultReceipt: FC = () => {
    const [recipeName, setRecipeName] = useState("");
    const totalWater = 120.55; // расчётное значение
    const totalLye = 17.33;     // расчётное значение

    return (
        <div className="border border-purple-100 bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-8 shadow-sm">
            {/* Заголовок */}
            <h3 className="text-lg font-semibold text-purple-700 mb-4 text-center sm:text-left">
                📦 Рецепт
            </h3>

            {/* Общая вода */}
            <div className="border border-purple-100 bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-2 mb-2 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                    <div className="w-full sm:flex-[2] text-sm text-gray-700 font-medium">
                        💧 Общая вода
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            readOnly
                            value={totalWater.toFixed(2)}
                            className="w-20 border rounded px-2 py-1 bg-gray-100 text-gray-600 cursor-default"
                        />
                        <span className="text-sm text-gray-500">г</span>
                    </div>
                </div>
            </div>

            {/* Общая щёлочь */}
            <div className="border border-purple-100 bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-2 mb-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                    <div className="w-full sm:flex-[2] text-sm text-gray-700 font-medium">
                        ⚗️ Общая щёлочь
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            readOnly
                            value={totalLye.toFixed(2)}
                            className="w-20 border rounded px-2 py-1 bg-gray-100 text-gray-600 cursor-default"
                        />
                        <span className="text-sm text-gray-500">г</span>
                    </div>
                </div>
            </div>

            {/* Название и кнопка */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Название рецепта */}
                <div className="flex flex-col w-full sm:max-w-md">
                    <label className="text-sm text-gray-600 mb-1">Название рецепта:</label>
                    <input
                        type="text"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        className="border rounded px-3 py-1 w-full"
                        placeholder="Например, 'Мыло с лавандой'"
                    />
                </div>

                {/* Кнопка "Сохранить" */}
                <div className="sm:ml-auto sm:self-end">
                    <button
                        onClick={() => {
                            // handleSaveRecipe()
                        }}
                        className="bg-purple-500 text-white font-medium px-6 py-2 rounded-full shadow hover:bg-purple-600 transition duration-200"
                    >
                        💾 Сохранить рецепт
                    </button>
                </div>
            </div>
        </div>



    );
};