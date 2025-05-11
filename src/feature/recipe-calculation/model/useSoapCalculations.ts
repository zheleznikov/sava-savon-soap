import {useEffect, useRef, useState} from "react";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {
    calculateAcidSum,
    calculateLyeSum,
    calculateOilSum,
    calculateWaterSum,
    isValidPercentRange,
    scaleRecipeToTotalWeight, scaleRecipeToTotalWeightDevelop
} from "../libs/calcRecipeUtils";


const useSoapCalculations = () => {
    // const {
    //     selectedOils,
    //     lyeType,
    //     superfatPercent,
    //     waterPercent,
    //     oilInputType,
    //     userDefinedTotalWeight,
    //     setSelectedOils,
    //     selectedAcids,
    //     acidInputType,
    //     setSelectedAcids,
    //     setUserDefinedTotalWeight
    // } = useSoapRecipe();
    //
    //
    // const [totalOilAmount, setTotalOilAmount] = useState(0);
    // const [totalLyeAmount, setTotalLyeAmount] = useState(0);
    // const [totalWaterAmount, setTotalWaterAmount] = useState(0);
    // const [totalResultAmount, setTotalResultAmount] = useState(0);
    // const [totalAcidAmount, setTotalAcidAmount] = useState(0);
    //
    // const prevOilInputType = useRef<InputType | null>(null);

    // useEffect(() => {
    //         // Сумма масел
    //         const oilSum = calculateOilSum({
    //             selectedOils,
    //             oilInputType,
    //             userDefinedTotalWeight,
    //             waterPercent,
    //             superfatPercent
    //         });
    //
    //         setTotalOilAmount(oilSum);
    //
    //         const acidSum = calculateAcidSum({selectedAcids, acidInputType, totalOilAmount: oilSum});
    //         setTotalAcidAmount(acidSum);
    //
    //         // Общая щелочь  - щёлочь по каждому маслу
    //         const lyeSum = calculateLyeSum({selectedOils, lyeType, superfatPercent, selectedAcids})
    //         setTotalLyeAmount(lyeSum);
    //
    //         const waterSum = calculateWaterSum(oilSum, waterPercent);
    //         setTotalWaterAmount(waterSum);
    //
    //         setTotalResultAmount(oilSum + lyeSum + waterSum + acidSum);
    //
    //         // --- Детект смены режима грамм <-> процент ---
    //         if (prevOilInputType.current === InputType.Gram && oilInputType === InputType.Percent) {
    //             // Переход с граммов в проценты — обновляем userDefinedTotalWeight
    //             setUserDefinedTotalWeight(oilSum + lyeSum + waterSum + acidSum); // или totalResultAmount
    //         }
    //         prevOilInputType.current = oilInputType;
    //
    //
    //         // Обновление общего веса // TODO возможно потребуется что-то сделать здесь
    //         if (
    //             oilInputType === InputType.Percent &&
    //             (selectedAcids.length === 0 || acidInputType === InputType.Percent) &&
    //             oilSum > 0
    //         ) {
    //             const totalPercent = selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);
    //
    //
    //             if (isValidPercentRange(totalPercent)) {
    //                 const {oils: updatedOils, acids: updatedAcids} = scaleRecipeToTotalWeightDevelop({
    //                     selectedOils,
    //                     selectedAcids,
    //                     userDefinedTotalWeight,
    //                     waterPercent,
    //                     superfatPercent,
    //                     lyeType,
    //                     acidInputType
    //                 });
    //
    //                 const hasOilChanged = updatedOils.some((o, i) => o.gram !== selectedOils[i].gram);
    //                 const hasAcidChanged = updatedAcids.some((a, i) => a.gram !== selectedAcids[i]?.gram);
    //
    //                 if (hasOilChanged) setSelectedOils(updatedOils);
    //                 if (hasAcidChanged) setSelectedAcids(updatedAcids);
    //             }
    //
    //         }
    //
    //     },
    //     [selectedOils, lyeType, superfatPercent, waterPercent, oilInputType, userDefinedTotalWeight, selectedAcids, acidInputType]);


    // const calculateRecipe = () => {
    //     const oilSum = calculateOilSum({
    //         selectedOils,
    //         oilInputType,
    //         userDefinedTotalWeight,
    //         waterPercent,
    //         superfatPercent
    //     });
    //
    //     setTotalOilAmount(oilSum);
    //
    //     const acidSum = calculateAcidSum({selectedAcids, acidInputType, totalOilAmount: oilSum});
    //     setTotalAcidAmount(acidSum);
    //
    //     // Общая щелочь  - щёлочь по каждому маслу
    //     const lyeSum = calculateLyeSum({selectedOils, lyeType, superfatPercent, selectedAcids})
    //     setTotalLyeAmount(lyeSum);
    //
    //     const waterSum = calculateWaterSum(oilSum, waterPercent);
    //     setTotalWaterAmount(waterSum);
    //
    //     setTotalResultAmount(oilSum + lyeSum + waterSum + acidSum);
    //
    //     // Обновление общего веса // TODO возможно потребуется что-то сделать здесь
    //     if (
    //         oilInputType === InputType.Percent &&
    //         (selectedAcids.length === 0 || acidInputType === InputType.Percent) &&
    //         oilSum > 0
    //     ) {
    //         const totalPercent = selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);
    //
    //
    //         if (isValidPercentRange(totalPercent)) {
    //             const {oils: updatedOils, acids: updatedAcids} = scaleRecipeToTotalWeightDevelop({
    //                 selectedOils,
    //                 selectedAcids,
    //                 userDefinedTotalWeight,
    //                 waterPercent,
    //                 superfatPercent,
    //                 lyeType,
    //                 acidInputType
    //             });
    //
    //             const hasOilChanged = updatedOils.some((o, i) => o.gram !== selectedOils[i].gram);
    //             const hasAcidChanged = updatedAcids.some((a, i) => a.gram !== selectedAcids[i]?.gram);
    //
    //             if (hasOilChanged) setSelectedOils(updatedOils);
    //             if (hasAcidChanged) setSelectedAcids(updatedAcids);
    //         }
    //
    //     }
    //
    // };
    //
    // return {
    //     totalOilAmount,
    //     setTotalOilAmount,
    //     totalLyeAmount,
    //     totalWaterAmount,
    //     totalResultAmount,
    //     setTotalResultAmount,
    //     totalAcidAmount,
    //     setTotalAcidAmount,
    //     calculateRecipe
    // };
};
