import React from 'react';
import { 
  Languages, RotateCcw, RotateCw, Layout, Eye, 
  Grid, Layers, RefreshCw, CheckCircle2, Sliders, ChevronDown
} from 'lucide-react';
import { CanvasPreset } from '../types/quran';

interface StudioToolbarProps {
  language: 'en' | 'ar' | 'fr';
  setLanguage: (lang: 'en' | 'ar' | 'fr') => void;
  t: any;
  viewTab: 'canvas' | 'mockup';
  setViewTab: (tab: 'canvas' | 'mockup') => void;
  zoom: number;
  setZoom: (z: number | ((prev: number) => number)) => void;
  rotate: number;
  setRotate: (r: number) => void;
  showGuides: boolean;
  setShowGuides: (g: boolean) => void;
  showLayersSidebar: boolean;
  setShowLayersSidebar: (l: boolean) => void;
  handleUndo: () => void;
  historyIndex: number;
  historyLength: number;
  triggerArtDownload: () => void;
  isExporting: boolean;
  isPanningMode: boolean;
  setIsPanningMode: (p: boolean) => void;
  resetViewport: () => void;
}

export const StudioToolbar: React.FC<StudioToolbarProps> = ({
  language,
  setLanguage,
  t,
  viewTab,
  setViewTab,
  zoom,
  setZoom,
  rotate,
  setRotate,
  showGuides,
  setShowGuides,
  showLayersSidebar,
  setShowLayersSidebar,
  handleUndo,
  historyIndex,
  historyLength,
  triggerArtDownload,
  isExporting,
  isPanningMode,
  setIsPanningMode,
  resetViewport
}) => {
  return (
    <div className="w-full bg-white border-b border-stone-200 px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xs sticky top-0 z-50">
      {/* Brand & Badge */}
      <div className="flex items-center gap-3 self-start md:self-auto">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm shadow-amber-500/20">
          آ
        </div>
        <div>
          <h1 className="text-sm font-serif font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            AyatPrint <span className="text-[10px] bg-amber-500/10 text-amber-800 px-2 py-0.5 rounded-full font-sans uppercase font-semibold">Studio Pro</span>
          </h1>
          <p className="text-[10px] text-stone-500 font-sans mt-0.5">Luxury Islamic Typography Publisher</p>
        </div>
      </div>

      {/* Editor & View Control Switches */}
      <div className="flex items-center bg-stone-100 p-1.5 rounded-xl border border-stone-200 shrink-0">
        <button
          onClick={() => setViewTab('canvas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            viewTab === 'canvas' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Layout className="h-3.5 w-3.5" /> Editor View
        </button>
        <button
          onClick={() => setViewTab('mockup')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            viewTab === 'mockup' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Eye className="h-3.5 w-3.5" /> Room Mockup
        </button>
      </div>

      {/* Tool Toggles & Actions */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Undo Action */}
        <button 
          onClick={handleUndo}
          disabled={historyIndex <= 0}
          className="p-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-all disabled:opacity-40"
          title="Undo Last Action"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        {/* Guides & Layers toggles (only relevant for canvas view) */}
        {viewTab === 'canvas' && (
          <>
            <button
              onClick={() => setShowGuides(!showGuides)}
              className={`p-2 rounded-xl border transition-all ${
                showGuides 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-800' 
                  : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100'
              }`}
              title="Toggle Alignment Guides"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowLayersSidebar(!showLayersSidebar)}
              className={`p-2 rounded-xl border transition-all ${
                showLayersSidebar 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-800' 
                  : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100'
              }`}
              title="Toggle Layer Inspector"
            >
              <Layers className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsPanningMode(!isPanningMode)}
              className={`p-2 rounded-xl border transition-all ${
                isPanningMode 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-800' 
                  : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100'
              }`}
              title="Toggle Panning Mode (Hold Spacebar)"
            >
              <Sliders className="h-4 w-4 rotate-90" />
            </button>
            <button
              onClick={resetViewport}
              className="px-2.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-[10px] text-stone-600 font-bold uppercase tracking-wider hover:bg-stone-100 transition-all"
              title="Fit Canvas to Stage"
            >
              Fit
            </button>
          </>
        )}

        <div className="h-6 w-[1px] bg-stone-200 hidden sm:block"></div>

        {/* Language Selection */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-100 uppercase transition-all">
            <Languages className="h-3.5 w-3.5" />
            <span>{language}</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          <div className="absolute right-0 mt-1.5 w-24 bg-white border border-stone-200 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50">
            {['en', 'ar', 'fr'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as any)}
                className={`w-full text-left px-3.5 py-2 text-xs uppercase font-bold text-stone-700 hover:bg-stone-50 ${
                  language === lang ? 'text-amber-600 bg-amber-50/20' : ''
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'ar' ? 'العربية' : 'FR'}
              </button>
            ))}
          </div>
        </div>

        {/* High Res Export Button */}
        <button
          onClick={triggerArtDownload}
          disabled={isExporting}
          className="bg-stone-900 hover:bg-stone-800 text-white font-bold uppercase tracking-wider px-4.5 py-2 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md shadow-stone-900/10 disabled:opacity-50 cursor-pointer"
        >
          {isExporting ? (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
          )}
          <span>{isExporting ? 'Exporting...' : 'Export Art'}</span>
        </button>
      </div>
    </div>
  );
};
