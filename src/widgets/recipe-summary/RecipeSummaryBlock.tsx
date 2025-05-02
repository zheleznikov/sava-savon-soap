import {RecipeTitleInput} from "../../feature/recipe-summary";
import {ScaleRecipeBlock} from "../../feature/recipe-summary";
import {ParametersList} from "../../feature/recipe-summary";
import {OilsList} from "../../feature/recipe-summary";
import {ResultSummary} from "../../feature/recipe-summary";
import {RecipeParametersTable} from "../../feature/recipe-summary";
import {InputBlockWrapper} from "../../shared/ui/InputBlockWrapper";
import {RecipeContainer} from "../../shared/ui/RecipeContainer";
import React, {FC} from "react";
import {useSoapCalculations} from "../../feature/recipe-calculation/model/useSoapCalculations";
import {useSoapRecipe} from "../../feature/recipe-calculation/model/useSoapRecipe";
import {useSaveRecipe} from "../../feature/recipe-calculation/model/useSaveRecipe";
import {useSoapProperties} from "../../feature/recipe-calculation/model/useSoapProperties";
import {clsx} from "clsx";
import {useCreateRecipePdf} from "@/process/pdf-create/model/useCreateRecipePdf";
import {Bookmark, Download} from "lucide-react";


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
            {isDownloadingPdf && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-700 font-semibold text-lg">Создание файла...</span>
                    </div>
                </div>
            )}
            {/* Блок PDF */}
            <div ref={pdfRef}>
                <div className="mb-4">
                    <RecipeTitleInput
                        recipeName={recipeName}
                        setRecipeName={setRecipeName}
                    />
                </div>

                {/* Контент рецепта */}
                <div className={`flex flex-col gap-2 md:flex-row`}>
                    <div className={clsx(
                        "w-full",
                        "lg:w-1/2"
                    )}>
                        <InputBlockWrapper className={"px-0"}>
                            <h4 className="text-center text-2xl font-bold text-gray-800 mb-3 mt-1">
                                Состав
                            </h4>

                            <div className="grid grid-cols-3 gap-2 font-semibold text-gray-500 border-b pb-1">
                                <span></span>
                                <span className="text-center">%</span>
                                <span className="text-center">г</span>
                            </div>

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

                        {/* ScaleRecipeBlock убирается в режиме PDF */}
                        {!isDownloadingPdf && (
                            <ScaleRecipeBlock
                                inputType={inputType}
                                setInputType={setInputType}
                                userDefinedTotalWeight={userDefinedTotalWeight}
                                setUserDefinedTotalWeight={setUserDefinedTotalWeight}
                                totalResultAmount={totalResultAmount}
                            />
                        )}
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

            {/* Блок кнопок */}
            <div className="mt-3 flex justify-between items-center px-2">
                {/* Левая часть — кнопка Сохранить */}

                <div className={clsx(true && "invisible pointer-events-none")}>
                    <button
                        className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition text-base font-semibold flex items-center justify-center gap-2"
                        onClick={handleSaveRecipe}
                        title="Сохранить рецепт"
                    >
                        <Bookmark size={18} />
                        Сохранить
                    </button>
                </div>

                {/* Правая часть — кнопки скачать */}
                <div className="flex justify-center items-center space-x-2">
                    <button
                        className="flex flex-col items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition"
                        onClick={() => shareImageFile(recipeName)}
                        title="Скачать JPG"
                    >
                        <Download size={22} />
                        <span className="text-[11px] mt-0.5">JPG</span>
                    </button>

                    <button
                        className="flex flex-col items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition"
                        onClick={() => createPdf(recipeName)}
                        title="Скачать PDF"
                    >
                        <Download size={22} />
                        <span className="text-[11px] mt-0.5">PDF</span>
                    </button>
                </div>

            </div>




        </RecipeContainer>
    );
};

