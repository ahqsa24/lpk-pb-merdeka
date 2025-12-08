import React from "react";
import { Heading } from "../atoms";
import { HomeTemplate } from "./HomeTemplate";
import { AboutTemplate } from "./AboutTemplate";
import { LeaderboardTemplate } from "./LeaderboardTemplate";

export const TemplateShowcase = () => (
  <div className="w-full space-y-8">
    <Heading level={2} className="text-3xl font-bold">Templates</Heading>

    {/* HomeTemplate */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">HomeTemplate</Heading>
      <HomeTemplate />
    </div>

    {/* AboutTemplate */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">AboutTemplate</Heading>
      <AboutTemplate />
    </div>

    {/* LeaderboardTemplate */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">LeaderboardTemplate</Heading>
      <LeaderboardTemplate data={[
        {
          id: 1,
          title: "Ahmad Rizki",
          description: "Full Stack Developer",
          avatar: "https://via.placeholder.com/56",
          score: 950
        },
        {
          id: 2,
          title: "Siti Nurhaliza",
          description: "Data Scientist",
          avatar: "https://via.placeholder.com/56",
          score: 920
        },
        {
          id: 3,
          title: "Budi Santoso",
          description: "UI/UX Designer",
          avatar: "https://via.placeholder.com/56",
          score: 890
        }
      ]} />
    </div>
  </div>
);
