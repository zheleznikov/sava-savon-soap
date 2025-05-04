import {useSoapRecipe} from "./useSoapRecipe";
import {useEffect, useState} from "react";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {
    calculateLyeSum,
    calculateOilSum,
    calculateWaterSum,
    isValidPercentRange,
    scaleRecipeToTotalWeight
} from "../libs/calcRecipeUtils";


export const useSoapCalculations = () => {
    const {
        selectedOils,
        lyeType,
        superfatPercent,
        waterPercent,
        inputType,
        userDefinedTotalWeight,
        setSelectedOils,
    } = useSoapRecipe();



    const [totalOilAmount, setTotalOilAmount] = useState(0);
    const [totalLyeAmount, setTotalLyeAmount] = useState(0);
    const [totalWaterAmount, setTotalWaterAmount] = useState(0);
    const [totalResultAmount, setTotalResultAmount] = useState(0);

    useEffect(() => {
            // Сумма масел
            const oilSum = calculateOilSum({
                selectedOils,
                inputType,
                userDefinedTotalWeight,
                waterPercent,
                superfatPercent
            });

            setTotalOilAmount(oilSum);

            // Общая щелочь  - щёлочь по каждому маслу
            const lyeSum = calculateLyeSum({selectedOils, lyeType, superfatPercent})
            setTotalLyeAmount(lyeSum);

            const waterSum = calculateWaterSum(oilSum, waterPercent);
            setTotalWaterAmount(waterSum);

            setTotalResultAmount(oilSum + lyeSum + waterSum);

            // Обновление общего веса
            if (inputType === InputType.Percent && oilSum > 0) {
                const totalPercent = selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);

                if (isValidPercentRange(totalPercent)) {
                    const updatedOils = scaleRecipeToTotalWeight({
                        selectedOils,
                        userDefinedTotalWeight,
                        waterPercent,
                        superfatPercent,
                        lyeType
                    });

                    const hasChanged = updatedOils.some((o, i) => o.gram !== selectedOils[i].gram);

                    if (hasChanged) {
                        setSelectedOils(updatedOils);
                    }
                }
            }
        },
        [selectedOils, lyeType, superfatPercent, waterPercent, inputType, userDefinedTotalWeight]);

    return {
        totalOilAmount,
        setTotalOilAmount,
        totalLyeAmount,
        totalWaterAmount,
        totalResultAmount,
        setTotalResultAmount,
    };
};
