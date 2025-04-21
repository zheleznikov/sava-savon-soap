import { ReactNode } from "react";

interface CardBlockProps {
    children: ReactNode;
    className?: string;
}

export const CalcBlockWrapper = ({ children, className = "" }: CardBlockProps) => {
    return (
        <div className={`w-full lg:w-1/2 border border-emerald-100 bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow relative z-10 ${className}`}>
                {children}
        </div>
    );
};

