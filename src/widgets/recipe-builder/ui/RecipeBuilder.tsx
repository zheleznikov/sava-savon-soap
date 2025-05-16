import {OilAddedLine} from "@/feature/oil-management";
import {PercentProgressBar} from "@/feature/percent-progress-bar";
import {RecipeContainer} from "../../../shared";
import {LyeSetup, RecipeTitleSetup} from "../../../feature/recipe-setup";
import {OilInputTypeSetup} from "@/feature/recipe-setup";
import {useTheme} from "../../../app/providers/ThemeContext";
import {pageHeader} from "../../../shared/styles/layout";
import {clsx} from "clsx";
import {IngredientAutocomplete} from "../../../feature/autocomplete/ui/IngredientAutocomplete";
import {TOil} from "../../../entities/oil/model/oil.types";
import {oils} from "../../../entities/oil/model/oils";
import {TAcid} from "../../../entities/oil/model/acids.types";
import {acids} from "../../../entities/oil/model/acids";
import {localization} from "../../../shared/config/localization";
import React, {FC, useState} from "react";
import {Tab, Tabs} from "../../../shared/ui/Tabs";
import {isMobile, isTablet} from "react-device-detect";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {AcidAddedLine} from "../../../feature/oil-management/ui/AcidAddedLine";

import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {useAppSelector} from "../../../shared/useAppSelector";
import {
    toggleAcid,
    toggleCustom,
    toggleOil
} from "../../../feature/recipe-calculation/model/recipeSlice";
import {SuperfatSetup} from "../../../feature/recipe-setup/ui/SuperfatSetup";
import {WaterSetup} from "../../../feature/recipe-setup/ui/WaterSetup";
import {IngredientAdd} from "../../../feature/autocomplete/ui/IngredientAdd";
import {CustomAddedLine} from "../../../feature/oil-management/ui/CustomAddedLine";
import {TCustom} from "../../../entities/oil/model/custom.types";
import {MeasureInputTypeSetup} from "../../../feature/recipe-setup/ui/MeasureInputTypeSetup";

export const RecipeBuilder: FC = () => {

    const dispatch = useAppDispatch();

    const {
        selectedOils,
        selectedAcids,
        selectedCustoms
    } = useAppSelector((state) => state.recipe.input.ingredients);

    const {
        oilInputType,
        userDefinedTotalWeight
    } = useAppSelector((state) => state.recipe.input.params);

    const { totalResultAmount } = useAppSelector((state) => state.recipe.output.total);


    const handleToggleOil = (oil: TOil) => dispatch(toggleOil(oil));
    const handleToggleAcid = (acid: TAcid) => dispatch(toggleAcid(acid));

    const handleToggleAdd = (add: TCustom) => dispatch(toggleCustom(add));


    const {appTheme} = useTheme();
    const {layout, theme} = pageHeader;


    const tabs: Tab [] = [
        {key: "params", label: "Параметры"},
        {key: "ingredients", label: "Ингредиенты"},
    ];

    const [selectedTab, setSelectedTab] = useState<Tab>(tabs[1]);
    const isPercentMode = oilInputType === InputType.Percent;
    const isSmartphone = isMobile && !isTablet;


    return (
        <RecipeContainer className={"z-50 w-full lg:w-3/5  min-h-0 md:min-h-[85dvh]"}>

            <div className={"mb-4"}>
                <h2 className={clsx(layout, theme[appTheme])}>
                    Калькулятор мыла
                </h2>
            </div>


            <div className="flex flex-col">
                <RecipeTitleSetup/>
                <Tabs
                    tabs={tabs}
                    value={selectedTab}
                    onChange={setSelectedTab}
                    show={!isSmartphone}
                />

                {
                    (selectedTab.key === "params" || isSmartphone) &&
                    <>
                        <div className={"flex gap-2 flex-col md:flex-row"}>
                            <MeasureInputTypeSetup/>
                            <SuperfatSetup/>

                        </div>
                        <LyeSetup/>
                        <WaterSetup/>
                    </>

                }

                {
                    (selectedTab.key === "ingredients" || isSmartphone) &&
                    <>
                        <OilInputTypeSetup/>

                        <IngredientAutocomplete<TOil>
                            placeholder={localization.ru.autocomplete_oil.placeholder}
                            selectedItems={selectedOils}
                            allItems={oils}
                            onToggleItem={handleToggleOil}
                        />

                        {selectedOils.map((oil) => (<OilAddedLine oil={oil} key={oil.id}/>))}
                        {isPercentMode && <PercentProgressBar/>}

                        <div className={"mt-2"}>
                            <IngredientAutocomplete<TAcid>
                                placeholder={localization.ru.autocomplete_acid.placeholder}
                                selectedItems={selectedAcids}
                                allItems={acids}
                                onToggleItem={handleToggleAcid}
                            />
                            {selectedAcids.map((acid) => (
                                <AcidAddedLine acid={acid} key={acid.id}/>))}
                        </div>

                        <div className={"mt-2"}>
                            <IngredientAdd<TCustom>
                                placeholder={"Добавьте свой ингредиент"}
                                selectedItems={selectedCustoms}
                                allItems={selectedCustoms}
                                onToggleItem={handleToggleAdd}
                            />

                            {selectedCustoms.map((custom) => (
                                <CustomAddedLine customIngredient={custom}
                                                 key={custom.id}/>))}
                        </div>


                    </>

                }


            </div>

        </RecipeContainer>
    );
};
