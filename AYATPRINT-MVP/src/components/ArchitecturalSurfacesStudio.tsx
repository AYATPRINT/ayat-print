import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { POPULAR_VERSES } from '../data/quran_data';
import { 
  Layers, Sparkles, Sliders, Maximize2, ShieldCheck, 
  CheckCircle2, ArrowRight, Eye, RefreshCw, Ruler, 
  Building2, Camera, Download, Lightbulb, Compass,
  DollarSign, Grid, Box, Sun, Shield
} from 'lucide-react';

export interface ArchitecturalSubstrate {
  id: string;
  name: string;
  category: 'murals' | 'panels' | 'glass_metal' | 'textiles';
  icon: string;
  description: string;
  pricePerSqmUSD: number;
  maxDimensionMeters: string;
  leadTimeDays: number;
  durabilityYears: number;
  features: string[];
  recommendedSpaces: string[];
  aiAdvice: string;
}

export const ARCHITECTURAL_SUBSTRATES: ArchitecturalSubstrate[] = [
  {
    id: 'panoramic_wallpaper',
    name: 'Luxury Panoramic Wallpaper Mural (Papier Peint Panoramique)',
    category: 'murals',
    icon: '🧱',
    description: 'Heavyweight 350g non-woven textured wallpaper, washable, scratch-resistant, Euroclass B-s1 flame retardant. Custom cut to exact wall dimensions.',
    pricePerSqmUSD: 85,
    maxDimensionMeters: '15m x 4.5m',
    leadTimeDays: 5,
    durabilityYears: 25,
    features: ['Custom Wall Width & Height', 'Seamless Panel Numbering', 'Anti-Glare Matte Finish', 'M1 Fire Safety Certified'],
    recommendedSpaces: ['Moroccan Salons', 'Hotel Lobbies', 'Mosque Feature Walls', 'Luxury Villa Dining Rooms'],
    aiAdvice: 'Ideal for large accent walls! For a 4m wide wall, we print in 4 numbered 1m drops with seamless 15mm overlap.'
  },
  {
    id: 'acrylic_glass_6mm',
    name: 'High-Gloss Acrylic Glass (6mm Ultra-Clear)',
    category: 'glass_metal',
    icon: '✨',
    description: 'Direct UV print behind 6mm diamond-polished acrylic glass. Stunning optical depth, vibrant color contrast, and floating aluminum backing.',
    pricePerSqmUSD: 165,
    maxDimensionMeters: '3.0m x 2.0m',
    leadTimeDays: 7,
    durabilityYears: 30,
    features: ['3D High Gloss Optical Depth', 'Diamond Polished Edges', 'Hidden Aluminum Floating Mount', '100% Waterproof'],
    recommendedSpaces: ['Executive Offices', 'Penthouse Living Spaces', 'VIP Lounge Reception'],
    aiAdvice: 'Produces a jaw-dropping floating glass effect under spotlighting. Excellent for high-humidity or modern illuminated interiors.'
  },
  {
    id: 'brushed_aluminum_dibond',
    name: 'Brushed Gold/Silver Aluminum Dibond',
    category: 'glass_metal',
    icon: '🪙',
    description: '3mm solid aluminum composite core with brushed metallic surface. Highlights in the calligraphy shine with authentic metallic metallic glint.',
    pricePerSqmUSD: 145,
    maxDimensionMeters: '3.0m x 1.5m',
    leadTimeDays: 6,
    durabilityYears: 30,
    features: ['Real Metallic Sheen', 'Ultra Slim 3mm Dibond', 'Weatherproof Outdoor/Indoor', 'Precision CNC Trim'],
    recommendedSpaces: ['Modern Villa Facades', 'Mosque Entrances', 'Corporate Boardrooms'],
    aiAdvice: 'Light reflections bring gold calligraphy to life as you walk past the wall. Zero warping over time.'
  },
  {
    id: 'natural_walnut_wood',
    name: 'Solid American Walnut Architectural Wood Panel',
    category: 'panels',
    icon: '🌳',
    description: 'FSC-certified solid American walnut wood panel with natural grain showing through subtle calligraphic ink layers.',
    pricePerSqmUSD: 195,
    maxDimensionMeters: '2.5m x 1.2m',
    leadTimeDays: 8,
    durabilityYears: 50,
    features: ['100% Solid Hardwood', 'Natural Wood Grain Texture', 'Satin Wax Finish', 'Beveled Edge Profile'],
    recommendedSpaces: ['Gulf Majlis', 'Private Libraries', 'Heritage Hotel Suites'],
    aiAdvice: 'Brings warmth and spiritual serenity. The wood grain subtly interacts with Arabic script for organic elegance.'
  },
  {
    id: 'mihrab_alcove_panel',
    name: 'Architectural Mihrab Prayer Alcove Panel',
    category: 'panels',
    icon: '🕌',
    description: 'Precision 3D carved wood or plaster architectural alcove panel incorporating Andalusian arch geometry and Quranic borders.',
    pricePerSqmUSD: 240,
    maxDimensionMeters: '4.0m x 2.2m',
    leadTimeDays: 10,
    durabilityYears: 50,
    features: ['3D Relief Bas-Relief', 'Acoustic Sound Absorption', 'Pre-fitted Mounting Track', 'Modular Segment Assembly'],
    recommendedSpaces: ['Home Prayer Rooms (Musalla)', 'Mosque Mihrabs', 'Islamic Centers'],
    aiAdvice: 'Transforms a simple home corner into a serene, consecrated prayer alcove with built-in acoustic warmth.'
  },
  {
    id: 'mashrabiya_window_film',
    name: 'Mashrabiya Geometric Stained Glass Window Film',
    category: 'glass_metal',
    icon: '🪟',
    description: 'Translucent architectural window vinyl featuring geometric lattice work and calligraphy that filters sunlight into dramatic geometric patterns.',
    pricePerSqmUSD: 65,
    maxDimensionMeters: '5.0m x 1.5m',
    leadTimeDays: 4,
    durabilityYears: 10,
    features: ['Privacy Sun Screening', 'UV Ray Filtering (99%)', 'Static Cling / Easy Application', 'Custom Light Transparency'],
    recommendedSpaces: ['Villa Skylights', 'Mosque Windows', 'Glass Partition Doors'],
    aiAdvice: 'When sunlight passes through, it projects sacred calligraphic shadows onto marble floors.'
  },
  {
    id: 'cushion_silk_velvet',
    name: 'Luxury Velvet & Silk Decorative Cushions (Set of 2)',
    category: 'textiles',
    icon: '🛋️',
    description: 'Heavyweight 450gsm Italian cotton velvet with gold metallic embroidery detailing and down feather inserts.',
    pricePerSqmUSD: 120,
    maxDimensionMeters: '65cm x 65cm',
    leadTimeDays: 5,
    durabilityYears: 15,
    features: ['Gold Thread Embroidery', 'Hidden YKK Gold Zipper', 'Hypoallergenic Down Insert', 'Dry Clean Safe'],
    recommendedSpaces: ['Moroccan Seddari', 'Majlis Seating', 'Luxury Suite Sofas'],
    aiAdvice: 'Complements wall artwork perfectly by creating a unified interior design story across wall and furniture.'
  }
];

