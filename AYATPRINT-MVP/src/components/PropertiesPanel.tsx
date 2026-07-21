import React from 'react';
import { 
  SlidersHorizontal, Tag, Printer, Frame, 
  Layers, Settings, ChevronRight, ChevronLeft,
  AlertCircle, Download, ExternalLink, CheckCircle2
} from 'lucide-react';

interface PropertiesPanelProps {
  language: 'en' | 'ar' | 'fr';
  t: any;
  
  // Layout Shapes & Material
  layoutShape: 'portrait' | 'landscape' | 'square' | 'circle' | 'arch' | 'vertical';
  setLayoutShape: (shape: 'portrait' | 'landscape' | 'square' | 'circle' | 'arch' | 'vertical') => void;
  printSize: 'A4' | 'A3' | 'A2' | '50x70' | '60x90';
  setPrintSize: (size: 'A4' | 'A3' | 'A2' | '50x70' | '60x90') => void;
  printMaterial: 'canvas' | 'poster' | 'metal';
  setPrintMaterial: (mat: 'canvas' | 'poster' | 'metal') => void;

  // Framing & Style override
  frameType: 'none' | 'black' | 'white' | 'oak' | 'walnut' | 'gold-luxury' | 'silver' | 'floating';
  setFrameType: (type: 'none' | 'black' | 'white' | 'oak' | 'walnut' | 'gold-luxury' | 'silver' | 'floating') => void;
  decorativeFrame: string;
  setDecorativeFrame: (f: string) => void;
  activeTexture: string;
  setActiveTexture: (tex: string) => void;

  // Custom Border parameters
  borderThickness: number;
  setBorderThickness: (val: number) => void;
  innerPadding: number;
  setInnerPadding: (val: number) => void;
  cornerStyle: 'sharp' | 'rounded' | 'scalloped' | 'bracket';
  setCornerStyle: (style: 'sharp' | 'rounded' | 'scalloped' | 'bracket') => void;
  canvasOpacity: number;
  setCanvasOpacity: (o: number) => void;

  // Marketplace Etsy & Shopify Sync Panel
  etsyTitle: string;
  setEtsyTitle: (val: string) => void;
  etsyTags: string[];
  publishingStatus: 'idle' | 'publishing' | 'published';
  handlePublishing: () => void;

