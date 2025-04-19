import { useSoapRecipe } from "./useSoapRecipe";
import { useState, useEffect } from "react";
import {TOil} from "../data/oils2";


function averageSap(oils: TOil[], lyeType: "NaOH" | "KOH") {
    const totalGram = oils.reduce((sum, o) => sum + (o.gram || 0), 0);
    if (totalGram === 0) return 0;

    return oils.reduce((acc, o) => {
        const sap = lyeType === "NaOH" ? o.sap.naoh : o.sap.koh;
        return acc + (o.gram || 0) * sap;
    }, 0) / totalGram;
}

export const useSoapCalculationSaved = () => {
    const { selectedOils, setSelectedOils, lyeType, superfatPercent, waterPercent, inputType, userDefinedTotalWeight } = useSoapRecipe();

    const [totalOilWeight, setTotalOilWeight] = useState(0);
    const [totalLyeAmount, setTotalLyeAmount] = useState(0);
    const [totalWaterAmount, setTotalWaterAmount] = useState(0);
    const [totalResultWeight, setTotalResultWeight] = useState(0);

    useEffect(() => {
        // 1. Вычисление массы масел
        let oilSum = inputType === "gram"
            ? selectedOils.reduce((acc, oil) => acc + (oil.gram || 0), 0)
            : totalOilWeight; // временно, потом обновим

        if (inputType === "gram") {
            setTotalOilWeight(oilSum);
        } else {
            // в режиме процентов считаем массу масел как остаток
            const totalPercent = selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);
            if (totalPercent >= 99 && totalPercent <= 101) {
                oilSum = userDefinedTotalWeight / (1 + waterPercent / 100 + averageSap(selectedOils, lyeType) * (1 - superfatPercent / 100));
                setTotalOilWeight(oilSum);
            }
        }

        // 2. Щёлочь и вода
        const lyeSum = oilSum * averageSap(selectedOils, lyeType) * (1 - superfatPercent / 100);
        setTotalLyeAmount(lyeSum);

        const waterSum = oilSum * (waterPercent / 100);
        setTotalWaterAmount(waterSum);

        setTotalResultWeight(oilSum + lyeSum + waterSum);

        // 3. Обновление грамм
        if (inputType === "percent" && oilSum > 0) {
            const totalPercent = selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);

            if (totalPercent >= 99 && totalPercent <= 101) {
                const updatedOils = selectedOils.map((oil) => ({
                    ...oil,
                    gram: (oil.percent / 100) * oilSum,
                }));

                const hasChanged = updatedOils.some((o, i) => o.gram !== selectedOils[i].gram);

                if (hasChanged) {
                    setSelectedOils(updatedOils);
                }
            }
        }
    }, [selectedOils, lyeType, superfatPercent, waterPercent, inputType, userDefinedTotalWeight]);





    return {
        totalOilWeight,
        setTotalOilWeight,
        totalLyeAmount,
        totalWaterAmount,
        totalResultWeight,
        setTotalResultWeight,
    };
};
