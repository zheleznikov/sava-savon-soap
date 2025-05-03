import { ReactNode } from "react";
import {clsx} from "clsx";
import {inputBlockWrapperStyles} from "@/shared/styles/InputBlockWrapper.styles";
import {useTheme} from "../../app/providers/ThemeContext";

interface CardBlockProps {
    children: ReactNode;
    className?: string;
}

export const InputBlockWrapper = ({ children, className = "" }: CardBlockProps) => {

    const {appTheme} = useTheme();

    const classList = clsx(
        className,
        inputBlockWrapperStyles.layout,
        inputBlockWrapperStyles.theme[appTheme],
    );

    return (
        <div className={classList}>
                {children}
        </div>
    );
};