export default function ArchitecturalSurfacesStudio() {
  const { t, formatPrice, isRTL, unit } = useLanguage();
  
  const [selectedVerse, setSelectedVerse] = useState(POPULAR_VERSES[0]);
  const [selectedSubstrate, setSelectedSubstrate] = useState<ArchitecturalSubstrate>(ARCHITECTURAL_SUBSTRATES[0]);
  
  // Custom Wall Dimensions
  const [wallWidthMeters, setWallWidthMeters] = useState<number>(3.8);
  const [wallHeightMeters, setWallHeightMeters] = useState<number>(2.6);
  
  // Custom Finish Options
  const [finishOption, setFinishOption] = useState<'standard' | 'gold_leaf_accents' | 'uv_varnish'>('gold_leaf_accents');
  const [activeTab, setActiveTab] = useState<'studio' | 'specs' | 'b2b_projects'>('studio');

  // Calculations
  const sqm = Math.round((wallWidthMeters * wallHeightMeters) * 100) / 100;
  const basePrice = Math.round(sqm * selectedSubstrate.pricePerSqmUSD);
  const finishExtra = finishOption === 'gold_leaf_accents' ? Math.round(basePrice * 0.2) : finishOption === 'uv_varnish' ? Math.round(basePrice * 0.1) : 0;
  const totalPrice = basePrice + finishExtra;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-art-charcoal via-stone-900 to-art-charcoal text-white p-6 sm:p-8 rounded-3xl border border-art-gold/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-art-gold/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-art-gold font-mono text-[10px] font-bold uppercase tracking-widest">
              <Building2 className="h-4 w-4" /> Architectural Surfaces & Interior Collections
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Transform Architecture into Sacred Living Spaces
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              Beyond canvases: Order bespoke panoramic wallpaper murals, 6mm acrylic glass panels, brushed aluminum, hardwood carved mihrabs, and acoustic textiles sized to your exact wall dimensions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
              <span className="block text-[9px] font-mono text-art-gold uppercase tracking-widest">Global POD Nodes</span>
              <span className="text-sm font-bold text-white font-mono">40+ Countries</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
              <span className="block text-[9px] font-mono text-art-gold uppercase tracking-widest">Resolution SLA</span>
              <span className="text-sm font-bold text-white font-mono">300 DPI Vector</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Controls & Substrate Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Substrate Selector */}
          <div className="bg-white p-5 rounded-3xl border border-art-sand shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-art-charcoal flex items-center gap-2">
                <Layers className="h-4 w-4 text-art-gold" />
                Select Architectural Substrate
              </h3>
              <span className="text-[10px] font-mono font-bold text-art-gold bg-art-gold/10 px-2 py-0.5 rounded-full">
                7 Substrates
              </span>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
              {ARCHITECTURAL_SUBSTRATES.map((sub) => {
                const isSelected = sub.id === selectedSubstrate.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubstrate(sub)}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all border cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-art-charcoal text-white border-art-gold shadow-md'
                        : 'bg-art-warm/50 hover:bg-art-sand/60 text-art-charcoal border-art-sand'
                    }`}
                  >
                    <span className="text-2xl shrink-0 leading-none">{sub.icon}</span>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold font-serif truncate ${isSelected ? 'text-white' : 'text-art-charcoal'}`}>
                          {sub.name}
                        </span>
                        <span className={`text-[10px] font-mono font-bold shrink-0 ${isSelected ? 'text-art-gold' : 'text-art-gold font-bold'}`}>
                          ${sub.pricePerSqmUSD}/m²
                        </span>
                      </div>
                      <p className={`text-[10px] line-clamp-2 ${isSelected ? 'text-stone-300' : 'text-art-charcoal/70'}`}>
                        {sub.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wall Dimension Calculator */}
          <div className="bg-white p-5 rounded-3xl border border-art-sand shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-art-charcoal flex items-center gap-2">
                <Ruler className="h-4 w-4 text-art-gold" />
                Custom Wall Dimensions
              </h3>
              <span className="text-[10px] font-mono font-bold text-art-charcoal/60">
                {unit === 'in' ? 'Feet & Inches' : 'Meters & Cm'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-art-charcoal/60 uppercase">
                  Wall Width ({unit === 'in' ? 'ft' : 'm'})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="15"
                  value={wallWidthMeters}
                  onChange={(e) => setWallWidthMeters(parseFloat(e.target.value) || 1)}
                  className="w-full bg-art-warm border border-art-sand px-3 py-2 rounded-xl text-xs font-bold text-art-charcoal focus:outline-none focus:border-art-gold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-art-charcoal/60 uppercase">
                  Wall Height ({unit === 'in' ? 'ft' : 'm'})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="6"
                  value={wallHeightMeters}
                  onChange={(e) => setWallHeightMeters(parseFloat(e.target.value) || 1)}
                  className="w-full bg-art-warm border border-art-sand px-3 py-2 rounded-xl text-xs font-bold text-art-charcoal focus:outline-none focus:border-art-gold"
                />
              </div>
            </div>

            {/* Sqm Summary Badge */}
            <div className="p-3 bg-art-warm/80 rounded-2xl border border-art-sand flex justify-between items-center text-xs font-sans">
              <div className="space-y-0.5">
                <span className="block text-[10px] font-mono text-art-charcoal/50 uppercase">Total Wall Coverage</span>
                <span className="font-bold text-art-charcoal font-mono">{sqm} m² ({Math.round(sqm * 10.764)} sq ft)</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-mono text-art-charcoal/50 uppercase">Substrate Rate</span>
                <span className="font-bold text-art-gold font-mono">${selectedSubstrate.pricePerSqmUSD} / m²</span>
              </div>
            </div>

            {/* Custom Craftsman Finishing Options */}
            <div className="space-y-2 pt-2 border-t border-art-sand/60">
              <label className="text-[10px] font-mono font-bold text-art-charcoal/60 uppercase block">
                Artisan Hand-Finishing
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'standard', name: 'Standard Satin', extra: 'Included' },
                  { id: 'gold_leaf_accents', name: '24K Gold Leaf (+20%)', extra: 'Hand-Gilded' },
                  { id: 'uv_varnish', name: 'UV Protective (+10%)', extra: 'Extra Gloss' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFinishOption(opt.id as any)}
                    className={`p-2 rounded-xl text-center text-[10px] font-bold border transition-all cursor-pointer ${
                      finishOption === opt.id
                        ? 'bg-art-gold text-art-charcoal border-art-gold shadow-xs'
                        : 'bg-art-warm text-art-charcoal/70 border-art-sand hover:bg-art-sand/50'
                    }`}
                  >
                    <span className="block font-serif truncate">{opt.name}</span>
                    <span className="text-[8px] font-mono opacity-80">{opt.extra}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Select Quran Verse Artwork */}
          <div className="bg-white p-5 rounded-3xl border border-art-sand shadow-sm space-y-3">
            <h3 className="text-sm font-serif font-bold text-art-charcoal flex items-center gap-2">
              <Compass className="h-4 w-4 text-art-gold" />
              Select Calligraphic Masterpiece
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {POPULAR_VERSES.map((v) => {
                const isSelected = v.id === selectedVerse.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVerse(v)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs transition-all border cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-art-charcoal text-white border-art-gold'
                        : 'bg-art-warm/40 hover:bg-art-sand/50 text-art-charcoal border-art-sand'
                    }`}
                  >
                    <div>
                      <span className="font-serif font-bold block">{v.surahNameEnglish} ({v.surah}:{v.ayah})</span>
                      <span className="text-[10px] text-art-gold font-mono">{v.recommendedLayout}</span>
                    </div>
                    <span className="font-serif text-sm font-bold text-right" dir="rtl">{v.surahNameArabic}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Architectural Preview & AI Designer Recommendations (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Preview Stage */}
          <div className="bg-art-charcoal p-6 sm:p-8 rounded-3xl border border-art-gold/30 text-white space-y-6 relative overflow-hidden shadow-2xl">
            {/* Visual Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedSubstrate.icon}</span>
                <div>
                  <h3 className="text-base font-serif font-bold text-white">{selectedSubstrate.name}</h3>
                  <p className="text-[10px] font-mono text-art-gold">{wallWidthMeters}m × {wallHeightMeters}m ({sqm} m²) Architectural Wall Scale</p>
                </div>
              </div>
              <span className="bg-art-gold/20 text-art-gold border border-art-gold/40 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">
                300 DPI Vector Output
              </span>
            </div>

            {/* Live Interactive Wall Surface Render */}
            <div className="relative aspect-16/10 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-black p-6 flex flex-col items-center justify-center border border-white/10 overflow-hidden shadow-inner group">
              
              {/* Substrate Texture Overlay Effect */}
              {selectedSubstrate.id === 'panoramic_wallpaper' && (
                <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>
              )}
              {selectedSubstrate.id === 'acrylic_glass_6mm' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 pointer-events-none"></div>
              )}
              {selectedSubstrate.id === 'brushed_aluminum_dibond' && (
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:4px_100%] opacity-30"></div>
              )}
              {selectedSubstrate.id === 'natural_walnut_wood' && (
                <div className="absolute inset-0 bg-[#3f2314]/80 bg-blend-overlay"></div>
              )}

              {/* Calligraphy Artwork Canvas Overlay */}
              <div className="relative z-10 text-center max-w-xl space-y-4 p-6 bg-black/40 backdrop-blur-xs rounded-2xl border border-art-gold/30 shadow-2xl">
                <p className="text-2xl sm:text-3xl font-serif text-art-gold leading-relaxed" dir="rtl">
                  {selectedVerse.arabicText}
                </p>
                <p className="text-xs text-stone-300 font-sans italic max-w-md mx-auto">
                  "{selectedVerse.englishTranslation}"
                </p>
                <div className="flex items-center justify-center gap-2 pt-2 text-[10px] font-mono text-art-gold uppercase">
                  <span>Surah {selectedVerse.surahNameEnglish}</span>
                  <span>•</span>
                  <span>Ayah {selectedVerse.ayah}</span>
                </div>
              </div>

              {/* Scale Indicator Lines */}
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[9px] font-mono text-stone-400 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                <span>← {wallWidthMeters} Meters ({Math.round(wallWidthMeters * 3.28084)} ft) →</span>
                <span className="text-art-gold font-bold">Scale: 1:1 Architectural Wall</span>
                <span>Height: {wallHeightMeters}m</span>
              </div>
            </div>

            {/* AI Luxury Interior Designer Recommendation Box */}
            <div className="bg-white/5 border border-art-gold/30 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-art-gold font-mono text-[10px] font-bold uppercase tracking-widest">
                <Lightbulb className="h-3.5 w-3.5 text-art-gold animate-pulse" />
                AI Luxury Interior Designer Insight
              </div>
              <p className="text-xs text-stone-200 font-sans leading-relaxed">
                "{selectedSubstrate.aiAdvice}"
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedSubstrate.recommendedSpaces.map((space, i) => (
                  <span key={i} className="text-[9px] font-mono bg-white/10 text-stone-300 px-2 py-0.5 rounded-full border border-white/10">
                    📍 {space}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing Summary & Print-on-Demand Checkout */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest">Total Custom Production Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif font-bold text-art-gold">{formatPrice(totalPrice)}</span>
                  <span className="text-[10px] font-mono text-stone-300">({sqm} m² @ ${selectedSubstrate.pricePerSqmUSD}/m²)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => alert(`Added ${selectedSubstrate.name} (${wallWidthMeters}m x ${wallHeightMeters}m) to Cart!`)}
                  className="w-full sm:w-auto bg-art-gold hover:bg-amber-400 text-art-charcoal font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <DollarSign className="h-4 w-4" /> Order Custom Architectural Surface
                </button>
              </div>
            </div>

          </div>

          {/* Substrate Technical Specs & Quality Features */}
          <div className="bg-white p-6 rounded-3xl border border-art-sand shadow-sm space-y-4">
            <h4 className="text-xs font-mono font-bold text-art-gold uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-art-gold" />
              Technical & Safety Compliance Specifications
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-art-warm/60 rounded-xl border border-art-sand">
                <span className="block text-[9px] font-mono text-art-charcoal/50 uppercase">Max Seamless Scale</span>
                <span className="font-bold font-mono text-art-charcoal">{selectedSubstrate.maxDimensionMeters}</span>
              </div>
              <div className="p-3 bg-art-warm/60 rounded-xl border border-art-sand">
                <span className="block text-[9px] font-mono text-art-charcoal/50 uppercase">POD SLA Lead Time</span>
                <span className="font-bold font-mono text-art-charcoal">{selectedSubstrate.leadTimeDays} Business Days</span>
              </div>
              <div className="p-3 bg-art-warm/60 rounded-xl border border-art-sand">
                <span className="block text-[9px] font-mono text-art-charcoal/50 uppercase">Durability Rating</span>
                <span className="font-bold font-mono text-art-charcoal">{selectedSubstrate.durabilityYears} Year Color Fast</span>
              </div>
              <div className="p-3 bg-art-warm/60 rounded-xl border border-art-sand">
                <span className="block text-[9px] font-mono text-art-charcoal/50 uppercase">Fire Safety</span>
                <span className="font-bold font-mono text-emerald-700">M1 Flame Retardant</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-art-sand/60">
              {selectedSubstrate.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-art-charcoal/80 font-sans">
                  <CheckCircle2 className="h-3.5 w-3.5 text-art-gold shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
