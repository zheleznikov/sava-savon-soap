import {FC} from "react";
import {RecipeBuilder} from "../widgets/input/RecipeBuilder";
import {RecipeSummaryBlock} from "../widgets/recipe-summary/RecipeSummaryBlock";
import {clsx} from "clsx";
import {calculator} from "../shared/styles/layout";
import {localization} from "../shared/config/localization";


export const Calculator: FC = () => {
    return (
        <section className={clsx(calculator.wrapper.layout, calculator.wrapper.theme.light)}>

            <header className={clsx(calculator.header.layout, calculator.header.theme.light)}>
                {localization.ru.calculator.header}
            </header>

            <div className={calculator.main.layout}>
                <RecipeBuilder/>
                <RecipeSummaryBlock/>
            </div>

        </section>
    );
};

