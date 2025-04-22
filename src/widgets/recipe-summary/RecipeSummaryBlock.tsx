import {useSoapCalculations} from "../../feature/recipe-calculation/model/useSoapCalculations";
import {useSoapRecipe} from "../../feature/recipe-calculation/model/useSoapRecipe";
import {CalcBlockWrapper} from "../../shared/ui/CalcBlockWrapper";
import {RecipeTitleInput} from "../../feature/recipe-title/RecipeTitleInput";
import {ScaleRecipeBlock} from "../../feature/scale-recipe/ScaleRecipeBlock";
import {ParametersList} from "../../feature/output-recipe-parameters/ParametersList";
import {OilsList} from "../../feature/outpt-oils-list/OilsList";
import {ResultSummary} from "../../feature/output-summary/ResultSummary";


export const RecipeSummaryBlock = () => {
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
        waterPercent
    } = useSoapRecipe();

    return (
        <CalcBlockWrapper>
            <RecipeTitleInput />

            <div className="grid grid-cols-3 gap-2 font-semibold text-gray-500 border-b pb-1">
                <span></span>
                <span className="text-center">%</span>
                <span className="text-center">г</span>
            </div>

            <ParametersList
                superfatPercent={superfatPercent}
                waterPercent={waterPercent}
                lyeType={lyeType}
                totalWaterAmount={totalWaterAmount}
                totalLyeAmount={totalLyeAmount}
            />

            <OilsList
                selectedOils={selectedOils}
                totalOilAmount={totalOilAmount}
            />

            <ResultSummary totalResultAmount={totalResultAmount} />

            <ScaleRecipeBlock />
        </CalcBlockWrapper>
    );
};

