import React from 'react';

interface TableProps {
    headers: string[];
    data: (string | number | React.ReactNode)[][];
    className?: string;
}

const Table: React.FC<TableProps> = ({ headers, data, className = '' }) => {
    return (
        <div className={`overflow-x-auto ${className}`}>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="border border-gray-300 px-4 py-2 text-gray-600"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
