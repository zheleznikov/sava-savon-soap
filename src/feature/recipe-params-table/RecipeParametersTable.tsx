import {FC} from "react";
import {InputBlockWrapper} from "../../shared/ui/InputBlockWrapper";
import {useSoapProperties} from "../recipe-calculation/model/useSoapProperties";
import {formatNumber} from "../../shared/lib/utils";


function isInRange(value: number, range: string): boolean {
    const [min, max] = range.split(/[–-]/).map((n) => parseFloat(n.trim()));
    return value >= min && value <= max;
}

export const RecipeParametersTable: FC = () => {


    const {
        hardness,
        cleansing,
        soften,
        bubbling,
        creaminess,
        iodine,
        // ins
    } = useSoapProperties();


    const parameters = [
        {label: "Твёрдость", value: hardness, range: "29–54", digits: 1},
        {label: "Очищающие качества", value: cleansing, range: "12–22", digits: 1},
        {label: "Смягчающие качества", value: soften, range: "44–69", digits: 1},
        {label: "Кремовость пены", value: creaminess, range: "16–48", digits: 1},
        {label: "Пузыристость пены", value: bubbling, range: "14–46", digits: 1},
        {label: "Йодное число", value: iodine, range: "41–70", digits: 1},
        // {label: "INS (индекс стабильности)", value: ins, range: "136–170", digits: 1},
    ].map((param) => {
        const numeric =
            !isNaN(param.value)
                ? param.value
                : null;

        return {
            ...param,
            formatted: numeric !== null ? formatNumber(numeric, param.digits) : "—",
            inRange: numeric !== null ? isInRange(numeric, param.range) : null,
        };
    });

    return (
        <InputBlockWrapper className="lg:w-1/2 px-0">
            <h4 className="text-center text-2xl font-bold text-gray-800 mb-3 mt-1">
                Параметры
            </h4>

            <div className="grid grid-cols-3 gap-2 font-semibold text-gray-500 border-b pb-1">
                <span>Параметр</span>
                <span className="text-center">Значение</span>
                <span className="text-right">Диапазон</span>
            </div>

            <ul className="space-y-1">
                {parameters.map((param, index) => (
                    <li
                        key={index}
                        className={`grid grid-cols-3 gap-2 px-2 py-1 items-center rounded-md ${
                            index % 2 === 1 ? "bg-white/70" : "bg-stone-50/90"
                        }`}
                    >
            <span className="text-gray-700 whitespace-normal break-words">
              {param.label}
            </span>

                        <span className="flex justify-center items-center gap-2 text-gray-800 font-medium">
              {param.inRange !== null && (
                  <span
                      className={`w-2.5 h-2.5 rounded-full ${
                          param.inRange ? "bg-green-500" : "bg-red-500"
                      }`}
                  />
              )}
                            {param.formatted}
            </span>

                        <span className="text-right text-emerald-600 text-sm font-medium">
              {param.range}
            </span>
                    </li>
                ))}
            </ul>
        </InputBlockWrapper>
    );
};
