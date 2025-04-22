import {OilAutocomplete} from "../../feature/oil-management/ui/OilAutocomplete";
import {OilAddedLine} from "../../feature/oil-management/ui/OilAddedLine";
import {useSoapRecipe} from "../../feature/recipe-calculation/model/useSoapRecipe";
import {OilWeightSummary} from "../../feature/percent-progress-bar/OilWeightSummary";
import {CalcBlockWrapper} from "../../shared/ui/CalcBlockWrapper";
import {RecipeNameInput} from "../../feature/recipe-name-input/RecipeNameInput";
import {BasicParamsBlock} from "../../feature/input-basic-params/BasicParamsBlock";
import {InputTypeToggle} from "../../feature/input-toogle-input-type/InputTypeToggle";

export const RecipeBuilder = () => {

    const {selectedOils, handleToggleOil} = useSoapRecipe();

    return (
        <CalcBlockWrapper className={"z-50"}>
            <RecipeNameInput/>

            <InputTypeToggle/>
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