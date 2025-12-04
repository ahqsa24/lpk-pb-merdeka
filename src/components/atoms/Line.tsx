import React from "react";

interface LineProps {
    className?: string;
}

export const Line: React.FC<LineProps> = ({ className }) => {
    return (
        <div className={`bg-red-600 w-28 h-[6] ${className}`}></div>
    );
};