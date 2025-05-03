import type {FC} from "react";
import {TOil} from "../../entities/oil/model/oil.types";
import {recipeBlockStyles} from "../../feature/recipe-summary";
import {formatNumber} from "../lib/utils";
import logo from "@/assets/logo4.png";
import {RecipeParametersTableProps} from "../../feature/recipe-summary/ui/RecipeParametersTable";
import {getRecipeParameters} from "../lib/recipeParameters";
import {localization} from "../config/localization";
import {getTotalOilPercent} from "../../feature/recipe-summary/utils/utils";


export interface ExportRecipeProps {
    recipeName: string;
    superfatPercent: number;
    waterPercent: number;
    lyeType: string;
    totalLyeAmount: number;
    totalWaterAmount: number;
    totalOilAmount: number;
    totalResultAmount: number;
    selectedOils: TOil[];
    properties: RecipeParametersTableProps;
}

const layout = recipeBlockStyles.light;

export const ExportRecipe: FC<ExportRecipeProps> = (
    {
        recipeName,
        superfatPercent,
        waterPercent,
        lyeType,
        totalLyeAmount,
        totalWaterAmount,
        totalOilAmount,
        totalResultAmount,
        selectedOils,
        properties,
    }) => {


    const soapParameters = getRecipeParameters(properties);
    const {parameters_table, oils_list, parameters, result_summary, recipe_reminder} = localization.ru;

    const totalPercent = getTotalOilPercent(selectedOils);

    return (
        <div className="relative w-[600px] p-6 bg-white text-black font-sans overflow-hidden">

            <img src={logo} alt="Sava Savon"
                className="absolute inset-0 m-auto w-[400px] opacity-5 pointer-events-none select-none rotate-45 mix-blend-multiply"
            />

            <h1 className={`${layout.input.base} text-center mb-6 relative z-10`}>{recipeName}</h1>

            <h2 className={`font-bold text-center text-md mt-2 mb-2`}>{parameters.title}</h2>
            <ul className="text-sm">
                {[
                    [parameters.superfat, `${formatNumber(superfatPercent, 0)}${oils_list.percent_unit}`, "—"],
                    [parameters.water, `${formatNumber(waterPercent, 0)}%`, `${formatNumber(totalWaterAmount)} ${oils_list.gram_unit}`],
                    [lyeType, "—", `${formatNumber(totalLyeAmount)} ${oils_list.gram_unit}`],
                ].map(([label, percent, gram], index) => (
                    <li
                        key={index}
                        className={`${layout.getRowClass(index)} items-center`}
                    >
                        <span className={`${layout.name} flex items-center`}>{label}</span>
                        <span className={`${layout.percent} flex items-center justify-center`}>{percent}</span>
                        <span className={`${layout.gram} flex items-center justify-end`}>{gram}</span>
                    </li>
                ))}
            </ul>

            {/*масла*/}
            <h2 className={`font-bold text-center text-md mt-2 mb-2`}>{oils_list.title}</h2>
            <ul className="text-sm">
                {selectedOils.map((oil, index) => (
                    <li
                        key={index}
                        className={`${layout.getRowClass(index)} items-center`}
                    >
                        <span className={`${layout.name} flex items-center`}>{oil.name_rus}</span>
                        <span className={`${layout.percent} flex items-center justify-center`}>
                            {formatNumber(oil.percent, 0)}{oils_list.percent_unit}
                        </span>
                        <span className={`${layout.gram} flex items-center justify-end`}>
                            {formatNumber(oil.gram, 0)} {oils_list.gram_unit}
                        </span>
                    </li>
                ))}
                <li className={`grid grid-cols-[2fr_1fr_1fr] gap-2 px-2 py-1 items-center rounded-md bg-stone-100 items-center`}>
                    <span className={`${layout.name} flex items-center`}>{oils_list.summary_label}</span>
                    <span
                        className={`${layout.percent} flex items-center justify-center`}>{`${formatNumber(totalPercent, 0)}${oils_list.percent_unit}`}
                    </span>
                    <span
                        className={`${layout.gram} flex items-center justify-end`}>{`${formatNumber(totalOilAmount)} ${oils_list.gram_unit}`}
                    </span>
                </li>
            </ul>

            <h2 className={`font-bold text-center text-md mt-2 mb-2`}>{result_summary.title}</h2>

            <ul className="text-sm">
                <li className={`grid grid-cols-[2fr_1fr_1fr] gap-2 px-2 py-1 items-center rounded-md bg-stone-100 items-center`}>
                    <span className={`${layout.name} flex items-center`}>{result_summary.label}</span>
                    <span className={`${layout.percent} flex items-center justify-center`}>{"—"}</span>
                    <span className={`${layout.gram} flex items-center justify-end`}>
                            {`${formatNumber(totalResultAmount)} ${oils_list.gram_unit}`}
                    </span>
                </li>
            </ul>

            {/* Свойства мыла */}
            <h2 className={`${layout.blockTitle} mt-2 mb-2`}>Свойства мыла</h2>
            <div className={`${layout.paramHeader} items-end`}>
                <span className={layout.paramHeaderText}>{parameters_table.param}</span>
                <span className={layout.paramValueHeader}>{parameters_table.value}</span>
                <span className={layout.paramRangeHeader}>{parameters_table.range}</span>
            </div>
            <ul className="text-sm">
                {soapParameters.map((param, index) => {
                    const [min, max] = param.range.split("–").map(Number);
                    const deviation =
                        param.inRange === false && param.value !== null
                            ? param.value < min
                                ? recipe_reminder.below
                                : recipe_reminder.above
                            : null;

                    return (
                        <li
                            key={index}
                            className={`${layout.getRowClass(index)} items-end`}
                        >
                            <span className={`${layout.name} flex items-end`}>{param.label}</span>
                            <span className={`${layout.paramValue} flex items-center justify-center gap-1`}>
                            <span>{param.formatted}</span>
                                {deviation && (
                                    <span className="text-[11px] italic whitespace-nowrap opacity-80">
                                        ({deviation})
                                    </span>
                                )}
                            </span>
                            <span className={`${layout.gram} flex items-end justify-end`}>{param.range}</span>
                        </li>
                    );
                })}
            </ul>

            <p className="mt-8 text-xs text-gray-500 text-center">
                {recipe_reminder.main}
                {typeof window !== "undefined" && window.location.origin
                    ? window.location.origin
                    : recipe_reminder.via}
            </p>


        </div>
    );
};

