import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <textarea
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 transition-all duration-200 outline-none
          ${error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-gray-200 focus:border-red-500 focus:ring-red-50 hover:border-gray-300'
                    } 
          ${className}`}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
};

export default TextArea;
