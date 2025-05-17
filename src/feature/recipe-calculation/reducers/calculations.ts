import {soapPropsCalculation} from "../libs/soapPropsCalculation";
import {
    scaleRecipeToTotalWeight,
    syncIngredientsMassAndPercent
} from "../libs/core";
import {RecipeState} from "../types/recipeScile.interface";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {calculateLyeSum} from "../libs/lyeCalculation";
import {calculateSum} from "../libs/utils";
import {calculateWaterSum} from "../libs/waterCalculation";

export const calculations = {

    calculateRecipeProperties: (state: RecipeState) => {
        state.output.soapProperties = soapPropsCalculation(state.input.ingredients.selectedOils, state.input.params.oilInputType);
    },

    calculateRecipe: (state: RecipeState) => {
        const isPercentMode = state.input.params.oilInputType === InputType.Percent;
        const isMassMode = state.input.params.oilInputType === InputType.Mass;

        if (isPercentMode) {
            const {updatedOils, updatedAcids, updatedCustoms} = scaleRecipeToTotalWeight({
                selectedOils: state.input.ingredients.selectedOils,
                selectedAcids: state.input.ingredients.selectedAcids,
                selectedCustoms: state.input.ingredients.selectedCustoms,
                userDefinedTotalWeight: state.input.params.userDefinedTotalWeight,
                waterInput: state.input.params.waterInput,
                superfatPercent: state.input.params.superfatPercent,
                lyeTypeInput: state.input.params.lyeTypeInput,
            });

            state.input.ingredients.selectedOils = updatedOils;
            state.input.ingredients.selectedAcids = updatedAcids;
            state.input.ingredients.selectedCustoms = updatedCustoms;
        }

        const oilSum = calculateSum(state.input.ingredients.selectedOils);

        if (isMassMode) {

            const {oils, acids, customs} = syncIngredientsMassAndPercent(
                state.input.ingredients.selectedOils,
                state.input.ingredients.selectedAcids,
                state.input.ingredients.selectedCustoms,
                oilSum
            );
            state.input.ingredients.selectedOils = oils;
            state.input.ingredients.selectedAcids = acids;
            state.input.ingredients.selectedCustoms = customs;

        }

        state.output.total.totalOilAmount = oilSum;

        const acidSum = calculateSum(state.input.ingredients.selectedAcids);
        state.output.total.totalAcidAmount = acidSum;

        const customSum = calculateSum(state.input.ingredients.selectedCustoms);
        state.output.total.totalCustomAmount = customSum;

        const lyeSum = calculateLyeSum({
            selectedOils: state.input.ingredients.selectedOils,
            lyeType: state.input.params.lyeTypeInput.lyeType,
            superfatPercent: state.input.params.superfatPercent,
            selectedAcids: state.input.ingredients.selectedAcids,
            NaOHPurity: state.input.params.lyeTypeInput.NaOHPurity,
            KOHPurity: state.input.params.lyeTypeInput.KOHPurity,
            NaOHPercentageInMixed: state.input.params.lyeTypeInput.NaOHPercentageInMixed,
            KOHPercentageInMixed: state.input.params.lyeTypeInput.KOHPercentageInMixed,
        });

        state.output.total.totalLyeAmount = lyeSum.total;
        state.output.total.totalNaOHAmount = lyeSum.naoh;
        state.output.total.totalKOHAmount = lyeSum.koh;

        const waterSum = calculateWaterSum(
            oilSum,
            lyeSum.total,
            state.input.params.waterInput.waterInputType,
            state.input.params.waterInput.waterPercent,
            state.input.params.waterInput.lyeConcentration,
            state.input.params.waterInput.waterLyeRatio
        );

        state.output.total.totalWaterAmount = waterSum;

        const total = oilSum + lyeSum.total + waterSum + acidSum + customSum;
        state.output.total.totalResultAmount = total;

        if (isMassMode) {
            state.input.params.userDefinedTotalWeight = total;
        }

        state.output.soapProperties = soapPropsCalculation(state.input.ingredients.selectedOils, state.input.params.oilInputType);
    }


};
