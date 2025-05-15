import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TOil} from "../../../entities/oil/model/oil.types";
import {TAcid} from "../../../entities/oil/model/acids.types";
import {InputType, LyeType, WaterInputType} from "../../../app/providers/SoapRecipeContext.types";
import {calculateSoapProperties} from "../libs/calculateSoapProperties";
import {
    calculateAcidSum,
    calculateLyeSum,
    calculateOilSum,
    calculateWaterSum,
    isValidPercentRange,
    scaleRecipeToTotalWeightDevelop
} from "../libs/calcRecipeUtils";
import {oils} from "../../../entities/oil/model/oils";

export type RecipeStatus = "idle" | "dirty" | "calculating" | "ready";

const defaultSelectedOils = oils.filter(oil => [2, 1, 29].includes(oil.id));

interface RecipeState {
    recipeName: string;
    selectedOils: TOil[];
    selectedAcids: TAcid[];
    oilInputType: InputType;
    acidInputType: InputType;
    lyeType: LyeType;
    waterInputType: WaterInputType
    NaOHPurity: number;
    KOHPurity: number;
    NaOHPercentageInMixed?: number; // активен при LyeType.Mixed
    KOHPercentageInMixed?: number;  // активен при LyeType.Mixed

    waterPercent: number;
    lyeConcentration: number;
    waterLyeRatio: number
    superfatPercent: number;
    userDefinedTotalWeight: number;
    soapProperties: SoapProperties;
    totalOilAmount: number;
    totalAcidAmount: number;
    totalLyeAmount: number;
    totalNaOHAmount: number;
    totalKOHAmount: number;
    totalWaterAmount: number;
    totalResultAmount: number;
    status: RecipeStatus;
    hasEverCalculated: boolean;

}

interface SoapProperties {
    hardness: number;
    cleansing: number;
    soften: number;
    bubbling: number;
    creaminess: number;
    iodine: number;
    ins: number;
}

const initialState: RecipeState = {
    recipeName: "",
    selectedOils: [...defaultSelectedOils],
    selectedAcids: [],
    oilInputType: InputType.Gram,
    acidInputType: InputType.Gram,
    lyeType: LyeType.NaOH,
    waterInputType: WaterInputType.WaterAsPercent,
    NaOHPurity: 100,
    KOHPurity: 100,
    waterPercent: 33,
    lyeConcentration: 33,
    waterLyeRatio: 2.0,
    superfatPercent: 5,
    userDefinedTotalWeight: 0,
    soapProperties: {
        hardness: 0,
        cleansing: 0,
        soften: 0,
        bubbling: 0,
        creaminess: 0,
        iodine: 0,
        ins: 0
    },
    totalOilAmount: 0,
    totalAcidAmount: 0,
    totalLyeAmount: 0,
    totalNaOHAmount: 0,
    totalKOHAmount: 0,
    totalWaterAmount: 0,
    totalResultAmount: 0,
    status: "idle",
    hasEverCalculated: false,
    NaOHPercentageInMixed: 50,
    KOHPercentageInMixed: 50

};

