import {createSlice} from "@reduxjs/toolkit";
import {recipeSliceinitialState} from "./recipeSliceInitialState";
import {setters} from "../reducers/setters";
import {handlers, toggleHandlers} from "../reducers/handlers";
import {calculations} from "../reducers/calculations";


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
    updateAcidPercentWithMassRecalculation,
    calculateRecipe,
    setLyeConcentration,
    setWaterLyeRatio,
    setSelectedAddIngredients,
    toggleCustom,
    setCustomInputType,
    updateCustomMassWithRecalculatedPercents,
    updateCustomPercentWithMassRecalculation,
    setMeasureInput,
    updateOilPercent
} = recipeSlice.actions;

export default recipeSlice.reducer;
