import {FC, ReactNode} from "react";
import {recipeContainerStyles} from "../styles/RecipeContainer.styles";
import {useTheme} from "../../app/providers/ThemeContext";

interface CardBlockProps {
    children: ReactNode;
    className?: string;
}

export const RecipeContainer: FC<CardBlockProps> = ({ children, className = "" }) => {
    const {appTheme} = useTheme();
    return (
        <div className={`${recipeContainerStyles.layout} ${recipeContainerStyles.theme[appTheme]} ${className}`}>
            {children}
        </div>
    );
};

