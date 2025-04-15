import {FC, useState} from "react";
import {useCalculator} from "../hooks/useCalculator";
import {selectedOil} from "../types/selectedOil";
import {OilInputLine} from "./OilInputLine";
import {WaterLine} from "./WaterLine";
import {LyeLine} from "./LyeLine";
import {SuperFatLine} from "./SuperFatLine";
import {TotalWeightLine} from "./TotalWeightLine";
import {OilAddedLine} from "./OilAddedLine";

export const Calculator: FC = () => {


    const {
        selectedOils,
        setSelectedOils
    } = useCalculator();

    const addOil = (oil: selectedOil) => {
        setSelectedOils([oil, ...selectedOils]);
    };


    const [recipeName, setRecipeName] = useState("");



    return (
        <>
            <h1 className="text-3xl sm:text-4xl font-semibold text-purple-700 mb-8 text-center tracking-wide">
                🧼 Калькулятор мыла
            </h1>

            <div className="border border-purple-100 bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-1 sm:pt-2 mb-2 shadow-sm">
                <WaterLine/>
                <SuperFatLine/>
                <LyeLine/>
                <div>
                    <OilAddedLine/>
                    {/*<OilAddedLine/>*/}
                </div>

                <TotalWeightLine/>


                <OilInputLine addOil={addOil}/>


            </div>


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


        </>
    );
};