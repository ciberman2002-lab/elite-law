
import React from 'react';
import { Article } from '../types';

interface InsightsProps {
  articles: Article[];
  onArticleSelect: (article: Article) => void;
  onSeeAll: () => void;
}

const Insights: React.FC<InsightsProps> = ({ articles, onArticleSelect, onSeeAll }) => {
  return (
    <section id="insights" className="py-24 lg:py-32 px-6 lg:px-12 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-4 block">Conhecimento Estratégico</span>
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-900">Elite <span className="italic">Insights</span></h2>
          </div>
          <button 
            onClick={onSeeAll}
            className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-2 mt-8 md:mt-0 hover:opacity-50 transition-opacity"
          >
            Acessar todos os artigos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {articles.slice(0, 3).map((article) => (
            <div 
              key={article.id} 
              className="flex flex-col group cursor-pointer"
              onClick={() => onArticleSelect(article)}
            >
              <div className="overflow-hidden mb-8 aspect-[4/5] relative">
                <img 
                  src={article.image || 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200'} 
                  alt={article.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500" />
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">{article.category}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="text-[9px] uppercase tracking-widest text-slate-400">{article.date}</span>
              </div>
              <h3 className="text-2xl font-serif text-slate-900 leading-snug group-hover:italic transition-all duration-300">
                {article.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
