import React from "react";
import { LeaderboardRow } from "../molecules";

interface LeaderboardEntry {
  id: number;
  title: string;
  description: string;
  avatar: string;
  score: number;
  rank?: number; // Optional on entry, but we will pass it explicitly or map it
}
interface LeaderboardProps {
  data: LeaderboardEntry[];
  startRank?: number; // Starting rank number
}
export const LeaderboardTable: React.FC<LeaderboardProps> = ({ data, startRank = 1 }) => (
  <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="flex flex-col">
      {data.map((entry, index) => (
        <LeaderboardRow
          key={entry.id}
          rank={startRank + index}
          src={entry.avatar}
          title={entry.title}
          description={entry.description}
          score={entry.score}
        />
      ))}
    </div>
  </section>
);