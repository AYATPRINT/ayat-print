import React, { useState } from 'react';
import { 
  BookOpen, Award, Layers, Cpu, TrendingUp, DollarSign, ListCollapse, 
  ExternalLink, Check, Copy, AlertTriangle, ShieldCheck, Zap, Server, Database
} from 'lucide-react';

export default function SpecViewer() {
  const [activeTab, setActiveTab] = useState<'benchmarks' | 'tanzil' | 'fonts' | 'pod' | 'architecture' | 'monetization'>('benchmarks');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const tabs = [
    { id: 'benchmarks', name: 'Product Benchmarks', icon: Award },
    { id: 'tanzil', name: 'Tanzil Engine & Integrity', icon: BookOpen },
    { id: 'fonts', name: 'Arabic Typography & Fonts', icon: Layers },
    { id: 'pod', name: 'POD & Market Automation', icon: Zap },
    { id: 'architecture', name: 'System Architecture', icon: Cpu },
    { id: 'monetization', name: 'Monetization & Plans', icon: DollarSign },
  ] as const;

  return (
    <div className="bg-white border border-art-sand rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row h-[750px]">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-art-warm border-r border-art-sand p-4 flex flex-col gap-1 overflow-y-auto shrink-0">
        <div className="mb-4 px-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-art-gold font-bold">AyatPrint SaaS Specs</span>
          <h3 className="text-sm font-serif font-bold text-art-charcoal mt-1">SaaS Engineering Blueprint</h3>
          <p className="text-xs text-art-charcoal/60 mt-0.5">Benchmarked Specification Deck</p>
        </div>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-left border ${
                isActive 
                  ? 'bg-art-charcoal text-white border-art-charcoal shadow-sm' 
                  : 'text-art-charcoal/70 hover:text-art-charcoal hover:bg-white/55 border-transparent'
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-art-gold' : 'text-art-charcoal/50'}`} />
              {tab.name}
            </button>
          );
        })}
        <div className="mt-auto pt-6 border-t border-art-sand px-2">
          <div className="bg-white/80 p-3 rounded-lg border border-art-sand text-[10px] text-art-charcoal/70">
            <div className="flex items-center gap-1.5 text-art-charcoal font-bold mb-1 font-mono uppercase tracking-widest text-[9px]">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              LICENSED INTEGRITY
            </div>
            Quranic content utilizes the Tanzil Authenticated Text Database under SIL Open Font License protections.
          </div>
        </div>
      </div>

      {/* Main Spec Content Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-art-cream text-art-charcoal scrollbar-thin scrollbar-thumb-art-sand">
        {activeTab === 'benchmarks' && (
          <div className="space-y-6">
            <div className="border-b border-art-sand pb-4">
              <h2 className="text-lg font-serif font-bold text-art-charcoal flex items-center gap-2">
                <Award className="h-5 w-5 text-art-gold" />
                SaaS & Design Platform Benchmarks
              </h2>
              <p className="text-xs text-art-charcoal/60 mt-1">Deep-dive evaluation of 20+ design, marketplace, and print solutions mapping gaps and strategic advantages.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs">
                <h4 className="text-[10px] font-mono text-art-gold font-bold uppercase tracking-widest mb-3">Category: Design & Canvas Editors</h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-serif font-bold text-art-charcoal">Canva / Adobe Express:</span>
                    <p className="text-art-charcoal/80 mt-0.5"><strong className="text-emerald-700">Strengths:</strong> Rich drag-and-drop mechanics, massive commercial font lists, fluid export options.</p>
                    <p className="text-rose-700 mt-0.5"><strong className="text-rose-800">Weaknesses:</strong> Fails entirely with Arabic complex font shaping, rendering broken individual letters, lacked integrated Quran database lookup.</p>
                  </div>
                  <div className="border-t border-art-sand pt-3">
                    <span className="font-serif font-bold text-art-charcoal">Kittl / Creative Fabrica Studio:</span>
                    <p className="text-art-charcoal/80 mt-0.5"><strong className="text-emerald-700">Strengths:</strong> Outstanding text distortion curves, beautiful vector ornaments, and advanced texture masks.</p>
                    <p className="text-rose-700 mt-0.5"><strong className="text-rose-800">Weaknesses:</strong> Lacks RTL (Right-to-Left) diacritical adjustments, causing overlapping Arabic glyphs.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs">
                <h4 className="text-[10px] font-mono text-art-gold font-bold uppercase tracking-widest mb-3">Category: Print-on-Demand & Marketplace</h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-serif font-bold text-art-charcoal">Printful / Printify / Gelato:</span>
                    <p className="text-art-charcoal/80 mt-0.5"><strong className="text-emerald-700">Strengths:</strong> Robust wall-art catalogs, seamless mockups, high-efficiency automatic order routing, global fulfillment networks.</p>
                    <p className="text-rose-700 mt-0.5"><strong className="text-rose-800">Weaknesses:</strong> Absolutely no custom design editor for end-users on client sites. Manual file uploads.</p>
                  </div>
                  <div className="border-t border-art-sand pt-3">
                    <span className="font-serif font-bold text-art-charcoal">Etsy / Pinterest Automation:</span>
                    <p className="text-art-charcoal/80 mt-0.5"><strong className="text-emerald-700">Strengths:</strong> Highest conversion rates for physical wall art, rich pin organic traction, high search volume.</p>
                    <p className="text-rose-700 mt-0.5"><strong className="text-rose-800">Weaknesses:</strong> Manual listing creation is exhausting (up to 10 minutes per mockup, tag collection, price alignment).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-art-gold/10 border border-art-gold/30 p-5 rounded-xl">
              <h3 className="text-xs font-bold text-art-gold uppercase tracking-widest flex items-center gap-2 mb-2 font-mono">
                <Zap className="h-4 w-4" /> THE AYATPRINT COMPETITIVE MOAT (GAPS REMEDIED)
              </h3>
              <p className="text-xs text-art-charcoal/80 leading-relaxed">
                AyatPrint bridges this multi-million dollar product void. We merge <strong>Tanzil's authenticated Unicode database</strong> directly with a <strong>specialized WebGL/Canvas Arabic shaping engine</strong>. Our users get pixel-perfect Naskh, Kufi, and Thuluth typography aligned into geometric layout patterns (circle, mihrab arch, minimal grids) that immediately produce high-DPI print vectors, automatically synchronized with POD APIs and Etsy draft drawers in 1 click.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'tanzil' && (
          <div className="space-y-6">
            <div className="border-b border-art-sand pb-4">
              <h2 className="text-lg font-serif font-bold text-art-charcoal flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-art-gold" />
                Tanzil Quran Engine & Integrity
              </h2>
              <p className="text-xs text-art-charcoal/60 mt-1">Study of the Tanzil Quran text structure, data specifications, licensing, and implementation guidelines.</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs space-y-3">
                <h3 className="text-xs font-serif font-bold text-art-charcoal">1. Architectural Analysis</h3>
                <p className="text-xs text-art-charcoal/80 leading-relaxed">
                  Tanzil's dataset is widely considered the gold standard for digital Quranic applications due to its strict verification process. It provides text formats configured for different styling goals:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-2">
                  <div className="bg-art-warm p-3 rounded-lg border border-art-sand">
                    <span className="font-serif font-bold text-art-gold block mb-1">Uthmani Text</span>
                    <p className="text-art-charcoal/70 text-[11px]">Includes classic Quranic orthographical glyphs and diacritics. Essential for calligraphic prints.</p>
                  </div>
                  <div className="bg-art-warm p-3 rounded-lg border border-art-sand">
                    <span className="font-serif font-bold text-art-gold block mb-1">Simple Clean Text</span>
                    <p className="text-art-charcoal/70 text-[11px]">Removes decorative marks while keeping main letters, ideal for automated typography shaping.</p>
                  </div>
                  <div className="bg-art-warm p-3 rounded-lg border border-art-sand">
                    <span className="font-serif font-bold text-art-gold block mb-1">Authentic Transliteration</span>
                    <p className="text-art-charcoal/70 text-[11px]">Accurate English alphabet transliteration helping non-Arabic speakers read script correctly.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-serif font-bold text-art-charcoal">2. Recommended Integration Code Pattern</h3>
                  <button 
                    onClick={() => handleCopy(tanzilIntegrationSnippet, 'tanzilCode')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-art-warm hover:bg-art-sand text-[10px] text-art-charcoal font-bold uppercase tracking-wider transition-all border border-art-sand cursor-pointer"
                  >
                    {copiedText === 'tanzilCode' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-art-gold" />}
                    Copy Snippet
                  </button>
                </div>
                <pre className="bg-art-charcoal p-4 rounded-xl text-[11px] font-mono overflow-x-auto text-amber-200 border border-art-charcoal shadow-inner">
                  {tanzilIntegrationSnippet}
                </pre>
              </div>

              <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs space-y-2 text-xs">
                <h3 className="text-xs font-serif font-bold text-art-charcoal">3. Text Integrity Protections</h3>
                <p className="text-art-charcoal/80 leading-relaxed">
                  In order to guarantee the absolute sanctity of the Quranic text, AyatPrint enforces a strict non-modification layer. The Arabic text displayed inside our custom canvas editor is compiled as a read-only node.
                </p>
                <div className="flex gap-2 items-start mt-2 bg-rose-500/5 p-3 rounded-lg border border-rose-200">
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <p className="text-rose-800 text-[11px]">
                    <strong>Critical Rule:</strong> Under no circumstances is the user permitted to insert or edit letters inside the Quran verse node. Font styling, sizing, ornament overlays, and background textures are completely customizable, but the text array must strictly correspond to Tanzil's validated dataset.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fonts' && (
          <div className="space-y-6">
            <div className="border-b border-art-sand pb-4">
              <h2 className="text-lg font-serif font-bold text-art-charcoal flex items-center gap-2">
                <Layers className="h-5 w-5 text-art-gold" />
                Arabic Typography & Font Comparative Matrix
              </h2>
              <p className="text-xs text-art-charcoal/60 mt-1">Analysis of standard SIL Open Font License (OFL) and open-source Arabic typographic fonts suited for premium printing.</p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-art-sand bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-art-warm text-art-charcoal font-mono text-[9px] uppercase tracking-widest border-b border-art-sand">
                    <th className="p-3.5">Font Name</th>
                    <th className="p-3.5">Arabic Style</th>
                    <th className="p-3.5">License</th>
                    <th className="p-3.5">Quran Diacritics</th>
                    <th className="p-3.5">Best Print Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-art-sand text-art-charcoal/80">
                  <tr className="hover:bg-art-cream/50 transition-colors">
                    <td className="p-3.5 font-serif font-bold text-art-charcoal">Amiri</td>
                    <td className="p-3.5">Classical Naskh</td>
                    <td className="p-3.5">SIL OFL (Free)</td>
                    <td className="p-3.5 text-emerald-600 font-semibold">✔ Full Support</td>
                    <td className="p-3.5">Traditional Quran wall panels, luxury velvet canvases.</td>
                  </tr>
                  <tr className="hover:bg-art-cream/50 transition-colors">
                    <td className="p-3.5 font-serif font-bold text-art-charcoal">Reem Kufi</td>
                    <td className="p-3.5">Modern/Kufic</td>
                    <td className="p-3.5">SIL OFL (Free)</td>
                    <td className="p-3.5 text-emerald-600 font-semibold">✔ Partial</td>
                    <td className="p-3.5">Minimalist geometric prints, poster art, hotel office walls.</td>
                  </tr>
                  <tr className="hover:bg-art-cream/50 transition-colors">
                    <td className="p-3.5 font-serif font-bold text-art-charcoal">Scheherazade New</td>
                    <td className="p-3.5">Flowing Naskh</td>
                    <td className="p-3.5">SIL OFL (Free)</td>
                    <td className="p-3.5 text-emerald-600 font-semibold">✔ Full Support</td>
                    <td className="p-3.5">High-legibility multi-line posters, translation typography.</td>
                  </tr>
                  <tr className="hover:bg-art-cream/50 transition-colors">
                    <td className="p-3.5 font-serif font-bold text-art-charcoal">Cairo</td>
                    <td className="p-3.5">Modern Sans-Serif</td>
                    <td className="p-3.5">SIL OFL (Free)</td>
                    <td className="p-3.5 text-art-gold font-bold">▲ English/Subtext</td>
                    <td className="p-3.5">Ideal for side-by-side English translations under Arabic script.</td>
                  </tr>
                  <tr className="hover:bg-art-cream/50 transition-colors">
                    <td className="p-3.5 font-serif font-bold text-art-charcoal">Alexandria</td>
                    <td className="p-3.5">Brutalist Geometric</td>
                    <td className="p-3.5">SIL OFL (Free)</td>
                    <td className="p-3.5 text-art-charcoal/40">✘ Exclude</td>
                    <td className="p-3.5">Brutalist poster formats, modern abstract framing accents.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs space-y-3">
              <h3 className="text-xs font-serif font-bold text-art-charcoal">Open-Source Technologies for Arabic Shaping</h3>
              <p className="text-xs text-art-charcoal/80 leading-relaxed">
                Rendering Arabic on a Canvas/WebGL engine requires a custom shaping stack due to complex character joining rules. In our product roadmap, we utilize:
              </p>
              <ul className="list-disc pl-5 text-xs text-art-charcoal/70 space-y-2">
                <li><strong className="text-art-charcoal font-semibold">HarfBuzz (Emscripten WebAssembly):</strong> Transpiled to web modules to handle correct Arabic character shaping, kerning, and ligatures inside HTML5 Canvas contexts.</li>
                <li><strong className="text-art-charcoal font-semibold">OpenType.js:</strong> Used client-side to parse SIL fonts, extract raw SVG glyph paths for the custom Quran verse vectorizer, and compile them to perfect 300 DPI vectors.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'pod' && (
          <div className="space-y-6">
            <div className="border-b border-art-sand pb-4">
              <h2 className="text-lg font-serif font-bold text-art-charcoal flex items-center gap-2">
                <Zap className="h-5 w-5 text-art-gold" />
                POD, Etsy, & Pinterest Automation Spec
              </h2>
              <p className="text-xs text-art-charcoal/60 mt-1">How AyatPrint automatically synchronizes print designs, mocks, and triggers multi-channel marketplace publishing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs space-y-2.5">
                <h3 className="text-[10px] font-bold text-art-gold uppercase tracking-widest font-mono">1. Etsy Draft Creator</h3>
                <p className="text-xs text-art-charcoal/80 leading-relaxed">
                  The moment a designer clicks "Publish to Etsy", AyatPrint utilizes the Etsy v3 API to:
                </p>
                <ol className="list-decimal pl-5 text-xs text-art-charcoal/70 space-y-1.5">
                  <li>Upload the high-res 300DPI wall-art mockups to listing slots.</li>
                  <li>Draft SEO titles: e.g., <em>"Ayat Al Kursi Wall Art | Islamic Print Calligraphy Canvas | Luxury Ramadan Gift Poster"</em>.</li>
                  <li>Populate 13 targeted search tags automatically.</li>
                  <li>Set up size variants (A4, A3, 50x70) mapped to fulfillment SKUs.</li>
                </ol>
              </div>

              <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs space-y-2.5">
                <h3 className="text-[10px] font-bold text-art-gold uppercase tracking-widest font-mono">2. Print-On-Demand Route</h3>
                <p className="text-xs text-art-charcoal/80 leading-relaxed">
                  AyatPrint integrates natively with <strong>Printify / Gelato APIs</strong> for automated global order completion:
                </p>
                <div className="bg-art-charcoal p-3 rounded-lg border border-art-charcoal text-[11px] font-mono text-amber-200">
                  POST /v1/shops/&#123;shop_id&#125;/products.json
                  <br />
                  <span className="text-art-gold font-semibold">Body: &#123; title, variants, print_provider_id: 12, blueprint_id: 104 &#125;</span>
                </div>
                <p className="text-[11px] text-art-charcoal/50">
                  When an Etsy customer purchases the design, the webhook triggers, creating the print job on Printify using the transparent PNG generated by AyatPrint.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs space-y-3">
              <h3 className="text-xs font-serif font-bold text-art-charcoal">Pinterest Viral Loop Automation</h3>
              <p className="text-xs text-art-charcoal/80 leading-relaxed">
                Pinterest is the primary acquisition channel for boutique home decor. AyatPrint includes a built-in scheduler that compiles customized designs into beautiful high-aspect-ratio room mocks (9:16) and posts them directly using the Pinterest Content API, complete with SEO-optimized pin descriptions and referral links pointing to the seller's storefront.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="border-b border-art-sand pb-4">
              <h2 className="text-lg font-serif font-bold text-art-charcoal flex items-center gap-2">
                <Cpu className="h-5 w-5 text-art-gold" />
                Scale SaaS Architecture & Technology Stack
              </h2>
              <p className="text-xs text-art-charcoal/60 mt-1">A highly resilient, production-ready cloud layout blueprint built for high volume print-on-demand processing.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs space-y-3">
              <h3 className="text-xs font-serif font-bold text-art-charcoal flex items-center gap-1.5">
                <Server className="h-4 w-4 text-art-gold" /> Backend Stack Configuration
              </h3>
              <p className="text-xs text-art-charcoal/80 leading-relaxed">
                The architecture splits workload into non-blocking subsystems. The complex raster rendering is processed asynchronously via server workers:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-2">
                <div className="bg-art-warm p-3 rounded-lg border border-art-sand">
                  <span className="font-serif font-bold text-art-gold block mb-1">Compute Platform</span>
                  <p className="text-art-charcoal/70 text-[11px]">Node.js Express api proxying and WebGL canvas instances running inside Cloud Run / Docker containers.</p>
                </div>
                <div className="bg-art-warm p-3 rounded-lg border border-art-sand">
                  <span className="font-serif font-bold text-art-gold block mb-1">High-Res Render Queue</span>
                  <p className="text-art-charcoal/70 text-[11px]">Redis Queue with BullMQ. Processes SVG-to-PDF/CMYK heavy compiles off the main server thread.</p>
                </div>
                <div className="bg-art-warm p-3 rounded-lg border border-art-sand">
                  <span className="font-serif font-bold text-art-gold block mb-1">Global Delivery (CDN)</span>
                  <p className="text-art-charcoal/70 text-[11px]">AWS S3 bucket / Cloudflare R2 storing custom high-dpi files with immediate caching.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs space-y-3">
              <h3 className="text-xs font-serif font-bold text-art-charcoal flex items-center gap-1.5">
                <Database className="h-4 w-4 text-art-gold" /> Database & Persistent Storage Model
              </h3>
              <p className="text-xs text-art-charcoal/80 leading-relaxed">
                Relational model utilizing PostgreSQL (Cloud SQL/Supabase) to support multi-tenant sellers, saved print layouts, custom customer presets, and automated store listings:
              </p>
              <pre className="bg-art-charcoal p-4 rounded-xl text-[10px] font-mono overflow-x-auto text-amber-200 border border-art-charcoal shadow-inner">
                {databaseSchemaSnippet}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'monetization' && (
          <div className="space-y-6">
            <div className="border-b border-art-sand pb-4">
              <h2 className="text-lg font-serif font-bold text-art-charcoal flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-art-gold" />
                AyatPrint Monetization Strategy & Tiering
              </h2>
              <p className="text-xs text-art-charcoal/60 mt-1">Multi-layered pricing design optimized for individual Islamic designers, global Etsy sellers, and local mosques.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-art-sand relative overflow-hidden shadow-xs">
                <span className="absolute top-2 right-2 bg-art-warm text-art-charcoal/60 border border-art-sand px-1.5 py-0.5 rounded text-[8px] font-mono font-bold">TIER 1</span>
                <h4 className="text-xs font-serif font-bold text-art-charcoal mb-1">Freemium Plan</h4>
                <p className="text-art-charcoal/50 text-[11px] mb-2">Ideal for personal or local home printing.</p>
                <div className="text-sm font-bold text-art-charcoal mb-2">$0 / Mo</div>
                <ul className="text-[11px] text-art-charcoal/70 space-y-1">
                  <li>• Search all Quran verses</li>
                  <li>• Access 3 standard presets</li>
                  <li>• Medium-res JPEG exports</li>
                  <li>• Personal Use Only</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border-2 border-art-gold relative overflow-hidden shadow-md bg-art-gold/5">
                <span className="absolute top-2 right-2 bg-art-gold text-white px-1.5 py-0.5 rounded text-[8px] font-mono font-bold">TIER 2</span>
                <h4 className="text-xs font-serif font-bold text-art-gold mb-1">Etsy Creator Pro</h4>
                <p className="text-art-charcoal/70 text-[11px] mb-2">Built for active side-hustlers and sellers.</p>
                <div className="text-base font-bold text-art-charcoal mb-2">$19 / Mo</div>
                <ul className="text-[11px] text-art-charcoal/80 space-y-1">
                  <li>• Unlimited 300 DPI Canvas Exports</li>
                  <li>• PDF, PNG, SVG Formats</li>
                  <li>• Automated Etsy listing syncer</li>
                  <li>• 1-Click Printify integration</li>
                  <li>• Full Commercial License</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-art-sand relative overflow-hidden shadow-xs">
                <span className="absolute top-2 right-2 bg-art-warm text-art-charcoal/60 border border-art-sand px-1.5 py-0.5 rounded text-[8px] font-mono font-bold">TIER 3</span>
                <h4 className="text-xs font-serif font-bold text-art-charcoal mb-1">Sovereign Studio / Mosque</h4>
                <p className="text-art-charcoal/50 text-[11px] mb-2">For custom Islamic design agencies.</p>
                <div className="text-sm font-bold text-art-charcoal mb-2">$49 / Mo</div>
                <ul className="text-[11px] text-art-charcoal/70 space-y-1">
                  <li>• Multi-user workspace accounts</li>
                  <li>• Advanced Islamic geometry creators</li>
                  <li>• Bulk Etsy mockup generator</li>
                  <li>• Direct API Access for Shopify</li>
                  <li>• Dedicated printing manager</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs space-y-2">
              <h3 className="text-xs font-serif font-bold text-art-charcoal">The "Mosque Donation" Licensing Specialization</h3>
              <p className="text-xs text-art-charcoal/80 leading-relaxed">
                AyatPrint contains a specialized pricing and licensing clause for Mosques and Non-profit Islamic Schools. To support the community, our platform provides completely free pro tools for any design intended for physical placement inside Mosques, Islamic centers, or charity auction prints.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const tanzilIntegrationSnippet = `// Integration layer linking Tanzil's verified text databases 
import { XMLParser } from 'fast-xml-parser';

export async function fetchQuranVerse(surah: number, ayah: number) {
  // Tanzil authenticated XML structure fetches the verified Uthmani script
  const response = await fetch(\`https://api.tanzil.net/v1/quran/uthmani/\${surah}:\${ayah}\`);
  const data = await response.text();
  
  // Custom validation layer safeguarding diacritical integrity
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(data);
  
  return {
    arabicText: parsed.quran.verse['#text'],
    surahId: surah,
    ayahId: ayah,
    integrityCheckSum: parsed.quran.metadata.checksum
  };
}`;

const databaseSchemaSnippet = `// Schema defining multi-tenant Etsy sellers, saved drafts, and POD product links
import { pgTable, text, uuid, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const sellers = pgTable('sellers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  subscriptionTier: text('subscription_tier').default('free'), // free, creator, studio
  etsyToken: text('etsy_token'),
  shopifyUrl: text('shopify_url'),
  createdAt: timestamp('created_at').defaultNow()
});

export const artLayouts = pgTable('art_layouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  sellerId: uuid('seller_id').references(() => sellers.id),
  verseId: text('verse_id').notNull(),
  arabicStyle: text('arabic_style').notNull(), // Naskh, Kufic, Thuluth
  designPreset: text('design_preset').notNull(),
  config: jsonb('canvas_config').notNull(), // coordinates, colors, frames, offsets
  highResAssetUrl: text('high_res_asset_url'),
  isPublishedToPod: boolean('is_published_to_pod').default(false),
  createdAt: timestamp('created_at').defaultNow()
});`;
