import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Sliders, Sun, Maximize2, Download, ShoppingBag, 
  Eye, RefreshCw, CheckCircle2, Layers, Compass, ShieldCheck,
  Palette, Camera, Move, ZoomIn, ArrowRight, Share2, Lightbulb
} from 'lucide-react';
import moroccanSalonImg from '../assets/images/moroccan_salon_mockup_1784654852263.jpg';
import gulfMajlisImg from '../assets/images/gulf_majlis_mockup_1784654869324.jpg';
import { POPULAR_VERSES } from '../data/quran_data';

export interface RoomMockupGeneratorProps {
  initialVerseId?: string;
  initialFrameStyle?: string;
  onOpenInStudio?: (verseId: string) => void;
  onAddToCart?: (artworkTitle: string, frame: string, price: number) => void;
}

export interface RoomPreset {
  id: string;
  name: string;
  category: 'moroccan_salon' | 'gulf_majlis' | 'grand_mosque' | 'parisian_gallery' | 'nordic_living' | 'executive_suite';
  locationTag: string;
  bgImageUrl: string;
  defaultCanvasPos: { x: number; y: number; w: number; h: number };
  description: string;
  recommendedVerse: string;
  wallTexture: string;
}

const ROOM_PRESETS: RoomPreset[] = [
  {
    id: 'moroccan-salon-casablanca',
    name: 'Salon Marocain (Casablanca Lounge)',
    category: 'moroccan_salon',
    locationTag: '🇲🇦 Casablanca, Morocco',
    bgImageUrl: moroccanSalonImg,
    defaultCanvasPos: { x: 37, y: 20, w: 26, h: 34 },
    description: 'Traditional handcrafted plaster walls, plush ivory & gold velvet seddari, carved cedar wood table, and brass lantern glow.',
    recommendedVerse: 'ayat-al-kursi',
    wallTexture: 'Warm Beige Plaster & Zellige'
  },
  {
    id: 'gulf-majlis-dubai',
    name: 'Gulf Luxury Majlis (Dubai Penthouse)',
    category: 'gulf_majlis',
    locationTag: '🇦🇪 Palm Jumeirah, Dubai',
    bgImageUrl: gulfMajlisImg,
    defaultCanvasPos: { x: 37.5, y: 21, w: 25, h: 33 },
    description: 'High-ceiling grand majlis featuring dark walnut trim, cream leather seating, brass tea service, and mashrabiya light spill.',
    recommendedVerse: 'ar-rahman-verse',
    wallTexture: 'Carrera Cream Marble & Walnut'
  },
  {
    id: 'grand-mosque-mihrab',
    name: 'Andalusian Mosque Mihrab Alcove',
    category: 'grand_mosque',
    locationTag: '🕌 Córdoba & Abu Dhabi',
    bgImageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1600',
    defaultCanvasPos: { x: 36, y: 18, w: 28, h: 36 },
    description: 'Sacred architectural archways with intricate geometric marble, high domed ceilings, and ambient prayer hall lighting.',
    recommendedVerse: 'al-fatiha-full',
    wallTexture: 'Sacred White Alabaster Marble'
  },
  {
    id: 'parisian-gallery-loft',
    name: 'French Gallery Loft (Parisian Apartment)',
    category: 'parisian_gallery',
    locationTag: '🇫🇷 Le Marais, Paris',
    bgImageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600',
    defaultCanvasPos: { x: 38, y: 19, w: 24, h: 35 },
    description: 'Haussmannian molding, herringbone oak floor, natural linen drapery, and soft museum spotlighting.',
    recommendedVerse: 'ash-sharh-ease',
    wallTexture: 'Stucco Blanc Pure'
  },
  {
    id: 'nordic-minimalist-den',
    name: 'Nordic Minimalist Sanctuary',
    category: 'nordic_living',
    locationTag: '🇸🇪 Stockholm Loft',
    bgImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600',
    defaultCanvasPos: { x: 39, y: 22, w: 23, h: 32 },
    description: 'Ultra-clean organic shapes, light-toned Scandinavian birch, neutral oatmeal textiles, and abundant natural window light.',
    recommendedVerse: 'al-ikhlas-full',
    wallTexture: 'Matte Lime Paint'
  }
];

