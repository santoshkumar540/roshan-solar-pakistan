import React, { useState } from 'react';
import { Sun, MessageCircle, Menu, X, FileCode } from 'lucide-react';

interface HeaderProps {
  whatsappNumber: string;
  onOpenXamppModal: () => void;
  onOpenQuoteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ whatsappNumber, onOpenXamppModal, onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const defaultWaUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent('Hello Roshan Solar Pakistan, I would like to inquire about a solar installation for my property.')}`;

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Solar Calculator', href: '#calculator' },
    { label: 'Projects', href: '#projects' },
    { label: 'Why Roshan', href: '#benefits' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-colors">
      {/* Top informational bar with demo notice & quick action */}
      <div className="bg-emerald-950/80 border-b border-emerald-900/40 px-4 py-1.5 text-xs text-emerald-200/90">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-emerald-400">DEMO PREVIEW</span>
            <span aria-hidden="true" className="text-emerald-700">·</span>
            <span>NEPRA Net Metering Application Window Open Across LESCO, IESCO & KE</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={onOpenXamppModal}
              className="hover:text-emerald-300 underline underline-offset-2 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>XAMPP Source & Guide</span>
            </button>
            <span className="hidden sm:inline text-emerald-700">·</span>
            <span className="hidden sm:inline text-slate-300">UAN: 0300-1234567</span>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single element, no trailing subtitle chips) */}
        <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-amber-300 shadow-sm transition-transform group-hover:scale-105">
            <Sun className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-display">
            Roshan<span className="text-emerald-400">Solar</span>
          </span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={defaultWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>WhatsApp Quote</span>
          </a>

          <button
            onClick={onOpenQuoteModal}
            className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Get Free Audit
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-emerald-400 hover:bg-slate-800 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={defaultWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenXamppModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>View XAMPP Instructions & Source</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
