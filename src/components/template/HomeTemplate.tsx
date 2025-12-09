import React from "react";
import { HeroSection } from "../organisms";
import { StatsGrid } from "../organisms"
import { LeaderboardTemplate } from "./LeaderboardTemplate";
import { TestimoniSection } from "../organisms";
import { ScrollReveal } from "../molecules/ScrollReveal";

export const HomeTemplate = () => {

  return (
    <main className="mx-auto">
      <HeroSection />
      <ScrollReveal width="100%">
        <StatsGrid />
      </ScrollReveal>
      <ScrollReveal width="100%">
        <LeaderboardTemplate data={[
          { id: 1, title: "Ahmad Rizki", description: "Junior Broker", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100", score: 950 },
          { id: 2, title: "Siti Nurhaliza", description: "Risk Analyst", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100", score: 920 },
          { id: 3, title: "Budi Santoso", description: "Technical Analyst", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100", score: 890 },
          { id: 4, title: "Alam Budiawan", description: "Trader Independen", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100&h=100", score: 850 },
          { id: 5, title: "Rudi Pikachu", description: "Compliance Officer", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100&h=100", score: 840 },
          { id: 6, title: "Dewi Lestari", description: "Financial Consultant", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100", score: 830 },
          { id: 7, title: "Eko Kurniawan", description: "Market Researcher", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100", score: 820 },
          { id: 8, title: "Fajar Nugraha", description: "Business Development", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100", score: 810 },
          { id: 9, title: "Gita Gutawa", description: "Investment Advisor", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100", score: 800 },
          { id: 10, title: "Hendra Setiawan", description: "Junior Research", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100", score: 790 },
          { id: 11, title: "Indah Permata", description: "Portfolio Manager", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100", score: 780 },
          { id: 12, title: "Joko Anwar", description: "Senior Broker", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=100&h=100", score: 770 },
          { id: 13, title: "Kartini", description: "Wealth Manager", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100", score: 760 },
          { id: 14, title: "Lukman Sardi", description: "Commodity Specialist", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100", score: 750 },
          { id: 15, title: "Maudy Ayunda", description: "Derivatives Analyst", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=100&h=100", score: 740 },
        ]} />
      </ScrollReveal>
      <ScrollReveal width="100%">
        <TestimoniSection />
      </ScrollReveal>
    </main>
  )
};