import {FC} from "react";
import {localization} from "../../../shared/config/localization";
import {clsx} from "clsx";
import {useTheme} from "../../../app/providers/ThemeContext";
import {recipeTitleSetupStyles as s} from "../styles/RecipeTitleSetup.styles";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {useAppSelector} from "../../../shared/useAppSelector";
import {setRecipeName} from "../../recipe-calculation/model/recipeSlice";

export const RecipeTitleSetup: FC = () => {


    const dispatch = useAppDispatch();
    const recipeName = useAppSelector((state) => state.recipe.recipeName);

    const handleChange = (value: string) => {
        dispatch(setRecipeName(value));
    };

    const {appTheme} = useTheme();

    return (
        <input
            placeholder={localization.ru.recipe_input.placeholder}
            onChange={e => handleChange(e.target.value)}
            value={recipeName}
            className={clsx(s.recipeTitle.layout, s.recipeTitle.theme[appTheme])}
        />
    );


};
