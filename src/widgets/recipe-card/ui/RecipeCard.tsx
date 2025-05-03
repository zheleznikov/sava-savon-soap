
import {InputBlockWrapper} from "@/shared/ui/InputBlockWrapper";
import React, {FC} from "react";
import {LyeType} from "@/app/providers/SoapRecipeContext.types";
import {TOil} from "@/entities/oil/model/oil.types";
import {
    RecipeParametersTable,
    RecipeParametersTableProps
} from "../../../feature/recipe-summary/ui/RecipeParametersTable";

import { useNavigate } from "react-router-dom";
import {RecipeContainer} from "../../../shared";
import {OilsList, ParametersList, RecipeTitleInput, ResultSummary} from "../../../feature/recipe-summary";


interface Props {
    recipeName: string;
    selectedOils: TOil[];
    totalOilAmount: number;
    totalLyeAmount: number;
    totalWaterAmount: number;
    totalResultAmount: number;
    lyeType: LyeType;
    superfatPercent: number;
    waterPercent: number;
    properties: RecipeParametersTableProps
}

export const RecipeCard: FC<Props> = ({
                                          recipeName,
                                          selectedOils,
                                          totalOilAmount,
                                          totalLyeAmount,
                                          totalWaterAmount,
                                          totalResultAmount,
                                          lyeType,
                                          superfatPercent,
                                          waterPercent,
                                          properties
                                      }) => {

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate('/calculator', {
            state: {
                mode: "edit",
                recipeName,
                selectedOils,
                totalOilAmount,
                totalLyeAmount,
                totalWaterAmount,
                totalResultAmount,
                lyeType,
                superfatPercent,
                waterPercent,
                properties
            }
        });
    };


    return (
        <RecipeContainer className={"px-0 sm:px-2 mb-4"}>

            <div className={"mb-4"}>
                <RecipeTitleInput
                    recipeName={recipeName}
                    setRecipeName={() => {
                    }}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full lg:w-1/2">
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

                </div>
                <RecipeParametersTable
                    hardness={properties.hardness}
                    cleansing={properties.cleansing}
                    soften={properties.soften}
                    bubbling={properties.bubbling}
                    creaminess={properties.creaminess}
                    iodine={properties.iodine}
                />
            </div>

            {/* КНОПКА "Редактировать" */}
            <div className="flex justify-end mt-4 px-4">
                <button
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition"
                    onClick={() => {
                        handleEdit();
                    }}
                >
                    Редактировать
                </button>
            </div>


        </RecipeContainer>
    );
};

