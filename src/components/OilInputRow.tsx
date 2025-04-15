import React, {FC, useState} from "react";
import { oils, Oil } from "../data/oils";
import { OilAutocomplete } from "./OilAutocomplete";
import {selectedOil} from "../types/selectedOil";

interface Props {
    addOil: (oil: selectedOil) => void
}

const OilInputRow: FC<Props> = ({addOil}) => {
    const [selectedOil, setSelectedOil] = useState<Oil | null>(null);


    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2 w-full relative">
                {/* Автокомплит */}
                <div className="w-full sm:flex-[2]">
                    <OilAutocomplete value={selectedOil} onChange={setSelectedOil} />
                </div>

                {/* Значения: проценты и граммы */}
                <div className="flex flex-col gap-1 w-full sm:w-auto">

                    <div className="flex gap-4 items-center">
                        {/* Проценты */}
                        <div className="flex items-center gap-1">
                            <input
                                type="number"
                                className="w-20 border rounded px-2 py-1"
                                value={10}
                                onChange={() => {}}
                            />
                            <span>%</span>
                        </div>

                        {/* Граммы */}
                        <div className="flex items-center gap-1">
                            <input
                                type="number"
                                className="w-20 border rounded px-2 py-1"
                                value={100}
                                onChange={() => {}}
                            />
                            <span>г</span>
                        </div>

                        <button
                            onClick={() => {
                                addOil({oil: selectedOil, weight: 0, percent: 0, id: 0});
                            }}

                            className="bg-purple-100 text-purple-800 px-3 py-1 rounded hover:bg-purple-200"
                        >
                            Добавить
                        </button>

                        {/* Удалить */}
                        <button
                            onClick={() => {}}
                            className="text-red-500 hover:text-red-700"
                            title="Удалить"
                        >
                            🗑
                        </button>
                    </div>
                </div>

            </div>

        </>

    );
};

export default OilInputRow;
