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
        { id: 1, title: "Ahmad Rizki", description: "Junior Broker", avatar: "https://via.placeholder.com/56", score: 950 },
        { id: 2, title: "Siti Nurhaliza", description: "Risk Analyst", avatar: "https://via.placeholder.com/56", score: 920 },
        { id: 3, title: "Budi Santoso", description: "Technical Analyst", avatar: "https://via.placeholder.com/56", score: 890 },
        { id: 4, title: "Alam Budiawan", description: "Trader Independen", avatar: "https://via.placeholder.com/56", score: 850 },
        { id: 5, title: "Rudi Pikachu", description: "Compliance Officer", avatar: "https://via.placeholder.com/56", score: 840 },
        { id: 6, title: "Dewi Lestari", description: "Financial Consultant", avatar: "https://via.placeholder.com/56", score: 830 },
        { id: 7, title: "Eko Kurniawan", description: "Market Researcher", avatar: "https://via.placeholder.com/56", score: 820 },
        { id: 8, title: "Fajar Nugraha", description: "Business Development", avatar: "https://via.placeholder.com/56", score: 810 },
        { id: 9, title: "Gita Gutawa", description: "Investment Advisor", avatar: "https://via.placeholder.com/56", score: 800 },
        { id: 10, title: "Hendra Setiawan", description: "Junior Research", avatar: "https://via.placeholder.com/56", score: 790 },
        { id: 11, title: "Indah Permata", description: "Portfolio Manager", avatar: "https://via.placeholder.com/56", score: 780 },
        { id: 12, title: "Joko Anwar", description: "Senior Broker", avatar: "https://via.placeholder.com/56", score: 770 },
        { id: 13, title: "Kartini", description: "Wealth Manager", avatar: "https://via.placeholder.com/56", score: 760 },
        { id: 14, title: "Lukman Sardi", description: "Commodity Specialist", avatar: "https://via.placeholder.com/56", score: 750 },
        { id: 15, title: "Maudy Ayunda", description: "Derivatives Analyst", avatar: "https://via.placeholder.com/56", score: 740 },
      ]} />
    </main>
  )
};