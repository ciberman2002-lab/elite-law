
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { View } from '../types';

interface HeaderProps {
  onNavigate: (view: View) => void;
  currentView: View;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (view: View) => {
    onNavigate(view);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const isDarkHeader = (currentView === 'home' || currentView === 'article') && !isScrolled && !isMenuOpen;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-in-out px-6 lg:px-12 h-20 flex justify-between items-center ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
        }`}
      >
        <div 
          onClick={() => handleLinkClick('home')}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className={`w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
            isDarkHeader ? 'border-white bg-transparent text-white' : 'border-slate-900 bg-slate-900 text-white'
          }`}>
            <span className="font-bold text-lg">E</span>
          </div>
          <span className={`text-xl tracking-widest font-light uppercase hidden sm:block transition-colors duration-300 ${
            isDarkHeader ? 'text-white' : 'text-slate-900'
          }`}>
            Elite <span className="font-bold">Legal</span>
          </span>
        </div>

        <div className="flex items-center space-x-8">
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.view)}
                className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all hover:opacity-50 ${
                  isDarkHeader ? 'text-white' : 'text-slate-900'
                } ${currentView === item.view ? 'border-b border-current' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-4 group focus:outline-none"
          >
            <span className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-colors ${
              isDarkHeader ? 'text-white' : 'text-slate-900'
            }`}>
              {isMenuOpen ? 'Fechar' : 'Menu'}
            </span>
            <div className="relative w-6 h-4">
              <span className={`absolute left-0 w-full h-[1.5px] transition-all duration-300 ${
                isMenuOpen ? 'top-2 rotate-45 bg-slate-900' : 'top-0 ' + (isDarkHeader ? 'bg-white' : 'bg-slate-900')
              }`} />
              <span className={`absolute left-0 w-full h-[1.5px] top-2 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100 ' + (isDarkHeader ? 'bg-white' : 'bg-slate-900')
              }`} />
              <span className={`absolute left-0 w-full h-[1.5px] transition-all duration-300 ${
                isMenuOpen ? 'top-2 -rotate-45 bg-slate-900' : 'bottom-0 ' + (isDarkHeader ? 'bg-white' : 'bg-slate-900')
              }`} />
            </div>
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[90] bg-white transition-all duration-700 ease-[cubic-bezier(0.19, 1, 0.22, 1)] ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="h-full flex flex-col justify-start px-6 lg:px-12 pt-32 lg:pt-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 max-w-7xl mx-auto w-full">
            <nav className="flex flex-col space-y-6 lg:space-y-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-4">Diretório Principal</span>
              {NAV_ITEMS.map((item) => (
                <button 
                  key={item.label}
                  onClick={() => handleLinkClick(item.view)}
                  className="text-left text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 hover:text-slate-500 transition-colors duration-300 whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex flex-col space-y-12 border-l border-slate-100 pl-12 hidden md:flex pt-14">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-8 block">Presença Global</span>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 tracking-widest text-[11px] uppercase">São Paulo</h4>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">Av. Brig. Faria Lima, 4500<br/>Itaim Bibi, SP<br/>+55 11 3000-0000</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 tracking-widest text-[11px] uppercase">Londres</h4>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">1 Bunhill Row, EC1Y 8YZ<br/>London, United Kingdom<br/>+44 20 7600 1200</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
