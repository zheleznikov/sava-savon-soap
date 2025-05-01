import {OilAutocomplete} from "@/feature/oil-management";
import {OilAddedLine} from "@/feature/oil-management";
import {useSoapRecipe} from "../../../feature/recipe-calculation/model/useSoapRecipe";
import {PercentProgressBar} from "@/feature/percent-progress-bar";
import {RecipeContainer} from "../../../shared/ui/RecipeContainer";
import {RecipeTitleSetup} from "../../../feature/recipe-setup";
import {LyeWaterSuperfatSetup} from "../../../feature/recipe-setup";
import {InputTypeSetup} from "@/feature/recipe-setup";
import {useTheme} from "../../../app/providers/ThemeContext";
import {pageHeader} from "../../../shared/styles/layout";
import {clsx} from "clsx";

export const RecipeBuilder = () => {

    const {selectedOils, handleToggleOil} = useSoapRecipe();

    const {appTheme} = useTheme();
    const {layout, theme} = pageHeader;

    return (
        <RecipeContainer className={"z-50"}>

            <div className={"mb-4"}>
                <h2
                    className={clsx(layout, theme[appTheme])}
                >
                   Калькулятор мыла
                </h2>


            </div>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Первый блок: Название, переключатель, параметры */}
                <div className="w-full lg:w-1/2">
                    <RecipeTitleSetup />
                    <InputTypeSetup />
                    <LyeWaterSuperfatSetup />
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

                    <PercentProgressBar />
                </div>
            </div>

        </RecipeContainer>
    );
};