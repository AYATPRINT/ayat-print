export type PODProviderId = 'printful' | 'gelato' | 'prodigi' | 'sensaria' | 'regional_craftsmen';

export type SubstrateType = 
  | 'stretched_canvas' 
  | 'framed_canvas' 
  | 'acrylic_glass' 
  | 'fine_art_paper' 
  | 'brushed_metal' 
  | 'carved_wood'
  | 'panoramic_wallpaper'
  | 'wallpaper_roll'
  | 'mihrab_wall_panel'
  | 'mashrabiya_window_film'
  | 'acoustic_wall_panel'
  | 'cushion_decor'
  | 'ceiling_mural';

export interface PODProvider {
  id: PODProviderId;
  name: string;
  logo: string;
  headquarters: string;
  status: 'connected' | 'syncing' | 'degraded';
  supportedRegions: string[]; // ISO country codes or 'GLOBAL'
  supportedSubstrates: SubstrateType[];
  baseProductionCostUSD: number;
  avgSLAHours: number;
  qualityRating: number; // 1-5
  maxDPI: number;
  webhookEndpoint: string;
  apiSecretConfigured: boolean;
  activeQueueCount: number;
}

export interface PODRoutingRequest {
  destinationCountry: string; // ISO code e.g. US, FR, AE, GB, CA
  substrate: SubstrateType;
  dimensionsInches: string; // e.g. "24x36"
  urgency: 'standard' | 'express' | 'vip';
  quantity: number;
  unitRetailPriceUSD: number;
}

export interface PODRoutingResult {
  selectedProvider: PODProvider;
  failoverProvider: PODProvider;
  productionCostUSD: number;
  estimatedShippingUSD: number;
  totalPODCostUSD: number;
  projectedProfitUSD: number;
  marginPercent: number;
  estimatedDeliveryDays: number;
  routingRuleTriggered: string;
  printFileCheck: {
    dpi300Verified: boolean;
    bleedMarginPassed: boolean;
    colorProfileCMYK: boolean;
    vectorScriptPreserved: boolean;
    tanzilTextHashVerified: boolean;
  };
}

export interface OrderItem {
  id: string;
  title: string;
  verseSurah: string;
  arabicText: string;
  englishTranslation: string;
  substrate: SubstrateType;
  dimensions: string;
  frameStyle: string;
  unitPrice: number;
  quantity: number;
  canvasConfig: any;
}

export interface CustomerOrder {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  items: OrderItem[];
  subtotalUSD: number;
  shippingUSD: number;
  taxUSD: number;
  totalUSD: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  podFulfillment: {
    providerId: PODProviderId;
    providerName: string;
    routingStatus: 'routed' | 'printing' | 'framed' | 'shipped' | 'delivered';
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery: string;
  };
}
