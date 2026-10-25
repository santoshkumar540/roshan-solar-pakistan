import React, { useState, useMemo } from 'react';
import { DISCO_PROVIDERS } from '../data/solarData';
import { Calculator, MessageCircle, ArrowRight, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';

interface CalculatorSectionProps {
  whatsappNumber: string;
  onApplyEstimateToQuote: (estimate: {
    kw: number;
    monthlyBill: number;
    disco: string;
    systemType: string;
    savings: number;
  }) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ whatsappNumber, onApplyEstimateToQuote }) => {
  const [monthlyBill, setMonthlyBill] = useState<number>(65000);
  const [selectedDiscoId, setSelectedDiscoId] = useState<string>('lesco');
  const [systemType, setSystemType] = useState<string>('hybrid'); // 'ongrid' | 'hybrid' | 'offgrid'
  const [propertyType, setPropertyType] = useState<string>('1kanal'); // '5marla' | '10marla' | '1kanal' | 'commercial' | 'farm'

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const selectedDisco = useMemo(() => {
    return DISCO_PROVIDERS.find((d) => d.id === selectedDiscoId) || DISCO_PROVIDERS[0];
  }, [selectedDiscoId]);

  // Pakistan Solar Calculation Math:
  // Avg units consumed = monthlyBill / avgUnitRate
  // 1 kW yields approx 128 units/month in Pakistan
  // Recommended kW = units consumed / 128 (rounded to nearest 0.5 or sensible integer)
  const calculationResults = useMemo(() => {
    const tariffRate = selectedDisco.avgUnitRate;
    const estimatedUnitsConsumed = monthlyBill / tariffRate;
    
    // Size needed to offset ~95% of daytime + nighttime load with net metering
    const rawKw = estimatedUnitsConsumed / 125;
    const recommendedKw = Math.max(3, Math.round(rawKw * 2) / 2); // rounded to nearest 0.5
    
    const monthlyUnitsGenerated = Math.round(recommendedKw * 128);
    // Conservative monthly savings (accounting for net metering tariff rate & fixed charges)
    const monthlySavingsPkr = Math.min(monthlyBill * 0.92, Math.round(monthlyUnitsGenerated * (tariffRate - 6)));
    const annualSavingsPkr = Math.round(monthlySavingsPkr * 12);
    
    // Estimated turnkey system cost benchmark in Pakistan (2025/2026):
    // Approx PKR 140,000 - PKR 175,000 per kW for On-Grid; PKR 190,000 - PKR 235,000 per kW for Hybrid with LiFePO4
    const costPerKw = systemType === 'hybrid' ? 210000 : systemType === 'offgrid' ? 240000 : 155000;
    const estimatedCostPkr = Math.round(recommendedKw * costPerKw);
    
    const paybackYears = Number((estimatedCostPkr / annualSavingsPkr).toFixed(1));
    const twentyFiveYearSavings = Math.round(annualSavingsPkr * 25 * 1.15); // with mild tariff escalation

    return {
      recommendedKw,
      monthlyUnitsGenerated,
      monthlySavingsPkr,
      annualSavingsPkr,
      estimatedCostPkr,
      paybackYears,
      twentyFiveYearSavings,
      tariffRate
    };
  }, [monthlyBill, selectedDisco, systemType]);

  const handleSendToWhatsApp = () => {
    const message = `Hello Roshan Solar, I calculated my solar requirements on your website:\n\n` +
      `• Monthly Electricity Bill: PKR ${monthlyBill.toLocaleString()}\n` +
      `• DISCO Company: ${selectedDisco.name} (${selectedDisco.region})\n` +
      `• System Preference: ${systemType.toUpperCase()}\n` +
      `• Recommended Capacity: ${calculationResults.recommendedKw} kW\n` +
      `• Est. Monthly Savings: PKR ${calculationResults.monthlySavingsPkr.toLocaleString()}\n` +
      `• Est. Payback: ~${calculationResults.paybackYears} Years\n\n` +
      `Please provide a formal quotation and advise on next steps.`;

    const url = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleApplyToForm = () => {
    onApplyEstimateToQuote({
      kw: calculationResults.recommendedKw,
      monthlyBill,
      disco: selectedDisco.name,
      systemType: systemType === 'hybrid' ? 'Hybrid with Battery' : systemType === 'ongrid' ? 'On-Grid Net Metered' : 'Off-Grid',
      savings: calculationResults.monthlySavingsPkr
    });
  };

  return (
    <section id="calculator" className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Pakistan Solar ROI Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Calculate Your Solar System Size &amp; Monthly Bill Reduction.
          </h2>
          <p className="text-slate-300 mt-3 text-base leading-relaxed">
            Current NEPRA multi-year tariffs and fuel adjustment charges (FAC) push effective electricity rates over Rs. 65 per unit. See exactly how much you can save with a customized rooftop array.
          </p>
        </div>

        {/* 2-Column Calculator Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-7 space-y-6">
            
            {/* Input 1: Monthly Bill Slider & Direct Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="bill-range" className="text-sm font-semibold text-white">
                  Average Monthly Electricity Bill (PKR)
                </label>
                <div className="text-base font-mono font-bold text-emerald-400 tabular-nums">
                  Rs. {monthlyBill.toLocaleString()}
                </div>
              </div>

              <input
                id="bill-range"
                type="range"
                min={20000}
                max={400000}
                step={5000}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>Rs. 20,000</span>
                <span>Rs. 100,000</span>
                <span>Rs. 250,000</span>
                <span>Rs. 400,000+</span>
              </div>
            </div>

            {/* Input 2: DISCO Provider Selector */}
            <div>
              <label htmlFor="disco-select" className="block text-sm font-semibold text-white mb-2">
                Your Electricity Distribution Company (DISCO)
              </label>
              <select
                id="disco-select"
                value={selectedDiscoId}
                onChange={(e) => setSelectedDiscoId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {DISCO_PROVIDERS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} – {d.fullName} (Avg. ~Rs. {d.avgUnitRate}/unit)
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                Serving: {selectedDisco.region}
              </p>
            </div>

            {/* Input 3: System Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Desired System Architecture
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSystemType('ongrid')}
                  className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-colors text-center ${
                    systemType === 'ongrid'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  On-Grid
                  <span className="block text-[10px] font-normal opacity-75 mt-0.5">Net Meter Only</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSystemType('hybrid')}
                  className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-colors text-center ${
                    systemType === 'hybrid'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Hybrid
                  <span className="block text-[10px] font-normal opacity-75 mt-0.5">Net Meter + LiFePO4</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSystemType('offgrid')}
                  className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-colors text-center ${
                    systemType === 'offgrid'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tubewell / Off-Grid
                  <span className="block text-[10px] font-normal opacity-75 mt-0.5">Diesel Replacement</span>
                </button>
              </div>
            </div>

            {/* Input 4: Property Scale */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Property / Premises Scale
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { id: '5marla', label: '5 Marla (3-5 kW)' },
                  { id: '10marla', label: '10 Marla (6-10 kW)' },
                  { id: '1kanal', label: '1 Kanal (12-18 kW)' },
                  { id: 'commercial', label: 'Commercial (25 kW+)' },
                  { id: 'farm', label: 'Farm / Tubewell' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPropertyType(item.id)}
                    className={`px-3 py-1.5 rounded-md border text-xs transition-colors ${
                      propertyType === item.id
                        ? 'border-emerald-500 bg-slate-800 text-white font-medium'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800">
              <span>Standard 550W Tier-1 Bifacial PV Module baseline</span>
              <button
                type="button"
                onClick={() => {
                  setMonthlyBill(65000);
                  setSelectedDiscoId('lesco');
                  setSystemType('hybrid');
                }}
                className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset to Default</span>
              </button>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6 bg-slate-900 border border-emerald-500/30 rounded-xl p-6 sm:p-7 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Feasibility Summary
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  Recommended System Specs
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-emerald-400 font-display tabular-nums">
                  {calculationResults.recommendedKw} kW
                </span>
                <span className="block text-[11px] text-slate-400">Total DC Capacity</span>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Est. Monthly Savings</div>
                <div className="text-lg sm:text-xl font-bold text-emerald-400 font-mono tabular-nums mt-1">
                  Rs. {calculationResults.monthlySavingsPkr.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">~90% of current WAPDA bill</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Estimated Annual Return</div>
                <div className="text-lg sm:text-xl font-bold text-white font-mono tabular-nums mt-1">
                  Rs. {calculationResults.annualSavingsPkr.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Recurring yearly savings</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Estimated Payback</div>
                <div className="text-lg sm:text-xl font-bold text-amber-400 font-mono tabular-nums mt-1">
                  ~{calculationResults.paybackYears} Years
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Fast capital return period</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Monthly Yield</div>
                <div className="text-lg sm:text-xl font-bold text-white font-mono tabular-nums mt-1">
                  ~{calculationResults.monthlyUnitsGenerated.toLocaleString()} kWh
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Units produced per month</div>
              </div>

            </div>

            {/* Hardware Bill of Materials Preview */}
            <div className="p-4 bg-slate-950/60 rounded-lg border border-slate-800/80 text-xs space-y-2">
              <div className="text-xs font-semibold text-slate-200">System Hardware Breakdown:</div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{Math.ceil((calculationResults.recommendedKw * 1000) / 580)}x Tier-1 Bifacial N-Type 580W Panels</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>1x {calculationResults.recommendedKw}kW Smart Inverter with Dual MPPT</span>
              </div>
              {systemType === 'hybrid' && (
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>1x High-Voltage LiFePO4 Lithium Battery Rack (~10 - 15 kWh)</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Turnkey NEPRA bi-directional Green Meter filing and inspection</span>
              </div>
            </div>

            {/* Actions: Direct WhatsApp & Apply to Form */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm cursor-pointer uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Send This Estimate to WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleApplyToForm}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <span>Book Free Roof Survey with This Estimate</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              *Projections based on 2026 NEPRA baseline tariffs. Real site generation depends on roof orientation, tilt, and seasonal sunshine hours.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
