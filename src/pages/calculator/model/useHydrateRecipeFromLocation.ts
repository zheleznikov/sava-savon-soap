import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import {useSoapRecipe} from "../../../feature/recipe-calculation";
import {oils} from "../../../entities/oil/model/oils";
import {hydrateRecipeFromState} from "../libs/hydrateRecipeFromState";

export const useHydrateRecipeFromLocation = () => {
    // const location = useLocation();
    // const context = useSoapRecipe();
    //
    // useEffect(() => {
    //     const state = location.state as any;
    //     if (!state) return;
    //
    //     const hydrated = hydrateRecipeFromState(state, oils);
    //
    //     context.setRecipeName(hydrated.recipeName);
    //     context.setSelectedOils(hydrated.selectedOils);
    //     context.setLyeType(hydrated.lyeType);
    //     context.setSuperfatPercent(hydrated.superfatPercent);
    //     context.setWaterPercent(hydrated.waterPercent);
    //
    //     if (hydrated.totalOilAmount) {
    //         context.setUserDefinedTotalWeight(hydrated.totalOilAmount);
    //     }
    // }, [location.state]);
};


