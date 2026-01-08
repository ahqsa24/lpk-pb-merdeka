import React from "react";

interface LineProps {
    className?: string;
    variant?: "horizontal" | "vertical";
}

export const Line: React.FC<LineProps> = ({ variant = "horizontal", className }) => {
    const base = "bg-red-600"
    const styles = variant === "horizontal" ? "w-28 h-[6]" : "w-32 h-[4] rotate-90";
    return (
        <div className={`${base} ${styles} ${className}`}></div>
    );
};