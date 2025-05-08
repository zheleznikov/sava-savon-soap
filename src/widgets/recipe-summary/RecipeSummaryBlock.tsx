import {
    OilsList,
    ParametersList,
    RecipeParametersTable,
    RecipeTitleInput,
    ResultSummary,
    ScaleRecipeBlock
} from "../../feature/recipe-summary";
import {InputBlockWrapper} from "../../shared";
import {RecipeContainer} from "../../shared";
import React, {FC, useState} from "react";
import {useSoapCalculations} from "../../feature/recipe-calculation";
import {useSoapRecipe} from "../../feature/recipe-calculation";
import {useSaveRecipe} from "../../feature/recipe-calculation";
import {useSoapProperties} from "../../feature/recipe-calculation";
import {clsx} from "clsx";
import {RecipeActions} from "../../feature/recipe-summary";
import {useExportRecipe} from "../../shared/model/useExportRecipe";
import {LoadingOverlay} from "../../shared";
import {ExportRecipeProps} from "../../shared/ui/ExportRecipe";
import {Tab, Tabs} from "../../shared/ui/Tabs";
import {isMobile, isTablet} from "react-device-detect";

export const RecipeSummaryBlock: FC = () => {

    const isSmartphone = isMobile && !isTablet;

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
        totalLyeAmount,
        totalWaterAmount,
        totalResultAmount,
        totalOilAmount
    } = useSoapCalculations();

    const {
        selectedOils,
        lyeType,
        superfatPercent,
        waterPercent,
        inputType,
        setInputType,
        userDefinedTotalWeight,
        setUserDefinedTotalWeight,
        recipeName,
        setRecipeName
    } = useSoapRecipe();

    const {
        hardness,
        cleansing,
        soften,
        bubbling,
        creaminess,
        iodine
    } = useSoapProperties();

    const {handleSaveRecipe} = useSaveRecipe();

    const tabs: Tab [] = [
        {key: "composition", label: "Состав"},
        {key: "params", label: "Параметры"},
        {key: "save", label: "Сохранить"},
    ];

    const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);


    return (
        <>
            <RecipeContainer className={"relative px-0 sm:px-2 w-full lg:w-1/2 flex flex-col  min-h-0 md:min-h-[85dvh]"}>
                {isCreatingImg && <LoadingOverlay text="Создание файла..."/>}

                <div  className={"flex-grow"}>
                    <div className="mb-4">
                        <RecipeTitleInput
                            recipeName={recipeName}
                            setRecipeName={setRecipeName}
                        />
                    </div>

                    <Tabs
                        tabs={tabs}
                        value={selectedTab}
                        onChange={setSelectedTab}
                        show={!isSmartphone}
                    />

                    <div className={`flex flex-col gap-2 md:flex-row`}>
                        {
                            (selectedTab.key === "composition" || isSmartphone) &&
                            <div className={clsx("w-full flex flex-col gap-2 md:flex-row")}>
                                <InputBlockWrapper className={"px-0 lg:w-2/3"}>

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
                                </InputBlockWrapper>

                                <ScaleRecipeBlock
                                    inputType={inputType}
                                    setInputType={setInputType}
                                    userDefinedTotalWeight={userDefinedTotalWeight}
                                    setUserDefinedTotalWeight={setUserDefinedTotalWeight}
                                    totalResultAmount={totalResultAmount}
                                />
                            </div>
                        }
                        {
                            (selectedTab.key === "params" || isSmartphone) &&
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
                </div>

                <RecipeActions
                    onSave={handleSaveRecipe}
                    onDownloadJpg={downloadImage}
                    onShareJpg={shareImage}
                    onDownloadPdf={downloadPdf}
                    onSharePdf={sharePdf}
                    isSaveHidden={true}
                />


            </RecipeContainer>
            <ExportContainer/>

        </>


    );
};

