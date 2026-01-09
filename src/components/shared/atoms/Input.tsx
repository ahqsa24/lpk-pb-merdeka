import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 transition-all duration-200 outline-none
          ${error
            ? "border-red-500 focus:border-red-500 focus:ring-red-100"
            : "border-gray-200 focus:border-red-500 focus:ring-red-50 hover:border-gray-300"
          }
          ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";