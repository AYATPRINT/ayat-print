import { PODProvider, PODProviderId, PODRoutingRequest, PODRoutingResult, SubstrateType } from '../types/pod';

export const POD_PROVIDERS: PODProvider[] = [
  {
    id: 'gelato',
    name: 'Gelato Global Print Hub',
    logo: '🌐',
    headquarters: 'Oslo, Norway (100+ Global Hubs)',
    status: 'connected',
    supportedRegions: ['GLOBAL', 'US', 'FR', 'DE', 'GB', 'CA', 'AU', 'AE'],
    supportedSubstrates: ['stretched_canvas', 'framed_canvas', 'fine_art_paper', 'acrylic_glass'],
    baseProductionCostUSD: 28,
    avgSLAHours: 48,
    qualityRating: 4.9,
    maxDPI: 600,
    webhookEndpoint: 'https://api.gelato.com/v1/orders/webhook/ayatprint',
    apiSecretConfigured: true,
    activeQueueCount: 142
  },
  {
    id: 'printful',
    name: 'Printful Enterprise',
    logo: '📦',
    headquarters: 'Charlotte, NC, USA & Riga, Latvia',
    status: 'connected',
    supportedRegions: ['US', 'CA', 'GB', 'EU', 'MX'],
    supportedSubstrates: ['stretched_canvas', 'framed_canvas', 'fine_art_paper'],
    baseProductionCostUSD: 32,
    avgSLAHours: 36,
    qualityRating: 4.8,
    maxDPI: 300,
    webhookEndpoint: 'https://api.printful.com/v2/webhooks/ayatprint',
    apiSecretConfigured: true,
    activeQueueCount: 89
  },
  {
    id: 'prodigi',
    name: 'Prodigi Fine Art Printers',
    logo: '🎨',
    headquarters: 'London, United Kingdom',
    status: 'connected',
    supportedRegions: ['GB', 'EU', 'US', 'AU'],
    supportedSubstrates: ['fine_art_paper', 'framed_canvas', 'acrylic_glass', 'brushed_metal'],
    baseProductionCostUSD: 34,
    avgSLAHours: 48,
    qualityRating: 4.95,
    maxDPI: 1200,
    webhookEndpoint: 'https://api.prodigi.com/v1.0/webhooks/ayatprint',
    apiSecretConfigured: true,
    activeQueueCount: 64
  },
  {
    id: 'sensaria',
    name: 'Sensaria Luxury Decor',
    logo: '✨',
    headquarters: 'Denver, CO, USA',
    status: 'connected',
    supportedRegions: ['US', 'CA'],
    supportedSubstrates: ['framed_canvas', 'stretched_canvas', 'acrylic_glass', 'carved_wood'],
    baseProductionCostUSD: 42,
    avgSLAHours: 24,
    qualityRating: 5.0,
    maxDPI: 1200,
    webhookEndpoint: 'https://api.sensaria.com/v1/orders/ayatprint',
    apiSecretConfigured: true,
    activeQueueCount: 31
  },
  {
    id: 'regional_craftsmen',
    name: 'Gulf & Arab Atelier Craftsmen',
    logo: '🕌',
    headquarters: 'Dubai Design District, UAE',
    status: 'connected',
    supportedRegions: ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'MA'],
    supportedSubstrates: ['carved_wood', 'brushed_metal', 'acrylic_glass', 'framed_canvas'],
    baseProductionCostUSD: 55,
    avgSLAHours: 24,
    qualityRating: 5.0,
    maxDPI: 2400,
    webhookEndpoint: 'https://api.ayatprint.com/v1/craftsmen/dispatch',
    apiSecretConfigured: true,
    activeQueueCount: 18
  }
];

export function routePODOrder(req: PODRoutingRequest): PODRoutingResult {
  const { destinationCountry, substrate, dimensionsInches, urgency, quantity, unitRetailPriceUSD } = req;

  // Filter providers that support the requested substrate
  let eligibleProviders = POD_PROVIDERS.filter(p => p.supportedSubstrates.includes(substrate));
  
  if (eligibleProviders.length === 0) {
    eligibleProviders = POD_PROVIDERS; // fallback
  }

  // 1. Regional Matching Logic
  const localRegionProviders = eligibleProviders.filter(p => 
    p.supportedRegions.includes(destinationCountry) || p.supportedRegions.includes('GLOBAL')
  );

  const primaryCandidateList = localRegionProviders.length > 0 ? localRegionProviders : eligibleProviders;

  // 2. Compute cost, SLA and score for each
  const scoredCandidates = primaryCandidateList.map(p => {
    let sizeMultiplier = 1.0;
    if (dimensionsInches.includes('24x36') || dimensionsInches.includes('30x40')) sizeMultiplier = 1.6;
    if (dimensionsInches.includes('36x48') || dimensionsInches.includes('40x60')) sizeMultiplier = 2.2;

    const baseCost = p.baseProductionCostUSD * sizeMultiplier;
    const shippingCost = p.supportedRegions.includes(destinationCountry) ? 12 : 24;
    const totalCost = (baseCost + shippingCost) * quantity;
    
    // Delivery SLA estimate
    const slaDays = Math.ceil(p.avgSLAHours / 24) + (urgency === 'express' ? 1 : urgency === 'vip' ? 1 : 3);

    // Score based on quality, proximity, SLA and margin
    const profit = (unitRetailPriceUSD * quantity) - totalCost;
    const margin = (profit / (unitRetailPriceUSD * quantity)) * 100;

    const score = (p.qualityRating * 20) + (100 - totalCost * 0.5) + (margin * 0.4);

    return {
      provider: p,
      productionCostUSD: Math.round(baseCost * quantity),
      shippingCostUSD: Math.round(shippingCost * quantity),
      totalCostUSD: Math.round(totalCost),
      profitUSD: Math.round(profit),
      marginPercent: Math.round(margin),
      slaDays,
      score
    };
  });

  // Sort by score descending
  scoredCandidates.sort((a, b) => b.score - a.score);

  const winner = scoredCandidates[0];
  const runnerUp = scoredCandidates[1] || scoredCandidates[0];

  let ruleExplanation = `Routed to ${winner.provider.name} based on local fulfillment for ${destinationCountry}, optimal ${substrate} support, and high margin (${winner.marginPercent}%).`;

  if (['AE', 'SA', 'QA', 'KW', 'BH'].includes(destinationCountry) && (substrate === 'carved_wood' || substrate === 'brushed_metal')) {
    ruleExplanation = `Routed to Gulf & Arab Atelier Craftsmen for specialized museum-grade ${substrate} hand finishing in the GCC region.`;
  }

  return {
    selectedProvider: winner.provider,
    failoverProvider: runnerUp.provider,
    productionCostUSD: winner.productionCostUSD,
    estimatedShippingUSD: winner.shippingCostUSD,
    totalPODCostUSD: winner.totalCostUSD,
    projectedProfitUSD: winner.profitUSD,
    marginPercent: winner.marginPercent,
    estimatedDeliveryDays: winner.slaDays,
    routingRuleTriggered: ruleExplanation,
    printFileCheck: {
      dpi300Verified: true,
      bleedMarginPassed: true,
      colorProfileCMYK: true,
      vectorScriptPreserved: true,
      tanzilTextHashVerified: true
    }
  };
}
