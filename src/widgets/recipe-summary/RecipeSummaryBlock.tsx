import {
    OilsList,
    ParametersList,
    RecipeParametersTable,
    RecipeTitleInput,
    ResultSummary,
    ScaleRecipeBlock
} from "../../feature/recipe-summary";
import {InputBlockWrapper} from "../../shared/ui/InputBlockWrapper";
import {RecipeContainer} from "../../shared/ui/RecipeContainer";
import React, {FC} from "react";
import {useSoapCalculations} from "../../feature/recipe-calculation/model/useSoapCalculations";
import {useSoapRecipe} from "../../feature/recipe-calculation/model/useSoapRecipe";
import {useSaveRecipe} from "../../feature/recipe-calculation/model/useSaveRecipe";
import {useSoapProperties} from "../../feature/recipe-calculation/model/useSoapProperties";
import {clsx} from "clsx";
import {useCreateRecipePdf} from "@/process/pdf-create/model/useCreateRecipePdf";
import {RecipeActions} from "../../feature/recipe-summary/RecipeActions";
import {LoadingOverlay} from "../../shared/ui/LoadingOverlay";


export const RecipeSummaryBlock: FC = () => {

    const {pdfRef, createPdf, isDownloadingPdf, shareImageFile} = useCreateRecipePdf();


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

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);


    return (
        <RecipeContainer className={"relative px-0 sm:px-2"}>
            {isDownloadingPdf && <LoadingOverlay text="Создание файла..."/>}

            <div ref={pdfRef}>
                <div className="mb-4">
                    <RecipeTitleInput
                        recipeName={recipeName}
                        setRecipeName={setRecipeName}
                    />
                </div>

                <div className={`flex flex-col gap-2 md:flex-row`}>
                    <div className={clsx("w-full", "lg:w-1/2")}>
                        <InputBlockWrapper className={"px-0"}>

                            <ParametersList
                                superfatPercent={superfatPercent}
                                waterPercent={waterPercent}
                                lyeType={lyeType}
                                totalWaterAmount={totalWaterAmount}
                                totalLyeAmount={totalLyeAmount}
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

                    <RecipeParametersTable
                        hardness={hardness}
                        cleansing={cleansing}
                        soften={soften}
                        bubbling={bubbling}
                        creaminess={creaminess}
                        iodine={iodine}
                    />
                </div>
            </div>

            <RecipeActions
                onSave={handleSaveRecipe}
                onDownloadJpg={() => shareImageFile(recipeName)}
                onDownloadPdf={() => createPdf(recipeName)}
                isSaveHidden={true} // или по логике: isDownloadingPdf
            />


        </RecipeContainer>
    );
};

