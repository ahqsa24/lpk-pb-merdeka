import React from "react";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  variant?: "white" | "black" | "red" | "gray";
}

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className,
  variant = "red",
}) => {
  const colorClass = {
    white: "text-amber-50",
    black: "text-zinc-800",
    red: "text-red-600",
    gray: "text-gray-600",
  }[variant];

  return (
    <p className={`${colorClass} ${className ?? ""}`}>
      {children}
    </p>
  );
};
