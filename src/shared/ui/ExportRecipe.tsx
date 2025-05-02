import type {FC} from "react";
import {TOil} from "../../entities/oil/model/oil.types";
import {recipeBlockStyles} from "../../feature/recipe-summary";
import {formatNumber} from "../lib/utils";
import logo from "@/assets/logo4.png";
import {isInRange} from "../../feature/recipe-summary/utils/utils";


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
    properties: {
        hardness: number;
        cleansing: number;
        soften: number;
        bubbling: number;
        creaminess: number;
        iodine: number;
    };
}

const layout = recipeBlockStyles.light;

export const ExportRecipe: FC<ExportRecipeProps> = ({
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


    const parameters = [
        {label: "Твёрдость", value: properties.hardness, range: "29–54", digits: 1},
        {label: "Очищающие", value: properties.cleansing, range: "12–22", digits: 1},
        {label: "Смягчающие", value: properties.soften, range: "44–69", digits: 1},
        {label: "Пузыристость", value: properties.bubbling, range: "14–46", digits: 1},
        {label: "Кремовость", value: properties.creaminess, range: "16–48", digits: 1},
        {label: "Йодное число", value: properties.iodine, range: "41–70", digits: 1},
    ].map((param) => {
        const numeric = !isNaN(param.value) ? param.value : null;
        return {
            ...param,
            formatted: numeric !== null ? formatNumber(numeric, param.digits) : "—",
            inRange: numeric !== null ? isInRange(numeric, param.range) : null,
        };
    });


    return (
        <div className="relative w-[800px] p-6 bg-white text-black font-sans overflow-hidden">
            {/* Название */}
            <img
                src={logo}
                alt="Sava Savon watermark"
                className="absolute inset-0 m-auto w-[500px] opacity-5 pointer-events-none select-none rotate-45 mix-blend-multiply"
            />


            <h1 className={`${layout.input.base} text-center mb-6 relative z-10`}>{recipeName}</h1>
            {/* Масла */}
            <h2 className={`${layout.blockTitle} mt-6 mb-2`}>Состав масел</h2>
            <div className={`${layout.paramHeader} items-center`}>
                <span className={layout.paramHeaderText}>Название</span>
                <span className={layout.paramValueHeader}>%</span>
                <span className={layout.paramRangeHeader}>г</span>
            </div>
            <ul className="text-sm">
                {selectedOils.map((oil, index) => (
                    <li
                        key={index}
                        className={`${layout.getRowClass(index)} items-center`} // <== ДОБАВИЛ `items-center`
                    >
                        <span className={`${layout.name} flex items-center`}>{oil.name_rus}</span>
                        <span className={`${layout.percent} flex items-center justify-center`}>
        {formatNumber(oil.percent, 0)}%
      </span>
                        <span className={`${layout.gram} flex items-center justify-end`}>
        {formatNumber(oil.gram, 0)} г
      </span>
                    </li>
                ))}
            </ul>

            {/* Параметры рецепта */}
            <h2 className={`${layout.blockTitle} mt-6 mb-2`}>Параметры рецепта</h2>
            <div className={`${layout.paramHeader} items-center`}>
                <span className={layout.paramHeaderText}>Показатель</span>
                <span className={layout.paramValueHeader}>%</span>
                <span className={layout.paramRangeHeader}>г</span>
            </div>
            <ul className="text-sm">
                {[ // примеры
                    ["Пережир", `${formatNumber(superfatPercent, 0)}%`, "—"],
                    ["Вода", `${formatNumber(waterPercent, 0)}%`, `${formatNumber(totalWaterAmount)} г`],
                    [lyeType, "—", `${formatNumber(totalLyeAmount)} г`],
                    ["Масла", "100%", `${formatNumber(totalOilAmount, 0)} г`],
                    ["Общий выход", "—", `${formatNumber(totalResultAmount)} г`],
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

            {/* Свойства */}
            <h2 className={`${layout.blockTitle} mt-6 mb-2`}>Свойства мыла</h2>
            <div className={`${layout.paramHeader} items-end`}>
                <span className={layout.paramHeaderText}>Параметр</span>
                <span className={layout.paramValueHeader}>Знач.</span>
                <span className={layout.paramRangeHeader}>Диап.</span>
            </div>
            <ul className="text-sm">
                {parameters.map((param, index) => {
                    const [min, max] = param.range.split("–").map(Number);
                    const deviation =
                        param.inRange === false && param.value !== null
                            ? param.value < min
                                ? "ниже нормы"
                                : "выше нормы"
                            : null;

                    return (
                        <li
                            key={index}
                            className={`${layout.getRowClass(index)} items-end`}
                        >
                            {/* Название */}
                            <span className={`${layout.name} flex items-end`}>{param.label}</span>

                            {/* Значение + статус */}
                            <span className={`${layout.paramValue} flex items-center justify-center gap-1`}>
          <span>{param.formatted}</span>
                                {deviation && (
                                    <span className="text-[11px] italic whitespace-nowrap opacity-80">
              ({deviation})
            </span>
                                )}
        </span>

                            {/* Диапазон */}
                            <span className={`${layout.gram} flex items-end justify-end`}>
          {param.range}
        </span>
                        </li>
                    );
                })}
            </ul>

            <p className="mt-8 text-xs text-gray-500 text-center">
                Рецепт был создан в калькуляторе мыла sava savon —{" "}
                {typeof window !== "undefined" && window.location.href
                    ? window.location.href
                    : "через приложение."}
            </p>

        </div>
    );
};

