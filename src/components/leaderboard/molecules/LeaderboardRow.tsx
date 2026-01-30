import React from "react";
import { Avatar } from "../../shared/atoms";
import { Paragraph } from "../../shared/atoms";


interface LeaderboardRowProps {
    rank: number;
    src: string;
    title: string;
    description: string;
    score: number;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ rank, src, title, description, score }) => {
    return (
        <div className="flex items-center p-3.5 mb-3 bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-gray-100 dark:border-zinc-800/50 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-red-500/30 group relative overflow-hidden">
            {/* Background Rank Accent */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-7xl font-black text-gray-50 dark:text-zinc-800/20 select-none group-hover:text-red-500/5 transition-colors">
                {rank}
            </div>

            {/* Rank Indicator */}
            <div className="w-14 flex-shrink-0 flex items-center justify-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm transition-all duration-300 ${rank % 2 === 0 ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400' : 'bg-red-50 dark:bg-red-950/30 text-red-600'}`}>
                    #{rank}
                </div>
            </div>

            {/* Avatar Section */}
            <div className="flex-shrink-0 mr-4">
                <div className="relative">
                    <Avatar
                        src={src}
                        size={48}
                        className="ring-2 ring-white dark:ring-zinc-800 shadow-sm group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full" />
                </div>
            </div>

            {/* Info Section */}
            <div className="flex-grow min-w-0 mr-4 z-10">
                <h4 className="font-black text-base text-gray-900 dark:text-white truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors uppercase tracking-tight">
                    {title}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold uppercase">
                        {description}
                    </span>
                </div>
            </div>

            {/* Score Section */}
            <div className="flex-shrink-0 text-right z-10">
                <div className="flex flex-col items-end">
                    <span className="text-xl font-black text-zinc-900 dark:text-white leading-none">
                        {score.toLocaleString()}
                    </span>
                    <span className="text-[9px] font-black text-red-600 dark:text-red-500 tracking-[0.2em] mt-1">XP</span>
                </div>
            </div>
        </div>
    );
};
