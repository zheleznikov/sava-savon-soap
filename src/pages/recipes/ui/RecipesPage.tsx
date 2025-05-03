import {clsx} from "clsx";
import {recipes} from "../../../data/recipes.mock";
import {RecipeCard} from "../../../widgets/recipe-card/ui/RecipeCard";
import {LyeType} from "../../../app/providers/SoapRecipeContext.types";
import {useTheme} from "../../../app/providers/ThemeContext";
import {calculator} from "../../calculator/styles/Calculator.styles";

export const RecipesPage = () => {

    const {appTheme} = useTheme();
    return (
        <section className={clsx(calculator.wrapper.layout, calculator.wrapper.theme[appTheme], "relative")}>
            <div className="flex flex-col items-center">
                {recipes.map((it, index) => (
                    <RecipeCard
                        key={index}
                        recipeName={it.recipeName}
                        selectedOils={it.selectedOils}
                        totalOilAmount={it.totalOilAmount}
                        totalLyeAmount={it.totalLyeAmount}
                        totalWaterAmount={it.totalWaterAmount}
                        totalResultAmount={it.totalResultAmount}
                        lyeType={it.lyeType as LyeType}
                        superfatPercent={it.superfatPercent}
                        waterPercent={it.waterPercent}
                        properties={it.properties}
                    />
                ))}
            </div>


        </section>


    );
};
