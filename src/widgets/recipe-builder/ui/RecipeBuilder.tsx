import {OilAddedLine} from "@/feature/oil-management";
import {PercentProgressBar} from "@/feature/percent-progress-bar";
import {RecipeContainer} from "../../../shared";
import {LyeWaterSuperfatSetup, RecipeTitleSetup} from "../../../feature/recipe-setup";
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
import {AcidInputTypeSetup} from "../../../feature/recipe-setup/ui/AcidlInputTypeSetup";

import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {useAppSelector} from "../../../shared/useAppSelector";
import {
    calculateRecipe, setAcidInputType, setOilInputType, setUserDefinedTotalWeight,
    toggleAcid,
    toggleOil
} from "../../../feature/recipe-calculation/model/recipeSlice";
import {ScaleRecipeBlock} from "../../../feature/recipe-summary";

export const RecipeBuilder: FC = () => {

    const dispatch = useAppDispatch();

    const {selectedOils, selectedAcids, oilInputType, acidInputType, userDefinedTotalWeight, totalResultAmount} =
        useAppSelector((state) => state.recipe);

    const handleToggleOil = (oil: TOil) => dispatch(toggleOil(oil));
    const handleToggleAcid = (acid: TAcid) => dispatch(toggleAcid(acid));

    const handleSetOilInputType = (type: InputType) => dispatch(setOilInputType(type));
    const handleSetAcidInputType = (type: InputType) => dispatch(setAcidInputType(type));
    const handleSetUserDefinedWeight = (weight: number) => dispatch(setUserDefinedTotalWeight(weight));

    const {appTheme} = useTheme();
    const {layout, theme} = pageHeader;


    const tabs: Tab [] = [
        {key: "base", label: "Параметры"},
        {key: "oilInput", label: "Масла"},
        {key: "acidInputs", label: "Кислоты"},
        // {key: "addInputs", label: "Дополнительно"}
    ];

    const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);
    const isPercentMode = oilInputType === InputType.Percent;
    const isSmartphone = isMobile && !isTablet;


    return (
        <RecipeContainer className={"z-50 w-full lg:w-3/5  min-h-0 md:min-h-[85dvh]"}>

            <div className={"mb-4"}>
                <h2 className={clsx(layout, theme[appTheme])}>
                    Калькулятор мыла
                </h2>
            </div>

            <div className={"flex justify-between items-start"}>
                <Tabs
                    tabs={tabs}
                    value={selectedTab}
                    onChange={setSelectedTab}
                    show={!isSmartphone}
                />


            </div>


            <div className="flex flex-col lg:flex-row gap-4">

                {
                    (selectedTab.key === "base" || isSmartphone) &&
                    <div className="w-full">
                        {/*<RecipeTitleSetup/>*/}
                        <LyeWaterSuperfatSetup/>

                        {/*<ScaleRecipeBlock*/}
                        {/*    oilInputType={oilInputType}*/}
                        {/*    setOilInputType={handleSetOilInputType}*/}
                        {/*    userDefinedTotalWeight={userDefinedTotalWeight}*/}
                        {/*    setUserDefinedTotalWeight={handleSetUserDefinedWeight}*/}
                        {/*    totalResultAmount={totalResultAmount}*/}
                        {/*    acidInputType={acidInputType}*/}
                        {/*    setAcidInputType={handleSetAcidInputType}*/}
                        {/*    selectedAcids={selectedAcids}*/}
                        {/*/>*/}
                    </div>
                }

                {
                    (selectedTab.key === "oilInput" || isSmartphone) &&
                    <div className="w-full">
                        {/*<div className={"flex flex-col md:flex-row gap-2"}>*/}
                        {/*    <div className={"flex-1 lg-w:1/2"}>*/}
                                <IngredientAutocomplete<TOil>
                                    placeholder={localization.ru.autocomplete_oil.placeholder}
                                    selectedItems={selectedOils}
                                    allItems={oils}
                                    onToggleItem={handleToggleOil}
                                />
                            {/*</div>*/}
                            <OilInputTypeSetup/>


                        {/*</div>*/}


                        {selectedOils.map((oil) => (
                            <OilAddedLine oil={oil} key={oil.id}/>
                        ))}
                        {
                            isPercentMode && <PercentProgressBar/>
                        }
                    </div>
                }

                {
                    (selectedTab.key === "acidInputs" || isSmartphone) &&
                    <div className="w-full">
                        <AcidInputTypeSetup/>
                        <IngredientAutocomplete<TAcid>
                            placeholder={localization.ru.autocomplete_acid.placeholder}
                            selectedItems={selectedAcids}
                            allItems={acids}
                            onToggleItem={handleToggleAcid}
                        />
                        {selectedAcids.map((acid) => (
                            <AcidAddedLine acid={acid} key={acid.id}/>
                        ))}
                    </div>
                }
            </div>

        </RecipeContainer>
    );
};
