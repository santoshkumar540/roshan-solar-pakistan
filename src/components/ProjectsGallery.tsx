import React, { useState } from 'react';
import { PROJECT_CASES } from '../data/solarData';
import { ProjectCase } from '../types';
import { MapPin, Zap, ArrowRight, X, CheckCircle2, MessageCircle } from 'lucide-react';

interface ProjectsGalleryProps {
  whatsappNumber: string;
  onRequestSimilarQuote: (projectTitle: string, capacity: string) => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ whatsappNumber, onRequestSimilarQuote }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial' | 'agricultural' | 'netmetered'>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectCase | null>(null);

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const filteredProjects = PROJECT_CASES.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'netmetered') return project.netMetered;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Demonstration Showcase
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              Featured Solar Installations Across Pakistan.
            </h2>
            <p className="text-slate-300 mt-2 text-base leading-relaxed">
              Explore sample commissioned residential villas, commercial rooftops, and agricultural solar tubewells running with certified bi-directional net metering.
            </p>
          </div>

          {/* Interactive Filter Tabs (functional buttons) */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeFilter === 'all'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Demonstrations
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('residential')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeFilter === 'residential'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Residential
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('commercial')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeFilter === 'commercial'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Commercial
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('agricultural')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeFilter === 'agricultural'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tubewells
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('netmetered')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeFilter === 'netmetered'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Net Metered
            </button>
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors group"
            >
              {/* Graphic Card Visual Header (Geometric Schematic Banner) */}
              <div className="h-44 bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-950 p-5 flex flex-col justify-between relative overflow-hidden border-b border-slate-800">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                
                {/* Visual badges/location */}
                <div className="flex items-center justify-between text-xs z-10">
                  <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <span className="font-mono text-emerald-400 text-xs font-bold tabular-nums">
                    {project.completionYear}
                  </span>
                </div>

                {/* Capacity callout */}
                <div className="z-10">
                  <div className="text-3xl font-extrabold text-white font-display tabular-nums tracking-tight">
                    {project.capacity}
                  </div>
                  <div className="text-xs text-emerald-300 font-medium mt-0.5">
                    Est. Savings: {project.monthlySavingsPkr}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-2 pb-3 border-b border-slate-800">
                    <span className="capitalize">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.netMetered ? 'NEPRA Green Meter' : 'Off-Grid VFD'}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mt-3 mb-4">
                    {project.highlight}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Panels:</span>
                      <span className="text-slate-300 text-right font-medium">{project.panels}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Inverter:</span>
                      <span className="text-slate-300 text-right font-medium">{project.inverter}</span>
                    </div>
                    {project.batteryStorage && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Storage:</span>
                        <span className="text-amber-400 text-right font-medium">{project.batteryStorage}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestSimilarQuote(project.title, project.capacity)}
                    className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
                  >
                    Quote This
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Demo transparency notice */}
        <div className="mt-10 p-4 bg-slate-900/60 border border-slate-800/80 rounded-lg text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-400">DEMO VERIFICATION:</span>
            <span>All showcased specifications reflect standard 2026 Pakistani market hardware configurations. Customer names are withheld for privacy.</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-slate-500">ISO/IEC 61215 Standards</span>
        </div>

      </div>

      {/* Project Specifications Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-6 text-slate-100 relative shadow-2xl">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              Project Technical Audit
            </div>
            <h3 className="text-xl font-bold text-white font-display mb-2">
              {activeModalProject.title}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Location: {activeModalProject.location} · Commissioned {activeModalProject.completionYear}
            </p>

            <div className="space-y-3 bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs mb-5">
              <div className="flex justify-between pb-2 border-b border-slate-900">
                <span className="text-slate-400">Installed Capacity:</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">{activeModalProject.capacity}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-900">
                <span className="text-slate-400">Monthly Bill Reduction:</span>
                <span className="font-bold text-white font-mono">{activeModalProject.monthlySavingsPkr}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-900">
                <span className="text-slate-400">PV Modules:</span>
                <span className="text-slate-200">{activeModalProject.panels}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-900">
                <span className="text-slate-400">Inverter Architecture:</span>
                <span className="text-slate-200">{activeModalProject.inverter}</span>
              </div>
              {activeModalProject.batteryStorage && (
                <div className="flex justify-between pb-2 border-b border-slate-900">
                  <span className="text-slate-400">Lithium Storage:</span>
                  <span className="text-amber-400 font-medium">{activeModalProject.batteryStorage}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">NEPRA Net Meter Status:</span>
                <span className="text-emerald-400 font-medium">{activeModalProject.netMetered ? 'Energized & Exporting' : 'N/A (Off-Grid VFD)'}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {activeModalProject.highlight}
            </p>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                  `Hello Roshan Solar, I saw the ${activeModalProject.capacity} project in ${activeModalProject.location} on your website. I want a similar proposal for my premises.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Inquire on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  onRequestSimilarQuote(activeModalProject.title, activeModalProject.capacity);
                  setActiveModalProject(null);
                }}
                className="px-4 py-2.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Load in Quote Form
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
