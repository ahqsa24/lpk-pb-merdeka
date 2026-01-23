import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
    title: string;
    content: string;
    isOpen?: boolean;
    onClick?: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen: controlledIsOpen, onClick }) => {
    // Allow both controlled and uncontrolled mode
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

    const toggle = () => {
        if (onClick) {
            onClick();
        } else {
            setInternalIsOpen(!internalIsOpen);
        }
    };

    return (
        <div className="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden mb-3 bg-white dark:bg-zinc-900 transition-colors duration-200">
            <button
                onClick={toggle}
                className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors duration-200
          ${isOpen ? 'bg-red-50 dark:bg-red-900/10' : 'bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800'}`}
            >
                <span className={`font-semibold ${isOpen ? 'text-red-700 dark:text-red-400' : 'text-gray-800 dark:text-white'}`}>
                    {title}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-red-600 dark:text-red-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                )}
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-zinc-800">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;
