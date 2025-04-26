import {RecipeTitleInput} from "../../feature/recipe-title/RecipeTitleInput";
import {ScaleRecipeBlock} from "../../feature/scale-recipe/ScaleRecipeBlock";
import {ParametersList} from "../../feature/output-recipe-parameters/ParametersList";
import {OilsList} from "../../feature/outpt-oils-list/OilsList";
import {ResultSummary} from "../../feature/output-summary/ResultSummary";
import {RecipeParametersTable} from "../../feature/recipe-params-table/RecipeParametersTable";
import {InputBlockWrapper} from "../../shared/ui/InputBlockWrapper";
import {CalcBlockWrapper} from "../../shared/ui/CalcBlockWrapper";
import React, {FC} from "react";
import {InputType, LyeType} from "../../app/providers/SoapRecipeContext.types";
import {TOil} from "../../entities/oil/model/oil.types";


interface RecipeSummaryBlockProps {
    recipeName: string;
    setRecipeName: (val: string) => void;
    inputType: InputType;
    setInputType: (val: InputType) => void;
    userDefinedTotalWeight: number;
    setUserDefinedTotalWeight: (val: number) => void;
    selectedOils: TOil[];
    totalOilAmount: number;
    totalLyeAmount: number;
    totalWaterAmount: number;
    totalResultAmount: number;
    lyeType: LyeType;
    superfatPercent: number;
    waterPercent: number;
}

export const RecipeSummaryBlock: FC<RecipeSummaryBlockProps> = ({
                                                                    recipeName,
                                                                    setRecipeName,
                                                                    inputType,
                                                                    setInputType,
                                                                    userDefinedTotalWeight,
                                                                    setUserDefinedTotalWeight,
                                                                    selectedOils,
                                                                    totalOilAmount,
                                                                    totalLyeAmount,
                                                                    totalWaterAmount,
                                                                    totalResultAmount,
                                                                    lyeType,
                                                                    superfatPercent,
                                                                    waterPercent,
                                                                }) => {


    return (
        <CalcBlockWrapper className={"px-0 sm:px-2"}>

            <div className={"mb-4"}>
                <RecipeTitleInput
                    recipeName={recipeName}
                    setRecipeName={setRecipeName}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full lg:w-1/2">
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
                    <ScaleRecipeBlock
                        inputType={inputType}
                        setInputType={setInputType}
                        userDefinedTotalWeight={userDefinedTotalWeight}
                        setUserDefinedTotalWeight={setUserDefinedTotalWeight}
                        totalResultAmount={totalResultAmount}
                    />

                </div>
                <RecipeParametersTable/>
            </div>


        </CalcBlockWrapper>
    );
};

