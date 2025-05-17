import {RecipeState} from "../types/recipeScile.interface";
import {PayloadAction} from "@reduxjs/toolkit/dist";
import {
    InputType, LyeType,
    MeasureInputType,
    WaterInputType
} from "../../../app/providers/SoapRecipeContext.types";
import {TOil} from "../../../entities/oil/model/oil.types";
import {TCustom} from "../../../entities/oil/model/custom.types";
import {TAcid} from "../../../entities/oil/model/acids.types";

export const setters = {
    setRecipeName: (state: RecipeState, action: PayloadAction<string>) => {
        state.input.description.recipeName = action.payload;
    },

    setMeasureInput: (state: RecipeState, action: PayloadAction<MeasureInputType>) => {
        state.input.params.measureInput = action.payload;
    },

    setSelectedOils: (state: RecipeState, action: PayloadAction<TOil[]>) => {
        state.input.ingredients.selectedOils = action.payload;
        state.status.status = "dirty";
    },

    setSelectedAddIngredients: (state: RecipeState, action: PayloadAction<TCustom[]>) => {
        state.input.ingredients.selectedCustoms = action.payload;
        state.status.status = "dirty";
    },

    setSelectedAcids: (state: RecipeState, action: PayloadAction<TAcid[]>) => {
        state.input.ingredients.selectedAcids = action.payload;
        state.status.status = "dirty";
    },

    setOilInputType: (state: RecipeState, action: PayloadAction<InputType>) => {
        state.input.params.oilInputType = action.payload;
    },

    setWaterInputType: (state: RecipeState, action: PayloadAction<WaterInputType>) => {
        state.input.params.waterInput.waterInputType = action.payload;
    },

    setAcidInputType: (state: RecipeState, action: PayloadAction<{ acidId: number; inputType: InputType }>) => {
        const {acidId, inputType} = action.payload;
        const acid = state.input.ingredients.selectedAcids.find((a) => a.id === acidId);
        if (acid) {
            acid.inputType = inputType;
        }
    },

    setCustomInputType: (
        state: RecipeState,
        action: PayloadAction<{ customId: number; inputType: InputType }>
    ) => {
        const {customId, inputType} = action.payload;
        const custom = state.input.ingredients.selectedCustoms.find((a) => a.id === customId);
        if (customId && custom) {
            custom.inputType = inputType;
        }
    },
    setLyeType: (state: RecipeState, action: PayloadAction<LyeType>) => {
        state.input.params.lyeTypeInput.lyeType = action.payload;
        state.status.status = "dirty";
    },

    setWaterPercent: (state: RecipeState, action: PayloadAction<number>) => {
        state.input.params.waterInput.waterPercent = action.payload;
        state.status.status = "dirty";
    },

    setLyeConcentration: (state: RecipeState, action: PayloadAction<number>) => {
        state.input.params.waterInput.lyeConcentration = action.payload;
        state.status.status = "dirty";
    },

    setSuperfatPercent: (state: RecipeState, action: PayloadAction<number>) => {
        state.input.params.superfatPercent = action.payload;
        state.status.status = "dirty";
    },

    setUserDefinedTotalWeight: (state: RecipeState, action: PayloadAction<number>) => {
        state.input.params.userDefinedTotalWeight = action.payload;
        state.status.status = "dirty";
    },

    setNaOHPurity: (state: RecipeState, action: PayloadAction<number>) => {
        state.input.params.lyeTypeInput.NaOHPurity = action.payload;
        state.status.status = "dirty";
    },

    setKOHPurity: (state: RecipeState, action: PayloadAction<number>) => {
        state.input.params.lyeTypeInput.KOHPurity = action.payload;
        state.status.status = "dirty";
    },

    setNaOHPercentageInMixed: (state: RecipeState, action: PayloadAction<number>) => {
        state.input.params.lyeTypeInput.NaOHPercentageInMixed = action.payload;
        state.status.status = "dirty";
    },

    setKOHPercentageInMixed: (state: RecipeState, action: PayloadAction<number>) => {
        state.input.params.lyeTypeInput.KOHPercentageInMixed = action.payload;
        state.status.status = "dirty";
    },

    setWaterLyeRatio: (state: RecipeState, action: PayloadAction<number>) => {
        state.input.params.waterInput.waterLyeRatio = action.payload;
        state.status.status = "dirty";
    },
}
