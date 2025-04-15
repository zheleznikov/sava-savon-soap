import {FC, useState} from "react";
import {SmartNumberInput} from "./SmartNumberInput";
import {baseFilledInputClass} from "../styles/styles";
import {CardBlock} from "./CardBlock";

export const WaterLine: FC = () => {

    const [value, setValue] = useState(0);
    return (
        <CardBlock>
                {/* Левая часть — текст */}
                <div className="flex-[2] min-w-0 text-gray-700 font-medium truncate">
                    💧 Вода
                </div>

                {/* Процент воды */}
                <div className="flex items-center gap-1">
                    <SmartNumberInput
                        placeholder={"Введите %"}
                        value={value}
                        onChange={(e) => {
                            setValue(e)
                        }}
                        className="w-20 sm:w-24 border border-gray-300 rounded px-2 py-1 text-gray-800
           placeholder:text-xxs sm:placeholder:text-xs placeholder:text-gray-400"
                    />

                    <span className="text-gray-500">%</span>
                </div>

                {/* Кол-во граммов */}
                <div className="flex items-center gap-1">
                    <input
                        placeholder={"Считаем..."}
                        readOnly
                        value={""}
                        className={baseFilledInputClass}
                    />
                    <span className="text-gray-500">г</span>
                </div>
        </CardBlock>
    );
};
