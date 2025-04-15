import { ReactNode } from "react";

interface CardBlockProps {
    children: ReactNode;
    className?: string;
}

export const CardBlock = ({ children, className = "" }: CardBlockProps) => {
    return (
        <div
            className={`border border-purple-100 bg-white/70 backdrop-blur-sm 
                  rounded-md p-1 xs:p-2 mb-4 xs:mb-3 shadow-sm ${className}`}
        >
            <div className="flex flex-row items-center gap-4 w-full text-sm sm:text-lg">
                {children}
            </div>

        </div>
    );
};
