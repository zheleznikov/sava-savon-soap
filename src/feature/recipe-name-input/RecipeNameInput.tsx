import {FC} from "react";
import {useSoapRecipe} from "../recipe-calculation/model/useSoapRecipe";
import {localization} from "../../shared/config/localization";
import {clsx} from "clsx";
import {input} from "../../shared/styles/layout";

export const RecipeNameInput: FC = () => {

    const {recipeName, setRecipeName} = useSoapRecipe();

    return (
        <input
            placeholder={localization.ru.recipe_input.placeholder}
            onChange={e => setRecipeName(e.target.value)}
            value={recipeName}
            className={clsx(input.recipe_name.layout, input.recipe_name.theme.light)}
        />
    );


};