import {FC, useState} from "react";

export const Mode: FC = () => {

    const [inputMode, setInputMode] = useState<'grams' | 'percent'>('grams');
    const [totalWeight, setTotalWeight] = useState<number>(0);


    return (
        <div className="border border-purple-100 bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-2 mb-2 shadow-sm">
            {/*<h3 className="text-lg font-semibold text-purple-700 mb-4 text-center sm:text-left">*/}
            {/*    ⚖️ Режим ввода массы*/}
            {/*</h3>*/}

            <div className="flex flex-col sm:flex-row sm:items-center gap-y-4 sm:gap-y-0 sm:gap-x-10">
                {/* Граммы */}
                <label className="flex items-center gap-1 text-sm text-gray-600 font-medium cursor-pointer sm:mr-2">
                    <input
                        type="radio"
                        name="inputMode"
                        value="grams"
                        checked={inputMode === 'grams'}
                        onChange={() => setInputMode('grams')}
                        className="text-purple-600 focus:ring-purple-500"
                    />
                    Граммы
                </label>

                {/* Группа: Проценты + Общий вес */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    {/* Проценты */}
                    <label className="flex items-center gap-1 text-sm text-gray-600 font-medium cursor-pointer">
                        <input
                            type="radio"
                            name="inputMode"
                            value="percent"
                            checked={inputMode === 'percent'}
                            onChange={() => setInputMode('percent')}
                            className="text-purple-600 focus:ring-purple-500"
                        />
                        Проценты
                    </label>

                    {/* Общий вес */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 whitespace-nowrap">Общий вес</label>
                        <input
                            type="number"
                            disabled={inputMode === 'grams'}
                            className={`w-32 border rounded px-2 py-1 transition ${
                                inputMode === 'grams'
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-800'
                            }`}
                            value={totalWeight}
                            onChange={(e) => setTotalWeight(+e.target.value)}
                        />
                        <span className="text-sm text-gray-500">г</span>
                    </div>
                </div>
            </div>
        </div>





    );

};