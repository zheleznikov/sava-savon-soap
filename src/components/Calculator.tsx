import {FC} from "react";
import {useCalculator} from "../hooks/useCalculator";
import {TSelectedOil} from "../types/TSelectedOil";
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

    const addOil = (oil: TSelectedOil | null) => {
        oil && setSelectedOils([...selectedOils, oil]);
    };

    const removeOil = (oilName: string) => {
        setSelectedOils(selectedOils.filter(oil => oil.oil!.name !== oilName));
    };



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
                    {
                        selectedOils.map((it,i) => <OilAddedLine oil={it} key={i} onRemove={removeOil}/>)
                    }

                </div>

                <TotalWeightLine/>


                <OilInputLine addOil={addOil} selectedOils={selectedOils}/>

            </div>



        </>
    );
};