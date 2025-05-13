import React, {FC} from "react";
import {HelpCircle} from "lucide-react";
import {clsx} from "clsx";
import {useTheme} from "../../app/providers/ThemeContext";

interface HintButtonProps {
    onClick: () => void;
    className?: string;
}

export const Hint: FC<HintButtonProps> = ({onClick, className}) => {


    const {appTheme} = useTheme();
    const style = appTheme === "dark" ? "text-gray-300 group-hover:text-gray-100" :
        "text-gray-800 group-hover:text-gray-600";


    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(className)}
        >
            <HelpCircle size={20} className={style}/>
        </button>
    );
};
