import React from 'react';
import { Sun, FileCode, Shield, Phone, Mail } from 'lucide-react';
import { CONTACT_EMAIL, DISPLAY_PHONE } from '../data/solarData';

interface FooterProps {
  onOpenXamppModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenXamppModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <a href="#" className="flex items-center gap-2 text-white font-bold font-display text-lg">
              <div className="w-7 h-7 rounded-md bg-emerald-600 flex items-center justify-center text-amber-300">
                <Sun className="w-4 h-4 fill-current" />
              </div>
              <span>Roshan<span className="text-emerald-400">Solar</span> Systems</span>
            </a>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Pakistan's turnkey solar EPC contractor specializing in Tier-1 residential on-grid and hybrid setups, industrial solar plants, and NEPRA net metering across Punjab, Sindh, and Islamabad.
            </p>
            <div className="pt-1 flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{DISPLAY_PHONE}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{CONTACT_EMAIL}</span>
              </span>
            </div>
          </div>

          {/* Nav Column 1: Services */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Solutions
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Residential Solar (5-20 kW)</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Commercial &amp; Industrial (50kW+)</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Solar Tubewell Conversions</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">NEPRA Green Net Metering</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Panel Washing &amp; Drone Audits</a></li>
            </ul>
          </div>

          {/* Nav Column 2: Regions & DISCOs */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              DISCO Service Regions
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">LESCO (Lahore &amp; Kasur)</a></li>
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">IESCO (Islamabad &amp; Pindi)</a></li>
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">K-Electric (Karachi)</a></li>
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">FESCO (Faisalabad)</a></li>
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">MEPCO (Multan &amp; Sahiwal)</a></li>
            </ul>
          </div>

          {/* Nav Column 3: Developer / XAMPP */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Developer / Demo
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenXamppModal}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <FileCode className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>XAMPP Package &amp; Guide</span>
                </button>
              </li>
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">Solar ROI Calculator</a></li>
              <li><a href="#projects" className="hover:text-emerald-400 transition-colors">Projects Showcase</a></li>
              <li><a href="#faqs" className="hover:text-emerald-400 transition-colors">Technical FAQs</a></li>
              <li><a href="#quote" className="hover:text-emerald-400 transition-colors">Request Site Survey</a></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Notice regarding Demo */}
        <div className="py-4 px-5 bg-slate-900/80 border border-slate-800/80 rounded-lg text-slate-400 leading-relaxed mb-8">
          <span className="font-semibold text-emerald-400">DEMO CONTENT NOTICE:</span> This website is a demonstration and functional prototype developed for a Pakistani solar installation firm. Company registration, sample case study names, and contact emails are placeholder demonstration elements. All engineering formulas, NEPRA net metering rules, and tariff benchmarks represent actual Pakistani market standards.
        </div>

        {/* Bottom Bar: Copyright & Standards */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div>
            &copy; {new Date().getFullYear()} Roshan Solar Systems Pakistan (Demo). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>NEPRA S.R.O. 892(I)/2015 Compliant</span>
            <span aria-hidden="true">·</span>
            <span>PEC Registered Engineering</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
