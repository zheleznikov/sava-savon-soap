import {useSoapCalculations} from "../../feature/recipe-calculation/model/useSoapCalculations";
import {useSoapRecipe} from "../../feature/recipe-calculation/model/useSoapRecipe";
import {RecipeTitleInput} from "../../feature/recipe-title/RecipeTitleInput";
import {ScaleRecipeBlock} from "../../feature/scale-recipe/ScaleRecipeBlock";
import {ParametersList} from "../../feature/output-recipe-parameters/ParametersList";
import {OilsList} from "../../feature/outpt-oils-list/OilsList";
import {ResultSummary} from "../../feature/output-summary/ResultSummary";
import {RecipeParametersTable} from "../../feature/recipe-params-table/RecipeParametersTable";
import {InputBlockWrapper} from "../../shared/ui/InputBlockWrapper";
import {CalcBlockWrapper} from "../../shared/ui/CalcBlockWrapper";


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

            <div className={"mb-4"}>
                <RecipeTitleInput/>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full lg:w-1/2">
                    <InputBlockWrapper className={""}>

                        <h4 className="text-center text-2xl font-semibold text-gray-800 mb-3 mt-1">
                            Состав
                        </h4>

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

                        <ResultSummary totalResultAmount={totalResultAmount}/>

                        <ScaleRecipeBlock/>


                    </InputBlockWrapper>

                </div>
                    <RecipeParametersTable/>
            </div>
        </CalcBlockWrapper>
    );
};

