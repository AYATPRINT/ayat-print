import React, { useState } from 'react';
import DesignEditor from './components/DesignEditor';
import HeadlessStudioMode, { getHeadlessParams } from './components/HeadlessStudioMode';
import SpecViewer from './components/SpecViewer';
import IntegrationsDrawer from './components/IntegrationsDrawer';
import FontEngine from './components/FontEngine';
import Marketplace from './components/Marketplace';
import B2BPortal from './components/B2BPortal';
import RoomMockupGenerator from './components/RoomMockupGenerator';
import ArchitecturalSurfacesStudio from './components/ArchitecturalSurfacesStudio';
import E2EAuditSuite from './components/E2EAuditSuite';
import AyatPrintOS from './components/AyatPrintOS';
import Logo from './components/Logo';
import LanguageSelector from './components/LanguageSelector';
import LuxuryHeroSlider from './components/LuxuryHeroSlider';
import { useLanguage } from './context/LanguageContext';
import { 
  Sparkles, Layout, Cpu, Zap, Compass, ShieldCheck, ShoppingBag, Building, Shield, Camera, Layers, CheckCircle2, Box
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'marketplace' | 'surfaces' | 'editor' | 'room_mockup' | 'fonts' | 'integrations' | 'spec' | 'b2b' | 'audit' | 'os'>('marketplace');
  const { t } = useLanguage();

  // ─── Headless Mode Detection ──────────────────────────────────────────────────
  const headlessParams = getHeadlessParams();

  React.useEffect(() => {
    const handleActiveDesignChanged = () => {
      setActiveView('editor');
    };
    window.addEventListener('ayatprint_active_design_changed', handleActiveDesignChanged);
    return () => {
      window.removeEventListener('ayatprint_active_design_changed', handleActiveDesignChanged);
    };
  }, []);

  // ─── Headless Mode: Skip entire storefront, render Studio directly ────────────
  if (headlessParams) {
    return (
      <HeadlessStudioMode params={headlessParams}>
        <DesignEditor />
      </HeadlessStudioMode>
    );
  }

  return (
    <div className="min-h-screen bg-art-cream text-art-charcoal flex flex-col font-sans selection:bg-art-gold/30 selection:text-art-charcoal">
      {/* Luxury Announcement Banner */}
      <div className="bg-art-charcoal text-art-cream py-2 px-4 text-center text-[10px] font-mono tracking-widest uppercase border-b border-art-gold/20 flex justify-center items-center gap-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-art-gold"></span>
        <span>{t('shippingBanner')}</span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-art-gold hidden sm:inline-block"></span>
      </div>

      {/* Premium Gallery Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-art-sand sticky top-0 z-50 px-4 sm:px-6 py-3.5 shadow-2xs transition-all">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
          
          {/* Top Row: Brand Logo & Language Selector */}
          <div className="w-full lg:w-auto flex items-center justify-between gap-4">
            <Logo variant="horizontal" size={36} theme="light" />
            
            {/* Desktop / Mobile Top Right Language Selector */}
            <div className="flex items-center gap-2">
              <LanguageSelector />
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex bg-art-warm/80 p-1 rounded-xl border border-art-sand/80 shrink-0 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveView('os')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'os' 
                  ? 'bg-art-gold text-art-charcoal font-bold shadow-md ring-2 ring-art-gold/40' 
                  : 'text-art-gold bg-art-gold/10 hover:bg-art-gold/20'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" /> AyatPrint OS (OMS)
            </button>

            <button
              onClick={() => setActiveView('marketplace')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'marketplace' 
                  ? 'bg-art-charcoal text-white shadow-md' 
                  : 'text-art-charcoal/65 hover:text-art-charcoal hover:bg-white/60'
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5 text-art-gold" /> {t('store')}
            </button>

            <button
              onClick={() => setActiveView('surfaces')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'surfaces' 
                  ? 'bg-art-charcoal text-white shadow-md' 
                  : 'text-art-charcoal/65 hover:text-art-charcoal hover:bg-white/60'
              }`}
            >
              <Layers className="h-3.5 w-3.5 text-art-gold" /> Architectural Surfaces
            </button>

            <button
              onClick={() => setActiveView('b2b')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'b2b' 
                  ? 'bg-art-charcoal text-white shadow-md' 
                  : 'text-art-charcoal/65 hover:text-art-charcoal hover:bg-white/60'
              }`}
            >
              <Building className="h-3.5 w-3.5 text-amber-500" /> {t('b2b')}
            </button>

            <button
              onClick={() => setActiveView('room_mockup')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'room_mockup' 
                  ? 'bg-art-charcoal text-white shadow-md' 
                  : 'text-art-charcoal/65 hover:text-art-charcoal hover:bg-white/60'
              }`}
            >
              <Camera className="h-3.5 w-3.5 text-art-gold" /> {t('roomSimulator')}
            </button>

            <button
              onClick={() => setActiveView('editor')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'editor' 
                  ? 'bg-art-charcoal text-white shadow-md' 
                  : 'text-art-charcoal/65 hover:text-art-charcoal hover:bg-white/60'
              }`}
            >
              <Layout className="h-3.5 w-3.5 text-art-gold" /> {t('studio')}
            </button>

            <button
              onClick={() => setActiveView('integrations')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeView === 'integrations' 
                  ? 'bg-art-charcoal text-white shadow-md' 
                  : 'text-art-charcoal/65 hover:text-art-charcoal hover:bg-white/60'
              }`}
            >
              <Zap className="h-3.5 w-3.5" /> {t('connections')}
            </button>

            <button
              onClick={() => setActiveView('audit')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeView === 'audit' 
                  ? 'bg-emerald-800 text-white shadow-md' 
                  : 'text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> E2E Audit (14/14)
            </button>

            <button
              onClick={() => setActiveView('fonts')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeView === 'fonts' 
                  ? 'bg-art-charcoal text-white shadow-md' 
                  : 'text-art-charcoal/65 hover:text-art-charcoal hover:bg-white/60'
              }`}
            >
              <Compass className="h-3.5 w-3.5" /> {t('fontEngine')}
            </button>

            <button
              onClick={() => setActiveView('spec')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeView === 'spec' 
                  ? 'bg-art-charcoal text-white shadow-md' 
                  : 'text-art-charcoal/65 hover:text-art-charcoal hover:bg-white/60'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" /> {t('techSpec')}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container Stage */}
      {activeView === 'editor' ? (
        <div className="flex-1 w-full flex flex-col overflow-hidden">
          <DesignEditor />
        </div>
      ) : (
        <>
          {activeView !== 'os' && activeView !== 'editor' && (
            <LuxuryHeroSlider />
          )}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {/* Dynamic Panel Renderer */}
            <div className="transition-all duration-300">
              {activeView === 'os' && <AyatPrintOS />}
              {activeView === 'marketplace' && <Marketplace />}
              {activeView === 'surfaces' && <ArchitecturalSurfacesStudio />}
              {activeView === 'room_mockup' && (
                <RoomMockupGenerator 
                  onOpenInStudio={() => setActiveView('editor')} 
                  onAddToCart={(title) => {
                    alert(`Added "${title}" framed canvas to cart!`);
                  }} 
                />
              )}
              {activeView === 'b2b' && <B2BPortal />}
              {activeView === 'fonts' && <FontEngine />}
              {activeView === 'spec' && <SpecViewer />}
              {activeView === 'integrations' && <IntegrationsDrawer />}
              {activeView === 'audit' && <E2EAuditSuite />}
            </div>
          </main>

          {/* Luxury Editorial Footer */}
          <footer className="bg-art-charcoal text-white/60 py-12 px-6 mt-16 text-xs font-sans tracking-wide border-t border-art-gold/20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-white/10">
              <div className="space-y-3">
                <Logo variant="horizontal" size={32} theme="dark" />
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  The world's premier luxury Print-on-Demand operating system dedicated to sacred Quranic wall art and Islamic calligraphy.
                </p>
              </div>
              <div className="space-y-2 text-[11px]">
                <span className="text-art-gold font-mono uppercase font-bold text-[9px] tracking-widest block mb-1">Collections</span>
                <p className="text-stone-300">Ayat Al-Kursi Masterpieces</p>
                <p className="text-stone-300">Surah Al-Ikhlas Triptychs</p>
                <p className="text-stone-300">The 99 Names (Asma ul Husna)</p>
                <p className="text-stone-300">Minimalist Kufic Geometric</p>
              </div>
              <div className="space-y-2 text-[11px]">
                <span className="text-art-gold font-mono uppercase font-bold text-[9px] tracking-widest block mb-1">POD Network</span>
                <p className="text-stone-300">Gelato Global Print Nodes</p>
                <p className="text-stone-300">Sensaria Luxury Decor</p>
                <p className="text-stone-300">Prodigi Fine Art Printers</p>
                <p className="text-stone-300">Gulf Atelier Craftsmen</p>
              </div>
              <div className="space-y-2 text-[11px]">
                <span className="text-art-gold font-mono uppercase font-bold text-[9px] tracking-widest block mb-1">Guarantees</span>
                <p className="text-stone-300 flex items-center gap-1.5"><Shield className="h-3 w-3 text-art-gold" /> Tanzil Text Accuracy</p>
                <p className="text-stone-300">300 DPI Museum Resolution</p>
                <p className="text-stone-300">UV-Resistant Fine Art Ink</p>
                <p className="text-stone-300">Solid Hardwood Floating Frames</p>
              </div>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
              <p>© 2026 AyatPrint. Luxury Sacred Islamic Art Operating System. All rights reserved.</p>
              <div className="flex gap-4 items-center font-mono text-[10px]">
                <span className="text-stone-400">Tanzil Certified Engine</span>
                <span className="text-art-gold font-bold uppercase tracking-widest bg-art-gold/10 px-2.5 py-1 rounded border border-art-gold/30">
                  Tanzil Authenticated
                </span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

