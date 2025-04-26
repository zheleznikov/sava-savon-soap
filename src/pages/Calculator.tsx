import {FC} from "react";
import {RecipeBuilder} from "../widgets/input/RecipeBuilder";
import {RecipeSummaryBlock} from "../widgets/recipe-summary/RecipeSummaryBlock";
import {clsx} from "clsx";
import {calculator} from "../shared/styles/layout";
import {useSoapCalculations} from "../feature/recipe-calculation/model/useSoapCalculations";
import {useSoapRecipe} from "../feature/recipe-calculation/model/useSoapRecipe";
// import {localization} from "../shared/config/localization";
// import {ThemeHandler} from "../feature/theme-handler/ThemeHandler";


export const Calculator: FC = () => {

    const {
        totalLyeAmount,
        totalWaterAmount,
        totalResultAmount,
        totalOilAmount
    } = useSoapCalculations();

    const {
        selectedOils,
        lyeType,
        superfatPercent,
        waterPercent,
        inputType,
        setInputType,
        userDefinedTotalWeight,
        setUserDefinedTotalWeight,
        recipeName,
        setRecipeName
    } = useSoapRecipe();

    return (
        <section className={clsx(calculator.wrapper.layout, calculator.wrapper.theme.light, "relative")}>
            {/*<ThemeHandler/>*/}



            <div className={calculator.main.layout}>
                <RecipeBuilder/>

                <RecipeSummaryBlock
                    recipeName={recipeName}
                    setRecipeName={setRecipeName}
                    inputType={inputType}
                    setInputType={setInputType}
                    userDefinedTotalWeight={userDefinedTotalWeight}
                    setUserDefinedTotalWeight={setUserDefinedTotalWeight}
                    selectedOils={selectedOils}
                    totalOilAmount={totalOilAmount}
                    totalLyeAmount={totalLyeAmount}
                    totalWaterAmount={totalWaterAmount}
                    totalResultAmount={totalResultAmount}
                    lyeType={lyeType}
                    superfatPercent={superfatPercent}
                    waterPercent={waterPercent}
                />
            </div>

        </section>
    );
};

