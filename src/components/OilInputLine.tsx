import {OilAutocomplete} from "./OilAutocomplete";
import React, {FC, useState} from "react";
import {Oil} from "../data/oils";
import {selectedOil} from "../types/selectedOil";
import {SmartNumberInput} from "./SmartNumberInput";
import {Mode} from "./Mode";

interface Props {
    addOil: (oil: selectedOil) => void
}
export const OilInputLine: FC<Props> = () => {

    const [selectedOil, setSelectedOil] = useState<Oil | null>(null);
    const [weight, setWeight] = useState(0);
    const [percent, setPercent] = useState(0);




    return (
        <div className="z-10 border border-purple-100 bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-2 mb-2 shadow-sm overflow-visible mt-8">
            {/*/!* Заголовок *!/*/}

            {/* Строка ввода */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full mb-2">

                {/* Автокомплит */}
                <div className="w-full sm:flex-[2]">
                    <h2 className={"text-xl sm:text-xl font-semibold text-purple-700 mb-1 text-center tracking-wide"}>

                        🫒 Добавить масло</h2>
                    <OilAutocomplete value={selectedOil} onChange={setSelectedOil} />
                </div>
                {/*<div>*/}
                {/*    <label className="flex items-center gap-1 text-sm text-gray-600 font-medium cursor-pointer">*/}
                {/*        <input*/}
                {/*            type="radio"*/}
                {/*            name="inputMode"*/}
                {/*            value="percent"*/}
                {/*            checked={inputMode === 'percent'}*/}
                {/*            onChange={() => setInputMode('percent')}*/}
                {/*            className="text-purple-600 focus:ring-purple-500"*/}
                {/*        />*/}
                {/*        %*/}
                {/*    </label>*/}
                {/*    <label className="flex items-center gap-1 text-sm text-gray-600 font-medium cursor-pointer sm:mr-2">*/}
                {/*        <input*/}
                {/*            type="radio"*/}
                {/*            name="inputMode"*/}
                {/*            value="grams"*/}
                {/*            checked={inputMode === 'grams'}*/}
                {/*            onChange={() => setInputMode('grams')}*/}
                {/*            className="text-purple-600 focus:ring-purple-500"*/}
                {/*        />*/}
                {/*        г*/}
                {/*    </label>*/}


                {/*</div>*/}

                {/*/!* Проценты *!/*/}
                {/*<div className="flex items-center gap-2">*/}
                {/*    <SmartNumberInput*/}
                {/*        value={percent}*/}
                {/*        onChange={setPercent}*/}
                {/*        className="w-20 border rounded px-2 py-1"*/}
                {/*    />*/}
                {/*    <span className="text-sm text-gray-500">%</span>*/}
                {/*</div>*/}

                {/* Граммы */}
                {/*<div className="flex items-center gap-2">*/}
                {/*    <SmartNumberInput*/}
                {/*        value={weight}*/}
                {/*        onChange={setWeight}*/}
                {/*        className="w-20 border rounded px-2 py-1"*/}
                {/*    />*/}
                {/*    <span className="text-sm text-gray-500">г</span>*/}
                {/*</div>*/}


            </div>
            {/* Кнопка "Добавить" — компактная */}
            <div className={"flex justify-center"}>

                {/*<button*/}
                {/*    onClick={() => {*/}
                {/*        // handleAdd()*/}
                {/*    }}*/}
                {/*    className="bg-purple-500 text-white font-medium px-6 py-2 rounded-full shadow hover:bg-purple-600 transition duration-200"*/}
                {/*    title="Добавить масло"*/}
                {/*>*/}
                {/*    🫒 Добавить масло*/}
                {/*</button>*/}
            </div>

        </div>



    );

};