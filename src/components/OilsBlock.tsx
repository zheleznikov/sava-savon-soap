import { FC } from "react";

export const OilsBlock: FC = () => {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-6 content-center">
                <span className="font-medium text-xl underline">В чем считаем:</span>

                <label className="flex items-center gap-3 cursor-pointer text-lg">
                    <input
                        type="radio"
                        name="input-mode"
                        value="grams"
                        className="accent-blue-500"
                    />
                    <span className="text-lg">Граммы</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-lg">
                    <input
                        type="radio"
                        name="input-mode"
                        value="percent"
                        className="accent-blue-500"
                    />
                    <span className="text-lg">Проценты</span>
                </label>
            </div>

            <div>
                <label className="block text-lg font-medium text-gray-700">Общий вес мыла (г):</label>
                <input
                    type="number"
                    className="mt-3 p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
            </div>
        </div>
    );
};
