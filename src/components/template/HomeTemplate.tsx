import React from "react";
import { HeroSection } from "../organisms";
import { StatsGrid } from "../organisms"
import { LeaderboardTemplate } from "./LeaderboardTemplate";
import { TestimoniSection } from "../organisms";

export const HomeTemplate = () => {
  
  return (
  <main className="mx-auto">
    <div className="bg-red-50">
      <HeroSection />
    </div>
      <StatsGrid />
      <TestimoniSection />
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
        },
        {
          id: 4,
          title: "ALam Budiawan",
          description: "UI/UX Designer",
          avatar: "https://via.placeholder.com/56",
          score: 850
        },
        {
          id: 5,
          title: "Rudi Pikachu",
          description: "Data Engineer",
          avatar: "https://via.placeholder.com/56",
          score: 850
        },
      ]} />
  </main>
  )
};