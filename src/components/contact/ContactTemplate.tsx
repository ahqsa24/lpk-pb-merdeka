import React from 'react';
import QuestionForm from './organisms/QuestionForm';
import FAQSection from './organisms/FAQSection';
import ContactInfo from './organisms/ContactInfo';
import { ScrollReveal } from "../shared/molecules/ScrollReveal";

const ContactTemplate = () => {
    return (
        <div className="w-full min-h-screen bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Pusat Bantuan</h1>
                        <p className="text-lg text-gray-600">
                            Kami siap membantu Anda. Temukan jawaban atas pertanyaan Anda atau hubungi tim kami secara langsung.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: FAQ & Contact Info */}
                    <div className="lg:col-span-7 space-y-12">
                        <ScrollReveal width="100%">
                            <FAQSection />
                        </ScrollReveal>
                        <div className="block lg:hidden">
                            <ScrollReveal width="100%">
                                <ContactInfo />
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Right Column: Contact Form & Info (Desktop) */}
                    <div className="lg:col-span-5 space-y-8">
                        <ScrollReveal width="100%">
                            <QuestionForm />
                        </ScrollReveal>
                        <div className="hidden lg:block">
                            <ScrollReveal width="100%">
                                <ContactInfo />
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactTemplate;
