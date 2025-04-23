import {FC, ReactNode} from "react";

interface CardBlockProps {
    children: ReactNode;
    className?: string;
}

export const CalcBlockWrapper:FC<CardBlockProps> = ({ children, className = "" }) => {
    return (
        <div
            className={`
                w-full lg:w-1/2 border border-purple-100 bg-white/50 backdrop-blur-sm 
                rounded-xl p-4 shadow transition duration-200 ease-in-out 
                hover:shadow-xl hover:border-purple-150 hover:bg-white/90 
                hover:scale-[1.002]
                transform relative z-10 ${className}`}
        >
            {children}
        </div>
    );
};

