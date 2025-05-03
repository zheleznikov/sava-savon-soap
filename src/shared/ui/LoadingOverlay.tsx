import {FC} from "react";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

interface LoadingOverlayProps {
    text?: string;
    className?: string;
}

export const LoadingOverlay: FC<LoadingOverlayProps> = ({ text = "Загрузка...", className }) => {

    const isMobileView = isMobile;

    return (
        <div
            className={clsx(
                "absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50",
                className
            )}
        >
            <div
                className={clsx(
                    "flex flex-col items-center space-y-2",
                    isMobileView && "mt-[100vh]"
                )}
            >
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-700 dark:text-gray-200 font-semibold text-lg">{text}</span>
            </div>
        </div>
    );

};
