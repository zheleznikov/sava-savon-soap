import { useSoapCalculations } from "../../../hooks/useSoapCalculations";
import { useSoapRecipe } from "../../../hooks/useSoapRecipe";
import {formatNumber} from "../../../utils/utils";
import {SmartNumberInput} from "../../SmartNumberInput";
import {CalcBlockWrapper} from "../../CalcBlockWrapper";


export const RecipeSummaryBlock = () => {
    const {
        totalLyeAmount,
        totalWaterAmount,
        totalResultWeight,
        totalOilWeight

    } = useSoapCalculations();

    const {
        selectedOils,
        lyeType,
        superfatPercent,
        waterPercent,
        inputType, setInputType,
        userDefinedTotalWeight, setUserDefinedTotalWeight
    } = useSoapRecipe();

    const getRowClass = (index: number) =>
        `grid grid-cols-3 gap-2 py-1 ${index % 2 === 0 ? "bg-stone-50" : "bg-white"} rounded-md px-2 items-center`;

    return (
        <CalcBlockWrapper>
            <RecipeTitleInput/>

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
                        return (
                            <li key={oil.id} className={getRowClass(index)}>
                                <span className="text-gray-700 whitespace-normal break-words">{oil.name_rus}</span>
                                <span className="text-center text-gray-800 font-medium">{formatNumber(oil.percent)}%</span>
                                <span className="text-center text-gray-800 font-medium">{formatNumber(oil.gram || 0)} г</span>
                            </li>
                        );
                    })}
                </ul>

                {/* Масса масел — сразу под списком масел */}
                <div className="grid grid-cols-3 gap-2 pt-1 font-semibold text-gray-800 bg-stone-100 rounded-md px-2 py-2 items-center mt-1">
                    <span className="font-medium">Масса масел</span>
                    <span className="text-center text-gray-800 font-medium">
        {formatNumber(
            selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0)
        )}%
    </span>
                    <span className="text-center font-semibold">{formatNumber(totalOilWeight)} г</span>
                </div>

            </div>

            {/* Итог */}
            <div>
                <h4 className="text-md font-semibold text-emerald-700 mb-2 mt-1">Итог</h4>

                {/* Общая масса */}
                <div className="grid grid-cols-3 gap-2 pt-1 font-semibold text-gray-800 bg-stone-100 rounded-md px-2 py-2 items-center mt-1">
                    <span>Общая масса</span>
                    <span className="text-center text-gray-400">—</span>
                    <span className="text-center font-bold">{formatNumber(totalResultWeight)} г</span>
                </div>
            </div>


            <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
                <button
                    onClick={() => setInputType(inputType === "gram" ? "percent" : "gram")}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded transition w-full sm:w-[200px] text-center"
                >
                    {inputType === "gram" ? "Пересчитать в процентах" : "Пересчитать в граммах"}
                </button>

                {/* Резервируем место и плавно показываем поле */}
                <div
                    className={`flex flex-col min-w-[160px] w-full sm:w-auto transition-opacity duration-300 ${
                        inputType === "percent" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
                >
                    <label className="text-sm text-gray-600 mb-1">Общий вес мыла</label>
                    <div className="flex items-center gap-1">
                        <SmartNumberInput
                            decimalPlaces={0}
                            value={userDefinedTotalWeight}
                            onChange={setUserDefinedTotalWeight}
                            placeholder="граммы"
                            min={10}
                            max={10000}
                            className="w-full max-w-[120px] text-sm"
                        />
                        <span className="text-gray-500">г</span>
                    </div>
                </div>
            </div>


        </CalcBlockWrapper>
    );
};


export const RecipeTitleInput = () => {
    const { recipeName, setRecipeName } = useSoapRecipe();

    const isEmpty = recipeName.trim() === "";

    return (
        <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Такой рецепт и без названия"
            className={`w-full text-2xl text-center font-semibold min-h-[2.5rem] bg-transparent outline-none transition
                ${isEmpty ? "text-gray-400" : "text-green-700"}`}
        />
    );
};