import {TOil} from "../../entities/oil/model/oil.types";

export enum InputType {
    Gram = "gram",
    Percent = "percent",
}

export enum LyeType {
    NaOH = "NaOH",
    KOH = "KOH",
}

export interface SoapRecipeContextType {
    recipeName: string;
    setRecipeName: (val: string) => void;

    inputType: InputType;
    setInputType: (val: InputType) => void;


    lyeType: LyeType;
    setLyeType: (val: LyeType) => void;

    waterPercent: number;
    setWaterPercent: (val: number) => void;

    superfatPercent: number;
    setSuperfatPercent: (val: number) => void;
    userDefinedTotalWeight: number;
    setUserDefinedTotalWeight: (val: number) => void;

    selectedOils: TOil[];
    setSelectedOils: (val: TOil[]) => void;
    handleToggleOil: (oil: TOil) => void;
    updateOilGramWithRecalculatedPercents: (oil:TOil, newGram: number) => void;
    updateOilPercentWithGramRecalculation: (oil: TOil, newPercent: number, totalOilMass: number) => void;

}