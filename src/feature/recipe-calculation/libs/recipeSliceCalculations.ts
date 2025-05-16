import {calculateSoapProperties} from "./calculateSoapProperties";
import {
    calculateAcidSum,
    calculateCustomSum,
    calculateLyeSum,
    calculateOilSum, calculateWaterSum
} from "./calcRecipeUtils";
import {RecipeState} from "../types/recipeScile.interface";

export const calculations = {
    calculateRecipeProperties: (state: RecipeState) => {
        const properties = calculateSoapProperties(state.input.ingredients.selectedOils, state.input.params.oilInputType);
        state.output.soapProperties = properties;
    },

    calculateRecipe: (state: RecipeState) => {
        state.status.status = "calculating";

        const oilSum = calculateOilSum({
            selectedOils: state.input.ingredients.selectedOils,
            oilInputType: state.input.params.oilInputType,
            userDefinedTotalWeight: state.input.params.userDefinedTotalWeight,
            waterPercent: state.input.params.waterInput.waterPercent,
            superfatPercent: state.input.params.superfatPercent
        });

        state.output.total.totalOilAmount = oilSum;

        const acidSum = calculateAcidSum(state.input.ingredients.selectedAcids);
        state.output.total.totalAcidAmount = acidSum;

        const customSum = calculateCustomSum(state.input.ingredients.selectedCustoms);
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


        // Масштабирование, если ввод в процентах
        // const isPercentMode = state.oilInputType === InputType.Percent;
        // // const isAcidPercentMode = state.acidInputType === InputType.Percent;
        // // const hasOnlyOilsOrPercentAcids = state.selectedAcids.length === 0 || isAcidPercentMode;
        //
        // if (isPercentMode && hasOnlyOilsOrPercentAcids && oilSum > 0) {
        //     const totalPercent = state.selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);
        //
        //     if (isValidPercentRange(totalPercent)) {
        //         const {
        //             oils: updatedOils,
        //             acids: updatedAcids
        //         } = scaleRecipeToTotalWeightDevelop({
        //             selectedOils: state.selectedOils,
        //             selectedAcids: state.selectedAcids,
        //             userDefinedTotalWeight: state.userDefinedTotalWeight,
        //             waterPercent: state.waterPercent,
        //             superfatPercent: state.superfatPercent,
        //             lyeType: state.lyeType,
        //             acidInputType: state.acidInputType
        //         });
        //
        //         const hasOilChanged = updatedOils.some((o, i) => o.mass !== state.selectedOils[i]?.mass);
        //         const hasAcidChanged = updatedAcids.some((a, i) => a.mass !== state.selectedAcids[i]?.mass);
        //
        //         if (hasOilChanged) state.selectedOils = updatedOils;
        //         if (hasAcidChanged) state.selectedAcids = updatedAcids;
        //     }
        // }

        // Опционально: обновление SOAP-свойств
        state.output.soapProperties = calculateSoapProperties(state.input.ingredients.selectedOils, state.input.params.oilInputType);

        state.status.status = "ready";
        state.status.hasEverCalculated = true;

    }


};
