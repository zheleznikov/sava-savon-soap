import { useSoapRecipe } from "./useSoapRecipe";
import { useSoapCalculations } from "./useSoapCalculations";
import { useSoapProperties } from "./useSoapProperties";

export const useSaveRecipe = () => {
    const {
        recipeName,
        inputType,
        lyeType,
        waterPercent,
        superfatPercent,
        selectedOils,
        userDefinedTotalWeight
    } = useSoapRecipe();

    const {
        totalOilAmount,
        totalLyeAmount,
        totalWaterAmount,
        totalResultAmount
    } = useSoapCalculations();

    const properties = useSoapProperties();

    const handleSaveRecipe = () => {
        const recipeData = {
            name: recipeName,
            inputType,
            lyeType,
            waterPercent,
            superfatPercent,
            userDefinedTotalWeight,
            selectedOils: selectedOils.map((oil) => ({
                id: oil.id,
                name: oil.name_rus,
                gram: oil.gram,
                percent: oil.percent,
            })),
            totals: {
                totalOilAmount,
                totalLyeAmount,
                totalWaterAmount,
                totalResultAmount,
            },
            properties,
        };

        console.log("Сохраняемый рецепт:", recipeData);
    };

    return { handleSaveRecipe };
};
