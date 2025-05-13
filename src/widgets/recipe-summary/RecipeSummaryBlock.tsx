import {
    OilsList,
    ParametersList,
    RecipeActions,
    RecipeParametersTable,
    RecipeTitleInput,
    ResultSummary
} from "../../feature/recipe-summary";
import {InputBlockWrapper, LoadingOverlay, RecipeContainer} from "../../shared";
import React, {FC, useState} from "react";
import {clsx} from "clsx";
import {useExportRecipe} from "../../shared/model/useExportRecipe";
import {ExportRecipeProps} from "../../shared/ui/ExportRecipe";
import {Tab, Tabs} from "../../shared/ui/Tabs";
import {isMobile, isTablet} from "react-device-detect";
import {AcidList} from "../../feature/recipe-summary/ui/AcidList";
import {useAppSelector} from "../../shared/useAppSelector";
import {useAppDispatch} from "../../shared/model/useAppDispatch";
import {InputType} from "../../app/providers/SoapRecipeContext.types";
import {
    setAcidInputType,
    setOilInputType,
    setRecipeName,
    setUserDefinedTotalWeight
} from "../../feature/recipe-calculation/model/recipeSlice";
import {RecipeStatusBanner} from "../../shared/ui/RecipeStatusBanner";

export const RecipeSummaryBlock: FC = () => {

    const isSmartphone = isMobile && !isTablet;

    const dispatch = useAppDispatch();

    const {
        downloadPdfOnly,
        ExportContainer,
        downloadImageOnly,
        shareOrDownloadImage,
        shareOrDownloadPdf,
        isCreatingImg
    } = useExportRecipe();

    const getExportData = (): ExportRecipeProps => ({
        recipeName: recipeName.trim() || "Мой рецепт",
        superfatPercent,
        waterPercent,
        lyeType,
        totalLyeAmount,
        totalWaterAmount,
        totalOilAmount,
        totalResultAmount,
        selectedOils,
        properties: {
            hardness,
            cleansing,
            soften,
            bubbling,
            creaminess,
            iodine,
        },
    });


    const downloadPdf = () => downloadPdfOnly(getExportData());
    const sharePdf = () => shareOrDownloadPdf(getExportData());
    const shareImage = () => shareOrDownloadImage(getExportData());
    const downloadImage = () => downloadImageOnly(getExportData());

    const {
        selectedOils,
        selectedAcids,
        oilInputType,
        acidInputType,
        lyeType,
        waterPercent,
        superfatPercent,
        userDefinedTotalWeight,
        recipeName,
        totalLyeAmount,
        totalWaterAmount,
        totalResultAmount,
        totalOilAmount,
        totalAcidAmount,
        soapProperties: {
            hardness,
            cleansing,
            soften,
            bubbling,
            creaminess,
            iodine
        },
        status,
        hasEverCalculated
    } = useAppSelector((state) => state.recipe);

    const handleSetOilInputType = (type: InputType) => dispatch(setOilInputType(type));
    const handleSetAcidInputType = (type: InputType) => dispatch(setAcidInputType(type));
    const handleSetUserDefinedWeight = (weight: number) => dispatch(setUserDefinedTotalWeight(weight));
    const handleSetRecipeName = (name: string) => dispatch(setRecipeName(name));


    // const {handleSaveRecipe} = useSaveRecipe();

    const tabs: Tab [] = [
        {key: "composition", label: "Состав"},
        {key: "params", label: "Параметры"},
        // {key: "save", label: "Сохранить"},
    ];

    const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);


    return (
        <>
            <RecipeContainer
                className={"relative px-0 sm:px-2 w-full lg:w-2/5 flex flex-col min-h-0 md:min-h-[85dvh]"}>
                {isCreatingImg && <LoadingOverlay text="Создание файла..."/>}

                <div className={"flex-grow"}>
                    <div className="mb-4">
                        <RecipeTitleInput
                            recipeName={recipeName}
                            setRecipeName={handleSetRecipeName}
                        />
                    </div>

                    <RecipeStatusBanner children={
                        <>
                            <Tabs
                                tabs={tabs}
                                value={selectedTab}
                                onChange={setSelectedTab}
                                show={!isSmartphone}
                            />
                            <div className={`flex flex-col gap-2 md:flex-row`}>
                                {
                                    (selectedTab.key === "composition" || isSmartphone) &&
                                    <div className={clsx("w-full flex flex-col gap-2")}>

                                        <InputBlockWrapper className={"px-0 w-full"}>

                                            <ParametersList
                                                superfatPercent={superfatPercent}
                                                waterPercent={waterPercent}
                                                lyeType={lyeType}
                                                totalWaterAmount={totalWaterAmount}
                                                totalLyeAmount={totalLyeAmount}
                                                selectedOils={selectedOils}
                                            />

                                            <OilsList
                                                selectedOils={selectedOils}
                                                totalOilAmount={totalOilAmount}
                                            />

                                            <ResultSummary totalResultAmount={totalResultAmount}/>

                                            {selectedAcids.length > 0 && (
                                                <AcidList
                                                    selectedAcids={selectedAcids}
                                                    totalAcidAmount={totalAcidAmount}
                                                />
                                            )}
                                        </InputBlockWrapper>


                                    </div>
                                }
                                {
                                    (selectedTab.key === "params" || isSmartphone) && status === 'ready'
                                    &&
                                    <RecipeParametersTable
                                        hardness={hardness}
                                        cleansing={cleansing}
                                        soften={soften}
                                        bubbling={bubbling}
                                        creaminess={creaminess}
                                        iodine={iodine}
                                    />

                                }
                            </div>

                            <RecipeActions
                                onSave={() => {
                                }}
                                onDownloadJpg={downloadImage}
                                onShareJpg={shareImage}
                                onDownloadPdf={downloadPdf}
                                onSharePdf={sharePdf}
                                isSaveHidden={true}
                            />
                        </>
                    }/>
                </div>


            </RecipeContainer>
            <ExportContainer/>

        </>


    );
};

