import { useSoapRecipe } from "../context/useSoapRecipe";
import { useState, useEffect } from "react";

export const useSoapCalculations = () => {
    const { selectedOils, lyeType, superfatPercent, waterPercent } = useSoapRecipe();

    const [totalOilWeight, setTotalOilWeight] = useState(0);
    const [totalLyeAmount, setTotalLyeAmount] = useState(0);
    const [totalWaterAmount, setTotalWaterAmount] = useState(0);
    const [totalResultWeight, setTotalResultWeight] = useState(0);

    useEffect(() => {
        const oilSum = selectedOils.reduce((acc, oil) => acc + (oil.gram || 0), 0);
        setTotalOilWeight(oilSum);

        const lyeSum = selectedOils.reduce((acc, oil) => {
            const sapValue = lyeType === "NaOH" ? oil.sap.naoh : oil.sap.koh;
            return acc + (oil.gram || 0) * sapValue * (1 - superfatPercent / 100);
        }, 0);
        setTotalLyeAmount(lyeSum);

        const waterSum = oilSum * (waterPercent / 100);
        setTotalWaterAmount(waterSum);

        setTotalResultWeight(oilSum + lyeSum + waterSum);
    }, [selectedOils, lyeType, superfatPercent, waterPercent]);

    return {
        totalOilWeight,
        setTotalOilWeight,
        totalLyeAmount,
        totalWaterAmount,
        totalResultWeight,
        setTotalResultWeight,
    };
};
