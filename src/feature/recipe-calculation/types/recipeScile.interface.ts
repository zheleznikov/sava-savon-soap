import {TOil} from "../../../entities/oil/model/oil.types";
import {TAcid} from "../../../entities/oil/model/acids.types";
import {TCustom} from "../../../entities/oil/model/custom.types";
import {
    InputType,
    LyeType,
    MeasureInputType,
    WaterInputType
} from "../../../app/providers/SoapRecipeContext.types";

export type RecipeStatus = "idle" | "dirty" | "calculating" | "ready";
export interface RecipeIngredientInput {
    selectedOils: TOil[];
    selectedAcids: TAcid[];
    selectedCustoms: TCustom[];
}

export interface RecipeLyeTypeInput {
    lyeType: LyeType;
    NaOHPurity: number;
    KOHPurity: number;
    NaOHPercentageInMixed?: number; // активен при LyeType.Mixed
    KOHPercentageInMixed?: number;  // активен при LyeType.Mixed
}

export interface WaterInput {
    // -- -- waterInput
    waterInputType: WaterInputType
    waterPercent: number;
    lyeConcentration: number;
    waterLyeRatio: number
}

export interface RecipeParamsInput {
    lyeTypeInput: RecipeLyeTypeInput;
    measureInput: MeasureInputType
    oilInputType: InputType;
    waterInput: WaterInput
    superfatPercent: number;
    userDefinedTotalWeight: number;
}

export interface RecipeDescription {
    recipeName: string;
    description?: string;
    link?: string
}



export interface RecipeTotal {
    totalOilAmount: number;
    totalAcidAmount: number;
    totalLyeAmount: number;
    totalNaOHAmount: number;
    totalKOHAmount: number;
    totalWaterAmount: number;
    totalResultAmount: number;
    totalCustomAmount?: number
}

export interface RecipeInput {
    ingredients: RecipeIngredientInput;
    params: RecipeParamsInput;
    description: RecipeDescription;
}

export interface RecipeOutput {
    total: RecipeTotal;
    soapProperties: SoapProperties
}

export interface RecipeStatusInfo {
    status: RecipeStatus;
    hasEverCalculated: boolean;
}

export interface RecipeState {
    input: RecipeInput;
    output: RecipeOutput;
    status: RecipeStatusInfo;
}

export interface SoapProperties {
    hardness: number;
    cleansing: number;
    soften: number;
    bubbling: number;
    creaminess: number;
    iodine: number;
    ins: number;
}
