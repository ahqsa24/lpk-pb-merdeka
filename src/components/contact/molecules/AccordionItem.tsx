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
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-3 bg-white">
            <button
                onClick={toggle}
                className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors duration-200
          ${isOpen ? 'bg-red-50' : 'bg-white hover:bg-gray-50'}`}
            >
                <span className={`font-semibold ${isOpen ? 'text-red-700' : 'text-gray-800'}`}>
                    {title}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-red-600" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;
