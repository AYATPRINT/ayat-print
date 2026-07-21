import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, Search, Sliders, Eye, ArrowRight, BookOpen, 
  Tag, Compass, ShoppingBag, Star, ShieldCheck, HelpCircle,
  TrendingUp, Heart, ArrowLeft, RefreshCw, Layers, Check,
  Globe, Calendar, DollarSign, Percent, Award, Activity, 
  ChevronRight, Download, User, Folder, Map, Mic, Send, 
  Share2, FileText, Calculator, Store, Clock, Zap, Camera,
  X, CheckCircle2, ChevronLeft, Maximize2
} from 'lucide-react';

import moroccanSalonImg from '../assets/images/moroccan_salon_mockup_1784654852263.jpg';
import gulfMajlisImg from '../assets/images/gulf_majlis_mockup_1784654869324.jpg';

export interface MarketplaceProduct {
  id: string;
  title: string;
  verse: {
    id: string;
    surah: number;
    ayah: string;
    surahNameArabic: string;
    surahNameEnglish: string;
    englishTranslation: string;
    arabicText: string;
  };
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  badges: string[];
  stylePreset: string;
  bgTexture: string;
  decorativeFrame: string;
  arabicFont: string;
  useGoldGradient: boolean;
  description: string;
  image: string;
  mockupSceneImage?: string;
  galleryImages?: { id: string; url: string; label: string; category: string }[];
  materials?: string[];
  dimensionsAvailable?: string[];
  authenticitySeal?: string;
  lifestyleLocations?: string[];
  specs?: { dpi: number; substrate: string; frameWood: string; glass: string; warranty: string };
  aiScore?: {
    totalScore: number;
    placement: string;
    breakdown: {
      marketDemand: number;
      conversionRate: number;
      salesVelocity: number;
      favorites: number;
      socialEngagement: number;
      seasonalMatch: number;
      reviews: number;
    };
  };
}

