import { FC } from "react";

interface Props {
    usePercent: boolean;
    onChange: (usePercent: boolean) => void;
    label?: string;
}

export const InputModeToggle: FC<Props> = ({
                                               usePercent,
                                               onChange,
                                               label = "Режим ввода",
                                           }) => {
    return (
        <div className="flex flex-col min-w-[160px]">
            <label className="text-sm text-gray-600 mb-1">{label}</label>
            <div className="flex border border-gray-300 rounded-md overflow-hidden w-fit">
                <button
                    type="button"
                    onClick={() => onChange(false)}
                    className={`px-4 py-1 text-sm transition ${
                        !usePercent
                            ? "bg-purple-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    Граммы
                </button>
                <button
                    type="button"
                    onClick={() => onChange(true)}
                    className={`px-4 py-1 text-sm transition ${
                        usePercent
                            ? "bg-purple-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    Проценты
                </button>
            </div>
        </div>
    );
};
