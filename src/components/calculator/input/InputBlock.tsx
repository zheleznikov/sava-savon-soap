import {OilAutocomplete} from "../../OilAutocomplete";
import {OilAddedLine} from "./OilAddedLine";
import {BasicParamsBlock} from "./BasicParamsBlock";
import {InputModeBlock} from "./InputModeBlock";
import {useSoapRecipe} from "../../../hooks/useSoapRecipe";
import {OilWeightSummary} from "./OilWeightSummary";
import {CalcBlockWrapper} from "../../CalcBlockWrapper";

export const InputBlock = () => {

    const {
        recipeName, setRecipeName, selectedOils
    } = useSoapRecipe();


    return (
        <CalcBlockWrapper className={"z-50"}>
            <input
                placeholder={"Введите название рецепта"}
                onChange={e => setRecipeName(e.target.value)}
                value={recipeName}
                className={`w-full border border-gray-200 p-2 pt-4 pb-4 bg-white/70 backdrop-blur-sm shadow-sm rounded-xl mb-4`}
            />

            <InputModeBlock/>
            <BasicParamsBlock/>
            <OilAutocomplete/>

            {
                selectedOils.length > 0 &&
                selectedOils.map(oil => <OilAddedLine oil={oil}/>)
            }
            <OilWeightSummary/>
        </CalcBlockWrapper>
    );
};