import {OilAutocomplete} from "../components/OilAutocomplete";
import {OilAddedLine} from "../components/OilAddedLine";
import {BasicParamsBlock} from "./BasicParamsBlock";
import {InputModeBlock} from "../components/InputModeBlock";
import {useSoapRecipe} from "../context/useSoapRecipe";

export const InputBlock = () => {

    const {
        recipeName, setRecipeName, selectedOils,
    } = useSoapRecipe();

    return (
        <div>
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
        </div>
    );
};