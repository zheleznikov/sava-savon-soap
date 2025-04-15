import {FC, useState} from "react";
import {CardBlock} from "./CardBlock";
import {baseFilledInputClass} from "../styles/styles";

export const LyeLine: FC = () => {
    const [lyeType, setLyeType] = useState<'NaOH' | 'KOH'>('NaOH');

    return (
        <>
            <CardBlock>
                <div className="flex flex-row items-center gap-4 w-full text-md sm:text-lg">

                        <div className="flex items-center gap-4 font-medium">
                            <span className="text-sm text-gray-600 font-medium">⚗️:</span>

                            <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                    type="radio"
                                    name="lyeType"
                                    value="NaOH"
                                    checked={lyeType === 'NaOH'}
                                    onChange={() => setLyeType('NaOH')}
                                    className="text-gray-600 focus:ring-purple-500"
                                />
                                NaOH
                            </label>

                            <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                    type="radio"
                                    name="lyeType"
                                    value="KOH"
                                    checked={lyeType === 'KOH'}
                                    onChange={() => setLyeType('KOH')}
                                    className="text-gray-600 focus:ring-purple-500"
                                />
                                KOH
                            </label>
                        </div>
                    </div>


                    <div className="flex items-center gap-1">
                        <input
                            placeholder={"Считаем..."}
                            readOnly
                            className={baseFilledInputClass}
                            />
                        <span className="text-gray-500">г</span>
                    </div>

            </CardBlock>
        </>

    );
};