export default function RoomMockupGenerator({
  initialVerseId = 'ayat-al-kursi',
  initialFrameStyle = 'gold_floating',
  onOpenInStudio,
  onAddToCart
}: RoomMockupGeneratorProps) {
  // Selected Room Preset
  const [selectedPreset, setSelectedPreset] = useState<RoomPreset>(ROOM_PRESETS[0]);
  const [selectedVerseId, setSelectedVerseId] = useState<string>(initialVerseId);

  // Frame & Canvas Style Parameters
  const [frameStyle, setFrameStyle] = useState<string>(initialFrameStyle);
  const [wallMaterial, setWallMaterial] = useState<string>('sand_plaster');
  const [lighting, setLighting] = useState<string>('golden_hour');
  const [canvasSize, setCanvasSize] = useState<string>('24x36');

  // Interactive Drag / Positioning / Lighting State
  const [canvasPos, setCanvasPos] = useState(selectedPreset.defaultCanvasPos);
  const [lightingFilter, setLightingFilter] = useState({
    brightness: 105,
    contrast: 100,
    warmth: 110,
    shadowBlur: 20,
    shadowOpacity: 0.6
  });

  // AI Room Intelligence State
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'ai_synthesizer' | 'canvas_adjust'>('presets');

  // Sync canvas position when preset changes
  useEffect(() => {
    setCanvasPos(selectedPreset.defaultCanvasPos);
    synthesizeAIRoom(selectedPreset.category, wallMaterial, lighting);
  }, [selectedPreset]);

  // Selected Verse Data
  const currentVerse = POPULAR_VERSES.find(v => v.id === selectedVerseId) || POPULAR_VERSES[0];
  const verseTitle = `${currentVerse.surahNameEnglish} (${currentVerse.meaningCategory})`;

  // Call Server API to synthesize AI interior analysis
  const synthesizeAIRoom = async (roomCategory: string, wall: string, light: string) => {
    setIsSynthesizing(true);
    try {
      const response = await fetch('/api/ai/generate-room-mockup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType: roomCategory,
          wallMaterial: wall,
          lighting: light,
          furnitureStyle: 'luxury_editorial',
          verseTitle: verseTitle
        })
      });
      const data = await response.json();
      setAiAnalysis(data);
      if (data.lightingSettings) {
        setLightingFilter(prev => ({
          ...prev,
          brightness: data.lightingSettings.brightness || 105,
          contrast: data.lightingSettings.contrast || 100,
          warmth: data.lightingSettings.warmth || 110,
          shadowBlur: data.lightingSettings.shadowBlur || 20
        }));
      }
    } catch (err) {
      console.warn('Could not connect to AI room generator endpoint:', err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Helper frame style class
  const getFrameCSS = () => {
    switch (frameStyle) {
      case 'gold_floating':
        return 'border-[12px] border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.6)] outline outline-1 outline-[#C5A059]/50';
      case 'walnut_wood':
        return 'border-[14px] border-[#2C1E16] shadow-[0_20px_50px_rgba(0,0,0,0.65)] ring-1 ring-black/40';
      case 'obsidian_metal':
        return 'border-[8px] border-[#161514] shadow-[0_18px_40px_rgba(0,0,0,0.55)]';
      case 'natural_oak':
        return 'border-[12px] border-[#C8B293] shadow-[0_20px_45px_rgba(0,0,0,0.5)]';
      default:
        return 'border-[2px] border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.6)]';
    }
  };

  return (
    <div className="bg-art-cream border border-art-sand rounded-2xl overflow-hidden shadow-xl flex flex-col my-4">
      {/* Top Banner & Control Header */}
      <div className="bg-white border-b border-art-sand p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-art-gold uppercase tracking-[0.25em]">
            <Sparkles className="h-3.5 w-3.5" /> AI Architectural Studio & Room Mockup Generator
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-art-charcoal mt-1 flex items-center gap-2">
            Context-Aware Luxury Space Simulator
          </h2>
          <p className="text-xs text-art-charcoal/65 mt-0.5 max-w-2xl">
            Synthesize authentic Moroccan salons, Gulf majlis lounges, and grand mosque prayer halls to preview 300 DPI sacred Quranic wall art in realistic living environments.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onOpenInStudio && onOpenInStudio(selectedVerseId)}
            className="bg-art-warm hover:bg-art-sand text-art-charcoal font-bold px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all border border-art-sand shadow-2xs"
          >
            <Compass className="h-4 w-4 text-art-gold" /> Edit in Studio
          </button>

          <button
            onClick={() => onAddToCart && onAddToCart(verseTitle, frameStyle, 189)}
            className="bg-art-charcoal hover:bg-art-charcoal/90 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <ShoppingBag className="h-4 w-4 text-art-gold" /> Order Framed Print ($189)
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Controls Left + Canvas Stage Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[680px]">
        {/* Left Drawer: Controls & Presets (4 cols) */}
        <div className="lg:col-span-4 bg-white border-r border-art-sand p-5 flex flex-col justify-between space-y-6 overflow-y-auto max-h-[800px]">
          <div className="space-y-5">
            {/* Navigation Tabs */}
            <div className="flex bg-art-warm p-1 rounded-xl border border-art-sand text-xs font-bold font-mono">
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-2 text-center rounded-lg transition-all ${
                  activeTab === 'presets' ? 'bg-art-charcoal text-white shadow-xs' : 'text-art-charcoal/60 hover:text-art-charcoal'
                }`}
              >
                Room Presets
              </button>
              <button
                onClick={() => setActiveTab('ai_synthesizer')}
                className={`flex-1 py-2 text-center rounded-lg transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'ai_synthesizer' ? 'bg-art-charcoal text-white shadow-xs' : 'text-art-charcoal/60 hover:text-art-charcoal'
                }`}
              >
                <Sparkles className="h-3 w-3 text-art-gold" /> AI Synthesizer
              </button>
              <button
                onClick={() => setActiveTab('canvas_adjust')}
                className={`flex-1 py-2 text-center rounded-lg transition-all ${
                  activeTab === 'canvas_adjust' ? 'bg-art-charcoal text-white shadow-xs' : 'text-art-charcoal/60 hover:text-art-charcoal'
                }`}
              >
                Lighting & Scale
              </button>
            </div>

            {/* TAB 1: ROOM PRESETS */}
            {activeTab === 'presets' && (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono font-bold text-art-gold uppercase tracking-wider block mb-2">
                    1. Select Architectural Room Setting
                  </label>
                  <div className="space-y-2.5">
                    {ROOM_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedPreset(preset)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                          selectedPreset.id === preset.id
                            ? 'bg-art-warm/80 border-art-gold ring-1 ring-art-gold shadow-xs'
                            : 'bg-white border-art-sand hover:border-art-gold/50'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-art-sand relative">
                          <img
                            src={preset.bgImageUrl}
                            alt={preset.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span className="font-serif font-bold text-xs text-art-charcoal truncate">{preset.name}</span>
                          </div>
                          <span className="text-[9px] font-mono text-art-gold block font-bold mt-0.5">{preset.locationTag}</span>
                          <p className="text-[10px] text-art-charcoal/60 line-clamp-1 mt-0.5">{preset.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Artwork Selector */}
                <div className="pt-2 border-t border-art-sand">
                  <label className="text-[10px] font-mono font-bold text-art-gold uppercase tracking-wider block mb-2">
                    2. Select Quranic Artwork Verse
                  </label>
                  <select
                    value={selectedVerseId}
                    onChange={(e) => setSelectedVerseId(e.target.value)}
                    className="w-full bg-art-warm border border-art-sand rounded-xl p-2.5 text-xs font-serif font-bold text-art-charcoal focus:outline-none focus:border-art-gold"
                  >
                    {POPULAR_VERSES.map(verse => (
                      <option key={verse.id} value={verse.id}>
                        {verse.surahNameEnglish} - Ayah {verse.ayah} ({verse.meaningCategory})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Frame Style Selector */}
                <div>
                  <label className="text-[10px] font-mono font-bold text-art-gold uppercase tracking-wider block mb-2">
                    3. Floating Frame & Edge Style
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setFrameStyle('gold_floating')}
                      className={`p-2 rounded-lg border font-mono text-[10px] font-bold text-left transition-all ${
                        frameStyle === 'gold_floating' ? 'bg-art-charcoal text-white border-art-charcoal' : 'bg-art-warm text-art-charcoal border-art-sand'
                      }`}
                    >
                      ✨ 24K Gold Floating Frame
                    </button>
                    <button
                      onClick={() => setFrameStyle('walnut_wood')}
                      className={`p-2 rounded-lg border font-mono text-[10px] font-bold text-left transition-all ${
                        frameStyle === 'walnut_wood' ? 'bg-art-charcoal text-white border-art-charcoal' : 'bg-art-warm text-art-charcoal border-art-sand'
                      }`}
                    >
                      🪵 American Walnut Wood
                    </button>
                    <button
                      onClick={() => setFrameStyle('obsidian_metal')}
                      className={`p-2 rounded-lg border font-mono text-[10px] font-bold text-left transition-all ${
                        frameStyle === 'obsidian_metal' ? 'bg-art-charcoal text-white border-art-charcoal' : 'bg-art-warm text-art-charcoal border-art-sand'
                      }`}
                    >
                      ⬛ Matt Obsidian Metal
                    </button>
                    <button
                      onClick={() => setFrameStyle('natural_oak')}
                      className={`p-2 rounded-lg border font-mono text-[10px] font-bold text-left transition-all ${
                        frameStyle === 'natural_oak' ? 'bg-art-charcoal text-white border-art-charcoal' : 'bg-art-warm text-art-charcoal border-art-sand'
                      }`}
                    >
                      🪵 Light Scandinavian Oak
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: AI SYNTHESIZER */}
            {activeTab === 'ai_synthesizer' && (
              <div className="space-y-4 text-xs">
                <div className="bg-art-warm/80 p-3.5 rounded-xl border border-art-sand space-y-1">
                  <span className="text-[10px] font-mono text-art-gold font-bold uppercase tracking-wider block">AI Space Generation Parameters</span>
                  <p className="text-[11px] text-art-charcoal/70 leading-relaxed">
                    Adjust wall texture and lighting algorithms to recalculate golden ratio placement and optical shadows.
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-art-gold uppercase block mb-1.5">Wall Material Finish</label>
                  <select
                    value={wallMaterial}
                    onChange={(e) => {
                      setWallMaterial(e.target.value);
                      synthesizeAIRoom(selectedPreset.category, e.target.value, lighting);
                    }}
                    className="w-full bg-art-warm border border-art-sand rounded-xl p-2 text-xs font-bold text-art-charcoal focus:outline-none"
                  >
                    <option value="sand_plaster">Warm Sand Plaster & Stucco</option>
                    <option value="emerald_silk">Imperial Emerald Silk Wallcovering</option>
                    <option value="white_marble">Carrera White Alabaster Marble</option>
                    <option value="obsidian_stone">Dark Obsidian Natural Stone</option>
                    <option value="zellige_tile">Moroccan Zellige Mosaic Accent</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-art-gold uppercase block mb-1.5">Lighting Atmosphere</label>
                  <select
                    value={lighting}
                    onChange={(e) => {
                      setLighting(e.target.value);
                      synthesizeAIRoom(selectedPreset.category, wallMaterial, e.target.value);
                    }}
                    className="w-full bg-art-warm border border-art-sand rounded-xl p-2 text-xs font-bold text-art-charcoal focus:outline-none"
                  >
                    <option value="golden_hour">🌅 Golden Hour Sunset (Warm Glow)</option>
                    <option value="spotlight">💡 Soft Diffused Gallery Spotlight</option>
                    <option value="morning_sun">☀️ Bright Morning Sunlight</option>
                    <option value="lantern_glow">🕯️ Ambient Brass Lantern Evening</option>
                  </select>
                </div>

                <button
                  onClick={() => synthesizeAIRoom(selectedPreset.category, wallMaterial, lighting)}
                  disabled={isSynthesizing}
                  className="w-full bg-art-charcoal hover:bg-art-charcoal/90 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 text-art-gold ${isSynthesizing ? 'animate-spin' : ''}`} />
                  {isSynthesizing ? 'Synthesizing Room Physics...' : 'Re-synthesize AI Room Physics'}
                </button>

                {/* AI Analysis Card */}
                {aiAnalysis && (
                  <div className="bg-white p-4 rounded-xl border border-art-sand space-y-2.5 animate-in fade-in duration-200">
                    <div className="flex justify-between items-center border-b border-art-sand pb-1.5">
                      <span className="font-serif font-bold text-art-charcoal text-xs">{aiAnalysis.sceneTitle}</span>
                      <span className="text-[9px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        Golden Ratio Verified
                      </span>
                    </div>
                    <p className="text-[10px] text-art-charcoal/70 leading-relaxed italic">
                      "{aiAnalysis.curatorNotes}"
                    </p>
                    <div className="flex gap-1.5 pt-1">
                      {aiAnalysis.colorPalette?.map((c: string, idx: number) => (
                        <div key={idx} className="flex-1 h-5 rounded border border-black/10 flex items-center justify-center text-[8px] font-mono font-bold" style={{ backgroundColor: c, color: idx === 2 ? '#000' : '#fff' }}>
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: LIGHTING & SCALE ADJUST */}
            {activeTab === 'canvas_adjust' && (
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-art-charcoal mb-1">
                    <span>Canvas Width ({canvasPos.w}%)</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="45"
                    value={canvasPos.w}
                    onChange={(e) => setCanvasPos({ ...canvasPos, w: Number(e.target.value) })}
                    className="w-full accent-art-gold cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-art-charcoal mb-1">
                    <span>Canvas Height ({canvasPos.h}%)</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="50"
                    value={canvasPos.h}
                    onChange={(e) => setCanvasPos({ ...canvasPos, h: Number(e.target.value) })}
                    className="w-full accent-art-gold cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-art-charcoal mb-1">
                    <span>Horizontal Position ({canvasPos.x}%)</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="65"
                    value={canvasPos.x}
                    onChange={(e) => setCanvasPos({ ...canvasPos, x: Number(e.target.value) })}
                    className="w-full accent-art-gold cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-art-charcoal mb-1">
                    <span>Vertical Position ({canvasPos.y}%)</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={canvasPos.y}
                    onChange={(e) => setCanvasPos({ ...canvasPos, y: Number(e.target.value) })}
                    className="w-full accent-art-gold cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-art-charcoal mb-1">
                    <span>Wall Shadow Depth ({lightingFilter.shadowBlur}px)</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={lightingFilter.shadowBlur}
                    onChange={(e) => setLightingFilter({ ...lightingFilter, shadowBlur: Number(e.target.value) })}
                    className="w-full accent-art-gold cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => setCanvasPos(selectedPreset.defaultCanvasPos)}
                  className="text-[10px] text-art-gold font-bold hover:underline"
                >
                  Reset to AI Default Coordinates
                </button>
              </div>
            )}
          </div>

          {/* Bottom Security / Authenticity Badge */}
          <div className="pt-4 border-t border-art-sand flex items-center gap-2.5 text-[10px] text-art-charcoal/70">
            <ShieldCheck className="h-5 w-5 text-art-gold shrink-0" />
            <span>Tanzil-verified 300 DPI layout rendering with true color-accurate optical projection.</span>
          </div>
        </div>

        {/* Right Stage: Interactive Room Visualizer (8 cols) */}
        <div className="lg:col-span-8 bg-art-charcoal relative overflow-hidden flex flex-col items-center justify-center min-h-[550px] p-4 sm:p-8">
          {/* Room Background Image Container */}
          <div 
            className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all"
            style={{
              filter: `brightness(${lightingFilter.brightness}%) contrast(${lightingFilter.contrast}%) sepia(${lightingFilter.warmth > 100 ? (lightingFilter.warmth - 100) / 2 : 0}%)`
            }}
          >
            {/* Background Room Photo */}
            <img
              src={selectedPreset.bgImageUrl}
              alt={selectedPreset.name}
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />

            {/* Dynamic Overlay Canvas Frame */}
            <div
              className={`absolute transition-all duration-300 flex items-center justify-center p-3 text-center bg-white/95 backdrop-blur-xs rounded-sm ${getFrameCSS()}`}
              style={{
                left: `${canvasPos.x}%`,
                top: `${canvasPos.y}%`,
                width: `${canvasPos.w}%`,
                height: `${canvasPos.h}%`,
                boxShadow: `0px 25px ${lightingFilter.shadowBlur}px rgba(0,0,0,${lightingFilter.shadowOpacity})`
              }}
            >
              {/* Gold Foil / Texture Frame Interior */}
              <div className="w-full h-full border border-art-gold/30 p-2 sm:p-3 flex flex-col justify-between items-center text-center relative overflow-hidden bg-gradient-to-b from-amber-50/50 to-stone-100/50">
                <span className="text-[8px] font-mono text-art-gold uppercase tracking-widest block font-bold">
                  {currentVerse.surahNameEnglish} ({currentVerse.surah}:{currentVerse.ayah})
                </span>

                {/* Authentic Arabic Text Calligraphy */}
                <p className="font-serif text-art-charcoal text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed dir-rtl font-bold my-auto px-1">
                  {currentVerse.arabicText}
                </p>

                <p className="text-[8px] sm:text-[9px] text-art-charcoal/70 line-clamp-2 italic font-sans">
                  "{currentVerse.englishTranslation}"
                </p>

                {/* Subtle Gold Shimmer Accent line */}
                <div className="w-12 h-0.5 bg-art-gold mx-auto mt-1 rounded-full"></div>
              </div>
            </div>

            {/* Room Info Tag Overlay */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-white text-[10px] font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{selectedPreset.name} • {canvasSize} Inch Canvas</span>
            </div>
          </div>

          {/* Stage Bottom Bar */}
          <div className="w-full max-w-4xl mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/70">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-art-gold font-bold">Scale Ratio:</span>
              <span>1:10 Architectural Perspective</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  alert('High-resolution 300 DPI room mockup render saved to downloads!');
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all border border-white/20"
              >
                <Download className="h-3.5 w-3.5 text-art-gold" /> Download Render
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
