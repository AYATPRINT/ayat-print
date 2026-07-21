import React, { useState, useEffect } from 'react';
import { 
  Cpu, Layers, FileCheck, Truck, CheckCircle2, Download, Zap, ShieldCheck, 
  Settings, ArrowRight, RefreshCw, Box, ExternalLink, Filter, Play, Check, AlertCircle, ShoppingBag
} from 'lucide-react';

interface PrintPackageData {
  printJobId: string;
  orderId: string;
  createdAt: string;
  customerName: string;
  shippingAddress: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  masterArtwork: {
    id: string;
    version: string;
    title: string;
    scriptureSurah: string;
    arabicText: string;
    englishTranslation: string;
    tanzilHashSeal: string;
    scriptureVerified: boolean;
  };
  printFiles: {
    pdfX4Url: string;
    pngMaster300DpiUrl: string;
    svgVectorPathsUrl: string;
    cmykProfile: string;
    nativeResolution: string;
    bleedMarginMM: number;
    safeZoneMarginMM: number;
    totalDimensionsInches: string;
  };
  specifications: {
    substrate: string;
    substrateLabel: string;
    frameStyle: string;
    finish: string;
    backing: string;
    hsCustomsCode: string;
  };
  fulfillmentRouting: {
    recommendedProvider: string;
    providerId: string;
    routingPhase: string;
    status: string;
    trackingNumber?: string;
  };
}

interface GeneratedSku {
  sku: string;
  title: string;
  substrate: string;
  dimensions: string;
  retailPriceUSD: number;
  estimatedPodCostUSD: number;
  profitMarginPercent: number;
  printJobReady: boolean;
}

