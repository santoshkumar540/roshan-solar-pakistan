import React, { useState } from 'react';
import { OFFICE_BRANCHES, DISPLAY_PHONE, CONTACT_EMAIL, DISPLAY_LANDLINE } from '../data/solarData';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  whatsappNumber: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ whatsappNumber }) => {
  const [selectedBranchCity, setSelectedBranchCity] = useState(OFFICE_BRANCHES[0].city);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const activeBranch = OFFICE_BRANCHES.find((b) => b.city === selectedBranchCity) || OFFICE_BRANCHES[0];

  const handleQuickContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;

    setSentSuccess(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMsg('');
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Nationwide Presence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Visit Our Regional Engineering Offices.
          </h2>
          <p className="text-slate-300 mt-2 text-base leading-relaxed">
            Headquartered in Lahore with regional teams across Islamabad and Karachi, we provide on-ground feasibility surveys and continuous after-sales technical maintenance nationwide.
          </p>
        </div>

        {/* 2-Column Office & Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Branch Switcher & Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Branch Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {OFFICE_BRANCHES.map((branch) => (
                <button
                  key={branch.city}
                  type="button"
                  onClick={() => setSelectedBranchCity(branch.city)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedBranchCity === branch.city
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {branch.city}
                </button>
              ))}
            </div>

            {/* Active Branch Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {activeBranch.title}
                  </h3>
                  <span className="text-xs text-emerald-400 font-mono">
                    Coordinates: {activeBranch.mapCoords}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">Physical Address</div>
                    <p className="text-slate-400 mt-0.5 leading-relaxed">{activeBranch.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">Business Hours</div>
                    <p className="text-slate-400 mt-0.5">{activeBranch.timing}</p>
                    <span className="text-[11px] text-emerald-400">Field audits operate 7 days</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">Branch Phone</div>
                    <p className="text-slate-300 font-mono mt-0.5">{activeBranch.phone}</p>
                    <p className="text-slate-400 font-mono text-[11px]">UAN: {DISPLAY_PHONE}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">Technical Inquiries</div>
                    <p className="text-slate-300 mt-0.5">{activeBranch.email}</p>
                    <p className="text-slate-400 text-[11px]">Central: {CONTACT_EMAIL}</p>
                  </div>
                </div>

              </div>

              {/* Map mockup visual */}
              <div className="mt-4 h-36 bg-slate-900 rounded-lg border border-slate-800 flex flex-col items-center justify-center text-center p-4">
                <MapPin className="w-7 h-7 text-emerald-500 mb-1" />
                <span className="text-xs font-semibold text-slate-200">
                  {activeBranch.address}
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  On-site parking available · Visitor meetings by prior appointment
                </span>
              </div>

            </div>

          </div>

          {/* Quick Message / Callback Form */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-7 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Request an Engineering Callback
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Leave your number and a solar consultant will call you within 15 minutes during business hours.
              </p>
            </div>

            {sentSuccess ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-lg flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs text-emerald-200">
                  Callback scheduled! Our regional team has received your request.
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickContact} className="space-y-4">
                <div>
                  <label htmlFor="cb-name" className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    id="cb-name"
                    type="text"
                    required
                    placeholder="e.g. Asad Ali"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="cb-phone" className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="cb-phone"
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="cb-msg" className="block text-xs font-semibold text-slate-300 mb-1">
                    Brief Query (Optional)
                  </label>
                  <textarea
                    id="cb-msg"
                    rows={2}
                    placeholder="Interested in 10kW hybrid system for Lahore..."
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Request Callback</span>
                </button>
              </form>
            )}

            <div className="pt-3 border-t border-slate-900">
              <a
                href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                  'Hello Roshan Solar Pakistan, I want to connect with an engineer for a direct phone consultation.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant WhatsApp Direct Chat</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
