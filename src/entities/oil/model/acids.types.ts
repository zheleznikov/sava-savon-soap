import {TIngredientBase} from "./ingredient.types";

export type TAcidSpecific = {
    neutralization: {
        naoh: number;
        koh: number;
    };
    pH_effect?: string;
    usage_range_percent?: [number, number];
    usage_range_gram?: [number, number];
    notes?: string;
};

export type TAcid = TIngredientBase & TAcidSpecific;
