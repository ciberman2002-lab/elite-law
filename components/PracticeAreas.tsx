
import React from 'react';
import { PRACTICE_AREAS } from '../constants';

const PracticeAreas: React.FC = () => {
  return (
    <section id="practice" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-4 block">Portfólio de Expertise</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
              Excelência em todas as dimensões do <span className="italic">direito empresarial</span>.
            </h2>
          </div>
          <div className="hidden md:block">
             <div className="h-[2px] w-12 bg-slate-900 mb-4"></div>
             <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">12 Áreas Core</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-100">
          {PRACTICE_AREAS.map((area, index) => (
            <div key={index} className="bg-white p-10 lg:p-12 flex flex-col h-full hover:bg-slate-50 transition-all duration-500 group relative overflow-hidden">
              <span className="text-slate-200 text-5xl font-serif mb-8 group-hover:text-slate-900 transition-colors duration-500 z-10">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:italic transition-all duration-300 z-10">{area.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow z-10 font-light">
                {area.description}
              </p>
              <div className="pt-4 flex items-center text-slate-900 font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
                Explorar Expertise
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-100/50 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
