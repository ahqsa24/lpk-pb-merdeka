import React from "react";
import { Avatar } from "../atoms";
import { Paragraph } from "../atoms";


interface LeaderboardRowProps {
    rank: number;
    src: string;
    title: string;
    description: string;
    score: number;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ rank, src, title, description, score }) => {
    return (
        <div className="flex items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-red-100 group">
            {/* Rank Section */}
            <div className="w-12 flex-shrink-0 flex items-center justify-center">
                <span className="font-bold text-gray-400 text-lg group-hover:text-red-500 transition-colors">#{rank}</span>
            </div>

            {/* Avatar Section */}
            <div className="flex-shrink-0 mr-4">
                <Avatar src={src} size={56} className="ring-2 ring-gray-100 group-hover:ring-red-100 transition-all" />
            </div>

            {/* Info Section */}
            <div className="flex-grow min-w-0 mr-4">
                <h4 className="font-bold text-gray-900 truncate group-hover:text-red-600 transition-colors">{title}</h4>
                <p className="text-sm text-gray-500 truncate">{description}</p>
            </div>

            {/* Score Section */}
            <div className="flex-shrink-0 text-right">
                <span className="block font-bold text-red-600 text-lg">{score}</span>
                <span className="text-xs text-gray-400 font-medium">XP</span>
            </div>
        </div>
    );
};
