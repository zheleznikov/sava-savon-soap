import {FC} from "react";
import {useSoapRecipe} from "../../recipe-calculation/model/useSoapRecipe";
import {localization} from "../../../shared/config/localization";
import {clsx} from "clsx";
import {useTheme} from "../../../app/providers/ThemeContext";
import {recipeTitleSetupStyles as s} from "../styles/RecipeTitleSetup.styles";

export const RecipeTitleSetup: FC = () => {

    const {recipeName, setRecipeName} = useSoapRecipe();

    const {appTheme} = useTheme();

    return (
        <input
            placeholder={localization.ru.recipe_input.placeholder}
            onChange={e => setRecipeName(e.target.value)}
            value={recipeName}
            className={clsx(s.recipeTitle.layout, s.recipeTitle.theme[appTheme])}
        />
    );


};