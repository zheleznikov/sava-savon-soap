import { useState } from "react";
import { TOil } from "../data/oils2";
import {OilAutocomplete} from "../components/OilAutocomplete";
import {OilAddedLine} from "../components/OilAddedLine";
import {BasicParamsBlock} from "./BasicParamsBlock";
import {InputModeBlock} from "../components/InputModeBlock";

export const InputBlock = () => {
    const [selectedOils, setSelectedOils] = useState<TOil[]>([]);

    const [lyeType, setLyeType] = useState<"NaOH" | "KOH">("NaOH");
    const [waterPercent, setWaterPercent] = useState(30);
    const [superfatPercent, setSuperfatPercent] = useState(5);

    const [usePercent, setUsePercent] = useState(false);
    const [totalWeight, setTotalWeight] = useState(500);



    const handleToggleOil = (oil: TOil) => {
        setSelectedOils((prev) =>
            prev.some((o) => o.id === oil.id)
                ? prev.filter((o) => o.id !== oil.id) // убрать
                : [...prev, oil] // добавить
        );
    };

    return (
        <div>
            {/*<h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Ввод масла</h4>*/}
            <InputModeBlock
                usePercent={usePercent}
                onModeChange={setUsePercent}
                totalWeight={totalWeight}
                onTotalWeightChange={setTotalWeight}
            />
            {/*<h4 className="text-lg font-semibold text-gray-800 text-center">Основные параметры</h4>*/}
            <BasicParamsBlock
                lyeType={lyeType}
                onLyeTypeChange={setLyeType}
                waterPercent={waterPercent}
                onWaterPercentChange={setWaterPercent}
                superfatPercent={superfatPercent}
                onSuperfatChange={setSuperfatPercent}
            />

            {/*<h3 className="text-lg font-semibold text-gray-800 text-center">Выбор масел</h3>*/}


            <OilAutocomplete onToggle={handleToggleOil} selectedOils={selectedOils} />

            {selectedOils.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-sm text-gray-600 mb-1">Выбранные масла:</h4>
                        {selectedOils.map((oil) => (
                            <OilAddedLine oil={oil} onRemove={handleToggleOil}/>
                        ))}
                </div>
            )}
        </div>
    );
};