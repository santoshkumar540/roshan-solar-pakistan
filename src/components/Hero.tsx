import React, { useState } from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, Zap, Sun, BatteryCharging, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  whatsappNumber: string;
}

export const Hero: React.FC<HeroProps> = ({ whatsappNumber }) => {
  const [activeSimulationMode, setActiveSimulationMode] = useState<'export' | 'backup' | 'peak'>('export');

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const heroWaUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent('Hello Roshan Solar, I want a free rooftop survey and quote for my property in Pakistan.')}`;

  return (
    <section className="relative bg-slate-950 text-slate-100 overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      {/* Background glow meshes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Proposition and Conversion Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial kicker (no static pill badge) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wide uppercase">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Engineered for Pakistani Solar Irradiance & Climate</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-normal">NEPRA Certified Tier-1</span>
            </div>

            {/* Main Headline with balanced wrapping */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display text-balance">
              Clean, Uninterrupted Solar Power for Pakistani Homes &amp; Industry.
            </h1>

            {/* Concrete Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Hedge against escalating DISCO peak tariffs (Rs. 65+/unit) with high-yield Tier-1 bifacial panels, seamless LiFePO4 battery backup, and fast-track NEPRA Green Net Metering across Lahore, Karachi, Islamabad, and nationwide.
            </p>

            {/* Trust points list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Turnkey NEPRA Green Meter in 18-30 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>25-Year Linear Output Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0-Second Cutover During Load Shedding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Payback in 2.5 – 3.2 Years on Average</span>
              </div>
            </div>

            {/* CTAs: WhatsApp Primary + Calculator Secondary */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={heroWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-md shadow-emerald-500/10 whitespace-nowrap"
              >
                <MessageCircle className="w-4.5 h-4.5 fill-slate-950" />
                <span>Chat with Solar Engineer on WhatsApp</span>
              </a>

              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Calculate PKR Savings</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </a>
            </div>

            {/* Micro disclaimer on demo content */}
            <div className="text-xs text-slate-500">
              <span>Configurable WhatsApp demo</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>Available for LESCO, IESCO, KE, FESCO &amp; MEPCO territories</span>
            </div>

          </div>

          {/* Right Column: Interactive Solar System Architecture Specifier */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl relative">
              
              {/* Header with Title and Mode Switcher */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">
                    Interactive System Architecture
                  </h3>
                  <p className="text-xs text-slate-400">10 kW Hybrid + Net Metering Simulation</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-400 tabular-nums font-semibold">
                    {activeSimulationMode === 'export' ? '+4.2 kW Export' : activeSimulationMode === 'backup' ? '100% Off-Grid' : '9.6 kW Yield'}
                  </span>
                </div>
              </div>

              {/* Mode Selector Segmented Controls */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-lg my-4 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveSimulationMode('export')}
                  className={`py-1.5 px-2 rounded-md transition-colors text-center ${
                    activeSimulationMode === 'export'
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Net Export
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSimulationMode('peak')}
                  className={`py-1.5 px-2 rounded-md transition-colors text-center ${
                    activeSimulationMode === 'peak'
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Midday Peak
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSimulationMode('backup')}
                  className={`py-1.5 px-2 rounded-md transition-colors text-center ${
                    activeSimulationMode === 'backup'
                      ? 'bg-amber-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Load Shedding
                </button>
              </div>

              {/* Schematic Visual Box */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-4 space-y-4">
                
                {/* Visual Flow Grid */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  
                  {/* Node 1: Solar Array */}
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex flex-col items-center">
                    <Sun className={`w-6 h-6 mb-1 ${activeSimulationMode !== 'backup' ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className="text-[11px] font-semibold text-slate-200">Tier-1 Array</span>
                    <span className="text-[10px] text-slate-400">18x 580W TOPCon</span>
                    <span className="text-xs font-mono text-emerald-400 mt-1 font-bold">
                      {activeSimulationMode === 'backup' ? '4.8 kW' : '9.8 kW'}
                    </span>
                  </div>

                  {/* Node 2: Smart Hybrid Inverter */}
                  <div className="bg-slate-900 border border-emerald-500/30 rounded-lg p-2.5 flex flex-col items-center">
                    <Zap className="w-6 h-6 text-emerald-400 mb-1" />
                    <span className="text-[11px] font-semibold text-slate-200">10kW Hybrid</span>
                    <span className="text-[10px] text-slate-400">Dual MPPT / 98.4%</span>
                    <span className="text-xs font-mono text-white mt-1 font-bold">Active</span>
                  </div>

                  {/* Node 3: LiFePO4 Storage */}
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex flex-col items-center">
                    <BatteryCharging className={`w-6 h-6 mb-1 ${activeSimulationMode === 'backup' ? 'text-amber-400' : 'text-emerald-400'}`} />
                    <span className="text-[11px] font-semibold text-slate-200">LiFePO4 Bank</span>
                    <span className="text-[10px] text-slate-400">15 kWh Lithium</span>
                    <span className="text-xs font-mono text-emerald-400 mt-1 font-bold">
                      {activeSimulationMode === 'backup' ? 'Supplying 5.2kW' : '100% Ready'}
                    </span>
                  </div>

                </div>

                {/* Status Readout Bar */}
                <div className="p-3 bg-slate-900/90 rounded border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Home AC Load:</span>
                    <span className="font-mono font-medium text-slate-100">4.8 kW (3 Inverter ACs + Fridge)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">DISCO Grid Status:</span>
                    <span className={`font-mono font-medium ${activeSimulationMode === 'backup' ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {activeSimulationMode === 'backup' ? 'WAPDA Blackout (Zero Impact)' : 'Green Meter Active (Exporting Units)'}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Est. Daily Generation:</span>
                    <span className="font-mono font-medium text-emerald-300 tabular-nums">42 – 48 Units (kWh)</span>
                  </div>
                </div>

              </div>

              {/* Explanatory footer note */}
              <p className="text-[11px] text-slate-400 mt-3 text-center">
                {activeSimulationMode === 'export' && 'Surplus power is fed back to the grid, spinning your WAPDA meter backwards.'}
                {activeSimulationMode === 'peak' && 'Solar directly covers 100% of daytime air-conditioning without consuming grid power.'}
                {activeSimulationMode === 'backup' && 'During unannounced load-shedding, battery seamlessly takes over with zero flicker.'}
              </p>

            </div>
          </div>

        </div>

        {/* Claim-to-Proof Quantitative Adjacency Bar (Full Width Row below Hero) */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-200">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">4.8 MW+</div>
            <div className="text-xs text-slate-400 mt-1">Installed Capacity in Pakistan</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display tabular-nums">1,200+</div>
            <div className="text-xs text-slate-400 mt-1">Net Meters Successfully Commissioned</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">25 Years</div>
            <div className="text-xs text-slate-400 mt-1">Tier-1 Linear Panel Warranty</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display tabular-nums">90%</div>
            <div className="text-xs text-slate-400 mt-1">Typical Peak Bill Reduction</div>
          </div>
        </div>

      </div>
    </section>
  );
};
