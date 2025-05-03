import {TOil} from "../../../entities/oil/model/oil.types";
import {LyeType} from "../../../app/providers/SoapRecipeContext.types";

interface HydrationInput {
    recipeName: string;
    selectedOils: TOil[];
    totalOilAmount: number;
    totalLyeAmount: number;
    totalWaterAmount: number;
    totalResultAmount: number;
    lyeType: LyeType;
    superfatPercent: number;
    waterPercent: number;
    properties: any;
}

export function hydrateRecipeFromState(state: HydrationInput, oils: TOil[]) {
    const realSelectedOils = state.selectedOils.map(oilFromState => {
        const realOil = oils.find(o => o.id === oilFromState.id);
        return realOil
            ? { ...realOil, gram: oilFromState.gram, percent: oilFromState.percent }
            : oilFromState;
    });

    return {
        recipeName: state.recipeName,
        selectedOils: realSelectedOils,
        lyeType: state.lyeType,
        superfatPercent: state.superfatPercent,
        waterPercent: state.waterPercent,
        totalOilAmount: state.totalOilAmount,
    };
}
