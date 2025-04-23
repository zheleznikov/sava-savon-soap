import {FC} from "react";
import {InputBlockWrapper} from "../../shared/ui/InputBlockWrapper";

export const RecipeParametersTable: FC = () => {
    const parameters = [
        { label: "Твёрдость", value: 0, range: "35–45" },
        { label: "Очищающие качества", value: 0, range: "15–20" },
        { label: "Смягчающие качества", value: 0, range: "50–70" },
        { label: "Кремовость пены", value: 0, range: "15–35" },
        { label: "Пузыристость пены", value: 0, range: "15–30" },
        { label: "Йодное число", value: 0, range: "0-60" },
    ];

    return (
        <InputBlockWrapper className={"lg:w-1/2 px-0"}>
            <h4 className="text-center text-2xl font-semibold text-gray-800 mb-3 mt-1">
                Параметры

            </h4>
            <p className={"text-gray-400 text-center"}>пока не рассчитываются</p>
            <div className="grid grid-cols-3 gap-2 font-semibold text-gray-500 border-b pb-1">
                <span>Параметр</span>
                <span className="text-center">Значение</span>
                <span className="text-center">Диапазон</span>
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
                        <span className="text-center text-gray-800 font-medium">
                            {param.value}
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
