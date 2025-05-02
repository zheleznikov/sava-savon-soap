import {FC} from "react";
import {useTheme} from "../../../app/providers/ThemeContext";
import {localization} from "../../../shared/config/localization";
import {recipeBlockStyles} from "../styles/RecipeBlock.styles";

interface RecipeTitleInputProps {
    recipeName: string;
    setRecipeName: (value: string) => void;
}

export const RecipeTitleInput: FC<RecipeTitleInputProps> = (
    {
        recipeName,
        setRecipeName,
    }) => {

    const { appTheme } = useTheme();
    const styles = recipeBlockStyles[appTheme].input;
    const t = localization.ru.recipe_title_default;

    const isEmpty = recipeName.trim() === "";
    const textClass = isEmpty ? styles.textEmpty : styles.textFilled;

    return (
        <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder={t.placeholder}
            className={`${styles.base} ${textClass}`}
        />
    );
};