import React from 'react';
import ProgramFeatures from '../organisms/ProgramFeatures';
import { ScrollReveal } from "../molecules/ScrollReveal";

const ProgramTemplate = () => {
    return (
        <div className="w-full min-h-screen py-16 bg-white">
            <ScrollReveal width="100%">
                <ProgramFeatures />
            </ScrollReveal>
        </div>
    );
};

export default ProgramTemplate;
