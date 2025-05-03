import {localization} from "../config/localization";
import {formatNumber} from "./utils";
import {isInRange} from "../../feature/recipe-summary/utils/utils";
import {RecipeParametersTableProps} from "../../feature/recipe-summary/ui/RecipeParametersTable";

const t = localization.ru.parameters_table;


export const getRecipeParameters = (properties: RecipeParametersTableProps) => {

    const {hardness, cleansing, soften, creaminess, bubbling, iodine} = properties;
    return [
        {label: t.hardness, value: hardness, range: "29–54", digits: 1},
        {label: t.cleansing, value: cleansing, range: "12–22", digits: 1},
        {label: t.softening, value: soften, range: "44–69", digits: 1},
        {label: t.creaminess, value: creaminess, range: "16–48", digits: 1},
        {label: t.bubbling, value: bubbling, range: "14–46", digits: 1},
        {label: t.iodine, value: iodine, range: "41–70", digits: 1},    ].map((param) => {
        const numeric = !isNaN(param.value) ? param.value : null;
        return {
            ...param,
            formatted: numeric !== null ? formatNumber(numeric, param.digits) : "—",
            inRange: numeric !== null ? isInRange(numeric, param.range) : null,
        };
    });
};