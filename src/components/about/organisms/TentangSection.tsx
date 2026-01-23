import React, { useEffect, useState } from "react";
import { LineHeading } from "../../shared/molecules";
import { aboutData as defaultAboutData } from "./TentangSection.data";
import Image from "next/image";
import { FaBullseye, FaRocket } from "react-icons/fa";
import { BookOpen, Laptop, GraduationCap, Medal, Target, Users, Briefcase, Award } from "lucide-react";

// Icon mapping for dynamic goals
const iconMap: { [key: string]: any } = {
  BookOpen, Laptop, GraduationCap, Medal, Target, Users, Briefcase, Award
};

interface GoalItem {
  icon: string;
  title: string;
  description: string;
}

interface CMSData {
  about_intro_title?: string;
  about_intro_heading?: string;
  about_intro_description?: string;
  about_intro_image_url?: string;
  about_vision_title?: string;
  about_vision_heading?: string;
  about_vision_description?: string;
  about_mission_title?: string;
  about_mission_heading?: string;
  about_mission_description?: string;
  about_goals?: GoalItem[];
}

export const TentangSection = () => {
  const [cmsData, setCmsData] = useState<CMSData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms/home-about')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setCmsData(data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Fallback to default data
  const intro = {
    title: cmsData?.about_intro_title || defaultAboutData.intro.title,
    heading: cmsData?.about_intro_heading || defaultAboutData.intro.heading,
    description: cmsData?.about_intro_description || defaultAboutData.intro.description,
    image_url: cmsData?.about_intro_image_url || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  };

  const vision = {
    title: cmsData?.about_vision_title || defaultAboutData.vision.title,
    heading: cmsData?.about_vision_heading || defaultAboutData.vision.heading,
    description: cmsData?.about_vision_description || defaultAboutData.vision.description
  };

  const mission = {
    title: cmsData?.about_mission_title || defaultAboutData.mission.title,
    heading: cmsData?.about_mission_heading || defaultAboutData.mission.heading,
    description: cmsData?.about_mission_description || defaultAboutData.mission.description
  };

  // Use CMS goals if available, otherwise use default
  const goals = (cmsData?.about_goals && cmsData.about_goals.length > 0)
    ? cmsData.about_goals.map(g => ({
      ...g,
      IconComponent: iconMap[g.icon] || BookOpen
    }))
    : defaultAboutData.goals.map(g => ({
      icon: 'BookOpen',
      title: g.title,
      description: g.description,
      IconComponent: g.icon
    }));

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-12 xl:px-24 flex flex-col gap-24">

        {/* Intro Section - Split Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="inline-block px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-full text-sm w-fit border border-red-100 dark:border-red-900/30">
              {intro.title}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {intro.heading}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              {intro.description}
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-900">
              <img
                src={intro.image_url}
                alt="About Us Team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-red-100/50 dark:bg-red-900/20 rounded-3xl"></div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-gradient-to-br from-white to-red-50 dark:from-zinc-900 dark:to-red-900/10 p-8 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-6 text-2xl">
              <FaBullseye />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{vision.title}</h3>
            <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">{vision.heading}</h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{vision.description}</p>
          </div>

          {/* Mission Card */}
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-zinc-900 dark:to-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 text-2xl">
              <FaRocket />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{mission.title}</h3>
            <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">{mission.heading}</h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{mission.description}</p>
          </div>
        </div>

        {/* Goals Section */}
        <div className="flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto">
            <LineHeading title="Tujuan Kami" />
            <p className="text-gray-600 dark:text-gray-400 mt-4">Kami berdedikasi untuk memberikan dampak nyata melalui pendidikan yang berkualitas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, index) => {
              const IconComponent = goal.IconComponent;
              return (
                <div key={index} className="flex gap-6 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 hover:border-red-200 dark:hover:border-red-900/30 hover:bg-red-50/30 dark:hover:bg-red-900/5 transition-all duration-300 group bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-red-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={32} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{goal.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{goal.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
