import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { Globe, ChevronDown, Check, DollarSign, Ruler } from 'lucide-react';

export default function LanguageSelector() {
  const { currentLanguage, setLanguageByCode, currency, setCurrency, unit, setUnit, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-art-warm hover:bg-art-sand/80 text-art-charcoal border border-art-sand px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-base leading-none">{currentLanguage.flag}</span>
        <span className="font-medium font-sans">{currentLanguage.nativeName}</span>
        <span className="text-[10px] font-mono text-art-gold font-bold uppercase tracking-wider ml-1 px-1.5 py-0.5 bg-white/80 rounded border border-art-sand">
          {currency}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-art-charcoal/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-art-sand p-3 space-y-3 animate-in fade-in zoom-in-95 duration-150 z-50`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-art-sand px-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-art-gold uppercase tracking-wider">
              <Globe className="h-3.5 w-3.5" />
              <span>International Preferences</span>
            </div>
            <span className="text-[9px] font-mono text-art-charcoal/50">
              {currentLanguage.dir.toUpperCase()} Mode
            </span>
          </div>

          {/* Languages List */}
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguage.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguageByCode(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-art-charcoal text-white font-bold shadow-xs'
                      : 'hover:bg-art-warm text-art-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-serif">{lang.nativeName}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-art-gold' : 'text-art-charcoal/40'}`}>
                      ({lang.name})
                    </span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-art-gold" />}
                </button>
              );
            })}
          </div>

          {/* Currency & Unit Quick Toggles */}
          <div className="pt-2 border-t border-art-sand/80 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-art-charcoal/70 px-1">
              <span className="flex items-center gap-1"><DollarSign className="h-3 w-3 text-art-gold" /> Currency</span>
              <div className="flex gap-1">
                {['USD', 'EUR', 'SAR', 'TRY', 'AED', 'GBP'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                      currency === c ? 'bg-art-gold text-art-charcoal font-bold' : 'bg-art-warm text-art-charcoal/60 hover:text-art-charcoal'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-art-charcoal/70 px-1">
              <span className="flex items-center gap-1"><Ruler className="h-3 w-3 text-art-gold" /> Measurement Unit</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                    unit === 'cm' ? 'bg-art-gold text-art-charcoal font-bold' : 'bg-art-warm text-art-charcoal/60 hover:text-art-charcoal'
                  }`}
                >
                  Centimeters (cm)
                </button>
                <button
                  onClick={() => setUnit('in')}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                    unit === 'in' ? 'bg-art-gold text-art-charcoal font-bold' : 'bg-art-warm text-art-charcoal/60 hover:text-art-charcoal'
                  }`}
                >
                  Inches (in)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
