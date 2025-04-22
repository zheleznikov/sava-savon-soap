import {FC} from "react";
import {useTheme} from "../../app/providers/ThemeContext";
import {clsx} from "clsx";

export const ThemeHandler: FC = () => {
    const { appTheme, toggleTheme } = useTheme();
    const isLight = appTheme === "light";

    // === Layout & position ===
    const positionClass = "z-50 fixed top-10 right-0 sm:top-6 sm:right-6 hidden sm:flex";
    const containerBaseClass =
        "flex items-center px-1 border rounded-full shadow-inner transition-colors duration-300";
    const containerSizeClass = "w-14 h-7 sm:w-16 sm:h-8";
    const containerThemeClass = isLight
        ? "bg-gray-200 border-gray-300"
        : "bg-gray-800 border-gray-600";

    // === Knob ===
    const knobBaseClass =
        "rounded-full transition-all duration-300 flex items-center justify-center";
    const knobSizeClass = "w-5 h-5 sm:w-6 sm:h-6";
    const knobTranslateClass = isLight
        ? "translate-x-0 bg-white text-yellow-400"
        : "translate-x-6 sm:translate-x-8 bg-gray-700 text-gray-200";

    return (
        <button
            onClick={toggleTheme}
            className={clsx(
                positionClass,
                containerBaseClass,
                containerSizeClass,
                containerThemeClass
            )}
            aria-label="Переключить тему"
        >
            <div
                className={clsx(
                    knobBaseClass,
                    knobSizeClass,
                    knobTranslateClass
                )}
            >
                {isLight ? "🌞" : "🌙"}
            </div>
        </button>
    );
};