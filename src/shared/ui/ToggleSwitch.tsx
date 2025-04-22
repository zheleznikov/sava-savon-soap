import { FC } from "react";
import clsx from "clsx";

type ToggleSwitchTextProps = {
    checked: boolean;
    onToggle: () => void;
    labelLeft: string;
    labelRight: string;
    ariaLabel?: string;
    className?: string;
};

export const ToggleSwitch: FC<ToggleSwitchTextProps> = ({
                                                                checked,
                                                                onToggle,
                                                                labelLeft,
                                                                labelRight,
                                                                ariaLabel = "Toggle switch",
                                                                className = "",
                                                            }) => {
    return (
        <button
            onClick={onToggle}
            className={clsx(
                "relative flex items-center border rounded-full transition-colors duration-300 overflow-hidden",
                "w-36 h-9 text-sm sm:w-40 sm:h-10",
                checked ? "bg-emerald-600 border-emerald-700" : "bg-gray-300 border-gray-400",
                className
            )}
            aria-label={ariaLabel}
        >
            {/* Лейблы */}
            <span
                className={clsx(
                    "w-1/2 text-center z-10 transition-colors duration-300",
                    checked ? "text-white" : "text-gray-800"
                )}
            >
        {labelLeft}
      </span>
            <span
                className={clsx(
                    "w-1/2 text-center z-10 transition-colors duration-300",
                    checked ? "text-gray-800" : "text-white"
                )}
            >
        {labelRight}
      </span>

            {/* Плавающая подложка */}
            <div
                className={clsx(
                    "absolute top-0 left-0 h-full w-1/2 bg-white rounded-full shadow transition-transform duration-300",
                    checked ? "translate-x-full" : "translate-x-0"
                )}
            />
        </button>
    );
};
