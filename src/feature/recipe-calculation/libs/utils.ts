import {TIngredientBase} from "../../../entities/oil/model/ingredient.types";
import {TOil} from "../../../entities/oil/model/oil.types";
import {LyeType} from "../../../app/providers/SoapRecipeContext.types";
import {TAcid} from "../../../entities/oil/model/acids.types";

export const calculateSum = (selected: TIngredientBase[]): number => {
    return selected.reduce((acc, item) => acc + (item.mass || 0), 0);
};

export const getOilSAP = (oil: TOil, lyeType: LyeType) => {
    return lyeType === LyeType.NaOH ? oil.sap.naoh : oil.sap.koh;
};

export const getAcidNeutralization = (acid: TAcid, lyeType: LyeType) => {
    return lyeType === LyeType.NaOH ? acid.neutralization.naoh : acid.neutralization.koh;
};