export default function Marketplace() {
  const { t, formatPrice, currentLanguage } = useLanguage();
  // Main tabs: 'gallery' | 'trends' | 'analytics' | 'vault'
  const [activeTab, setActiveTab] = useState<'gallery' | 'trends' | 'analytics' | 'vault'>('gallery');
  
  // Data States
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [trends, setTrends] = useState<any[]>([]);
  const [creativeBrief, setCreativeBrief] = useState<any>(null);
  const [geoPersonalization, setGeoPersonalization] = useState<any>(null);
  
  // Interactive UI States
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  
  // Quick Preview Modal State
  const [previewProduct, setPreviewProduct] = useState<MarketplaceProduct | null>(null);
  const [previewRoomIndex, setPreviewRoomIndex] = useState<number>(0);
  const [previewGalleryIndex, setPreviewGalleryIndex] = useState<number>(0);
  const [selectedFrame, setSelectedFrame] = useState<'gold' | 'walnut' | 'black' | 'oak'>('gold');
  const [selectedCanvasSize, setSelectedCanvasSize] = useState<string>('24x36"');
  
  // Smart Search & Voice States
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(['Surah Rahman', 'Gold Foliation', 'Minimalist Vellum']);
  
  // Customer Personal Vault States
  const [savedDesigns, setSavedDesigns] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mockOrders, setMockOrders] = useState<any[]>([]);
  const [showInvoice, setShowInvoice] = useState<any>(null);

  // AI Trend Hub Generators & Sliders
  const [isSynthesizing, setIsSynthesizing] = useState<string | null>(null);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [isSyncingStore, setIsSyncingStore] = useState(false);
  const [activeConnectionTab, setActiveConnectionTab] = useState<'etsy' | 'shopify' | 'printify'>('etsy');
  const [etsyInputKeywords, setEtsyInputKeywords] = useState('modern barakah art, gilded gold quran canvas');
  const [aiEtsySEO, setAiEtsySEO] = useState<any>(null);
  const [isGeneratingSEO, setIsGeneratingSEO] = useState(false);
  
  // Printify Cost/Margin Calculator State
  const [retailPrice, setRetailPrice] = useState(199);
  const [printCost, setPrintCost] = useState(48.50);
  const [shippingCost, setShippingCost] = useState(12.00);

  // Hero Featured Slides
  const HERO_SLIDES = [
    {
      id: 'slide-moroccan',
      title: 'The Royal Casablanca Salon Series',
      subtitle: 'Surah Ar-Rahman in Hand-Gilded 24K Florentine Gold Leaf',
      description: 'Engineered specifically for high-ceiling Moroccan living rooms with handcrafted plaster, zellige accents, and plush velvet seddari seating.',
      image: moroccanSalonImg,
      locationTag: '🇲🇦 Casablanca Atelier • Museum Quality',
      verse: 'Ar-Rahman (55:13)',
      badge: 'Editorial Cover'
    },
    {
      id: 'slide-gulf',
      title: 'The Gulf Penthouse Majlis Collection',
      subtitle: 'Ayatul Kursi on Alabaster Cotton Vellum',
      description: 'Designed for modern Gulf residences, pairing dark walnut architectural framing with glowing metallic calligraphy and negative space.',
      image: gulfMajlisImg,
      locationTag: '🇦🇪 Dubai & Riyadh Penthouse • 300 DPI Print',
      verse: 'Al-Baqarah (2:255)',
      badge: 'Bestseller'
    },
    {
      id: 'slide-mosque',
      title: 'The Andalusian Sacred Arch Triptychs',
      subtitle: 'Al-Fatiha in Córdoba Geometric Silhouette',
      description: 'Sacred architectural archways carved into museum-grade canvas, echoing the golden age of Islamic craftsmanship.',
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1600&q=80',
      locationTag: '🕌 Córdoba Architecture • Tanzil Certified',
      verse: 'Al-Fatiha (1:1-7)',
      badge: 'Masterpiece'
    }
  ];

  // Auto-rotate Hero Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Load all server-side and storage assets
  useEffect(() => {
    // 1. Fetch Geo-personalization
    fetch('/api/geo-personalization')
      .then(res => res.json())
      .then(data => setGeoPersonalization(data.personalization))
      .catch(() => {
        setGeoPersonalization({
          country: 'United States',
          currency: 'USD',
          currencySymbol: '$',
          stylePreset: 'Minimal Scandinavian',
          accentColors: ['White', 'Beige', 'Black'],
          tagline: 'Curated Sacred Design House'
        });
      });

    // 2. Base Masterpiece Catalog with Curated Merchandising Assets
    const fallbackProducts: MarketplaceProduct[] = [
      {
        id: "prod-rahman-gold",
        title: "Surah Rahman Gold Edition",
        verse: {
          id: "ar-rahman-verse",
          surah: 55,
          ayah: "13",
          surahNameArabic: "الرحمن",
          surahNameEnglish: "Ar-Rahman",
          englishTranslation: "So which of the favors of your Lord would you deny?",
          arabicText: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ"
        },
        category: "Royal Moroccan Salons",
        price: 249,
        rating: 5.0,
        reviewsCount: 42,
        badges: ["Editorial Cover", "Bestseller"],
        stylePreset: "Modern Gold",
        bgTexture: "marble",
        decorativeFrame: "gold-foil",
        arabicFont: "Amiri",
        useGoldGradient: true,
        description: "Bring divine grace into your living room. Set against a Calacatta marble core with hand-gilded 24K gold foil overlays, formatted for traditional Moroccan and modern spaces.",
        image: moroccanSalonImg,
        mockupSceneImage: moroccanSalonImg,
        lifestyleLocations: ["Moroccan Salon", "Marrakech Villa", "Casablanca Residence"],
        authenticitySeal: "TANZIL-MA-2026-9942",
        materials: ["350gsm Italian Cotton Canvas", "Hand-Applied 24K Gold Leaf", "Solid Florentine Gold Frame", "Anti-Reflective Museum Glass"],
        dimensionsAvailable: ['24x36" (60x90cm)', '30x40" (75x100cm)', '40x60" (100x150cm) Grand Salon'],
        specs: {
          dpi: 600,
          substrate: "350gsm 100% Cotton Archival Vellum",
          frameWood: "American Hardwood with Gilded Leaf",
          glass: "3mm UV-Cut Acrylic Glass",
          warranty: "Lifetime 100-Year Lightfast Guarantee"
        },
        galleryImages: [
          { id: 'g1', url: moroccanSalonImg, label: 'Hero Artwork View', category: 'Framed Canvas' },
          { id: 'g2', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80', label: 'Luxury Living Room Context', category: 'Interior Space' },
          { id: 'g3', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80', label: 'Royal Salon Setting', category: 'Architecture' },
          { id: 'g4', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80', label: '24K Gold Foil Macro Texture', category: 'Tactile Material' },
          { id: 'g5', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80', label: 'Solid Gilded Joinery Detail', category: 'Craftsmanship' },
          { id: 'g6', url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80', label: 'Room Scale & Proportion Guide', category: 'Dimensions' },
          { id: 'g7', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80', label: 'Velvet Sheath Packaging Box', category: 'Unboxing' }
        ]
      },
      {
        id: "prod-kursi-black",
        title: "Ayatul Kursi Alabaster",
        verse: {
          id: "ayat-al-kursi",
          surah: 2,
          ayah: "255",
          surahNameArabic: "البقرة",
          surahNameEnglish: "Al-Baqarah",
          englishTranslation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence.",
          arabicText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ"
        },
        category: "Gulf Majlis Series",
        price: 199,
        rating: 4.9,
        reviewsCount: 38,
        badges: ["Iconic", "Majlis Favorite"],
        stylePreset: "Minimal",
        bgTexture: "none",
        decorativeFrame: "minimal",
        arabicFont: "Scheherazade New",
        useGoldGradient: false,
        description: "A striking modern rendering of the verse of protection. Designed in an ultra-clean layout with black display typography on rich off-white textured vellum canvas.",
        image: gulfMajlisImg,
        mockupSceneImage: gulfMajlisImg,
        lifestyleLocations: ["Dubai Penthouse", "Riyadh Executive Suite", "Doha Family Majlis"],
        authenticitySeal: "TANZIL-AE-2026-1084",
        materials: ["350gsm Heavyweight Alabaster Paper", "Deep Black Pigment Ink", "American Walnut Floating Frame"],
        dimensionsAvailable: ['18x24" (45x60cm)', '24x36" (60x90cm)', '30x40" (75x100cm)'],
        specs: {
          dpi: 600,
          substrate: "350gsm French Cotton Vellum",
          frameWood: "American Dark Walnut",
          glass: "Museum Non-Glare Glass",
          warranty: "Lifetime Guarantee"
        },
        galleryImages: [
          { id: 'gk1', url: gulfMajlisImg, label: 'Hero Artwork View', category: 'Framed Canvas' },
          { id: 'gk2', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', label: 'Gulf Majlis Interior', category: 'Interior Space' },
          { id: 'gk3', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80', label: 'Contemporary Lounge View', category: 'Architecture' },
          { id: 'gk4', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80', label: 'Alabaster Vellum Fiber Macro', category: 'Tactile Material' },
          { id: 'gk5', url: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1200&q=80', label: 'Walnut Beveled Frame Corner', category: 'Craftsmanship' },
          { id: 'gk6', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', label: 'Executive Desk Proportions', category: 'Dimensions' },
          { id: 'gk7', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80', label: 'AyatPrint Gold Seal Box', category: 'Unboxing' }
        ]
      },
      {
        id: "prod-sharh-emerald",
        title: "Ash-Sharh Emerald Silk",
        verse: {
          id: "ash-sharh-ease",
          surah: 94,
          ayah: "5-6",
          surahNameArabic: "الشرح",
          surahNameEnglish: "Ash-Sharh",
          englishTranslation: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
          arabicText: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا • إِنَّ مَعَ الْعُسْرِ يُسْرًا"
        },
        category: "Parisian Gallery",
        price: 289,
        rating: 5.0,
        reviewsCount: 24,
        badges: ["Royal Edition"],
        stylePreset: "Luxury",
        bgTexture: "emerald-silk",
        decorativeFrame: "ottoman",
        arabicFont: "Reem Kufi",
        useGoldGradient: true,
        description: "An exquisite architectural design illustrating divine solace. Bound in imperial Damascus emerald green silk background texture with glowing floral arabesque borders.",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        mockupSceneImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        lifestyleLocations: ["Parisian Haussmann Apartment", "London Townhouse", "Geneva Private Gallery"],
        authenticitySeal: "TANZIL-FR-2026-4402",
        materials: ["Imperial Woven Silk Texture Canvas", "Damascus Gold Foil Inks", "Hand-Carved Ottoman Arch Frame"],
        dimensionsAvailable: ['24x36" (60x90cm)', '30x40" (75x100cm)'],
        specs: {
          dpi: 600,
          substrate: "380gsm Silk & Cotton Weave Canvas",
          frameWood: "Carved Gold Oak Frame",
          glass: "Anti-Glare Acrylic",
          warranty: "Lifetime Guarantee"
        },
        galleryImages: [
          { id: 'gs1', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', label: 'Hero Artwork View', category: 'Framed Canvas' },
          { id: 'gs2', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80', label: 'Parisian Salon Context', category: 'Interior Space' },
          { id: 'gs3', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80', label: 'Boutique Hotel Suite View', category: 'Architecture' },
          { id: 'gs4', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80', label: 'Emerald Silk Weave Texture Macro', category: 'Tactile Material' },
          { id: 'gs5', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80', label: 'Ottoman Frame Detail', category: 'Craftsmanship' },
          { id: 'gs6', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80', label: 'Maison Packaging Box', category: 'Unboxing' }
        ]
      },
      {
        id: "prod-fatiha-classic",
        title: "Al-Fatiha Heritage Arch",
        verse: {
          id: "al-fatiha-full",
          surah: 1,
          ayah: "1-7",
          surahNameArabic: "الفاتحة",
          surahNameEnglish: "Al-Fatiha",
          englishTranslation: "In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds.",
          arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"
        },
        category: "Andalusian Mihrabs",
        price: 319,
        rating: 5.0,
        reviewsCount: 19,
        badges: ["Andalusian Arch", "Masterpiece"],
        stylePreset: "Traditional",
        bgTexture: "parchment",
        decorativeFrame: "andalusian",
        arabicFont: "Amiri",
        useGoldGradient: true,
        description: "The complete Opening Surah presented within a stunning Andalusian star-gilded archway silhouette. Perfect for main foyer entrances and grand family living rooms.",
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
        mockupSceneImage: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
        lifestyleLocations: ["Córdoba Heritage House", "Granada Foyer", "Tangier Courtyard Villa"],
        authenticitySeal: "TANZIL-ES-2026-3021",
        materials: ["Aged Parchment Vellum Canvas", "24K Star Arabesque Foil", "Andalusian Arch Solid Wood Frame"],
        dimensionsAvailable: ['24x36" (60x90cm)', '30x40" (75x100cm)', '40x60" Grand Arch'],
        specs: {
          dpi: 600,
          substrate: "360gsm Fine Art Parchment",
          frameWood: "Antique Andalusian Gilded Walnut",
          glass: "3mm UV Museum Acrylic",
          warranty: "Lifetime Guarantee"
        },
        galleryImages: [
          { id: 'gf1', url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80', label: 'Hero Artwork View', category: 'Framed Canvas' },
          { id: 'gf2', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80', label: 'Palace Entry Foyer', category: 'Interior Space' },
          { id: 'gf3', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80', label: 'Grand Hallway View', category: 'Architecture' },
          { id: 'gf4', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80', label: 'Andalusian Star Geometry Detail', category: 'Tactile Material' },
          { id: 'gf5', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80', label: 'Wax-Sealed Luxury Packaging', category: 'Unboxing' }
        ]
      },
      {
        id: "prod-ikhlas-nordic",
        title: "Surah Al-Ikhlas Birch Triptych",
        verse: {
          id: "al-ikhlas-full",
          surah: 112,
          ayah: "1-4",
          surahNameArabic: "الإخلاص",
          surahNameEnglish: "Al-Ikhlas",
          englishTranslation: "Say, He is Allah, [who is] One. Allah, the Eternal Refuge.",
          arabicText: "قُلْ هُوَ اللَّهُ أَحَدٌ • اللَّهُ الصَّمَدُ"
        },
        category: "Nordic Vellum Minimalist",
        price: 229,
        rating: 4.95,
        reviewsCount: 31,
        badges: ["Minimalist", "3-Piece Canvas"],
        stylePreset: "Nordic",
        bgTexture: "vellum",
        decorativeFrame: "minimal",
        arabicFont: "Kufi",
        useGoldGradient: false,
        description: "Pure, understated devotion formatted across three balanced vertical linen canvases. Inspired by Scandinavian organic aesthetics and warm light tones.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        mockupSceneImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        lifestyleLocations: ["Stockholm Apartment", "Oslo Minimalist Loft", "Copenhagen Sanctuary"],
        authenticitySeal: "TANZIL-SE-2026-8810",
        materials: ["100% Organic Cotton Linen", "Natural Scandinavian Birch Wood", "Matte Charcoal Inks"],
        dimensionsAvailable: ['Set of 3: 16x24" each', 'Set of 3: 20x30" each'],
        specs: {
          dpi: 600,
          substrate: "320gsm Organic Unbleached Linen",
          frameWood: "Solid Birch Wood Floating Frame",
          glass: "Matte Anti-Reflective Glass",
          warranty: "Lifetime Guarantee"
        },
        galleryImages: [
          { id: 'gi1', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', label: 'Hero Triptych View', category: '3-Piece Canvas' },
          { id: 'gi2', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80', label: 'Scandinavian Living Space', category: 'Interior Space' },
          { id: 'gi3', url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80', label: 'Prayer Corner & Reading Nook', category: 'Sanctuary' },
          { id: 'gi4', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80', label: 'Organic Linen Fiber Detail', category: 'Tactile Material' },
          { id: 'gi5', url: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1200&q=80', label: 'Birch Frame Precision Joinery', category: 'Craftsmanship' }
        ]
      }
    ];

    // Attempt to score them via backend
    fetch('/api/score-products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: fallbackProducts })
    })
      .then(res => res.json())
      .then(scoredData => {
        setProducts(scoredData);
      })
      .catch(() => {
        const simulated = fallbackProducts.map((p, i) => ({
          ...p,
          aiScore: {
            totalScore: 96 - i * 3,
            placement: i === 0 ? 'Homepage Cover' : 'Featured Masterpiece',
            breakdown: {
              marketDemand: 95 - i * 2,
              conversionRate: 90 - i * 4,
              salesVelocity: 92 - i * 3,
              favorites: 97 - i * 2,
              socialEngagement: 94 - i * 3,
              seasonalMatch: 100,
              reviews: p.rating * 20
            }
          }
        }));
        setProducts(simulated);
      });

    // Fetch AI Trends
    fetch('/api/trends')
      .then(res => res.json())
      .then(data => setTrends(data))
      .catch(() => {
        setTrends([
          {
            id: 'trend-gulf',
            country: 'Gulf (UAE/Saudi)',
            flag: '🇦🇪',
            topic: 'Royal Barakah & Gilt Filigree',
            surah: "Surah Al-Waqi'ah",
            growth: '+310% Demand Surge',
            colors: ['Imperial Emerald', '24K Gold Leaf', 'Walnut'],
            description: 'High search volume for deep emerald canvas overlays adorned with heavy 24K gold floral borders.'
          },
          {
            id: 'trend-usa',
            country: 'United States',
            flag: '🇺🇸',
            topic: 'Nordic Refuge Minimalist',
            surah: 'Ayat Al-Kursi',
            growth: '+142% Pinterest Growth',
            colors: ['Charcoal Black', 'Ivory Cotton', 'Frosted Oak'],
            description: 'Contemporary Muslim residences demanding monochrome designs with extreme negative spaces and floating wooden frames.'
          }
        ]);
      });

    // Fetch Creative Brief
    fetch('/api/creative-director')
      .then(res => res.json())
      .then(data => setCreativeBrief(data))
      .catch(() => {
        setCreativeBrief({
          theme: 'Moroccan Salon & Gulf Majlis Living Spaces',
          rationale: 'Pairing authentic Quranic calligraphic integrity with high-end interior photography for maximum visual immersion.',
          colors: ['Champagne Gold', 'Alabaster', 'Frosted Oak', 'Charcoal'],
          productionInstructions: 'Maintain at least 30% border negative space for museum framing.'
        });
      });

    // Load Saved Designs
    const localDesigns = localStorage.getItem('ayatprint_saved_designs');
    if (localDesigns) {
      try { setSavedDesigns(JSON.parse(localDesigns)); } catch(e){}
    } else {
      const defaultSaved = [
        { id: "saved-1", title: "My Surah Rahman Masterpiece", date: "2026-03-10", verseName: "Ar-Rahman", text: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ", presetName: "Emerald & Gold", font: "Amiri" }
      ];
      setSavedDesigns(defaultSaved);
    }

    const localWishlist = localStorage.getItem('ayatprint_wishlist');
    if (localWishlist) {
      try { setWishlist(JSON.parse(localWishlist)); } catch(e){}
    }

    setMockOrders([
      { id: "AP-2026-9041", date: "2026-03-15", items: ["Surah Rahman Gold Edition (60x90cm)"], total: 249, status: "Gilded Printing", trackingStep: 3 }
    ]);
  }, []);

  // Sync Search Suggestions
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchSuggestions([]);
    } else {
      const suggestions = [
        `Surah ${searchQuery}`,
        `${searchQuery} Gold Edition`,
        `Modern Minimalist ${searchQuery}`,
        `Calligraphy with ${searchQuery}`
      ].slice(0, 3);
      setSearchSuggestions(suggestions);
    }
  }, [searchQuery]);

  // Voice Search simulation
  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setSearchQuery("Surah Rahman");
      setIsListening(false);
      triggerNotification("🎙 Voice scan detected: 'Surah Rahman'");
    }, 1800);
  };

  // Add/Remove Wishlist
  const toggleWishlist = (prodId: string) => {
    let updated = [...wishlist];
    if (updated.includes(prodId)) {
      updated = updated.filter(id => id !== prodId);
      triggerNotification("Removed from bespoke collection wishlist.");
    } else {
      updated.push(prodId);
      triggerNotification("Added to bespoke collection wishlist!");
    }
    setWishlist(updated);
    localStorage.setItem('ayatprint_wishlist', JSON.stringify(updated));
  };

  // Trigger alert notifications
  const triggerNotification = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(null), 3500);
  };

  // Open Product in Studio
  const handleCustomizeInStudio = (prod: MarketplaceProduct) => {
    const designConfig = {
      verse: {
        id: prod.verse.id,
        surah: prod.verse.surah,
        ayah: prod.verse.ayah,
        surahNameArabic: prod.verse.surahNameArabic,
        surahNameEnglish: prod.verse.surahNameEnglish,
        englishTranslation: prod.verse.englishTranslation,
        arabicText: prod.verse.arabicText,
        juz: 3,
        revelationType: 'Madani'
      },
      preset: {
        id: prod.stylePreset === 'Minimal' ? 'charcoal-ivory' : prod.stylePreset === 'Luxury' ? 'emerald-gold' : 'alabaster-marble',
        name: prod.stylePreset || 'Modern Gold',
        bgColor: prod.bgTexture === 'emerald-silk' ? '#022c22' : '#faf9f5',
        textColor: prod.bgTexture === 'emerald-silk' ? '#fbbf24' : '#1c1917',
        ornamentColor: '#c5a059',
        bgGradient: 'none',
        texture: prod.bgTexture
      },
      fontSize: 26,
      letterSpacing: 0,
      lineHeight: 1.6,
      arabicFont: prod.arabicFont || 'Amiri',
      compositionLayout: 'default',
      layoutShape: 'portrait',
      frameType: 'none',
      decorativeFrame: prod.decorativeFrame || 'gold-foil',
      borderThickness: 4,
      innerPadding: 22,
      useGoldGradient: prod.useGoldGradient,
      showQuranMetadata: true,
      showTranslation: true
    };

    localStorage.setItem('ayatprint_active_design', JSON.stringify(designConfig));
    window.dispatchEvent(new Event('ayatprint_active_design_changed'));
    
    // Trigger tab switch in top navbar
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
      if (btn.textContent?.includes('Canvas Studio')) {
        (btn as HTMLButtonElement).click();
      }
    });
  };

  // Filter masterpieces
  const filteredProducts = products.filter(p => {
    const matchesCollection = selectedCollection === 'All' || 
      p.category === selectedCollection ||
      (selectedCollection === 'Luxury' && p.category.includes('Moroccan')) ||
      (selectedCollection === 'Minimalist' && p.category.includes('Minimal'));
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.verse.surahNameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.verse.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollection && matchesSearch;
  });

  const profitMargin = retailPrice - printCost - shippingCost;
  const marginPercent = ((profitMargin / retailPrice) * 100).toFixed(1);

  return (
    <div className="space-y-12 py-2 px-1 text-art-charcoal font-sans">
      
      {/* 1. NOTIFICATION BANNER */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-art-charcoal text-art-cream text-xs font-mono font-bold px-6 py-3 rounded-full border border-art-gold/40 shadow-2xl flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-art-gold animate-spin-slow" />
            <span>{showNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. EXECUTIVE TAB TOGGLES */}
      <div className="flex justify-center border-b border-art-sand pb-4">
        <div className="flex bg-art-warm p-1.5 rounded-2xl border border-art-sand max-w-full overflow-x-auto gap-1">
          {[
            { id: 'gallery', label: 'Luxury Gallery Store', icon: ShoppingBag },
            { id: 'trends', label: 'AI Trend Radar', icon: TrendingUp },
            { id: 'analytics', label: 'Fulfillment & Margins', icon: Activity },
            { id: 'vault', label: 'Client Vault', icon: User }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedProduct(null);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isSelected 
                    ? 'bg-art-charcoal text-white shadow-md' 
                    : 'text-art-charcoal/65 hover:text-art-charcoal hover:bg-white/60'
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? 'text-art-gold' : 'text-art-charcoal/40'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================= TAB 1: LUXURY GALLERY SHOP ======================= */}
      {activeTab === 'gallery' && (
        <div className="space-y-16 animate-in fade-in duration-300">
          
          {/* CURATED FEATURED COLLECTIONS HERO CAROUSEL */}
          <section className="relative rounded-3xl overflow-hidden border border-art-sand shadow-xl bg-art-charcoal text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlideIndex}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8 }}
                className="relative min-h-[500px] lg:min-h-[560px] flex flex-col justify-end p-8 sm:p-12 lg:p-16 overflow-hidden"
              >
                {/* High-res background image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={HERO_SLIDES[heroSlideIndex].image}
                    alt={HERO_SLIDES[heroSlideIndex].title}
                    className="w-full h-full object-cover brightness-[0.45] transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40"></div>
                </div>

                {/* Hero Slide Content */}
                <div className="relative z-10 max-w-3xl space-y-4 text-left">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="bg-art-gold/20 border border-art-gold/40 text-art-gold text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {HERO_SLIDES[heroSlideIndex].badge}
                    </span>
                    <span className="text-[11px] font-mono text-stone-300">
                      {HERO_SLIDES[heroSlideIndex].locationTag}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                    {HERO_SLIDES[heroSlideIndex].title}
                  </h1>

                  <p className="text-art-gold font-serif italic text-base sm:text-lg">
                    "{HERO_SLIDES[heroSlideIndex].subtitle}"
                  </p>

                  <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed font-sans">
                    {HERO_SLIDES[heroSlideIndex].description}
                  </p>

                  {/* Hero Actions */}
                  <div className="pt-4 flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => {
                        const targetProd = products.find(p => p.id === 'prod-rahman-gold') || products[0];
                        if (targetProd) setPreviewProduct(targetProd);
                      }}
                      className="bg-art-gold hover:bg-art-gold/90 text-art-charcoal font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg cursor-pointer"
                    >
                      <Camera className="h-4 w-4" /> Preview in Room Space
                    </button>

                    <button
                      onClick={() => {
                        const targetProd = products.find(p => p.id === 'prod-rahman-gold') || products[0];
                        if (targetProd) handleCustomizeInStudio(targetProd);
                      }}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all border border-white/20 cursor-pointer"
                    >
                      <Compass className="h-4 w-4 text-art-gold" /> Open in Canvas Studio
                    </button>
                  </div>
                </div>

                {/* Hero Slide Controls */}
                <div className="absolute bottom-6 right-8 z-20 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {HERO_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setHeroSlideIndex(idx)}
                        className={`h-1.5 transition-all rounded-full ${
                          heroSlideIndex === idx ? 'w-8 bg-art-gold' : 'w-2 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-1 ml-3">
                    <button
                      onClick={() => setHeroSlideIndex((heroSlideIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                      className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setHeroSlideIndex((heroSlideIndex + 1) % HERO_SLIDES.length)}
                      className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>

          {/* SEARCH & COLLECTION FILTER BAR */}
          <section className="space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 bg-white p-5 rounded-2xl border border-art-sand shadow-xs">
              
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'All', label: 'All Masterpieces' },
                  { id: 'Royal Moroccan Salons', label: '🇲🇦 Moroccan Salons' },
                  { id: 'Gulf Majlis Series', label: '🇦🇪 Gulf Majlis' },
                  { id: 'Andalusian Mihrabs', label: '🕌 Andalusian Mihrabs' },
                  { id: 'Nordic Vellum Minimalist', label: '🇸🇪 Nordic Vellum' }
                ].map(col => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCollection(col.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCollection === col.id
                        ? 'bg-art-charcoal text-white shadow-md'
                        : 'bg-art-warm text-art-charcoal/70 hover:text-art-charcoal border border-art-sand'
                    }`}
                  >
                    {col.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full lg:w-80">
                <div className="relative flex items-center bg-art-warm rounded-xl border border-art-sand px-3.5 py-2">
                  <Search className="h-4 w-4 text-art-charcoal/40 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search Surah, translation, or style..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full bg-transparent text-art-charcoal text-xs px-2 focus:outline-none placeholder:text-art-charcoal/40 font-medium"
                  />
                  <button 
                    onClick={handleVoiceSearch}
                    disabled={isListening}
                    className={`p-1 rounded-lg text-art-charcoal/60 hover:text-art-charcoal transition-all ${isListening ? 'bg-amber-100 text-amber-700 animate-pulse' : ''}`}
                    title="Simulate Voice Search"
                  >
                    <Mic className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Search Autocomplete */}
                {showSuggestions && (searchSuggestions.length > 0 || searchQuery.length > 0) && (
                  <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-art-sand z-50 text-left overflow-hidden text-xs">
                    <div className="p-2 border-b border-art-sand bg-art-warm text-[10px] font-mono text-art-gold font-bold uppercase tracking-widest">
                      Suggestions
                    </div>
                    {searchSuggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSearchQuery(sug.replace('Surah ', ''));
                          setShowSuggestions(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-art-warm transition-colors border-b border-art-sand/40 last:border-0 font-medium text-art-charcoal"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CURATED EDITORIAL PRODUCT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
              {filteredProducts.map(prod => (
                <motion.div
                  key={prod.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-2xl border border-art-sand overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left relative"
                >
                  {/* High-Impact Lifestyle Mockup Header */}
                  <div className="relative aspect-[4/3] bg-art-warm overflow-hidden flex items-center justify-center">
                    <img 
                      src={prod.image} 
                      alt={prod.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>

                    {/* Badge Overlays */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      {prod.badges.map((b, idx) => (
                        <span key={idx} className="bg-art-charcoal/90 backdrop-blur-md text-art-gold font-mono text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-xs">
                          {b}
                        </span>
                      ))}
                      <span className="bg-black/80 backdrop-blur-md text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                        <Camera className="h-2.5 w-2.5 text-art-gold" /> {prod.galleryImages?.length || 7} Editorial Angles
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod.id);
                      }}
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-art-charcoal hover:text-rose-600 shadow-md transition-all cursor-pointer border border-art-sand z-10"
                    >
                      <Heart className={`h-4 w-4 ${wishlist.includes(prod.id) ? 'fill-current text-rose-600' : ''}`} />
                    </button>

                    {/* Surah / Ayah Floating Tag */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex justify-between items-center text-white">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                        {prod.verse.surahNameEnglish} ({prod.verse.surah}:{prod.verse.ayah})
                      </span>
                      <span className="text-[10px] font-mono text-emerald-300 font-bold bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-emerald-400" /> Tanzil Verified
                      </span>
                    </div>
                  </div>

                  {/* Card Editorial Info */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono font-bold text-art-gold uppercase tracking-wider">
                        <span>{prod.category}</span>
                        <div className="flex items-center gap-1 text-amber-500 font-sans">
                          <Star className="h-3 w-3 fill-current text-amber-500" />
                          <span>{prod.rating.toFixed(1)} ({prod.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-art-charcoal leading-snug group-hover:text-art-gold transition-colors">
                        {prod.title}
                      </h3>

                      <p className="text-art-charcoal/70 text-xs leading-relaxed line-clamp-2">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-art-sand/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block text-[9px] text-art-charcoal/50 font-mono uppercase">Archival Fine Art Canvas</span>
                          <span className="text-lg font-serif font-bold text-art-charcoal">
                            {formatPrice(prod.price)} <span className="text-[9px] text-emerald-600 font-sans font-bold uppercase ml-1">Worldwide Shipping</span>
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setPreviewProduct(prod)}
                          className="bg-art-warm hover:bg-art-sand text-art-charcoal font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-wider transition-all border border-art-sand flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5 text-art-gold" /> {t('previewRoom')}
                        </button>

                        <button
                          onClick={() => handleCustomizeInStudio(prod)}
                          className="bg-art-charcoal hover:bg-art-charcoal/90 text-white font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Compass className="h-3.5 w-3.5 text-art-gold" /> Studio Editor
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* EDITORIAL STORYTELLING BRAND FOOTER SECTION */}
          <section className="bg-white p-8 sm:p-12 rounded-3xl border border-art-sand shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-art-gold font-mono font-bold text-[10px] uppercase tracking-widest">
                <Award className="h-4 w-4" /> Museum Quality Standards
              </div>
              <h3 className="font-serif font-bold text-art-charcoal text-base">300 DPI Fine Art Printing</h3>
              <p className="text-xs text-art-charcoal/70 leading-relaxed">
                Printed on 100% heavyweight cotton vellum canvas using UV-resistant pigment inks guaranteed for 100+ years without fading.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-art-gold font-mono font-bold text-[10px] uppercase tracking-widest">
                <ShieldCheck className="h-4 w-4" /> Tanzil Database
              </div>
              <h3 className="font-serif font-bold text-art-charcoal text-base">Cryptographic Text Integrity</h3>
              <p className="text-xs text-art-charcoal/70 leading-relaxed">
                Every Arabic letter, diacritic mark, and surah header is validated directly against the world's most trusted Quranic text authority.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-art-gold font-mono font-bold text-[10px] uppercase tracking-widest">
                <Globe className="h-4 w-4" /> POD Global Network
              </div>
              <h3 className="font-serif font-bold text-art-charcoal text-base">Local Precision Production</h3>
              <p className="text-xs text-art-charcoal/70 leading-relaxed">
                Orders are produced locally in our specialized print nodes across Europe, Gulf Cooperation Council, and North America to minimize carbon footprint and shipping times.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* QUICK PREVIEW / LUXURY MERCHANDISING GALLERY MODAL */}
      <AnimatePresence>
        {previewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-art-sand max-w-5xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row my-auto max-h-[92vh]">
              {/* Close Button */}
              <button
                onClick={() => {
                  setPreviewProduct(null);
                  setPreviewGalleryIndex(0);
                }}
                className="absolute top-4 right-4 z-40 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer shadow-lg"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left Column: Multi-Angle Gallery & Room View (60%) */}
              <div className="md:w-7/12 bg-art-charcoal p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[420px]">
                {/* Main View Display */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl my-auto bg-black/40 flex items-center justify-center">
                  {/* Render current selected gallery angle or Certificate */}
                  {previewGalleryIndex === 6 ? (
                    /* Interactive Certificate of Authenticity View */
                    <div className="w-full h-full bg-[#111111] p-6 text-white flex flex-col justify-between border-4 border-art-gold/40 relative font-serif">
                      <div className="flex justify-between items-start border-b border-art-gold/30 pb-3">
                        <div>
                          <span className="text-[9px] font-mono font-bold text-art-gold uppercase tracking-widest block">Official Certificate</span>
                          <h4 className="text-lg font-bold text-white tracking-wider">CERTIFICATE OF AUTHENTICITY</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-art-gold block">SEAL #{previewProduct.authenticitySeal || 'TANZIL-MA-2026-9942'}</span>
                          <span className="text-[8px] font-mono text-stone-400">Cryptographic Quranic Integrity</span>
                        </div>
                      </div>

                      <div className="my-auto space-y-2 text-center py-2">
                        <p className="text-[10px] text-stone-300 font-sans uppercase tracking-widest">Masterpiece Artwork</p>
                        <h3 className="text-xl font-serif text-art-gold italic">{previewProduct.title}</h3>
                        <p className="font-serif text-sm dir-rtl text-stone-200">{previewProduct.verse.arabicText}</p>
                        <p className="text-[10px] text-stone-400 font-sans italic max-w-sm mx-auto">"{previewProduct.verse.englishTranslation}"</p>
                      </div>

                      <div className="pt-3 border-t border-art-gold/30 flex justify-between items-end font-mono text-[9px] text-stone-400">
                        <div>
                          <p className="text-art-gold font-bold">100% Tanzil Scripture Verified</p>
                          <p>Giclée 12-Color Pigment • 350gsm Cotton Vellum</p>
                        </div>
                        <div className="w-12 h-12 bg-white/10 p-1 rounded border border-art-gold/40 flex items-center justify-center">
                          <div className="text-center text-[7px] text-art-gold font-bold">
                            QR TANZIL
                            <div className="w-8 h-8 bg-art-gold/20 mx-auto mt-0.5 rounded-xs border border-art-gold/50 flex items-center justify-center text-[6px]">
                              SECURE
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Regular Gallery Image with Floating Frame Simulator overlay */
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={
                          previewProduct.galleryImages && previewProduct.galleryImages[previewGalleryIndex]
                            ? previewProduct.galleryImages[previewGalleryIndex].url
                            : (previewRoomIndex === 0 ? moroccanSalonImg : previewProduct.image)
                        }
                        alt={previewProduct.title}
                        className="w-full h-full object-cover transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Floating Frame Simulation on Artwork angle */}
                      {previewGalleryIndex === 0 && (
                        <div 
                          className={`absolute transition-all duration-300 flex items-center justify-center p-3 text-center bg-white/95 rounded-xs shadow-2xl ${
                            selectedFrame === 'gold' ? 'border-[10px] border-art-gold shadow-art-gold/20' : 
                            selectedFrame === 'walnut' ? 'border-[10px] border-[#2C1E16]' : 
                            selectedFrame === 'black' ? 'border-[8px] border-black' : 'border-[8px] border-[#D4C3A3]'
                          }`}
                          style={{ left: '30%', top: '15%', width: '40%', height: '70%' }}
                        >
                          <div className="space-y-1">
                            <p className="font-serif text-sm text-art-charcoal font-bold dir-rtl">
                              {previewProduct.verse.arabicText}
                            </p>
                            <p className="text-[8px] text-art-charcoal/70 font-serif italic">
                              {previewProduct.verse.surahNameEnglish} ({previewProduct.verse.surah}:{previewProduct.verse.ayah})
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Image Category Label Badge */}
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-mono flex items-center gap-1.5 border border-white/20">
                        <Camera className="h-3 w-3 text-art-gold" />
                        {previewProduct.galleryImages && previewProduct.galleryImages[previewGalleryIndex]
                          ? previewProduct.galleryImages[previewGalleryIndex].label
                          : 'Masterpiece View'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Multi-angle Gallery Thumbnail Ribbon */}
                <div className="pt-4 space-y-2">
                  <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block text-left">
                    Editorial Merchandising Views ({previewProduct.galleryImages?.length || 1} Angles)
                  </span>
                  
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {previewProduct.galleryImages ? (
                      previewProduct.galleryImages.map((gImg, idx) => (
                        <button
                          key={gImg.id}
                          onClick={() => setPreviewGalleryIndex(idx)}
                          className={`relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            previewGalleryIndex === idx
                              ? 'border-art-gold ring-2 ring-art-gold/40 scale-105'
                              : 'border-white/20 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={gImg.url} alt={gImg.label} className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[7px] text-white font-mono text-center truncate px-0.5">
                            {gImg.category}
                          </span>
                        </button>
                      ))
                    ) : (
                      <button
                        onClick={() => setPreviewGalleryIndex(0)}
                        className="w-14 h-14 rounded-xl border-2 border-art-gold overflow-hidden"
                      >
                        <img src={previewProduct.image} alt={previewProduct.title} className="w-full h-full object-cover" />
                      </button>
                    )}

                    {/* Authenticity Certificate Tab Button */}
                    <button
                      onClick={() => setPreviewGalleryIndex(6)}
                      className={`relative flex-shrink-0 w-14 h-14 rounded-xl bg-art-charcoal border-2 transition-all cursor-pointer flex flex-col items-center justify-center p-1 text-center ${
                        previewGalleryIndex === 6
                          ? 'border-art-gold ring-2 ring-art-gold/40 bg-art-gold/20 scale-105'
                          : 'border-art-gold/40 text-art-gold hover:bg-white/10'
                      }`}
                    >
                      <ShieldCheck className="h-4 w-4 text-art-gold" />
                      <span className="text-[7px] font-mono text-art-gold font-bold uppercase mt-0.5 leading-none">
                        Tanzil Seal
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Product Customizer & Specs Details (40%) */}
              <div className="md:w-5/12 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto max-h-[85vh]">
                <div className="space-y-5 text-left">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold text-art-gold uppercase tracking-widest block">
                      {previewProduct.category}
                    </span>
                    <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                      In Stock • Ships in 48h
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-serif font-bold text-art-charcoal leading-tight">
                    {previewProduct.title}
                  </h2>

                  {/* Verified Scripture Card */}
                  <div className="p-3.5 bg-art-warm rounded-2xl border border-art-sand space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-art-gold uppercase">Surah {previewProduct.verse.surahNameEnglish} ({previewProduct.verse.surah}:{previewProduct.verse.ayah})</span>
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <p className="font-serif font-bold text-base text-art-charcoal dir-rtl leading-relaxed">{previewProduct.verse.arabicText}</p>
                    <p className="text-[11px] text-art-charcoal/80 italic">"{previewProduct.verse.englishTranslation}"</p>
                  </div>

                  {/* Floating Frame Selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-art-gold uppercase tracking-wider block">
                      Bespoke Frame Selection
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      {[
                        { id: 'gold', name: '✨ 24K Gold Foil', desc: 'Florentine Gold' },
                        { id: 'walnut', name: '🪵 American Walnut', desc: 'Dark Beveled Wood' },
                        { id: 'black', name: '🖤 Brushed Onyx', desc: 'Matte Anodized' },
                        { id: 'oak', name: '🌾 Natural Birch', desc: 'Nordic Oak' }
                      ].map(frame => (
                        <button
                          key={frame.id}
                          onClick={() => setSelectedFrame(frame.id as any)}
                          className={`p-2.5 rounded-xl border text-[10px] font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                            selectedFrame === frame.id
                              ? 'bg-art-charcoal text-white border-art-charcoal shadow-sm'
                              : 'bg-art-warm hover:bg-art-sand text-art-charcoal border-art-sand'
                          }`}
                        >
                          <span>{frame.name}</span>
                          <span className="text-[8px] opacity-70 font-normal">{frame.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Canvas Size Selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-art-gold uppercase tracking-wider block">
                      Canvas Dimensions
                    </label>
                    <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
                      {(previewProduct.dimensionsAvailable || ['18x24"', '24x36"', '30x40"']).map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedCanvasSize(size)}
                          className={`py-2 px-1 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                            selectedCanvasSize === size
                              ? 'bg-art-charcoal text-white border-art-charcoal shadow-sm'
                              : 'bg-art-warm hover:bg-art-sand text-art-charcoal border-art-sand'
                          }`}
                        >
                          {size.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Material & Craftsmanship Specifications */}
                  <div className="pt-2 space-y-2 border-t border-art-sand/80">
                    <span className="text-[9px] font-mono font-bold text-art-gold uppercase tracking-wider block">
                      Craftsmanship & Substrate
                    </span>
                    <ul className="text-[10px] text-art-charcoal/80 space-y-1 font-sans">
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-art-gold" /> 350gsm 100% Cotton Archival Vellum
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-art-gold" /> 12-Color Giclée Pigment Print (600 DPI)
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-art-gold" /> Anti-Reflective Museum Acrylic Glass
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-art-gold" /> Tanzil Verified Scripture Certificate
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Pricing & Primary Actions */}
                <div className="space-y-3 pt-4 border-t border-art-sand">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-[10px] font-mono text-art-charcoal/60 uppercase block">Total Bespoke Price</span>
                      <span className="text-2xl font-serif font-bold text-art-charcoal">{formatPrice(previewProduct.price)}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      Free Global Express Shipping
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        triggerNotification(`Added "${previewProduct.title}" (${selectedCanvasSize}, ${selectedFrame} Frame) to cart!`);
                        setPreviewProduct(null);
                      }}
                      className="w-full bg-art-charcoal hover:bg-art-charcoal/90 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="h-4 w-4 text-art-gold" /> Add Framed Canvas to Cart
                    </button>

                    <button
                      onClick={() => {
                        handleCustomizeInStudio(previewProduct);
                        setPreviewProduct(null);
                      }}
                      className="w-full bg-art-warm hover:bg-art-sand text-art-charcoal font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all border border-art-sand flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Compass className="h-4 w-4 text-art-gold" /> Customize Text in Studio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================= TAB 2: AI TREND RADAR ======================= */}
      {activeTab === 'trends' && (
        <div className="space-y-10 animate-in fade-in duration-300 text-left">
          <div className="bg-art-charcoal text-white rounded-3xl p-8 border border-art-gold/30 shadow-xl">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-art-gold/20 text-[9px] font-mono tracking-widest text-art-gold font-bold uppercase">
                <Activity className="h-3 w-3 text-art-gold" /> Active AI Trend Radar
              </span>
              <h2 className="text-3xl font-serif font-light leading-tight">
                Global Quranic <span className="italic text-art-gold">Design Intelligence</span>
              </h2>
              <p className="text-stone-300 text-xs font-light max-w-xl leading-relaxed">
                Mapping aesthetic search trends across Pinterest, Etsy, and architectural blogs to regional Quranic artwork demands.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trends.map(trend => (
              <div key={trend.id} className="bg-white rounded-2xl border border-art-sand p-6 space-y-4 shadow-xs">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold text-art-gold uppercase">{trend.country}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {trend.growth}
                  </span>
                </div>

                <h4 className="text-base font-serif font-bold text-art-charcoal">{trend.topic}</h4>
                <p className="text-xs text-art-charcoal/70 leading-relaxed">{trend.description}</p>

                <div className="pt-3 border-t border-art-sand flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-art-charcoal/60">Suggested Verse: <strong>{trend.surah}</strong></span>
                  <button
                    onClick={() => triggerNotification(`Synthesizing assets for ${trend.topic}...`)}
                    className="text-art-gold font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
                  >
                    <span>Synthesize</span> <Sparkles className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= TAB 3: FULFILLMENT & MARGINS ======================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in duration-300 text-left">
          <div className="border-b border-art-sand pb-3">
            <h2 className="text-xl font-serif font-bold text-art-charcoal uppercase tracking-wider">Atelier Performance Dashboard</h2>
            <p className="text-xs text-art-charcoal/60 mt-0.5">Financial analytics and print-on-demand fulfillment matrix.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Cumulative Revenue', val: '$14,842.00', change: '+24% this week', icon: DollarSign, color: 'text-emerald-600' },
              { label: 'Completed Deliveries', val: '74 units', change: '100% fulfill rating', icon: ShoppingBag, color: 'text-amber-600' },
              { label: 'Store Profit Margins', val: `${marginPercent}%`, change: `Profit: $${profitMargin.toFixed(0)}/canvas`, icon: Percent, color: 'text-blue-600' },
              { label: 'Pre-flight QC Pass', val: '98.4%', change: 'Tanzil verified', icon: ShieldCheck, color: 'text-art-gold' }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-art-sand p-5 space-y-2 shadow-xs">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-art-charcoal/50 font-mono uppercase tracking-wider">{card.label}</span>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <h3 className="text-xl font-serif font-extrabold text-art-charcoal">{card.val}</h3>
                  <p className="text-[10px] text-art-charcoal/60 font-mono">{card.change}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================= TAB 4: CLIENT VAULT ======================= */}
      {activeTab === 'vault' && (
        <div className="space-y-8 animate-in fade-in duration-300 text-left">
          <div className="border-b border-art-sand pb-3">
            <h2 className="text-xl font-serif font-bold text-art-charcoal uppercase tracking-wider">Client Vault & Order History</h2>
            <p className="text-xs text-art-charcoal/60 mt-0.5">Your saved Quranic canvas compositions and active production tracking.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-art-sand space-y-4">
              <h3 className="font-serif font-bold text-sm text-art-charcoal flex items-center gap-2">
                <Folder className="h-4 w-4 text-art-gold" /> Saved Studio Designs ({savedDesigns.length})
              </h3>
              {savedDesigns.map(design => (
                <div key={design.id} className="p-4 bg-art-warm rounded-xl border border-art-sand flex justify-between items-center">
                  <div>
                    <h4 className="font-serif font-bold text-xs text-art-charcoal">{design.title}</h4>
                    <span className="text-[10px] font-mono text-art-gold font-bold block mt-0.5">{design.verseName} • {design.presetName}</span>
                  </div>
                  <button
                    onClick={() => triggerNotification("Opening saved design in Canvas Studio...")}
                    className="bg-art-charcoal text-white font-bold px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider cursor-pointer"
                  >
                    Load in Studio
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-art-sand space-y-4">
              <h3 className="font-serif font-bold text-sm text-art-charcoal flex items-center gap-2">
                <Clock className="h-4 w-4 text-art-gold" /> Recent Orders & Fulfillment Tracking
              </h3>
              {mockOrders.map(order => (
                <div key={order.id} className="p-4 bg-art-warm rounded-xl border border-art-sand space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-art-charcoal">{order.id}</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">{order.status}</span>
                  </div>
                  <p className="text-xs text-art-charcoal/70">{order.items[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
