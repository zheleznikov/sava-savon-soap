import {OilAutocomplete} from "../../feature/oil-management/ui/OilAutocomplete";
import {OilAddedLine} from "../../feature/oil-management/ui/OilAddedLine";
import {BasicParamsBlock} from "../../feature/basic-params-input/BasicParamsBlock";
import {InputModeBlock} from "../../feature/mode-toggle/InputModeBlock";
import {useSoapRecipe} from "../../feature/recipe-calculation/model/useSoapRecipe";
import {OilWeightSummary} from "../../feature/percent-progress-bar/OilWeightSummary";
import {CalcBlockWrapper} from "../../shared/ui/CalcBlockWrapper";
import {RecipeNameInput} from "../../feature/recipe-name-input/RecipeNameInput";

export const RecipeBuilder = () => {

    const {selectedOils, handleToggleOil} = useSoapRecipe();

    return (
        <CalcBlockWrapper className={"z-50"}>
            <RecipeNameInput/>

            <InputModeBlock/>
            <BasicParamsBlock/>

            <OilAutocomplete
                onToggleOil={handleToggleOil}
                selectedOils={selectedOils}
            />

            {selectedOils.map(oil => <OilAddedLine oil={oil} key={oil.id}/>)}

            <OilWeightSummary/>
        </CalcBlockWrapper>
    );
};