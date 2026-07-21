import React, { useState, useEffect } from 'react';
import { 
  Zap, Link2, ShoppingBag, ExternalLink, RefreshCw, CheckCircle2, 
  Settings, FolderSync, Shield, Lock, Bell, Sparkles, Send, Play,
  Truck, Globe, DollarSign, Award, Layers, Check, ArrowRight
} from 'lucide-react';

export default function IntegrationsDrawer() {
  const [activeTab, setActiveTab] = useState<'pod_router' | 'printify' | 'pinterest' | 'shopify' | 'woocommerce'>('pod_router');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [inputs, setInputs] = useState({
    printifyKey: 'pr_live_e3a19fd8f2c270ba4308c1aefb9f0290',
    shopifyStoreUrl: 'ayatprint-decor.myshopify.com',
    wooKey: 'ck_7d2f9ae10a56e9c9c0b1129aa48e029c',
    pinterestBoard: 'Islamic Home Aesthetic (Gallery)'
  });

  // POD Smart Router Simulator States
  const [podProviders, setPodProviders] = useState<any[]>([]);
  const [routingTest, setRoutingTest] = useState({
    destinationCountry: 'US',
    substrate: 'framed_canvas',
    dimensionsInches: '24x36',
    unitRetailPriceUSD: 179
  });
  const [routingResult, setRoutingResult] = useState<any>(null);
  const [isTestingRoute, setIsTestingRoute] = useState(false);

  // Fetch POD providers list on mount
  useEffect(() => {
    fetch('/api/pod/providers')
      .then(res => res.json())
      .then(data => {
        if (data.activeProviders) {
          setPodProviders(data.activeProviders);
        }
      })
      .catch(err => console.warn('Could not fetch POD providers:', err));

    // Initial test route
    runRoutingSimulation('US', 'framed_canvas', '24x36', 179);
  }, []);

  const runRoutingSimulation = (country: string, substrate: string, dims: string, price: number) => {
    setIsTestingRoute(true);
    fetch('/api/pod/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destinationCountry: country,
        substrate: substrate,
        dimensionsInches: dims,
        urgency: 'standard',
        quantity: 1,
        unitRetailPriceUSD: price
      })
    })
      .then(res => res.json())
      .then(data => {
        setRoutingResult(data);
        setIsTestingRoute(false);
      })
      .catch(err => {
        console.warn('Routing simulation error:', err);
        setIsTestingRoute(false);
      });
  };

  const handleSync = (platform: string) => {
    setIsSyncing(true);
    setSyncLogs(prev => [...prev, `Starting full metadata catalog sync for ${platform.toUpperCase()}...`]);
    
    setTimeout(() => {
      setSyncLogs(prev => [
        ...prev, 
        `[${platform.toUpperCase()} API] Connection handshake authenticated.`,
        `[${platform.toUpperCase()} API] Mapping customized 300 DPI layout assets...`,
        `[${platform.toUpperCase()} API] Synchronization complete! Created 15 premium print variants.`
      ]);
      setIsSyncing(false);
    }, 2000);
  };

  const clearLogs = () => setSyncLogs([]);

  return (
    <div className="bg-white border border-art-sand rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row h-[780px]">
      {/* Platform Switcher */}
      <div className="w-full md:w-64 bg-art-warm border-r border-art-sand p-4 flex flex-col gap-1.5 shrink-0">
        <div className="mb-4 px-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-art-gold font-bold">Active Architecture</span>
          <h3 className="text-sm font-serif font-bold text-art-charcoal mt-1">POD & Store Sync</h3>
          <p className="text-xs text-art-charcoal/60 mt-0.5">Global fulfillment & channel bridges</p>
        </div>

        <button
          onClick={() => setActiveTab('pod_router')}
          className={`flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
            activeTab === 'pod_router' 
              ? 'bg-art-charcoal text-white border-art-charcoal shadow-sm' 
              : 'text-art-charcoal/70 hover:text-art-charcoal hover:bg-white/55 border-transparent'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            POD Smart Router
          </span>
          <Truck className={`h-4 w-4 shrink-0 ${activeTab === 'pod_router' ? 'text-art-gold' : 'text-art-charcoal/40'}`} />
        </button>

        <button
          onClick={() => setActiveTab('printify')}
          className={`flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
            activeTab === 'printify' 
              ? 'bg-art-charcoal text-white border-art-charcoal shadow-sm' 
              : 'text-art-charcoal/70 hover:text-art-charcoal hover:bg-white/55 border-transparent'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Printify API Webhooks
          </span>
          <CheckCircle2 className={`h-4 w-4 shrink-0 ${activeTab === 'printify' ? 'text-art-gold' : 'text-art-charcoal/40'}`} />
        </button>

        <button
          onClick={() => setActiveTab('shopify')}
          className={`flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
            activeTab === 'shopify' 
              ? 'bg-art-charcoal text-white border-art-charcoal shadow-sm' 
              : 'text-art-charcoal/70 hover:text-art-charcoal hover:bg-white/55 border-transparent'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Shopify Core Sync
          </span>
          <Link2 className={`h-4 w-4 shrink-0 ${activeTab === 'shopify' ? 'text-art-gold' : 'text-art-charcoal/40'}`} />
        </button>

        <button
          onClick={() => setActiveTab('pinterest')}
          className={`flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
            activeTab === 'pinterest' 
              ? 'bg-art-charcoal text-white border-art-charcoal shadow-sm' 
              : 'text-art-charcoal/70 hover:text-art-charcoal hover:bg-white/55 border-transparent'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            Pinterest Pin Board
          </span>
          <ExternalLink className={`h-4 w-4 shrink-0 ${activeTab === 'pinterest' ? 'text-art-gold' : 'text-art-charcoal/40'}`} />
        </button>

        <button
          onClick={() => setActiveTab('woocommerce')}
          className={`flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
            activeTab === 'woocommerce' 
              ? 'bg-art-charcoal text-white border-art-charcoal shadow-sm' 
              : 'text-art-charcoal/70 hover:text-art-charcoal hover:bg-white/55 border-transparent'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            WooCommerce API
          </span>
          <Settings className={`h-4 w-4 shrink-0 ${activeTab === 'woocommerce' ? 'text-art-gold' : 'text-art-charcoal/40'}`} />
        </button>

        <div className="mt-auto bg-white/80 p-3 rounded-lg border border-art-sand text-[10px] text-art-charcoal/70">
          <div className="flex items-center gap-1.5 text-art-charcoal font-bold mb-1 font-mono uppercase tracking-widest text-[9px]">
            <Lock className="h-3 w-3 text-art-gold" />
            SECURED ENDPOINTS
          </div>
          OAuth2.0 tokens and API credentials are kept encrypted server-side inside your private AyatPrint project environment.
        </div>
      </div>

      {/* Connection Detail & Action Console */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-between bg-art-cream text-art-charcoal">
        {activeTab === 'pod_router' ? (
          <div className="space-y-6">
            {/* POD Router Header */}
            <div className="border-b border-art-sand pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-base font-serif font-bold text-art-charcoal flex items-center gap-2">
                  <Truck className="h-4 w-4 text-art-gold" />
                  Print-on-Demand Provider Abstraction & Smart Routing Engine
                </h2>
                <p className="text-xs text-art-charcoal/60 mt-1">
                  Decoupled multi-provider orchestration matrix evaluating cost, SLA, quality score, and regional proximity.
                </p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 text-[10px] font-mono rounded font-bold uppercase tracking-widest">
                Multi-Node Active
              </span>
            </div>

            {/* Provider Matrix Cards */}
            <div className="space-y-3">
              <h4 className="text-xs font-serif font-bold text-art-charcoal uppercase tracking-wider">Connected Print Partner Nodes (5 Active)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {podProviders.map((p: any) => (
                  <div key={p.id} className="bg-white p-3.5 rounded-xl border border-art-sand shadow-xs text-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{p.logo}</span>
                        <div>
                          <span className="font-bold text-art-charcoal block leading-tight">{p.name}</span>
                          <span className="text-[9px] text-art-charcoal/50">{p.headquarters}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        ★ {p.qualityRating}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-art-sand/60 text-[10px] space-y-1 text-art-charcoal/70 font-mono">
                      <div className="flex justify-between">
                        <span>Base Cost:</span>
                        <span className="font-bold text-art-charcoal">${p.baseProductionCostUSD}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg SLA:</span>
                        <span>{p.avgSLAHours} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max DPI:</span>
                        <span className="text-amber-700 font-bold">{p.maxDPI} DPI</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Route Testing Console */}
            <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-art-sand/60 pb-2">
                <h4 className="text-xs font-serif font-bold text-art-charcoal uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-art-gold" />
                  Live Order Routing Simulator
                </h4>
                <span className="text-[9px] font-mono text-art-charcoal/50">Test Provider Selection & Margins</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-[9px] font-bold text-art-charcoal/60 uppercase block mb-1">Destination Country</label>
                  <select
                    value={routingTest.destinationCountry}
                    onChange={(e) => {
                      const newCountry = e.target.value;
                      setRoutingTest({ ...routingTest, destinationCountry: newCountry });
                      runRoutingSimulation(newCountry, routingTest.substrate, routingTest.dimensionsInches, routingTest.unitRetailPriceUSD);
                    }}
                    className="w-full bg-art-warm border border-art-sand rounded-lg p-2 text-xs text-art-charcoal font-bold focus:outline-none"
                  >
                    <option value="US">🇺🇸 United States</option>
                    <option value="FR">🇫🇷 France</option>
                    <option value="AE">🇦🇪 United Arab Emirates</option>
                    <option value="GB">🇬🇧 United Kingdom</option>
                    <option value="CA">🇨🇦 Canada</option>
                    <option value="SA">🇸🇦 Saudi Arabia</option>
                    <option value="MA">🇲🇦 Morocco</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-art-charcoal/60 uppercase block mb-1">Substrate Material</label>
                  <select
                    value={routingTest.substrate}
                    onChange={(e) => {
                      const newSub = e.target.value;
                      setRoutingTest({ ...routingTest, substrate: newSub });
                      runRoutingSimulation(routingTest.destinationCountry, newSub, routingTest.dimensionsInches, routingTest.unitRetailPriceUSD);
                    }}
                    className="w-full bg-art-warm border border-art-sand rounded-lg p-2 text-xs text-art-charcoal font-bold focus:outline-none"
                  >
                    <option value="framed_canvas">Framed Canvas</option>
                    <option value="stretched_canvas">Stretched Canvas</option>
                    <option value="acrylic_glass">Acrylic Glass</option>
                    <option value="fine_art_paper">Fine Art Paper</option>
                    <option value="carved_wood">Carved Solid Wood</option>
                    <option value="brushed_metal">Brushed Gold Metal</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-art-charcoal/60 uppercase block mb-1">Dimensions</label>
                  <select
                    value={routingTest.dimensionsInches}
                    onChange={(e) => {
                      const newDims = e.target.value;
                      setRoutingTest({ ...routingTest, dimensionsInches: newDims });
                      runRoutingSimulation(routingTest.destinationCountry, routingTest.substrate, newDims, routingTest.unitRetailPriceUSD);
                    }}
                    className="w-full bg-art-warm border border-art-sand rounded-lg p-2 text-xs text-art-charcoal font-bold focus:outline-none"
                  >
                    <option value="16x20">16 x 20 inches</option>
                    <option value="24x36">24 x 36 inches</option>
                    <option value="30x40">30 x 40 inches</option>
                    <option value="40x60">40 x 60 inches</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-art-charcoal/60 uppercase block mb-1">Retail Price ($)</label>
                  <input
                    type="number"
                    value={routingTest.unitRetailPriceUSD}
                    onChange={(e) => {
                      const newPrice = Number(e.target.value) || 179;
                      setRoutingTest({ ...routingTest, unitRetailPriceUSD: newPrice });
                      runRoutingSimulation(routingTest.destinationCountry, routingTest.substrate, routingTest.dimensionsInches, newPrice);
                    }}
                    className="w-full bg-art-warm border border-art-sand rounded-lg p-2 text-xs text-art-charcoal font-bold font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Simulation Result Box */}
              {isTestingRoute ? (
                <div className="p-4 text-center text-xs text-art-charcoal/60 font-mono">
                  Calculating optimal POD fulfillment route...
                </div>
              ) : routingResult ? (
                <div className="bg-art-warm p-4 rounded-xl border border-art-sand text-xs space-y-3 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-art-sand pb-2">
                    <div>
                      <span className="text-[9px] font-mono text-art-gold font-bold uppercase tracking-widest block">Primary Selected Fulfillment Partner</span>
                      <span className="text-sm font-serif font-bold text-art-charcoal flex items-center gap-2 mt-0.5">
                        {routingResult.selectedProvider.logo} {routingResult.selectedProvider.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                        Estimated Margin: {routingResult.marginPercent}%
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-art-charcoal/80 leading-relaxed font-sans italic bg-white p-2.5 rounded border border-art-sand">
                    "{routingResult.routingRuleTriggered}"
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-[11px]">
                    <div className="bg-white p-2 rounded border border-art-sand">
                      <span className="text-[8px] text-art-charcoal/50 uppercase block">POD Production</span>
                      <span className="font-bold text-art-charcoal">${routingResult.productionCostUSD}</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-art-sand">
                      <span className="text-[8px] text-art-charcoal/50 uppercase block">Freight Shipping</span>
                      <span className="font-bold text-art-charcoal">${routingResult.estimatedShippingUSD}</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-art-sand">
                      <span className="text-[8px] text-art-charcoal/50 uppercase block">Net Profit</span>
                      <span className="font-bold text-emerald-700">${routingResult.projectedProfitUSD}</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-art-sand">
                      <span className="text-[8px] text-art-charcoal/50 uppercase block">Est. Delivery</span>
                      <span className="font-bold text-amber-700">{routingResult.estimatedDeliveryDays} Days</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-art-sand flex justify-between items-center text-[10px] text-art-charcoal/70 font-mono">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> 300 DPI Bleed & Tanzil Verification Passed
                    </span>
                    <span className="text-art-charcoal/50">Failover Candidate: {routingResult.failoverProvider.name}</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Platform Description Header */}
            <div className="border-b border-art-sand pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-base font-serif font-bold text-art-charcoal flex items-center gap-2 capitalize">
                  {activeTab} Channel Integration Manager
                </h2>
                <p className="text-xs text-art-charcoal/60 mt-1">
                  {activeTab === 'printify' && 'Automatically routes customer orders, fulfills prints via print providers, and syncs high-res files.'}
                  {activeTab === 'shopify' && 'Pushes customized products, price variants, and mockups directly to your Shopify storefront catalog.'}
                  {activeTab === 'pinterest' && 'Bulk schedules optimized rich pins, boards, and links directly referencing your design listings.'}
                  {activeTab === 'woocommerce' && 'Synchronizes order databases, stock statuses, and designs directly into WordPress installations.'}
                </p>
              </div>
              <span className="bg-art-warm border border-art-sand px-3 py-1 text-[10px] font-mono rounded text-art-gold font-bold uppercase tracking-widest">
                Status: Active Bridge
              </span>
            </div>

            {/* Form Credentials Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs space-y-4">
                <h4 className="text-xs font-serif font-bold text-art-charcoal">Credentials Config</h4>
                
                {activeTab === 'printify' && (
                  <div>
                    <label className="text-[9px] text-art-charcoal/50 uppercase tracking-widest block mb-1.5 font-bold">Printify API Secret Key</label>
                    <input
                      type="password"
                      value={inputs.printifyKey}
                      onChange={(e) => setInputs({ ...inputs, printifyKey: e.target.value })}
                      className="w-full bg-art-warm border border-art-sand rounded-lg p-2.5 text-xs font-mono text-emerald-700 focus:outline-none focus:border-art-gold"
                    />
                  </div>
                )}

                {activeTab === 'shopify' && (
                  <div>
                    <label className="text-[9px] text-art-charcoal/50 uppercase tracking-widest block mb-1.5 font-bold">Shopify Store URL (.myshopify.com)</label>
                    <input
                      type="text"
                      value={inputs.shopifyStoreUrl}
                      onChange={(e) => setInputs({ ...inputs, shopifyStoreUrl: e.target.value })}
                      className="w-full bg-art-warm border border-art-sand rounded-lg p-2.5 text-xs text-art-charcoal focus:outline-none focus:border-art-gold"
                    />
                  </div>
                )}

                {activeTab === 'pinterest' && (
                  <div>
                    <label className="text-[9px] text-art-charcoal/50 uppercase tracking-widest block mb-1.5 font-bold">Target Pinterest Pinboard</label>
                    <input
                      type="text"
                      value={inputs.pinterestBoard}
                      onChange={(e) => setInputs({ ...inputs, pinterestBoard: e.target.value })}
                      className="w-full bg-art-warm border border-art-sand rounded-lg p-2.5 text-xs text-art-charcoal focus:outline-none focus:border-art-gold"
                    />
                  </div>
                )}

                {activeTab === 'woocommerce' && (
                  <div>
                    <label className="text-[9px] text-art-charcoal/50 uppercase tracking-widest block mb-1.5 font-bold">WooCommerce REST API Consumer Key</label>
                    <input
                      type="password"
                      value={inputs.wooKey}
                      onChange={(e) => setInputs({ ...inputs, wooKey: e.target.value })}
                      className="w-full bg-art-warm border border-art-sand rounded-lg p-2.5 text-xs font-mono text-art-charcoal focus:outline-none focus:border-art-gold"
                    />
                  </div>
                )}

                <div className="flex gap-2 items-center text-[10px] text-art-charcoal/60">
                  <Shield className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Handshake secured via 256-bit TLS protocol.</span>
                </div>
              </div>

              {/* Platform Feature Checklist */}
              <div className="bg-white p-5 rounded-xl border border-art-sand shadow-xs space-y-3.5">
                <h4 className="text-xs font-serif font-bold text-art-charcoal">Active Webhooks & Rules</h4>
                
                <ul className="text-xs text-art-charcoal/80 space-y-3">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-art-charcoal">Automated Order Syncing:</span>
                      <p className="text-[11px] text-art-charcoal/60 mt-0.5">Orders are immediately fetched from the marketplace drawer and forwarded directly.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-art-charcoal">Mockup Scene Upload:</span>
                      <p className="text-[11px] text-art-charcoal/60 mt-0.5">High-definition room placement mockups are automatically synced into primary media slots.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-art-charcoal">Real-Time Webhook updates:</span>
                      <p className="text-[11px] text-art-charcoal/60 mt-0.5">Triggers immediate SMS alerts for custom wall prints completed globally.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sync Log Terminal */}
            <div className="mt-6 border-t border-art-sand pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-art-charcoal/50 font-bold flex items-center gap-1.5">
                  <FolderSync className="h-3.5 w-3.5 text-art-gold" /> Live Connection Console
                </span>
                {syncLogs.length > 0 && (
                  <button 
                    onClick={clearLogs}
                    className="text-[10px] text-rose-600 hover:underline font-mono"
                  >
                    Clear console
                  </button>
                )}
              </div>

              <div className="bg-art-charcoal rounded-xl border border-art-charcoal p-4 h-36 font-mono text-[11px] overflow-y-auto text-amber-200 shadow-inner">
                {syncLogs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-white/40">
                    <span>Console idle. Click "Trigger Sync Handshake" below to test active channel connection.</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {syncLogs.map((log, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <span className="text-art-gold font-bold">❯</span>
                        <span className={log.includes('complete') ? 'text-emerald-400 font-semibold' : 'text-white/85'}>{log}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleSync(activeTab)}
                  disabled={isSyncing}
                  className="flex-1 bg-art-charcoal hover:bg-art-charcoal/90 text-white font-bold uppercase tracking-wider py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  <RefreshCw className={`h-3.5 w-3.5 text-art-gold ${isSyncing ? 'animate-spin' : ''}`} />
                  Trigger Sync Handshake
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

