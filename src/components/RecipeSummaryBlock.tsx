import { useSoapCalculations } from "../hooks/useSoapCalculations";
import { useSoapRecipe } from "../context/useSoapRecipe";
import {formatNumber} from "../utils/utils";


export const RecipeSummaryBlock = () => {
    const {
        totalLyeAmount,
        totalWaterAmount,
        totalResultWeight
    } = useSoapCalculations();

    const {
        selectedOils,
        lyeType,
        superfatPercent,
        waterPercent,
        recipeName,
        inputType, setInputType
    } = useSoapRecipe();

    const getRowClass = (index: number) =>
        `grid grid-cols-3 gap-2 py-1 ${index % 2 === 0 ? "bg-stone-50" : "bg-white"} rounded-md px-2 items-center`;

    return (
        <div className="border border-gray-200 rounded-xl p-4 px-2 bg-white/70 backdrop-blur-sm shadow-sm space-y-4 text-sm sm:text-base">
            <h3 className="text-2xl font-semibold text-green-700 text-center min-h-[2.5rem]">
                {recipeName.trim() !== "" ? recipeName : ""}
            </h3>

            <div>
                <div className="grid grid-cols-3 gap-2 font-semibold text-gray-500 border-b pb-1">
                    <span></span>
                    <span className="text-center">%</span>
                    <span className="text-center">г</span>
                </div>

                <ul className="space-y-1 mt-2">
                    <h4 className="text-md font-semibold text-emerald-700 mb-2 mt-1">Параметры</h4>
                    {[{
                        label: "Пережир",
                        percent: formatNumber(superfatPercent),
                        gram: "—"
                    }, {
                        label: "Вода",
                        percent: formatNumber(waterPercent),
                        gram: formatNumber(totalWaterAmount)
                    }, {
                        label: lyeType,
                        percent: "—",
                        gram: formatNumber(totalLyeAmount)
                    }].map((item, index) => (
                        <li key={index} className={getRowClass(index)}>
                            <span className="text-gray-600">{item.label}</span>
                            <span className="text-center text-gray-800 font-medium">{item.percent !== "—" ? `${item.percent}%` : "—"}</span>
                            <span className="text-center text-gray-800 font-medium">{item.gram} {item.gram !== "—" ? "г" : ""}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Масла */}
            <div>
                <h4 className="text-md font-semibold text-emerald-700 mb-2 mt-1">Масла</h4>
                <ul className="space-y-1">
                    {selectedOils.map((oil, index) => {
                        // const percent = getOilPercentInRecipe(oil);
                        return (
                            <li key={oil.id} className={getRowClass(index)}>
                                <span className="text-gray-700 whitespace-normal break-words">{oil.name_rus}</span>
                                <span className="text-center text-gray-800 font-medium">{formatNumber(oil.percent)}%</span>
                                <span className="text-center text-gray-800 font-medium">{formatNumber(oil.gram || 0)} г</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Итог */}
            <div>
                <h4 className="text-md font-semibold text-emerald-700 mb-2 mt-1">Итог</h4>
                <div className="grid grid-cols-3 gap-2 pt-1 font-semibold text-gray-800 bg-stone-100 rounded-md px-2 py-2 items-center">
                    <span>Общая масса</span>
                    <span className="text-center text-gray-400">—</span>
                    <span className="text-center font-bold">{formatNumber(totalResultWeight)} г</span>
                </div>
            </div>

            <button
                onClick={() => setInputType(inputType === "gram" ? "percent" : "gram")}
                className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded transition"
            >
                {inputType === "gram" ? "Пересчитать в процентах" : "Пересчитать в граммах"}
            </button>
        </div>
    );
};
