import {createSlice} from "@reduxjs/toolkit";
import {recipeSliceinitialState} from "./recipeSliceInitialState";
import {setters} from "../libs/recipeSliceSetters";
import {handlers, toggleHandlers} from "../libs/recipeSliceHandlers";
import {calculations} from "../libs/recipeSliceCalculations";


export const recipeSlice = createSlice({
    name: "recipe",
    initialState: recipeSliceinitialState,
    reducers: {
        ...setters,
        ...toggleHandlers,
        ...handlers,
        ...calculations
    }
});

export const {
    setRecipeName,
    setSelectedOils,
    setSelectedAcids,
    setOilInputType,
    setAcidInputType,
    setLyeType,
    setWaterInputType,
    setWaterPercent,
    setSuperfatPercent,
    setNaOHPurity,
    setKOHPurity,
    setNaOHPercentageInMixed,
    setKOHPercentageInMixed,
    setUserDefinedTotalWeight,
    calculateRecipeProperties,
    toggleOil,
    toggleAcid,
    updateOilMassWithRecalculatedPercents,
    updateAcidMassWithRecalculatedPercents,
    updateOilPercentWithMassRecalculation,
    updateAcidPercentWithMassRecalculation,
    calculateRecipe,
    setLyeConcentration,
    setWaterLyeRatio,
    setSelectedAddIngredients,
    toggleCustom,
    setCustomInputType,
    updateCustomMassWithRecalculatedPercents,
    updateCustomPercentWithMassRecalculation,
    setMeasureInput
} = recipeSlice.actions;

export default recipeSlice.reducer;
