import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/solarData';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  whatsappNumber: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ whatsappNumber }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Pakistani Solar Advisory
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Frequently Asked Questions.
          </h2>
          <p className="text-slate-300 mt-2 text-base leading-relaxed">
            Clear, honest answers regarding NEPRA net metering regulations, LESCO/IESCO/KE processing times, battery storage requirements, and system economics.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-8">
          {[
            { id: 'all', label: 'All Inquiries' },
            { id: 'netmetering', label: 'Net Metering & DISCOs' },
            { id: 'technical', label: 'Inverters & Batteries' },
            { id: 'billing', label: 'Billing & Tariffs' },
            { id: 'maintenance', label: 'Warranties & Care' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-white font-display">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Unanswered question prompt */}
        <div className="mt-12 p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-4xl">
          <div>
            <div className="text-sm font-bold text-white font-display">
              Have a specific question about your 3-phase meter or roof structure?
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Chat directly with our senior electrical project engineer.
            </p>
          </div>
          <a
            href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
              'Hello Roshan Solar, I have a technical question regarding my electricity connection and solar installation.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Ask via WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
