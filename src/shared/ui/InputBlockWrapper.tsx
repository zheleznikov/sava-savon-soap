import { ReactNode } from "react";
import {clsx} from "clsx";
import {input_block_wrapper} from "../styles/layout";

interface CardBlockProps {
    children: ReactNode;
    className?: string;
}

export const InputBlockWrapper = ({ children, className = "" }: CardBlockProps) => {
    const classList = clsx(
        input_block_wrapper.layout,
        input_block_wrapper.theme.light,
        className
    );

    return (
        <div className={classList}>
                {children}
        </div>
    );
};


