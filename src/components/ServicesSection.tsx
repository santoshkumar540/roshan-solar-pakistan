import React, { useState } from 'react';
import { SOLAR_SERVICES } from '../data/solarData';
import { Home, Building2, Wheat, Zap, Wrench, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { SolarService } from '../types';

interface ServicesSectionProps {
  whatsappNumber: string;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ whatsappNumber, onSelectServiceForQuote }) => {
  const [selectedService, setSelectedService] = useState<SolarService | null>(null);

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const getIcon = (iconName: SolarService['iconName']) => {
    switch (iconName) {
      case 'home':
        return <Home className="w-5 h-5 text-emerald-400" />;
      case 'building':
        return <Building2 className="w-5 h-5 text-emerald-400" />;
      case 'wheat':
        return <Wheat className="w-5 h-5 text-amber-400" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'wrench':
        return <Wrench className="w-5 h-5 text-slate-300" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Engineering &amp; Turnkey Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Complete Solar Power Solutions Tailored for Pakistan.
          </h2>
          <p className="text-slate-300 mt-3 text-base leading-relaxed">
            From luxury residences in Lahore and Karachi to heavy industrial factories and off-grid agricultural tubewells, we deliver certified Tier-1 photovoltaic engineering with end-to-end DISCO net metering approvals.
          </p>
        </div>

        {/* Asymmetric Bento-Grid for Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLAR_SERVICES.map((service, index) => {
            const isMarquee = index === 0 || index === 1; // Give prominence to Marquee services
            return (
              <div
                key={service.id}
                className={`bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors group ${
                  isMarquee ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Human Editorial Numbering & Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-emerald-500 tabular-nums">
                      {service.number}.
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                      {getIcon(service.iconName)}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium text-emerald-400/90 mt-1 mb-3">
                    {service.tagline}
                  </p>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 pb-3 border-b border-slate-900">
                    <span>Capacity: {service.typicalCapacity}</span>
                    <span aria-hidden="true">·</span>
                    <span>{service.idealFor}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 mb-6">
                    {service.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Footers */}
                <div className="pt-4 border-t border-slate-900 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Request System Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                      `Hello Roshan Solar, I am interested in ${service.title} (${service.typicalCapacity}). Please share packages and pricing.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
                    title={`Inquire about ${service.title} on WhatsApp`}
                    aria-label={`Inquire about ${service.title} on WhatsApp`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Turnkey Process Workflow Steps */}
        <div className="mt-16 bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              Standard Operating Procedure
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Our 4-Stage Execution Cycle
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              From site survey to bi-directional meter energization, we handle every detail with certified electrical engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-500">Stage 01</span>
              <h4 className="text-sm font-bold text-white">Shading &amp; Structural Audit</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Roof orientation, azimuth angle, wind-load capacity, and 3D irradiance modeling for maximum sunshine yield.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-500">Stage 02</span>
              <h4 className="text-sm font-bold text-white">Engineering &amp; Hardware Assembly</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Heavy hot-dip galvanized mounting structures, Tier-1 bifacial panels, and DC surge protection arresters.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-500">Stage 03</span>
              <h4 className="text-sm font-bold text-white">DISCO &amp; NEPRA Liaison</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                NOC processing, electrical inspector safety testing, and bi-directional green meter procurement for LESCO/IESCO/KE.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-500">Stage 04</span>
              <h4 className="text-sm font-bold text-white">Commissioning &amp; Cloud Monitoring</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mobile app setup, string testing, inverter handover, and 25-year warranty certificate issuance.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
