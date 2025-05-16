import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {TIngredientBase} from "./ingredient.types";

export type CustomSpecific = {
    inputType: InputType
};

export type TCustom = TIngredientBase & CustomSpecific;