export default function AyatPrintOS() {
  const [activeEngine, setActiveEngine] = useState<'artwork' | 'production' | 'commerce' | 'fulfillment'>('production');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ORD-2026-9041');
  const [packageData, setPackageData] = useState<PrintPackageData | null>(null);
  const [loadingPackage, setLoadingPackage] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Master Artwork Generator state
  const [masterArtworkTitle, setMasterArtworkTitle] = useState<string>('Surah Al-Rahman Gold Masterpiece');
  const [generatedSkus, setGeneratedSkus] = useState<GeneratedSku[]>([]);
  const [isGeneratingMatrix, setIsGeneratingMatrix] = useState<boolean>(false);

  // Fulfillment Engine phase
  const [currentPhase, setCurrentPhase] = useState<'phase1' | 'phase2' | 'phase3'>('phase1');

  // Load Production Package
  const fetchPackage = async (orderId: string) => {
    setLoadingPackage(true);
    try {
      const res = await fetch(`/api/production-package/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setPackageData(data);
      }
    } catch (e) {
      console.error("Failed to load production package:", e);
    } finally {
      setLoadingPackage(false);
    }
  };

  useEffect(() => {
    fetchPackage(selectedOrderId);
  }, [selectedOrderId]);

  // Handle Approve Print Package
  const handleApprovePackage = async (provider: 'gelato' | 'printful') => {
    setIsApproving(true);
    try {
      const res = await fetch(`/api/production-package/${selectedOrderId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetProvider: provider,
          dispatchMode: currentPhase === 'phase1' ? 'phase1_manual' : 'phase2_api'
        })
      });

      if (res.ok) {
        const result = await res.json();
        setNotification(`Print Package ${result.orderId} approved and dispatched to ${provider.toUpperCase()}! Tracking: ${result.trackingNumber}`);
        fetchPackage(selectedOrderId);
      }
    } catch (e) {
      setNotification("Failed to dispatch print job.");
    } finally {
      setIsApproving(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  // Generate 40 Variants from 1 Master Artwork
  const handleGenerateVariantMatrix = async () => {
    setIsGeneratingMatrix(true);
    try {
      const res = await fetch('/api/artworks/generate-variants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ masterArtworkTitle })
      });
      if (res.ok) {
        const data = await res.json();
        setGeneratedSkus(data.variants || []);
        setNotification(`Generated ${data.totalVariantsGenerated} physical product SKUs from "${masterArtworkTitle}"!`);
      }
    } catch (e) {
      setNotification("Failed to generate variant matrix.");
    } finally {
      setIsGeneratingMatrix(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="bg-white border border-art-sand rounded-2xl shadow-xl overflow-hidden text-art-charcoal space-y-0">
      {/* OS Header Banner */}
      <div className="bg-art-charcoal text-white p-6 md:p-8 border-b border-art-gold/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Cpu className="h-64 w-64 text-art-gold" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-art-gold/20 text-art-gold font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-art-gold/40 uppercase tracking-widest flex items-center gap-1.5">
                <Cpu className="h-3 w-3" /> AyatPrint OS v3.4 Kernel
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/40 uppercase">
                POD Production Broker Operating System
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-stone-400">Broker Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE (128 POD Nodes)
              </span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
            AyatPrint OS — Intelligent Print-on-Demand Production Broker
          </h1>
          <p className="text-xs md:text-sm text-stone-300 max-w-3xl leading-relaxed">
            AyatPrint is an intelligent production broker engine. Every customer order produces a complete, technical 
            <strong className="text-art-gold"> Production Package (`PJ-2026-XXXXXX`)</strong> containing vector PDF/X-4 print files, 
            Tanzil cryptographic seals, and substrate framing specs for automated global POD routing.
          </p>
        </div>

        {/* 4 Core Engine Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-6 mt-4 border-t border-white/10 font-mono text-xs">
          <button
            onClick={() => setActiveEngine('artwork')}
            className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeEngine === 'artwork'
                ? 'bg-art-gold text-art-charcoal border-art-gold font-bold shadow-lg scale-[1.02]'
                : 'bg-white/5 hover:bg-white/10 text-stone-300 border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <div>
                <p className="text-[11px]">1. Artwork Engine</p>
                <p className="text-[9px] opacity-75 font-normal">1 Artwork → 50 SKUs</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveEngine('production')}
            className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeEngine === 'production'
                ? 'bg-art-gold text-art-charcoal border-art-gold font-bold shadow-lg scale-[1.02]'
                : 'bg-white/5 hover:bg-white/10 text-stone-300 border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              <div>
                <p className="text-[11px]">2. Production Engine</p>
                <p className="text-[9px] opacity-75 font-normal">Print Job PJ-2026</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveEngine('commerce')}
            className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeEngine === 'commerce'
                ? 'bg-art-gold text-art-charcoal border-art-gold font-bold shadow-lg scale-[1.02]'
                : 'bg-white/5 hover:bg-white/10 text-stone-300 border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <div>
                <p className="text-[11px]">3. Commerce / OMS</p>
                <p className="text-[9px] opacity-75 font-normal">Orders & Checkout</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveEngine('fulfillment')}
            className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              activeEngine === 'fulfillment'
                ? 'bg-art-gold text-art-charcoal border-art-gold font-bold shadow-lg scale-[1.02]'
                : 'bg-white/5 hover:bg-white/10 text-stone-300 border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <div>
                <p className="text-[11px]">4. Fulfillment Engine</p>
                <p className="text-[9px] opacity-75 font-normal">Smart POD Router</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-art-gold text-art-charcoal p-3 px-6 text-xs font-mono font-bold flex items-center justify-between animate-in fade-in">
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4 fill-art-charcoal" /> {notification}
          </span>
          <button onClick={() => setNotification(null)} className="cursor-pointer underline">Dismiss</button>
        </div>
      )}

      {/* Main OS Display Area */}
      <div className="p-6 md:p-8 bg-art-cream">
        
        {/* ENGINE 2: PRODUCTION ENGINE (PRINT JOB INSPECTOR) */}
        {activeEngine === 'production' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-art-sand shadow-xs">
              <div>
                <span className="text-[10px] font-mono text-art-gold font-bold uppercase tracking-widest block">
                  Production Engine Kernel
                </span>
                <h3 className="text-lg font-serif font-bold text-art-charcoal">
                  Print Package (`PJ-2026-XXXXXX`) Master Technical Dossier
                </h3>
                <p className="text-xs text-art-charcoal/70">
                  Select an order from the OMS queue to inspect its generated print package specifications.
                </p>
              </div>

              {/* Order Selection Selector */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-art-charcoal/60">Inspect Order:</span>
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="bg-art-warm border border-art-sand rounded-lg px-3 py-2 font-bold text-art-charcoal cursor-pointer"
                >
                  <option value="ORD-2026-9041">ORD-2026-9041 (Tariq Al-Mansoor — Dubai)</option>
                  <option value="AP-2026-000145">AP-2026-000145 (Paris Maison Haussmann)</option>
                  <option value="AP-2026-000210">AP-2026-000210 (London Penthouse Suite)</option>
                </select>
              </div>
            </div>

            {loadingPackage ? (
              <div className="p-12 text-center font-mono text-xs text-art-charcoal/60 flex items-center justify-center gap-2">
                <RefreshCw className="h-5 w-5 animate-spin text-art-gold" /> Generating Production Package Dossier...
              </div>
            ) : packageData && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Column 1: Print Job Technical Spec */}
                <div className="bg-white p-6 rounded-2xl border border-art-sand shadow-xs space-y-4">
                  <div className="border-b border-art-sand pb-3 flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono text-art-gold font-bold uppercase tracking-widest block">Technical Dossier</span>
                      <h4 className="text-base font-serif font-bold text-art-charcoal">{packageData.printJobId}</h4>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                      {packageData.fulfillmentRouting.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-art-charcoal/60 uppercase block">Master Artwork Title</span>
                      <p className="font-serif font-bold text-art-charcoal">{packageData.masterArtwork.title}</p>
                      <p className="text-[11px] text-art-gold font-mono">{packageData.masterArtwork.scriptureSurah}</p>
                    </div>

                    <div className="p-3 bg-art-warm rounded-xl border border-art-sand space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-art-gold uppercase">Tanzil Verified Arabic</span>
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <p className="font-serif text-sm font-bold dir-rtl text-art-charcoal">{packageData.masterArtwork.arabicText}</p>
                      <p className="text-[10px] font-mono text-stone-500 truncate">SHA256: {packageData.masterArtwork.tanzilHashSeal}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-art-sand">
                      <div>
                        <span className="text-[9px] text-art-charcoal/60 uppercase block">Substrate</span>
                        <span className="font-bold text-art-charcoal block">{packageData.specifications.substrate}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-art-charcoal/60 uppercase block">Dimensions</span>
                        <span className="font-bold text-art-charcoal block">{packageData.printFiles.totalDimensionsInches}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-art-charcoal/60 uppercase block">Bleed Margin</span>
                        <span className="font-bold text-emerald-700 block">{packageData.printFiles.bleedMarginMM} mm</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-art-charcoal/60 uppercase block">Safe Zone</span>
                        <span className="font-bold text-emerald-700 block">{packageData.printFiles.safeZoneMarginMM} mm</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Vector & Print Files Specification */}
                <div className="bg-white p-6 rounded-2xl border border-art-sand shadow-xs space-y-4">
                  <div className="border-b border-art-sand pb-3">
                    <span className="text-[9px] font-mono text-art-gold font-bold uppercase tracking-widest block">Print Files Bundle</span>
                    <h4 className="text-base font-serif font-bold text-art-charcoal">High-DPI Production Assets</h4>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-stone-900 text-white rounded-xl space-y-2 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-art-gold font-bold">
                        <span>PDF/X-4 (ISO 15930-7)</span>
                        <span className="bg-art-gold/20 text-art-gold text-[9px] px-1.5 py-0.5 rounded border border-art-gold/40">READY</span>
                      </div>
                      <p className="text-[10px] text-stone-300">{packageData.printFiles.cmykProfile}</p>
                      <p className="text-[10px] text-stone-400">{packageData.printFiles.nativeResolution}</p>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => setNotification(`Downloaded PDF/X-4 Vector Print Package for ${packageData.printJobId}`)}
                        className="w-full bg-art-charcoal hover:bg-art-charcoal/90 text-white font-mono text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Download className="h-4 w-4 text-art-gold" /> PDF/X-4 Print File (300 DPI)
                        </span>
                        <span className="text-[10px] text-art-gold">48.2 MB</span>
                      </button>

                      <button
                        onClick={() => setNotification(`Downloaded PNG Master 6000x9000px File for ${packageData.printJobId}`)}
                        className="w-full bg-art-warm hover:bg-art-sand text-art-charcoal font-mono text-xs font-bold py-2.5 px-4 rounded-xl border border-art-sand flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Download className="h-4 w-4 text-art-gold" /> Master PNG (6000x9000)
                        </span>
                        <span className="text-[10px] text-art-charcoal/60">18.5 MB</span>
                      </button>

                      <button
                        onClick={() => setNotification(`Downloaded SVG Vector Outlines for ${packageData.printJobId}`)}
                        className="w-full bg-art-warm hover:bg-art-sand text-art-charcoal font-mono text-xs font-bold py-2.5 px-4 rounded-xl border border-art-sand flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Download className="h-4 w-4 text-art-gold" /> SVG Vector Calligraphy
                        </span>
                        <span className="text-[10px] text-art-charcoal/60">2.1 MB</span>
                      </button>
                    </div>

                    <div className="pt-2 text-[10px] font-mono text-stone-500 border-t border-art-sand">
                      <span>HS Customs Code: {packageData.specifications.hsCustomsCode}</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: POD Provider Routing & Dispatch Actions */}
                <div className="bg-white p-6 rounded-2xl border border-art-sand shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="border-b border-art-sand pb-3">
                      <span className="text-[9px] font-mono text-art-gold font-bold uppercase tracking-widest block">Fulfillment Dispatch</span>
                      <h4 className="text-base font-serif font-bold text-art-charcoal">POD Network Routing</h4>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 font-mono">
                        <span className="text-[9px] text-emerald-800 font-bold uppercase block">Recommended POD Node</span>
                        <p className="font-bold text-emerald-900 text-sm">{packageData.fulfillmentRouting.recommendedProvider}</p>
                        <p className="text-[10px] text-emerald-700">Estimated SLA: 48h Production • Express Carrier</p>
                      </div>

                      <div className="p-3 bg-art-warm border border-art-sand rounded-xl space-y-1 font-mono text-[11px]">
                        <span className="text-[9px] text-art-charcoal/60 uppercase block">Customer Delivery Destination</span>
                        <p className="font-bold text-art-charcoal">{packageData.customerName}</p>
                        <p className="text-art-charcoal/80">{packageData.shippingAddress.street}, {packageData.shippingAddress.city}, {packageData.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>

                  {/* 3-Phase Dispatch Buttons */}
                  <div className="space-y-2 pt-4 border-t border-art-sand">
                    <span className="text-[9px] font-mono text-art-gold font-bold uppercase tracking-widest block">
                      Phase 1 / Phase 2 Dispatch Control
                    </span>

                    <button
                      disabled={isApproving}
                      onClick={() => handleApprovePackage('gelato')}
                      className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-mono text-xs font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      Approve & Dispatch to Gelato API
                    </button>

                    <button
                      disabled={isApproving}
                      onClick={() => handleApprovePackage('printful')}
                      className="w-full bg-art-charcoal hover:bg-art-charcoal/90 text-white font-mono text-xs font-bold py-2.5 rounded-xl border border-art-charcoal flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Zap className="h-4 w-4 text-art-gold" />
                      Dispatch to Printful API
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ENGINE 1: ARTWORK ENGINE (1 ARTWORK -> 50 PRODUCTS GENERATOR) */}
        {activeEngine === 'artwork' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-art-sand shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-art-sand pb-4">
                <div>
                  <span className="text-[10px] font-mono text-art-gold font-bold uppercase tracking-widest block">
                    Artwork Engine Matrix Generator
                  </span>
                  <h3 className="text-lg font-serif font-bold text-art-charcoal">
                    1 Master Artwork → Automatic 50 Physical Product SKUs
                  </h3>
                  <p className="text-xs text-art-charcoal/70">
                    Just like dropshipping, AyatPrint stores 1 Master Vector Artwork and automatically generates product variations across Canvas, Acrylic Glass, Brushed Metal, Carved Wood, Wallpapers, and Triptychs.
                  </p>
                </div>

                <button
                  disabled={isGeneratingMatrix}
                  onClick={handleGenerateVariantMatrix}
                  className="bg-art-charcoal hover:bg-art-charcoal/90 text-white font-mono text-xs font-bold py-3 px-6 rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all shrink-0"
                >
                  <Zap className="h-4 w-4 text-art-gold" />
                  {isGeneratingMatrix ? 'Generating Product Matrix...' : 'Generate 40 Product SKUs'}
                </button>
              </div>

              {/* Master Artwork Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="text-[10px] text-art-gold font-bold uppercase block mb-1">Master Artwork Title</label>
                  <input
                    type="text"
                    value={masterArtworkTitle}
                    onChange={(e) => setMasterArtworkTitle(e.target.value)}
                    className="w-full bg-art-warm border border-art-sand rounded-xl p-2.5 font-serif font-bold text-art-charcoal"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5 text-stone-500 text-[11px]">
                  <Box className="h-5 w-5 text-art-gold shrink-0" />
                  <span>Generates Canvas (Stretched/Framed), Acrylic, Metal, Carved Wood, Silk Wallpaper, and Cushions in 4 sizes.</span>
                </div>
              </div>

              {/* Generated Variant Table */}
              {generatedSkus.length > 0 && (
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono font-bold text-art-gold uppercase border-b border-art-sand pb-2">
                    <span>Generated SKU Catalog ({generatedSkus.length} SKUs)</span>
                    <span className="text-emerald-700">Average Profit Margin: 65%</span>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                    {generatedSkus.map((item) => (
                      <div key={item.sku} className="p-3 bg-art-warm rounded-xl border border-art-sand flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                        <div className="space-y-0.5">
                          <span className="bg-art-charcoal text-white text-[9px] px-2 py-0.5 rounded font-bold">{item.sku}</span>
                          <p className="font-serif font-bold text-art-charcoal text-sm">{item.title}</p>
                        </div>

                        <div className="flex items-center gap-4 text-[11px]">
                          <div>
                            <span className="text-stone-400 block text-[9px]">Retail Price</span>
                            <span className="font-bold text-art-charcoal">${item.retailPriceUSD}</span>
                          </div>
                          <div>
                            <span className="text-stone-400 block text-[9px]">POD Cost</span>
                            <span className="font-bold text-stone-600">${item.estimatedPodCostUSD}</span>
                          </div>
                          <div>
                            <span className="text-stone-400 block text-[9px]">Profit</span>
                            <span className="font-bold text-emerald-700">+${item.retailPriceUSD - item.estimatedPodCostUSD}</span>
                          </div>
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-1 rounded border border-emerald-300">
                            PRINT JOB READY
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ENGINE 3: COMMERCE ENGINE & OMS */}
        {activeEngine === 'commerce' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-art-sand shadow-xs space-y-4">
              <div className="border-b border-art-sand pb-3 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-art-gold font-bold uppercase tracking-widest block">
                    Commerce Engine (OMS)
                  </span>
                  <h3 className="text-lg font-serif font-bold text-art-charcoal">Order Management System & Pipeline</h3>
                </div>
                <span className="text-xs font-mono bg-art-charcoal text-white px-3 py-1 rounded-full font-bold">
                  Active Revenue: $2,840.00 USD
                </span>
              </div>

              {/* Simulated Customer Orders List */}
              <div className="space-y-3 font-mono text-xs">
                {[
                  { id: 'ORD-2026-9041', name: 'Tariq Al-Mansoor', city: 'Dubai, AE', total: 191, status: 'framed', item: 'Sovereign Light (Ayat Al-Kursi) — 24x36 Gold Frame' },
                  { id: 'AP-2026-000145', name: 'Maison Haussmann', city: 'Paris, FR', total: 420, status: 'routed', item: 'Surah Al-Rahman Gold Masterpiece — 30x40 Canvas' },
                  { id: 'AP-2026-000210', name: 'Khadija Al-Sabah', city: 'Kuwait City, KW', total: 290, status: 'printing', item: 'Ayat Al-Kursi Brushed Aluminum Metal — 24x36' }
                ].map(ord => (
                  <div key={ord.id} className="p-4 bg-art-warm rounded-xl border border-art-sand flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-art-gold">{ord.id}</span>
                        <span className="text-stone-400">• {ord.name} ({ord.city})</span>
                      </div>
                      <p className="font-serif font-bold text-art-charcoal text-sm">{ord.item}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-art-charcoal text-base">${ord.total} USD</span>
                      <button
                        onClick={() => {
                          setSelectedOrderId(ord.id);
                          setActiveEngine('production');
                        }}
                        className="bg-art-charcoal hover:bg-art-charcoal/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        Inspect Print Job <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 4: FULFILLMENT ENGINE (SMART POD ROUTING ROUTER) */}
        {activeEngine === 'fulfillment' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-art-sand shadow-xs space-y-6">
              <div className="border-b border-art-sand pb-4">
                <span className="text-[10px] font-mono text-art-gold font-bold uppercase tracking-widest block">
                  Fulfillment Engine Roadmap & Router
                </span>
                <h3 className="text-lg font-serif font-bold text-art-charcoal">
                  3-Phase Intelligent POD Provider Broker System
                </h3>
                <p className="text-xs text-art-charcoal/70 mt-1">
                  Evolutionary roadmap of AyatPrint's fulfillment engine from Phase 1 manual review to Phase 3 autonomous AI SLA/Margin routing.
                </p>
              </div>

              {/* 3 Phases Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div
                  onClick={() => setCurrentPhase('phase1')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    currentPhase === 'phase1' ? 'bg-art-charcoal text-white border-art-gold shadow-lg ring-2 ring-art-gold/30' : 'bg-art-warm text-art-charcoal border-art-sand'
                  }`}
                >
                  <span className="text-[10px] text-art-gold font-bold uppercase block">Phase 1 (Active MVP)</span>
                  <h4 className="font-serif font-bold text-base">Manual Review & Package Download</h4>
                  <p className="text-[11px] opacity-80 font-sans leading-relaxed">
                    Order → Admin OMS → Inspect Print Package (`PJ-2026`) → Download PDF/X-4 & Approve → Send manually to Gelato/Printful.
                  </p>
                  <span className="inline-block bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                    LIVE & OPERATIONAL
                  </span>
                </div>

                <div
                  onClick={() => setCurrentPhase('phase2')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    currentPhase === 'phase2' ? 'bg-art-charcoal text-white border-art-gold shadow-lg ring-2 ring-art-gold/30' : 'bg-art-warm text-art-charcoal border-art-sand'
                  }`}
                >
                  <span className="text-[10px] text-art-gold font-bold uppercase block">Phase 2 (1-Click API)</span>
                  <h4 className="font-serif font-bold text-base">Direct Webhook API Dispatch</h4>
                  <p className="text-[11px] opacity-80 font-sans leading-relaxed">
                    Replace "Approve" with "Send to Gelato API" or "Send to Printful API" for automatic tracking sync directly into AyatPrint.
                  </p>
                  <span className="inline-block bg-art-gold/20 text-art-gold text-[9px] font-bold px-2 py-0.5 rounded border border-art-gold/40">
                    READY FOR PRODUCTION
                  </span>
                </div>

                <div
                  onClick={() => setCurrentPhase('phase3')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    currentPhase === 'phase3' ? 'bg-art-charcoal text-white border-art-gold shadow-lg ring-2 ring-art-gold/30' : 'bg-art-warm text-art-charcoal border-art-sand'
                  }`}
                >
                  <span className="text-[10px] text-art-gold font-bold uppercase block">Phase 3 (Autonomous AI)</span>
                  <h4 className="font-serif font-bold text-base">Autonomous SLA & Margin Router</h4>
                  <p className="text-[11px] opacity-80 font-sans leading-relaxed">
                    Zero manual clicks. France destination → Gelato Paris or Printful Riga based on real-time best margin + 48h SLA guarantee.
                  </p>
                  <span className="inline-block bg-indigo-500/20 text-indigo-300 text-[9px] font-bold px-2 py-0.5 rounded border border-indigo-500/40">
                    AI ENGINE ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
