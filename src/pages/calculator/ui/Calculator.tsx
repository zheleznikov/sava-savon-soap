import {FC} from "react";
import {RecipeSummaryBlock} from "../../../widgets/recipe-summary/RecipeSummaryBlock";
import {clsx} from "clsx";
import {useLocation} from "react-router-dom";
import {RecipeBuilder} from "@/widgets/recipe-builder";
import {localization} from "../../../shared/config/localization";
import {calculator} from "../styles/Calculator.styles";


export const Calculator: FC = () => {
    const location = useLocation();
    // const context = useSoapRecipe();

    const mode = (location.state as any)?.mode ?? "new";

    // useHydrateRecipeFromLocation();
    const t = localization.ru.calculator;

    return (

        <section className={clsx(calculator.wrapper.layout, calculator.wrapper.theme.light, "relative")}>

            {/*{mode === "edit" && (*/}
            {/*    <div className={calculator.editInfoLine}>*/}
            {/*        {t.edit_notice}<b>{context.recipeName}</b>*/}
            {/*    </div>*/}
            {/*)}*/}
            <div className={calculator.main.layout}>


                <RecipeBuilder/>
                <RecipeSummaryBlock/>
            </div>
        </section>
    );


};
