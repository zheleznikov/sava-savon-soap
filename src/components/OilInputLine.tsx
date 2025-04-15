import {OilAutocomplete} from "./OilAutocomplete";
import {FC} from "react";
import {TSelectedOil} from "../types/TSelectedOil";

interface Props {
    addOil: (oil: TSelectedOil | null) => void;
    selectedOils: TSelectedOil []
}

export const OilInputLine: FC<Props> = ({addOil, selectedOils}) => {

    return (
        <div
            className="z-10 border border-purple-100 bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-2 mb-2 shadow-sm overflow-visible mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full mb-2">
                {/* Автокомплит */}
                <div className="w-full sm:flex-[2]">
                    <h2 className={"text-xl sm:text-xl font-semibold text-purple-700 mb-1 text-center tracking-wide"}>

                        🫒 Добавить масло</h2>
                    <OilAutocomplete onChange={addOil} selectedOils={selectedOils}/>
                </div>
            </div>

        </div>


    );

};