  // Collapsible Right Panel State
  isRightPanelCollapsed: boolean;
  setIsRightPanelCollapsed: (collapsed: boolean) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  language,
  t,
  layoutShape,
  setLayoutShape,
  printSize,
  setPrintSize,
  printMaterial,
  setPrintMaterial,
  frameType,
  setFrameType,
  decorativeFrame,
  setDecorativeFrame,
  activeTexture,
  setActiveTexture,
  borderThickness,
  setBorderThickness,
  innerPadding,
  setInnerPadding,
  cornerStyle,
  setCornerStyle,
  canvasOpacity,
  setCanvasOpacity,
  etsyTitle,
  setEtsyTitle,
  etsyTags,
  publishingStatus,
  handlePublishing,
  isRightPanelCollapsed,
  setIsRightPanelCollapsed
}) => {
  return (
    <div 
      className={`h-full bg-white border-l border-stone-200 flex flex-col transition-all duration-300 relative ${
        isRightPanelCollapsed ? 'w-0 overflow-hidden border-l-0' : 'w-[290px]'
      }`}
    >
      {/* Toggle Button for collapsing on left side of panel */}
      <button
        onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
        className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-12 bg-white border border-stone-200 text-stone-500 rounded-l-lg shadow-md flex items-center justify-center hover:bg-stone-50 hover:text-stone-800 transition-all z-50 cursor-pointer"
      >
        {isRightPanelCollapsed ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
      </button>

      <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
        
        {/* SECTION 1: Product Layout & Aspect Shape */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest flex items-center gap-1.5 border-b border-stone-100 pb-2">
            <Frame className="h-4 w-4 text-amber-600" /> Sizing & Silhouette
          </h3>

          <div>
            <label className="text-[9.5px] text-stone-400 block mb-1 font-bold uppercase tracking-wider">Canvas Silhouette</label>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {[
                { id: 'portrait', label: 'Classic Portrait' },
                { id: 'landscape', label: 'Panoramic Width' },
                { id: 'square', label: 'Perfect Square' },
                { id: 'vertical', label: 'Tall Banner' }
              ].map((shp) => (
                <button
                  key={shp.id}
                  onClick={() => setLayoutShape(shp.id as any)}
                  className={`py-1.5 px-2 rounded-lg text-left text-[10px] font-bold border transition-all truncate ${
                    layoutShape === shp.id
                      ? 'border-amber-500 bg-amber-500/5 text-stone-900'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600'
                  }`}
                >
                  {shp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: Framing finishes */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest flex items-center gap-1.5 border-b border-stone-100 pb-2">
            <SlidersHorizontal className="h-4 w-4 text-amber-600" /> Framing & Texture
          </h3>

          {/* Solid Wood Frame Types */}
          <div>
            <label className="text-[9.5px] text-stone-400 block mb-1 font-bold uppercase tracking-wider">Wood Outer Frame</label>
            <select
              value={frameType}
              onChange={(e) => setFrameType(e.target.value as any)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg py-1.5 px-2 text-xs text-stone-800 focus:outline-none"
            >
              <option value="none">None (Wrapped Canvas Style)</option>
              <option value="black">Sleek Obsidian Black Wood</option>
              <option value="white">Nordic Snowy White Wood</option>
              <option value="oak">Tuscan Honey Oak Wood</option>
              <option value="walnut">Antique Royal Walnut Wood</option>
              <option value="gold-luxury">Florentine Double Gold Gilt</option>
              <option value="silver">Brushed Sterling Silver</option>
              <option value="floating">Contemporary Floating Matte Frame</option>
            </select>
          </div>

          {/* Luxury background textures */}
          <div>
            <label className="text-[9.5px] text-stone-400 block mb-1 font-bold uppercase tracking-wider">Canvas Base Material Texture</label>
            <select
              value={activeTexture}
              onChange={(e) => setActiveTexture(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg py-1.5 px-2 text-xs text-stone-800 focus:outline-none"
            >
              <option value="none">Super Fine Smooth Canvas</option>
              <option value="marble">Royal Calacatta Marble Backdrop</option>
              <option value="emerald-silk">Sacred Damascus Emerald Silk</option>
              <option value="textured-paper">Handmade Cotton Rag Paper</option>
              <option value="wood">Antique Olive Wood Veins</option>
              <option value="parchment">Medieval Quranic Vellum Parchment</option>
            </select>
          </div>
        </div>

        {/* SECTION 3: Fine Adjustment Parameters */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest flex items-center gap-1.5 border-b border-stone-100 pb-2">
            <Printer className="h-4 w-4 text-amber-600" /> Print Parameters
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[9.5px] text-stone-400 block mb-1 font-bold uppercase tracking-wider">Print Size</label>
              <select
                value={printSize}
                onChange={(e) => setPrintSize(e.target.value as any)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg py-1 px-2 text-xs text-stone-800 focus:outline-none"
              >
                <option value="A4">A4 Standard</option>
                <option value="A3">A3 Gallery</option>
                <option value="A2">A2 Oversized</option>
                <option value="50x70">50x70 cm Large</option>
                <option value="60x90">60x90 cm Premium</option>
              </select>
            </div>
            <div>
              <label className="text-[9.5px] text-stone-400 block mb-1 font-bold uppercase tracking-wider">Base Material</label>
              <select
                value={printMaterial}
                onChange={(e) => setPrintMaterial(e.target.value as any)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg py-1 px-2 text-xs text-stone-800 focus:outline-none"
              >
                <option value="canvas">Stretched Canvas</option>
                <option value="poster">Fine Art Silk Poster</option>
                <option value="metal">Brushed Dibond Metal</option>
              </select>
            </div>
          </div>

          <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-[10px] text-stone-500 flex gap-2 items-start leading-normal">
            <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
            <p>CMYK high density color values configured. Printing occurs inside verified European fulfillment networks immediately.</p>
          </div>
        </div>

        {/* SECTION 4: E-Commerce Sync Panel */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest flex items-center gap-1.5 border-b border-stone-100 pb-2">
            <Tag className="h-4 w-4 text-amber-600" /> Marketplace Sync
          </h3>

          <div className="space-y-2.5">
            <div>
              <label className="text-[9.5px] text-stone-400 block mb-1 font-bold uppercase tracking-wider">SEO Listing Title</label>
              <textarea
                value={etsyTitle}
                onChange={(e) => setEtsyTitle(e.target.value)}
                rows={2}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-[11px] text-stone-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[9.5px] text-stone-400 block mb-1 font-bold uppercase tracking-wider">Listing Tags</label>
              <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto bg-stone-50 p-1.5 rounded-lg border border-stone-200">
                {etsyTags.map((tag, i) => (
                  <span key={i} className="bg-white text-stone-700 text-[8px] px-1.5 py-0.5 rounded font-mono border border-stone-100 uppercase font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handlePublishing}
              disabled={publishingStatus !== 'idle'}
              className={`w-full font-bold uppercase tracking-wider py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all ${
                publishingStatus === 'idle'
                  ? 'bg-amber-500 text-stone-950 hover:bg-amber-600 shadow-sm'
                  : 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
              }`}
            >
              <ExternalLink className="h-3 w-3" />
              <span>{publishingStatus === 'idle' ? 'Publish Draft' : 'Syncing API...'}</span>
            </button>

            {publishingStatus === 'published' && (
              <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-[9px] font-mono text-emerald-700 leading-normal">
                ✔ Etsy listing drafted with staging rooms
                <br />
                ✔ Variant SKUs pushed successfully.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
