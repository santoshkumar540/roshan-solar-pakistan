import React, { useState } from 'react';
import { QuoteFormData, QuoteSubmissionResult } from '../types';
import { DISCO_PROVIDERS } from '../data/solarData';
import { Send, MessageCircle, CheckCircle, AlertCircle, RefreshCw, FileText, Download } from 'lucide-react';

interface QuoteSectionProps {
  whatsappNumber: string;
  initialEstimate?: {
    kw: number;
    monthlyBill: number;
    disco: string;
    systemType: string;
    savings: number;
  } | null;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({ whatsappNumber, initialEstimate }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    city: 'Lahore',
    monthlyBill: initialEstimate ? String(initialEstimate.monthlyBill) : '65000',
    disco: initialEstimate ? initialEstimate.disco : 'LESCO',
    systemType: initialEstimate ? initialEstimate.systemType : 'Hybrid with Battery',
    propertyType: '1 Kanal House',
    roofType: 'Flat Concrete',
    comments: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<QuoteSubmissionResult | null>(null);

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');

  // Synchronize when parent passes estimate
  React.useEffect(() => {
    if (initialEstimate) {
      setFormData((prev) => ({
        ...prev,
        monthlyBill: String(initialEstimate.monthlyBill),
        disco: initialEstimate.disco,
        systemType: initialEstimate.systemType
      }));
    }
  }, [initialEstimate]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 3) return 'Please enter at least 3 characters.';
        return '';

      case 'phone':
        if (!value.trim()) return 'Mobile/WhatsApp number is required.';
        // Pakistani mobile regex: accepts 03001234567, 0300-1234567, +923001234567, 923001234567
        const clean = value.replace(/[\s\-\(\)]/g, '');
        const pkRegex = /^((\+92)|(0092)|(92)|(0))?3[0-9]{9}$/;
        if (!pkRegex.test(clean)) {
          return 'Enter a valid Pakistani mobile number (e.g., 0300-1234567).';
        }
        return '';

      case 'city':
        if (!value.trim()) return 'Please select your city.';
        return '';

      case 'monthlyBill':
        const billNum = Number(value);
        if (!value || isNaN(billNum) || billNum < 5000) {
          return 'Please enter a valid monthly bill (min PKR 5,000).';
        }
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation clearance
    if (errors[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {
      fullName: validateField('fullName', formData.fullName),
      phone: validateField('phone', formData.phone),
      city: validateField('city', formData.city),
      monthlyBill: validateField('monthlyBill', formData.monthlyBill)
    };

    const hasError = Object.values(newErrors).some((err) => err !== '');
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Compute estimated specs
    const bill = Number(formData.monthlyBill);
    const estimatedKw = Math.max(3, Math.round((bill / 62 / 125) * 2) / 2);
    const estimatedSavings = Math.round(bill * 0.90);
    const randomRef = 'RS-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionReceipt({
        referenceId: randomRef,
        data: { ...formData },
        estimatedSystemKw: estimatedKw,
        estimatedMonthlySavingsPkr: estimatedSavings,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })
      });
    }, 600);
  };

  const handleDirectWhatsAppSend = () => {
    const bill = Number(formData.monthlyBill);
    const estimatedKw = Math.max(3, Math.round((bill / 62 / 125) * 2) / 2);
    const estimatedSavings = Math.round(bill * 0.90);

    const message = `*Roshan Solar Quote Request*\n\n` +
      `• Name: ${formData.fullName || 'Prospective Customer'}\n` +
      `• Phone: ${formData.phone || 'Direct WhatsApp'}\n` +
      `• City: ${formData.city} (${formData.disco})\n` +
      `• Avg Monthly Bill: PKR ${Number(formData.monthlyBill || 65000).toLocaleString()}\n` +
      `• System Preference: ${formData.systemType}\n` +
      `• Property: ${formData.propertyType} (${formData.roofType})\n` +
      `• Estimated System: ~${estimatedKw} kW\n` +
      `• Est. Savings: ~PKR ${estimatedSavings.toLocaleString()}/mo\n` +
      (formData.comments ? `• Note: ${formData.comments}\n\n` : `\n`) +
      `Please schedule a physical site survey and share equipment specifications.`;

    const url = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadSummary = () => {
    if (!submissionReceipt) return;
    const content = `ROSHAN SOLAR SYSTEMS PAKISTAN - FORMAL PROPOSAL AUDIT
Reference No: ${submissionReceipt.referenceId}
Date: ${submissionReceipt.submittedAt}
---------------------------------------------------------
Customer: ${submissionReceipt.data.fullName}
Contact: ${submissionReceipt.data.phone}
City/Region: ${submissionReceipt.data.city} (${submissionReceipt.data.disco})
Premises: ${submissionReceipt.data.propertyType} / ${submissionReceipt.data.roofType}

FINANCIAL & ENGINEERING ESTIMATE
---------------------------------------------------------
Current Average Bill: PKR ${Number(submissionReceipt.data.monthlyBill).toLocaleString()}
Recommended DC Capacity: ${submissionReceipt.estimatedSystemKw} kW
Estimated Monthly Bill Savings: PKR ${submissionReceipt.estimatedMonthlySavingsPkr.toLocaleString()}
System Architecture: ${submissionReceipt.data.systemType}
Linear Warranty: 25-Year Performance Guarantee (Tier-1)
Turnaround: 18 - 30 Working Days (NEPRA Green Meter)

Customer Notes:
${submissionReceipt.data.comments || 'No additional notes provided.'}
---------------------------------------------------------
Lahore: DHA Phase 5 | Islamabad: Blue Area | Karachi: Shahrah-e-Faisal
Support: info@roshansolar.pk.demo | UAN: +92 300 1234567`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Roshan-Solar-Quote-${submissionReceipt.referenceId}.txt`;
    link.click();
  };

  return (
    <section id="quote" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Free Feasibility &amp; Quote Request
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Request an Engineered Rooftop Solar Audit.
          </h2>
          <p className="text-slate-300 mt-2 text-base leading-relaxed">
            Fill in your power details below. Our certified solar engineers will run a 3D shading simulation and calculate your guaranteed monthly unit generation.
          </p>
        </div>

        {/* Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8">
            
            {submissionReceipt ? (
              /* Success Receipt View */
              <div className="space-y-6">
                <div className="p-4 bg-emerald-950/80 border border-emerald-800/80 rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 text-white">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      Feasibility Request Received! Reference: {submissionReceipt.referenceId}
                    </h3>
                    <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                      Thank you, <span className="font-semibold text-white">{submissionReceipt.data.fullName}</span>. Your system requirements have been logged. A lead technical consultant for <span className="font-semibold text-white">{submissionReceipt.data.city}</span> will contact you on <span className="font-semibold text-white">{submissionReceipt.data.phone}</span> within 4 business hours.
                    </p>
                  </div>
                </div>

                {/* Estimate Summary Table */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 text-xs">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
                    Preliminary System Assessment
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                    <div>
                      <span className="text-slate-400">Target Capacity:</span>
                      <div className="text-base font-mono font-bold text-emerald-400 tabular-nums">
                        {submissionReceipt.estimatedSystemKw} kW
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Est. Monthly Savings:</span>
                      <div className="text-base font-mono font-bold text-white tabular-nums">
                        Rs. {submissionReceipt.estimatedMonthlySavingsPkr.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">DISCO Territory:</span>
                      <div className="text-base font-semibold text-slate-200">
                        {submissionReceipt.data.disco}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions on Receipt */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleDirectWhatsAppSend}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>Send Reference Directly via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadSummary}
                    className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Summary (.txt)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmissionReceipt(null)}
                    className="flex items-center justify-center gap-1.5 py-3 px-3 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>New Quote</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Standard Quote Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Field 1: Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="e.g. Tariq Mehmood"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 ${
                        errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:ring-emerald-500'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 2: Pakistani Phone/WhatsApp */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      WhatsApp / Mobile Number <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="e.g. 0300-1234567"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:ring-emerald-500'
                      }`}
                    />
                    {errors.phone ? (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-slate-500">
                        Format: 03001234567 or 03xx-xxxxxxx
                      </p>
                    )}
                  </div>

                  {/* Field 3: City */}
                  <div>
                    <label htmlFor="city" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Installation City <span className="text-emerald-400">*</span>
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Bahawalpur">Bahawalpur</option>
                      <option value="Sargodha">Sargodha</option>
                      <option value="Other">Other City / District</option>
                    </select>
                  </div>

                  {/* Field 4: Average Monthly Bill */}
                  <div>
                    <label htmlFor="monthlyBill" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Avg. Monthly Electricity Bill (PKR) <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="monthlyBill"
                      name="monthlyBill"
                      type="number"
                      min={5000}
                      step={1000}
                      placeholder="e.g. 75000"
                      value={formData.monthlyBill}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 ${
                        errors.monthlyBill ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:ring-emerald-500'
                      }`}
                    />
                    {errors.monthlyBill && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.monthlyBill}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 5: DISCO Company */}
                  <div>
                    <label htmlFor="disco" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Electricity DISCO
                    </label>
                    <select
                      id="disco"
                      name="disco"
                      value={formData.disco}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {DISCO_PROVIDERS.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} ({d.fullName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Field 6: System Type */}
                  <div>
                    <label htmlFor="systemType" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      System Preference
                    </label>
                    <select
                      id="systemType"
                      name="systemType"
                      value={formData.systemType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Hybrid with Battery">Hybrid (Net Metering + Lithium Battery)</option>
                      <option value="On-Grid Net Metered">On-Grid (Net Metering Only, No Battery)</option>
                      <option value="Commercial 3-Phase">Commercial / Industrial 3-Phase</option>
                      <option value="Agricultural Tubewell">Agricultural Solar Tubewell (VFD)</option>
                    </select>
                  </div>

                  {/* Field 7: Property Type */}
                  <div>
                    <label htmlFor="propertyType" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Property Category
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="5 Marla House">5 Marla Residence</option>
                      <option value="10 Marla House">10 Marla Residence</option>
                      <option value="1 Kanal House">1 Kanal Residence</option>
                      <option value="2 Kanal+ Villa">2 Kanal+ Villa</option>
                      <option value="Commercial Plaza/Office">Commercial Plaza / Office</option>
                      <option value="Factory / Mill">Factory / Warehouse</option>
                      <option value="Agricultural Farm">Agricultural Farmland</option>
                    </select>
                  </div>

                  {/* Field 8: Roof Structure */}
                  <div>
                    <label htmlFor="roofType" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Roof / Mounting Area
                    </label>
                    <select
                      id="roofType"
                      name="roofType"
                      value={formData.roofType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Flat Concrete">Flat Concrete Rooftop (Standard L2/L3)</option>
                      <option value="Elevated Rooftop">Elevated Structure (Permits Rooftop Use)</option>
                      <option value="Slanted Corrugated Sheet">Slanted Metallic / Tin Sheet</option>
                      <option value="Ground Mount">Ground-Mounted Open Yard</option>
                    </select>
                  </div>

                </div>

                {/* Optional Message Field */}
                <div>
                  <label htmlFor="comments" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Specific Requirements or Existing Inverter Info (Optional)
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    rows={2}
                    placeholder="e.g., We currently run 3 inverter ACs and a 1.5HP water bore pump..."
                    value={formData.comments}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Form Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-lg transition-colors shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4 fill-slate-950" />
                    <span>{isSubmitting ? 'Processing Audit...' : 'Submit Feasibility Request'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDirectWhatsAppSend}
                    className="flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Quote via WhatsApp</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 text-center">
                  Front-end validated demo form · Submits to memory receipt &amp; compatible with process-quote.php
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Trust & SLA Assurance Card */}
          <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-7 space-y-6">
            <h3 className="text-base font-bold text-white font-display">
              What Happens Next?
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <div className="font-semibold text-slate-200">Satellite Roof Shading Scan</div>
                  <p className="text-slate-400 mt-0.5 leading-relaxed">
                    Our engineering office maps your coordinates on high-resolution irradiance software to calculate available unshaded square footage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <div className="font-semibold text-slate-200">Free Physical Site Survey</div>
                  <p className="text-slate-400 mt-0.5 leading-relaxed">
                    A licensed electrical engineer visits your premises in Lahore, Karachi, or Islamabad to inspect your main DB box, earthing pit, and structural integrity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <div className="font-semibold text-slate-200">Engineering Bill of Quantities (BOQ)</div>
                  <p className="text-slate-400 mt-0.5 leading-relaxed">
                    You receive an itemized, transparent quotation detailing panel serials, inverter specs, DC breaker sizing, and DISCO net metering fee breakdown.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Phone Assistance */}
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-400">Prefer speaking directly to an engineer?</span>
              <div className="text-sm font-bold text-white font-mono mt-1">
                +92 300 1234567
              </div>
              <div className="text-[11px] text-emerald-400 mt-0.5">
                Lines open Mon – Sat: 9:00 AM – 7:00 PM PKT
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
