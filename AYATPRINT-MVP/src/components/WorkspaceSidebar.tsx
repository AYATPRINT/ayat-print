import React, { useState } from 'react';
import { 
  BookOpen, Palette, Type, Sparkles, Image, Send, 
  Search, ChevronLeft, ChevronRight, Layers, HelpCircle,
  Eye, EyeOff, Lock, Unlock, Grid
} from 'lucide-react';
import { QuranVerse, CanvasPreset } from '../types/quran';
import { Font } from '../types/font';

interface WorkspaceSidebarProps {
  language: 'en' | 'ar' | 'fr';
  t: any;
  verses: QuranVerse[];
  selectedVerse: QuranVerse;
  setSelectedVerse: (v: QuranVerse) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // AI Emotional Search
  aiPrompt: string;
  setAiPrompt: (p: string) => void;
  isAiSearching: boolean;
  handleAiSearch: (e: React.FormEvent) => void;
  aiLogs: string[];

  // Themes / Presets
  currentPreset: CanvasPreset;
  applyPreset: (preset: CanvasPreset) => void;
  CANVAS_PRESETS: CanvasPreset[];

  // Typography
  arabicFont: string;
  setArabicFont: (font: string) => void;
  availableFonts: Font[];
  fontSize: number;
  setFontSize: (size: number) => void;
  lineHeight: number;
  setLineHeight: (h: number) => void;
  letterSpacing: number;
  setLetterSpacing: (s: number) => void;

  // Ornaments
  selectedOrnament: string;
  setSelectedOrnament: (o: string) => void;
  cornerOrnament: boolean;
  setCornerOrnament: (val: boolean) => void;
  circularOrnament: boolean;
  setCircularOrnament: (val: boolean) => void;
  useGoldGradient: boolean;
  setUseGoldGradient: (val: boolean) => void;

  // Mockup Scenes
  viewTab: 'canvas' | 'mockup';
  setViewTab: (v: 'canvas' | 'mockup') => void;
  MOCKUP_SCENES: any[];
  selectedScene: any;
  setSelectedScene: (scene: any) => void;
  mockupFormat: '1:1' | '4:3' | '2:3' | '16:9';
  setMockupFormat: (fmt: '1:1' | '4:3' | '2:3' | '16:9') => void;
  runQualityControlScan: () => void;

