import React from 'react';
import { TrendingDown, Shield, BatteryMedium, Cpu, CheckCircle, Award, SunMedium, Wind } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <TrendingDown className="w-5 h-5 text-emerald-400" />,
      title: 'Shield Against Ever-Rising Tariffs',
      description: 'With NEPRA electricity tariffs crossing Rs. 65+ per unit including fuel adjustments and surcharges, solar freezes your energy cost for the next 25 years.'
    },
    {
      icon: <BatteryMedium className="w-5 h-5 text-emerald-400" />,
      title: 'Zero Load-Shedding with Lithium LiFePO4',
      description: 'Experience seamless millisecond cutover. Keep multiple inverter air conditioners, refrigerators, and IT systems running during unannounced grid outages.'
    },
    {
      icon: <SunMedium className="w-5 h-5 text-amber-400" />,
      title: 'Earn Units with NEPRA Green Metering',
      description: 'Export surplus solar units generated during midday sun back to LESCO, IESCO, or K-Electric to build negative bill credits that offset your nighttime consumption.'
    },
    {
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      title: 'BloombergNEF Tier-1 Hardware Only',
      description: 'We exclusively deploy Tier-1 rated bifacial monocrystalline panels (Longi, Jinko, Canadian Solar) paired with industrial-grade smart inverters (Huawei, Sungrow, Growatt).'
    },
    {
      icon: <Wind className="w-5 h-5 text-emerald-400" />,
      title: 'Heavy-Gauge Hot-Dipped Mounting',
      description: 'Pakistani monsoon windstorms demand rigorous civil anchoring. Our custom elevated galvanized structures withstand up to 150 km/h wind gusts without rooftop roof leakage.'
    },
    {
      icon: <Award className="w-5 h-5 text-amber-400" />,
      title: 'Turnkey DISCO Licensing Support',
      description: 'No bureaucratic headache. Our certified electrical engineers handle DISCO file preparation, load sanctioning, inspection testing, and bi-directional meter procurement.'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Pakistani Energy Economics
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Why Hundreds of Pakistani Property Owners Choose Roshan Solar.
          </h2>
          <p className="text-slate-300 mt-3 text-base leading-relaxed">
            In an era of peak unit charges and unpredictable grid reliability, a properly engineered solar power plant is the highest-yield financial asset you can install.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">
                {benefit.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certified Tier-1 Brand Trust Banner */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <div className="text-xs text-center text-slate-400 uppercase tracking-widest font-semibold mb-6">
            Authorized Tier-1 Technology Partners &amp; Inverter Brands
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-300 font-semibold text-sm">
            <span className="hover:text-emerald-400 transition-colors">Longi Solar</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="hover:text-emerald-400 transition-colors">Jinko Solar</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="hover:text-emerald-400 transition-colors">Canadian Solar</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="hover:text-emerald-400 transition-colors">Huawei FusionSolar</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="hover:text-emerald-400 transition-colors">Sungrow</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="hover:text-emerald-400 transition-colors">Growatt</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="hover:text-emerald-400 transition-colors">Solis</span>
          </div>
        </div>

      </div>
    </section>
  );
};
