import React from 'react';
import SyllabusTimeline from '../organisms/SyllabusTimeline';
import PricingRequirementsSection from '../organisms/PricingRequirementsSection';
import RegistrationFAQSection from '../organisms/RegistrationFAQSection';
import { ScrollReveal } from "../molecules/ScrollReveal";

const SyllabusTemplate = () => {
    return (
        <div className="w-full min-h-screen py-16">
            <div className="container mx-auto px-4">
                <SyllabusTimeline />

                {/* Additional Sections Moved from Contact */}
                <div className="mt-20">
                    <ScrollReveal width="100%">
                        <PricingRequirementsSection />
                    </ScrollReveal>
                </div>

                <div className="mt-12 max-w-4xl mx-auto">
                    <ScrollReveal width="100%">
                        <RegistrationFAQSection />
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default SyllabusTemplate;
