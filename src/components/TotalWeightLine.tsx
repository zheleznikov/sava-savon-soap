import {FC} from "react";
import {CardBlock} from "./CardBlock";
import {baseFilledInputClass} from "../styles/styles";

export const TotalWeightLine: FC = () => {
    return (

        <CardBlock>

                    <div className="flex gap-1 w-full sm:flex-[2] text-sm text-gray-700 font-medium">
                        🧼 Общий вес мыла

                    </div>

                    <div className="flex items-center gap-3 invisible">
                        <input
                            type="number"
                            readOnly
                            value={600}
                            className="w-20 bg-blue-50 text-blue-800 font-semibold rounded border border-blue-300 shadow-inner px-3 py-1 cursor-default select-none"
                        />
                        <span className="text-sm text-gray-500">г</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            readOnly
                            value={55.21}
                            className={baseFilledInputClass}
                               / >

                        <span className="text-sm text-gray-500">г</span>
                    </div>



            </CardBlock>
    );
};