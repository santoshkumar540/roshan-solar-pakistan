import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { CalculatorSection } from './components/CalculatorSection';
import { BenefitsSection } from './components/BenefitsSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { QuoteSection } from './components/QuoteSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { XamppModal } from './components/XamppModal';
import { DEFAULT_WHATSAPP_NUMBER } from './data/solarData';

export default function App() {
  const [whatsappNumber, setWhatsappNumber] = useState<string>(DEFAULT_WHATSAPP_NUMBER);
  const [isXamppModalOpen, setIsXamppModalOpen] = useState<boolean>(false);
  const [selectedEstimate, setSelectedEstimate] = useState<{
    kw: number;
    monthlyBill: number;
    disco: string;
    systemType: string;
    savings: number;
  } | null>(null);

  // Smooth scroll and populate quote form
  const handleApplyEstimate = (estimate: {
    kw: number;
    monthlyBill: number;
    disco: string;
    systemType: string;
    savings: number;
  }) => {
    setSelectedEstimate(estimate);
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setSelectedEstimate({
      kw: 10,
      monthlyBill: 65000,
      disco: 'LESCO',
      systemType: serviceTitle.includes('Commercial') ? 'Commercial 3-Phase' : serviceTitle.includes('Tubewell') ? 'Agricultural Tubewell' : 'Hybrid with Battery',
      savings: 58500
    });
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestSimilarProjectQuote = (projectTitle: string, capacity: string) => {
    const kwNumber = parseFloat(capacity) || 10;
    setSelectedEstimate({
      kw: kwNumber,
      monthlyBill: Math.round(kwNumber * 125 * 62),
      disco: projectTitle.includes('Islamabad') ? 'IESCO' : projectTitle.includes('Karachi') ? 'K-Electric' : 'LESCO',
      systemType: projectTitle.includes('Commercial') ? 'Commercial 3-Phase' : projectTitle.includes('Tubewell') ? 'Agricultural Tubewell' : 'Hybrid with Battery',
      savings: Math.round(kwNumber * 125 * 56)
    });
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuoteModal = () => {
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* 3-Zone Header */}
      <Header
        whatsappNumber={whatsappNumber}
        onOpenXamppModal={() => setIsXamppModalOpen(true)}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Semantic Main Content Container */}
      <main className="flex-1">
        {/* Hero Section with WhatsApp CTA and Interactive Schematic */}
        <Hero whatsappNumber={whatsappNumber} />

        {/* Core Services Section with Editorial Numbers */}
        <ServicesSection
          whatsappNumber={whatsappNumber}
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* Pakistan Solar ROI & Savings Calculator */}
        <CalculatorSection
          whatsappNumber={whatsappNumber}
          onApplyEstimateToQuote={handleApplyEstimate}
        />

        {/* Benefits Section Against Rising Pakistani Electricity Tariffs */}
        <BenefitsSection />

        {/* Project Gallery Showcase with Live Filtering */}
        <ProjectsGallery
          whatsappNumber={whatsappNumber}
          onRequestSimilarQuote={handleRequestSimilarProjectQuote}
        />

        {/* Lead Capture Quote Request Form with Front-End Validation */}
        <QuoteSection
          whatsappNumber={whatsappNumber}
          initialEstimate={selectedEstimate}
        />

        {/* FAQs Accordion */}
        <FaqSection whatsappNumber={whatsappNumber} />

        {/* Regional Branches & Contact Section */}
        <ContactSection whatsappNumber={whatsappNumber} />
      </main>

      {/* Semantic Footer with Quiet Copyright and Demo Notice */}
      <Footer onOpenXamppModal={() => setIsXamppModalOpen(true)} />

      {/* Configurable WhatsApp Floating Widget */}
      <WhatsAppWidget
        whatsappNumber={whatsappNumber}
        onUpdateWhatsAppNumber={(num) => setWhatsappNumber(num)}
      />

      {/* Standalone XAMPP Source Files & Deployment Guide Modal */}
      <XamppModal
        isOpen={isXamppModalOpen}
        onClose={() => setIsXamppModalOpen(false)}
      />

    </div>
  );
}
