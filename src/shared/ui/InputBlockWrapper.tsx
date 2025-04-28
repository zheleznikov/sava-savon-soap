import { ReactNode } from "react";
import {clsx} from "clsx";
import {input_block_wrapper} from "@/shared/styles/inputBlockWrapper";
import {useTheme} from "../../app/providers/ThemeContext";

interface CardBlockProps {
    children: ReactNode;
    className?: string;
}

export const InputBlockWrapper = ({ children, className = "" }: CardBlockProps) => {

    const {appTheme} = useTheme();

    const classList = clsx(
        className,
        input_block_wrapper.layout,
        input_block_wrapper.theme[appTheme],
    );

    return (
        <div className={classList}>
                {children}
        </div>
    );
};


