import {TIngredientBase} from "./ingredient.types";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";

export type TAcidSpecific = {
    neutralization: {
        naoh: number;
        koh: number;
    };
    pH_effect?: string;
    usage_range_percent?: [number, number];
    usage_range_gram?: [number, number];
    notes?: string;
    inputType: InputType
};

export type TAcid = TIngredientBase & TAcidSpecific;