  // State of Left Panel
  isLeftPanelCollapsed: boolean;
  setIsLeftPanelCollapsed: (collapsed: boolean) => void;
  leftActiveTab: 'quran' | 'presets' | 'typography' | 'decorations' | 'rooms' | 'ai';
  setLeftActiveTab: (tab: 'quran' | 'presets' | 'typography' | 'decorations' | 'rooms' | 'ai') => void;
}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  language,
  t,
  verses,
  selectedVerse,
  setSelectedVerse,
  searchQuery,
  setSearchQuery,
  aiPrompt,
  setAiPrompt,
  isAiSearching,
  handleAiSearch,
  aiLogs,
  currentPreset,
  applyPreset,
  CANVAS_PRESETS,
  arabicFont,
  setArabicFont,
  availableFonts,
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  letterSpacing,
  setLetterSpacing,
  selectedOrnament,
  setSelectedOrnament,
  cornerOrnament,
  setCornerOrnament,
  circularOrnament,
  setCircularOrnament,
  useGoldGradient,
  setUseGoldGradient,
  viewTab,
  setViewTab,
  MOCKUP_SCENES,
  selectedScene,
  setSelectedScene,
  mockupFormat,
  setMockupFormat,
  runQualityControlScan,
  isLeftPanelCollapsed,
  setIsLeftPanelCollapsed,
  leftActiveTab,
  setLeftActiveTab
}) => {

  const handleTabClick = (tab: typeof leftActiveTab) => {
    if (leftActiveTab === tab && !isLeftPanelCollapsed) {
      setIsLeftPanelCollapsed(true);
    } else {
      setLeftActiveTab(tab);
      setIsLeftPanelCollapsed(false);
    }
  };

  return (
    <div className="flex h-full select-none shrink-0 z-30">
      {/* 1. Thin Vertical Tab Selector Bar */}
      <div className="w-[72px] bg-stone-900 border-r border-stone-800 flex flex-col justify-between items-center py-4 text-white">
        <div className="flex flex-col gap-5 items-center w-full">
          {/* Verses Tab */}
          <button
            onClick={() => handleTabClick('quran')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              leftActiveTab === 'quran' && !isLeftPanelCollapsed
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20' 
                : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <BookOpen className="h-4.5 w-4.5" />
            <span className="text-[8px] font-sans font-bold uppercase tracking-wider">Quran</span>
          </button>

          {/* Themes Tab */}
          <button
            onClick={() => handleTabClick('presets')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              leftActiveTab === 'presets' && !isLeftPanelCollapsed
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20' 
                : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <Palette className="h-4.5 w-4.5" />
            <span className="text-[8px] font-sans font-bold uppercase tracking-wider">Themes</span>
          </button>

          {/* Typography Tab */}
          <button
            onClick={() => handleTabClick('typography')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              leftActiveTab === 'typography' && !isLeftPanelCollapsed
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20' 
                : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <Type className="h-4.5 w-4.5" />
            <span className="text-[8px] font-sans font-bold uppercase tracking-wider">Fonts</span>
          </button>

          {/* Borders & Ornaments Tab */}
          <button
            onClick={() => handleTabClick('decorations')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              leftActiveTab === 'decorations' && !isLeftPanelCollapsed
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20' 
                : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <Sparkles className="h-4.5 w-4.5" />
            <span className="text-[8px] font-sans font-bold uppercase tracking-wider">Motifs</span>
          </button>

          {/* Rooms Tab */}
          <button
            onClick={() => handleTabClick('rooms')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              leftActiveTab === 'rooms' && !isLeftPanelCollapsed
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20' 
                : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <Image className="h-4.5 w-4.5" />
            <span className="text-[8px] font-sans font-bold uppercase tracking-wider">Rooms</span>
          </button>

          {/* AI Emotional Search Tab */}
          <button
            onClick={() => handleTabClick('ai')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              leftActiveTab === 'ai' && !isLeftPanelCollapsed
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20' 
                : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <Send className="h-4 w-4" />
            <span className="text-[8px] font-sans font-bold uppercase tracking-wider">AI Coach</span>
          </button>
        </div>

        {/* Lower Info Help */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-[1px] bg-stone-800 my-2"></div>
          <HelpCircle className="h-4.5 w-4.5 text-stone-500 hover:text-stone-300 transition-colors cursor-pointer" />
        </div>
      </div>

      {/* 2. Expanded Asset Drawer (Slide out panel) */}
      <div 
        className={`h-full bg-white border-r border-stone-200 flex flex-col transition-all duration-300 relative ${
          isLeftPanelCollapsed ? 'w-0 overflow-hidden border-r-0' : 'w-[310px]'
        }`}
      >
        {/* Toggle Expand Button on Edge */}
        <button
          onClick={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
          className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-12 bg-white border border-stone-200 text-stone-500 rounded-r-lg shadow-md flex items-center justify-center hover:bg-stone-50 hover:text-stone-800 transition-all z-50 cursor-pointer"
        >
          {isLeftPanelCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>

        <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
          
          {/* TAB: Quran Text / Verse Selector */}
          {leftActiveTab === 'quran' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-serif flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-amber-600" /> Sacred Quran Text
                </h3>
                <span className="text-[8px] bg-stone-900 text-white font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  Verified Node
                </span>
              </div>

              {/* Translation Search input */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search verse, surah name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg py-1.5 pl-9 pr-4 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                />
              </div>

              {/* Verses Scrollbox list */}
              <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
                {verses.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVerse(v)}
                    className={`w-full text-left p-3 rounded-xl text-xs transition-all border ${
                      selectedVerse.id === v.id
                        ? 'bg-amber-500/10 text-stone-900 border-amber-500/30 font-semibold'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-amber-700 font-serif">
                        {v.surahNameEnglish} {v.ayah}
                      </span>
                      <span className="text-[9px] bg-white px-1.5 py-0.5 rounded text-stone-400 font-mono border border-stone-200">
                        {v.meaningCategory}
                      </span>
                    </div>
                    <p className="line-clamp-2 italic text-stone-500 text-[10.5px] leading-relaxed">
                      "{v.englishTranslation}"
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Presets & Theme Palette */}
          {leftActiveTab === 'presets' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-serif flex items-center gap-1.5">
                  <Palette className="h-4 w-4 text-amber-600" /> Curated Themes
                </h3>
                <p className="text-[10px] text-stone-500 mt-1 font-sans">Apply luxury, professionally color-balanced preset combinations</p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {CANVAS_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p)}
                    className={`p-3 rounded-xl text-left border flex flex-col justify-between h-20 transition-all ${
                      currentPreset.id === p.id
                        ? 'border-amber-500 bg-amber-500/5 shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="text-xs text-stone-900 font-bold font-serif leading-none">{p.name}</span>
                      <span className="text-[8px] bg-white text-stone-400 uppercase tracking-widest px-1 py-0.5 rounded border border-stone-200 font-bold font-mono">Preset</span>
                    </div>
                    
                    <div className="flex items-center justify-between w-full mt-2 pt-1 border-t border-stone-200/50">
                      <div className="flex gap-1">
                        <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: p.bgColor }} title="Backdrop"></span>
                        <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: p.textColor }} title="Text"></span>
                        <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: p.ornamentColor }} title="Ornament"></span>
                      </div>
                      <span className="text-[9px] text-stone-400 font-sans">Select Theme</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Fonts & Arabic Typography */}
          {leftActiveTab === 'typography' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-serif flex items-center gap-1.5">
                  <Type className="h-4 w-4 text-amber-600" /> Naskh & Kufi Fonts
                </h3>
                <p className="text-[10px] text-stone-500 mt-1">Select authentic Arabic calligraphic scripts</p>
              </div>

              {/* List of Arabic Fonts */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {availableFonts.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setArabicFont(f.family)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      arabicFont === f.family
                        ? 'border-amber-500 bg-amber-500/5 text-stone-900 font-semibold'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[11px] text-stone-900">{f.name}</span>
                      <span className="text-[8px] bg-stone-200 text-stone-600 font-bold px-1 py-0.5 rounded uppercase">{f.category}</span>
                    </div>
                    {/* Live arabic preview in specific font! */}
                    <p 
                      dir="rtl" 
                      className="text-right text-[15px] font-serif leading-loose text-stone-700 pt-1 border-t border-stone-200/50 mt-1 font-medium"
                      style={{ fontFamily: f.family }}
                    >
                      صَدَقَ اللَّهُ الْعَظِيمُ
                    </p>
                  </button>
                ))}
              </div>

              {/* Slider variables */}
              <div className="space-y-3 pt-3 border-t border-stone-100">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-stone-500 uppercase mb-1">
                    <span>Font Size</span>
                    <span className="font-mono text-amber-700 font-bold">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="48"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-stone-500 uppercase mb-1">
                    <span>Line Spacing</span>
                    <span className="font-mono text-amber-700 font-bold">{lineHeight}</span>
                  </div>
                  <input
                    type="range"
                    min="1.2"
                    max="2.5"
                    step="0.1"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(Number(e.target.value))}
                    className="w-full h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-stone-500 uppercase mb-1">
                    <span>Letter Spacing</span>
                    <span className="font-mono text-amber-700 font-bold">{letterSpacing}px</span>
                  </div>
                  <input
                    type="range"
                    min="-2"
                    max="8"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-full h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: Borders & Ornaments (Motifs) */}
          {leftActiveTab === 'decorations' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-serif flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-600" /> Sacred Ornaments
                </h3>
                <p className="text-[10px] text-stone-500 mt-1">Embellish the script with classical geometric frameworks</p>
              </div>

              {/* Ornaments layout additions */}
              <div className="space-y-2.5 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <label htmlFor="cornerOrn" className="text-xs text-stone-700 font-medium">Corner Medallions</label>
                  <input
                    type="checkbox"
                    id="cornerOrn"
                    checked={cornerOrnament}
                    onChange={(e) => setCornerOrnament(e.target.checked)}
                    className="rounded border-stone-300 text-amber-500 focus:ring-amber-500/50 bg-white h-4.5 w-4.5"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="circOrn" className="text-xs text-stone-700 font-medium">Central Star Rosette</label>
                  <input
                    type="checkbox"
                    id="circOrn"
                    checked={circularOrnament}
                    onChange={(e) => setCircularOrnament(e.target.checked)}
                    className="rounded border-stone-300 text-amber-500 focus:ring-amber-500/50 bg-white h-4.5 w-4.5"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="goldGrad" className="text-xs text-stone-700 font-medium">Metallic Gold Gradient</label>
                  <input
                    type="checkbox"
                    id="goldGrad"
                    checked={useGoldGradient}
                    onChange={(e) => setUseGoldGradient(e.target.checked)}
                    className="rounded border-stone-300 text-amber-500 focus:ring-amber-500/50 bg-white h-4.5 w-4.5"
                  />
                </div>
              </div>

              {/* Structural Layout Ornaments */}
              <div className="space-y-2">
                <label className="text-[9px] text-stone-400 uppercase tracking-widest font-bold block mb-1">Focal Ornament</label>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: 'mihrab-arch', name: 'Mihrab Mosque Arch' },
                    { id: 'moroccan-arch', name: 'Moroccan Arch Silhouette' },
                    { id: 'eight-point-star', name: 'Eight Point Rub El Hizb' },
                    { id: 'none', name: 'Minimal (No Focal Accent)' },
                  ].map((orn) => (
                    <button
                      key={orn.id}
                      onClick={() => setSelectedOrnament(orn.id)}
                      className={`px-3 py-2 text-left rounded-xl border text-xs font-bold transition-all ${
                        selectedOrnament === orn.id
                          ? 'border-amber-500 bg-amber-500/5 text-stone-900'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600'
                      }`}
                    >
                      {orn.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: Room Mockups selector */}
          {leftActiveTab === 'rooms' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-serif flex items-center gap-1.5">
                  <Image className="h-4 w-4 text-amber-600" /> Physical Backdrop Rooms
                </h3>
                <p className="text-[10px] text-stone-500 mt-1">Project artwork onto luxury, photorealistic room backdrops</p>
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {MOCKUP_SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => {
                      setViewTab('mockup');
                      setSelectedScene(scene);
                    }}
                    className={`rounded-xl border overflow-hidden p-1 bg-stone-50 transition-all ${
                      selectedScene.id === scene.id && viewTab === 'mockup'
                        ? 'border-amber-500 ring-1 ring-amber-500/50 bg-amber-500/5'
                        : 'border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden relative">
                      <img 
                        src={scene.imageUrl} 
                        alt={scene.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <span className="block text-[9px] font-sans font-bold text-center mt-1 text-stone-700 truncate px-1">
                      {scene.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Sizing Format selectors */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="text-[9px] text-stone-400 uppercase tracking-widest font-bold block mb-1">Export Proportions Ratio</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: '1:1', label: 'Etsy Square (1:1)' },
                    { id: '4:3', label: 'Details Width (4:3)' },
                    { id: '2:3', label: 'Pinterest Tall (2:3)' },
                    { id: '16:9', label: 'Banner Wide (16:9)' }
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => {
                        setMockupFormat(fmt.id as any);
                        runQualityControlScan();
                      }}
                      className={`py-1.5 rounded-lg border text-[10px] font-bold text-center transition-all ${
                        mockupFormat === fmt.id
                          ? 'bg-stone-900 border-stone-900 text-white'
                          : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: AI Sentiment Coach */}
          {leftActiveTab === 'ai' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-serif flex items-center gap-1.5">
                  <Send className="h-4 w-4 text-amber-600 animate-pulse" /> AI Emotional Engine
                </h3>
                <p className="text-[10px] text-stone-500 mt-1">State your emotion or need, and let AI select authentic Quranic verses matching your state.</p>
              </div>

              <form onSubmit={handleAiSearch} className="space-y-2">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="e.g. 'feeling anxious', 'patience'..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  />
                  <button
                    type="submit"
                    disabled={isAiSearching}
                    className="bg-stone-950 hover:bg-stone-800 text-white font-bold px-3.5 rounded-lg text-xs flex items-center justify-center transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {isAiSearching ? '...' : <Send className="h-3.5 w-3.5" />}
                  </button>
                </div>
                
                {aiLogs.length > 0 && (
                  <div className="bg-amber-50/40 p-3 rounded-lg border border-amber-500/10 text-[9px] font-mono text-stone-700 max-h-[220px] overflow-y-auto space-y-1.5 scrollbar-thin">
                    {aiLogs.map((log, i) => (
                      <div key={i} className="flex gap-1.5 items-start">
                        <span className="text-amber-600 font-bold">❯</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
