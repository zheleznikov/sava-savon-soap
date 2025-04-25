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

            <div className={"mb-4"}>
                <h2
                    className={`w-full text-3xl xs:text-4xl text-center font-semibold min-h-[2.5rem] bg-transparent outline-none transition text-gray-700`}
                >
                   Калькулятор мыла
                </h2>


            </div>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Первый блок: Название, переключатель, параметры */}
                <div className="w-full lg:w-1/2">
                    <RecipeNameInput />
                    <InputTypeToggle />
                    <BasicParamsBlock />
                </div>

                {/* Второй блок: Автокомплит и масла */}
                <div className="w-full lg:w-1/2">
                    <OilAutocomplete
                        onToggleOil={handleToggleOil}
                        selectedOils={selectedOils}
                    />

                    {selectedOils.map((oil) => (
                        <OilAddedLine oil={oil} key={oil.id} />
                    ))}

                    <OilWeightSummary />
                </div>
            </div>

        </CalcBlockWrapper>
    );
};