export const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {
        setRecipeName: (state, action: PayloadAction<string>) => {
            state.recipeName = action.payload;
        },

        setSelectedOils: (state, action: PayloadAction<TOil[]>) => {
            state.selectedOils = action.payload;
            state.status = "dirty";
        },

        setSelectedAcids: (state, action: PayloadAction<TAcid[]>) => {
            state.selectedAcids = action.payload;
            state.status = "dirty";
        },

        setOilInputType: (state, action: PayloadAction<InputType>) => {
            state.oilInputType = action.payload;
        },
        setWaterInputType: (state, action: PayloadAction<WaterInputType>) => {
            state.waterInputType = action.payload;
        },

        setAcidInputType: (
            state,
            action: PayloadAction<{ acidId: number; inputType: InputType }>
        ) => {
            const { acidId, inputType } = action.payload;
            const acid = state.selectedAcids.find((a) => a.id === acidId);
            if (acid) {
                acid.inputType = inputType;
            }
        },


        setLyeType: (state, action: PayloadAction<LyeType>) => {
            state.lyeType = action.payload;
            state.status = "dirty";
        },

        setWaterPercent: (state, action: PayloadAction<number>) => {
            state.waterPercent = action.payload;
            state.status = "dirty";
        },
        setLyeConcentration: (state, action: PayloadAction<number>) => {
            state.lyeConcentration = action.payload;
            state.status = "dirty";
        },

        setSuperfatPercent: (state, action: PayloadAction<number>) => {
            state.superfatPercent = action.payload;
            state.status = "dirty";
        },

        setUserDefinedTotalWeight: (state, action: PayloadAction<number>) => {
            state.userDefinedTotalWeight = action.payload;
            state.status = "dirty";
        },
        setNaOHPurity: (state, action: PayloadAction<number>) => {
            state.NaOHPurity = action.payload;
            state.status = "dirty";
        },
        setKOHPurity: (state, action: PayloadAction<number>) => {
            state.KOHPurity = action.payload;
            state.status = "dirty";
        },
        setNaOHPercentageInMixed: (state, action: PayloadAction<number>) => {
            state.NaOHPercentageInMixed = action.payload;
            state.status = "dirty";
        },
        setKOHPercentageInMixed: (state, action: PayloadAction<number>) => {
            state.KOHPercentageInMixed = action.payload;
            state.status = "dirty";
        },
        setWaterLyeRatio: (state, action: PayloadAction<number>) => {
            state.waterLyeRatio = action.payload;
            state.status = "dirty";
        },

        // управляющие функции
        calculateRecipeProperties: (state) => {
            const properties = calculateSoapProperties(state.selectedOils, state.oilInputType);
            state.soapProperties = properties;
        },

        toggleOil: (state, action: PayloadAction<TOil>) => {
            const oil = action.payload;
            const isSelected = state.selectedOils.some((o) => o.id === oil.id);

            const updated = isSelected
                ? state.selectedOils.filter((o) => o.id !== oil.id)
                : [...state.selectedOils, oil];

            const total = updated.reduce((sum, o) => sum + (o.gram || 0), 0);

            state.selectedOils = updated.map((o) => ({
                ...o,
                percent: total > 0 ? (o.gram / total) * 100 : 0
            }));

            state.totalOilAmount = calculateOilSum({
                selectedOils: state.selectedOils,
                oilInputType: state.oilInputType,
                userDefinedTotalWeight: state.userDefinedTotalWeight,
                waterPercent: state.waterPercent,
                superfatPercent: state.superfatPercent
            });


            state.status = "dirty";

        },

        toggleAcid: (state, action: PayloadAction<TAcid>) => {
            const acid = action.payload;
            const isSelected = state.selectedAcids.some((a) => a.id === acid.id);

            state.selectedAcids = isSelected
                ? state.selectedAcids.filter((a) => a.id !== acid.id)
                : [...state.selectedAcids, acid];
            state.status = "dirty";

        },

        updateOilGramWithRecalculatedPercents: (state, action: PayloadAction<{ oilId: number; newGram: number }>) => {
            const {oilId, newGram} = action.payload;

            const updated = state.selectedOils.map((o) =>
                o.id === oilId ? {...o, gram: newGram} : o
            );

            const total = updated.reduce((sum, o) => sum + (o.gram || 0), 0);

            state.selectedOils = updated.map((o) => ({
                ...o,
                percent: total > 0 ? (o.gram / total) * 100 : 0
            }));

            state.totalOilAmount = calculateOilSum({
                selectedOils: state.selectedOils,
                oilInputType: state.oilInputType,
                userDefinedTotalWeight: state.userDefinedTotalWeight,
                waterPercent: state.waterPercent,
                superfatPercent: state.superfatPercent
            });

            state.selectedAcids = state.selectedAcids.map((a) => ({
                ...a,
                gram: a.inputType === InputType.Percent && total > 0
                    ? (a.percent / 100) * total
                    : a.gram,
                percent: a.inputType === InputType.Gram && total > 0
                    ? (a.gram / total) * 100
                    : a.percent
            }));

            state.status = "dirty";
        },

        updateAcidGramWithRecalculatedPercents: (
            state,
            action: PayloadAction<{ acidId: number; newGram: number; totalOil: number }>
        ) => {
            const { acidId, newGram } = action.payload;


            const updated = state.selectedAcids.map((a) =>
                a.id === acidId ? { ...a, gram: newGram } : a
            );

            const total = state.totalOilAmount;

            state.selectedAcids = updated.map((a) => ({
                ...a,
                gram:
                    a.inputType === InputType.Percent && total > 0
                        ? (a.percent / 100) * total
                        : a.gram,
                percent:
                    a.inputType === InputType.Gram && total > 0
                        ? (a.gram / total) * 100
                        : a.percent
            }));

            state.status = "dirty";

        },

        updateOilPercentWithGramRecalculation: (
            state,
            action: PayloadAction<{ oilId: number; newPercent: number; totalOilMass: number }>
        ) => {
            const {oilId, newPercent, totalOilMass} = action.payload;

            state.selectedOils = state.selectedOils.map((o) =>
                o.id === oilId
                    ? {
                        ...o,
                        percent: newPercent,
                        gram: totalOilMass > 0 ? (newPercent / 100) * totalOilMass : 0
                    }
                    : o
            );

            state.totalOilAmount = calculateOilSum({
                selectedOils: state.selectedOils,
                oilInputType: state.oilInputType,
                userDefinedTotalWeight: state.userDefinedTotalWeight,
                waterPercent: state.waterPercent,
                superfatPercent: state.superfatPercent
            });

            state.status = "dirty";
        },
        updateAcidPercentWithGramRecalculation: (
            state,
            action: PayloadAction<{ acidId: number; newPercent: number; totalOilMass: number }>
        ) => {
            const {acidId, newPercent, totalOilMass} = action.payload;

            state.selectedAcids = state.selectedAcids.map((a) =>
                a.id === acidId
                    ? {
                        ...a,
                        percent: newPercent,
                        gram: totalOilMass > 0 ? (newPercent / 100) * totalOilMass : 0
                    }
                    : a
            );
            state.status = "dirty";
        },
        calculateRecipe: (state) => {
            state.status = "calculating";

            const oilSum = calculateOilSum({
                selectedOils: state.selectedOils,
                oilInputType: state.oilInputType,
                userDefinedTotalWeight: state.userDefinedTotalWeight,
                waterPercent: state.waterPercent,
                superfatPercent: state.superfatPercent
            });

            state.totalOilAmount = oilSum;

            const acidSum = calculateAcidSum({
                selectedAcids: state.selectedAcids,
                acidInputType: state.acidInputType,
                totalOilAmount: oilSum
            });

            state.totalAcidAmount = acidSum;

            const lyeSum = calculateLyeSum({
                selectedOils: state.selectedOils,
                lyeType: state.lyeType,
                superfatPercent: state.superfatPercent,
                selectedAcids: state.selectedAcids,
                NaOHPurity: state.NaOHPurity,
                KOHPurity: state.KOHPurity,
                NaOHPercentageInMixed: state.NaOHPercentageInMixed,
                KOHPercentageInMixed: state.KOHPercentageInMixed,
            });

            state.totalLyeAmount = lyeSum.total;
            state.totalNaOHAmount = lyeSum.naoh;
            state.totalKOHAmount = lyeSum.koh;

            const waterSum = calculateWaterSum(
                oilSum,
                lyeSum.total,
                state.waterInputType,
                state.waterPercent,
                state.lyeConcentration,
                state.waterLyeRatio
            );

            state.totalWaterAmount = waterSum;

            const total = oilSum + lyeSum.total + waterSum + acidSum;
            state.totalResultAmount = total;

            // Масштабирование, если ввод в процентах
            const isPercentMode = state.oilInputType === InputType.Percent;
            const isAcidPercentMode = state.acidInputType === InputType.Percent;
            const hasOnlyOilsOrPercentAcids = state.selectedAcids.length === 0 || isAcidPercentMode;

            if (isPercentMode && hasOnlyOilsOrPercentAcids && oilSum > 0) {
                const totalPercent = state.selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);

                if (isValidPercentRange(totalPercent)) {
                    const {
                        oils: updatedOils,
                        acids: updatedAcids
                    } = scaleRecipeToTotalWeightDevelop({
                        selectedOils: state.selectedOils,
                        selectedAcids: state.selectedAcids,
                        userDefinedTotalWeight: state.userDefinedTotalWeight,
                        waterPercent: state.waterPercent,
                        superfatPercent: state.superfatPercent,
                        lyeType: state.lyeType,
                        acidInputType: state.acidInputType
                    });

                    const hasOilChanged = updatedOils.some((o, i) => o.gram !== state.selectedOils[i]?.gram);
                    const hasAcidChanged = updatedAcids.some((a, i) => a.gram !== state.selectedAcids[i]?.gram);

                    if (hasOilChanged) state.selectedOils = updatedOils;
                    if (hasAcidChanged) state.selectedAcids = updatedAcids;
                }
            }

            // Опционально: обновление SOAP-свойств
            state.soapProperties = calculateSoapProperties(state.selectedOils, state.oilInputType);

            state.status = "ready";
            state.hasEverCalculated = true;
        },
        updateOilSum: (state) => {
            state.totalOilAmount = calculateOilSum({
                selectedOils: state.selectedOils,
                oilInputType: state.oilInputType,
                userDefinedTotalWeight: state.userDefinedTotalWeight,
                waterPercent: state.waterPercent,
                superfatPercent: state.superfatPercent
            });
        }
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
    updateOilGramWithRecalculatedPercents,
    updateAcidGramWithRecalculatedPercents,
    updateOilPercentWithGramRecalculation,
    updateAcidPercentWithGramRecalculation,
    calculateRecipe,
    setLyeConcentration,
    setWaterLyeRatio
} = recipeSlice.actions;

export default recipeSlice.reducer;
