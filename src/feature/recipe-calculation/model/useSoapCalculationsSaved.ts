import {useSoapRecipe} from "./useSoapRecipe";
import {useEffect, useState} from "react";
import {InputType, LyeType} from "../../../app/providers/SoapRecipeContext.types";


export const useSoapCalculations = () => {
    const { selectedOils, setSelectedOils, lyeType, superfatPercent, waterPercent, inputType, userDefinedTotalWeight } = useSoapRecipe();

    const [totalOilAmount, setTotalOilAmount] = useState(0);
    const [totalLyeAmount, setTotalLyeAmount] = useState(0);
    const [totalWaterAmount, setTotalWaterAmount] = useState(0);

    const [totalResultAmount, setTotalResultAmount] = useState(0);

    useEffect(() => {
        // 1. Вычисление массы масел
        let oilSum = inputType === InputType.Gram
            ? selectedOils.reduce((acc, oil) => acc + (oil.gram || 0), 0)
            : totalOilAmount; // временно, потом обновим

        if (inputType === InputType.Gram) {
            setTotalOilAmount(oilSum);
        } else {
            // в режиме процентов считаем массу масел как остаток
            const totalPercent = selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);
            if (totalPercent >= 99 && totalPercent <= 101) {

                // Предварительный подсчёт lyeSum и waterSum по массе масел — потребуется для расчёта oilSum
                const estimatedOilSum = userDefinedTotalWeight / (1 + waterPercent / 100 + 0.14 * (1 - superfatPercent / 100));
                oilSum = estimatedOilSum;
                setTotalOilAmount(oilSum);
            }
        }

        // 2. Щёлочь по каждому маслу
        const lyeSum = selectedOils.reduce((acc, oil) => {
            const sap = lyeType === LyeType.NaOH ? oil.sap.naoh : oil.sap.koh;
            return acc + (oil.gram || 0) * sap * (1 - superfatPercent / 100);
        }, 0);
        setTotalLyeAmount(lyeSum);

        const waterSum = oilSum * (waterPercent / 100);
        setTotalWaterAmount(waterSum);

        setTotalResultAmount(oilSum + lyeSum + waterSum);

        // 3. Обновление грамм
        if (inputType === InputType.Percent && oilSum > 0) {
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
        totalOilWeight: totalOilAmount,
        setTotalOilWeight: setTotalOilAmount,
        totalLyeAmount,
        totalWaterAmount,
        totalResultWeight: totalResultAmount,
        setTotalResultWeight: setTotalResultAmount,
    };
};
