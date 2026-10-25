import React, { useState } from 'react';
import { MessageCircle, Settings, X, ExternalLink, Check, Phone } from 'lucide-react';

interface WhatsAppWidgetProps {
  whatsappNumber: string;
  onUpdateWhatsAppNumber: (newNumber: string) => void;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  whatsappNumber,
  onUpdateWhatsAppNumber
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [inputNumber, setInputNumber] = useState(whatsappNumber);
  const [selectedMessage, setSelectedMessage] = useState('quote');

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const messageTemplates: Record<string, string> = {
    quote: 'Hello Roshan Solar, I would like to get a quote for a solar system in Pakistan.',
    netmetering: 'Hi, I want information regarding NEPRA Net Metering for my residential connection.',
    survey: 'Hello, I want to book a physical site survey for a rooftop solar installation.',
    tubewell: 'Hi, I need details on agricultural solar tubewell conversions for farmland.'
  };

  const currentWaUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(messageTemplates[selectedMessage])}`;

  const handleSaveNumber = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputNumber.replace(/[^0-9]/g, '');
    if (cleaned.length >= 10) {
      onUpdateWhatsAppNumber(cleaned);
      setIsConfiguring(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      
      {/* Expanded Quick-Chat Drawer / Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 text-slate-100 text-xs">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
              </div>
              <span className="font-bold text-white font-display">Roshan Solar WhatsApp</span>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsConfiguring(!isConfiguring)}
                title="Configure WhatsApp Phone Number"
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                aria-label="Configure phone number"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                aria-label="Close WhatsApp widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Number Configurator Panel */}
          {isConfiguring ? (
            <form onSubmit={handleSaveNumber} className="py-3 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-emerald-400 mb-1">
                  Configure WhatsApp Number:
                </label>
                <input
                  type="text"
                  value={inputNumber}
                  onChange={(e) => setInputNumber(e.target.value)}
                  placeholder="e.g. 923001234567"
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                />
                <span className="block text-[10px] text-slate-400 mt-1">
                  Format: Country code + number without '+' (e.g., 923001234567)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-1.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded text-[11px] transition-colors"
                >
                  Save Number
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfiguring(false)}
                  className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="py-3 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Active Hotline:</span>
                <span className="font-mono text-emerald-400 font-semibold">+{cleanWaNumber}</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Select Inquired Topic:
                </label>
                <select
                  value={selectedMessage}
                  onChange={(e) => setSelectedMessage(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="quote">Free Solar Quotation</option>
                  <option value="netmetering">NEPRA Net Metering Setup</option>
                  <option value="survey">Book Rooftop Survey</option>
                  <option value="tubewell">Agricultural Tubewell</option>
                </select>
              </div>

              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-400 italic">
                "{messageTemplates[selectedMessage]}"
              </div>

              <a
                href={currentWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                <span>Open WhatsApp Chat</span>
                <ExternalLink className="w-3 h-3 text-slate-950/70" />
              </a>
            </div>
          )}

          <div className="text-[10px] text-slate-500 text-center border-t border-slate-800 pt-2">
            Instant redirection to WhatsApp Web / Mobile app
          </div>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        aria-label="Open WhatsApp conversation"
      >
        <MessageCircle className="w-5 h-5 fill-slate-950" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </button>

    </div>
  );
};
