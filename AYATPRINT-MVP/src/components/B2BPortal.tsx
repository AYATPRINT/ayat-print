import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building, Calendar, TrendingUp, GraduationCap, Award, Compass, 
  DollarSign, Clipboard, ShieldCheck, FileText, Download, ArrowRight, 
  Sparkles, Check, CheckCircle2, Printer, Image, Users, Upload, Clock, 
  Plus, Minus, MapPin, Percent, Phone, Mail, BookOpen
} from 'lucide-react';
import { jsPDF } from 'jspdf';

// B2B Offerings Categories and Products Data
interface B2BProduct {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  orderPattern: string;
  benefit: string;
  specs: string[];
}

interface B2BCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  bgGradient: string;
  description: string;
  products: B2BProduct[];
}

const B2B_CATEGORIES: B2BCategory[] = [
  {
    id: 'mosque',
    title: '🕌 Mosque Collection',
    icon: <Building className="h-5 w-5 text-amber-500" />,
    bgGradient: 'from-emerald-950 to-[#022c22]',
    description: 'Elevate prayer halls and entryways with majestic multi-piece canvases, massive centerpiece panels, and Rub el Hizb geometric installations.',
    products: [
      {
        id: 'mosque-canvas-set',
        name: 'Prayer Hall Canvas Collection',
        description: 'Bespoke 3, 5, or 7-piece premium luxury canvas sets featuring Ayatul Kursi, Surah Ar-Rahman, or Surah Yasin. Gilded in 24K gold ink overlays on rich marble backgrounds.',
        priceRange: '$890 - $2,400',
        orderPattern: 'One-time, high value',
        benefit: 'Establishes a spiritual sanctuary with unified museum-grade typography.',
        specs: ['Solid Floating Wood or Brushed Aluminum Frames', 'Tanzil-verified pristine diacritics', 'Optional custom mosque logo/seal integration']
      },
      {
        id: 'mosque-mihrab',
        name: 'Mihrab Statement Centerpiece',
        description: 'Extra-large monolithic centerpiece (up to 60" × 40") crafted with contemporary Islamic geometric borders and central focal calligraphy.',
        priceRange: '$1,200 - $1,950',
        orderPattern: 'One-time project',
        benefit: 'Architecturally integrated focal point designed for high-altitude visual impact.',
        specs: ['Anti-glare museum acrylic face', 'Custom architectural border matches Masjid molding', 'Integrated backlighting guide specs']
      },
      {
        id: 'mosque-99names',
        name: '99 Names of Allah Installation',
        description: 'Multi-panel modern typographic masterpiece ideal for main entrances, hallways, and core prayer hall back walls.',
        priceRange: '$2,500 - $4,800',
        orderPattern: 'One-time, institutional landmark',
        benefit: 'Deep contemplative visual landscape spanning up to 20 feet of wall space.',
        specs: ['99 individual custom-gilded composite tiles', 'Simple alignment template included', 'Available in Emerald Gold or Charcoal Ivory']
      }
    ]
  },
  {
    id: 'seasonal',
    title: '🌙 Ramadan & Eid Products',
    icon: <Calendar className="h-5 w-5 text-amber-500" />,
    bgGradient: 'from-[#0d1b2a] to-[#1b263b]',
    description: 'Keep the congregation engaged and welcome sponsors with yearly, highly professional event backdrops, timetable boards, and entrance banners.',
    products: [
      {
        id: 'ramadan-welcome',
        name: 'Ramadan Welcome & Eid Entrance Banners',
        description: 'Stunning high-impact entry banners with majestic crescent layouts and greeting calligraphy designed to elevate mosque doors and facade gates.',
        priceRange: '$150 - $350',
        orderPattern: 'Annual seasonal repeat',
        benefit: 'Pre-configures a celebratory, welcoming ambiance for families and visitors.',
        specs: ['Heavy-duty 15oz outdoor blockout vinyl', 'Brass rust-resistant grommets every 24"', 'Wind-resistant mesh options available']
      },
      {
        id: 'ramadan-timetable',
        name: 'Premium Prayer Timetable Boards',
        description: 'Elegant custom timetable displays featuring daily Suhoor and Iftar timings. Dry-erase writable overlay or integrated digital mount templates.',
        priceRange: '$220 - $450',
        orderPattern: 'Annual upgrade / replacement',
        benefit: 'Displays vital scheduling info clearly in a gorgeous, high-contrast frame.',
        specs: ['Ultra-clear dry-erase scratch-resistant finish', 'Custom-branded with your mosque\'s prayer times & logo', 'Includes mounting hardware kit']
      },
      {
        id: 'ramadan-sponsor',
        name: 'Iftar Sponsor & Campaign Boards',
        description: 'Donor appreciation and sponsor recognition boards used during daily Ramadan community dinners and fundraising campaign milestones.',
        priceRange: '$180 - $380',
        orderPattern: 'Campaign-based seasonal repeat',
        benefit: 'Encourages charity (Sadaqah) by honoring community-supported hospitality.',
        specs: ['Premium 1/4" polished edge crystal acrylic', 'Sponsor logo card slots for interchangeable inserts', 'Anodized gold standoff mountings']
      }
    ]
  },
  {
    id: 'fundraising',
    title: '📊 Fundraising Products',
    icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
    bgGradient: 'from-amber-950 to-stone-900',
    description: 'Visually communicate project goals and honor major donors with heavy-duty donation trackers, donor walls, and building campaign progress boards.',
    products: [
      {
        id: 'fund-thermometer',
        name: 'Acrylic Donation Thermometer Boards',
        description: 'Interactive dry-erase or sliding-marker donation progress trackers that visually motivate the congregation toward campaign milestones.',
        priceRange: '$290 - $590',
        orderPattern: 'Campaign-based repeat',
        benefit: 'Proven to boost community contributions via active gamified tracking.',
        specs: ['High-gloss durable acrylic', 'Bright, high-visibility visual scale', 'Personalized mosque expansion rendering']
      },
      {
        id: 'fund-donorwall',
        name: 'Waqf & Sponsor Recognition Walls',
        description: 'Multi-tiered sponsor recognition walls and building donation block plaques that permanently honor contributors to construction and endowments.',
        priceRange: '$1,500 - $6,500',
        orderPattern: 'One-time project / phase expansion',
        benefit: 'Creates a legacy of gratitude and encourages future Waqf endowment investors.',
        specs: ['Expandable modular layout', 'Laser-engraved solid brass, aluminum, or acrylic tiles', 'Premium oak background panel option']
      },
      {
        id: 'fund-qr',
        name: 'Digital QR Smart Donation Signs',
        description: 'High-contrast signs placed at exits, pillars, and lecture halls featuring custom QR codes linked directly to your digital donation systems.',
        priceRange: '$45 - $95',
        orderPattern: 'Ongoing as needed',
        benefit: 'Bridges traditional lecture spaces with instant, contactless mobile giving.',
        specs: ['Heavy desk-stand acrylic bases', 'Glossy gold-gilt margins', 'Pre-linked to Stripe, PayPal, or mosque merchant app']
      }
    ]
  },
  {
    id: 'school',
    title: '📚 Madrasa & Islamic School Collection',
    icon: <GraduationCap className="h-5 w-5 text-amber-500" />,
    bgGradient: 'from-blue-950 to-slate-900',
    description: 'Transform learning environments with clear, engaging, and beautiful Arabic educational posters, prayer guides, and motivational canvases.',
    products: [
      {
        id: 'school-alphabet',
        name: 'Arabic Alphabet & Tajweed Poster Bundles',
        description: 'Vibrant, high-contrast visual guides showing Arabic letter variations, articulation points (Makharij), and Tajweed color-coded rules.',
        priceRange: '$120 - $350 (Bundle)',
        orderPattern: 'Multiple classrooms, annual re-equipping',
        benefit: 'Accelerates child and adult literacy with clear, legible display typography.',
        specs: ['Heavyweight 250gsm satin-finish tear-resistant paper', 'Matte lamination to eliminate classroom glare', 'Available in sets of 4, 8, or 12 posters']
      },
      {
        id: 'school-prayer',
        name: 'Step-by-Step Prayer & Daily Dua Guides',
        description: 'Visual step-by-step illustrations of Wudu, prayer postures (Salah), and core daily prayers/supplications (Adhkar) designed for students.',
        priceRange: '$90 - $180',
        orderPattern: 'Classroom sets',
        benefit: 'Aids self-guided learning and instills standard prayer habits.',
        specs: ['Highly engaging clean illustrations', 'English transliteration and translation side-by-side', 'Safe, durable rounded-corner sheets']
      },
      {
        id: 'school-motivation',
        name: 'Classroom Canvas Motivational Set',
        description: 'Inspirational Islamic quotes from the Quran and Sunnah focusing on knowledge, patience, and character (Akhlaq), framed in a modern youth aesthetic.',
        priceRange: '$180 - $480',
        orderPattern: 'One-time per classroom project',
        benefit: 'Builds a positive, growth-oriented mindset grounded in sacred values.',
        specs: ['Acid-free archival canvas', 'Eco-friendly water-based VOC-free inks', 'Lightweight and exceptionally easy to hang']
      }
    ]
  },
  {
    id: 'awards',
    title: '🎁 Gift & Recognition',
    icon: <Award className="h-5 w-5 text-amber-500" />,
    bgGradient: 'from-stone-900 to-[#1c1917]',
    description: 'Celebrate milestones and express deep institutional gratitude with custom-engraved certificates, plaques, and premium acrylic awards.',
    products: [
      {
        id: 'awards-plaques',
        name: 'Imam & Volunteer Appreciation Plaques',
        description: 'Elite recognition awards to honor departing scholars, long-serving volunteers, or generous capital donors.',
        priceRange: '$75 - $180',
        orderPattern: 'Ongoing as needed',
        benefit: 'Expresses elegant, dignified gratitude that recipients proudly display in offices.',
        specs: ['Solid optical crystal or heavy smoked acrylic', 'Deep sandblast engraving filled with 24K gold pigments', 'Includes luxurious satin-lined velvet presentation case']
      },
      {
        id: 'awards-certificates',
        name: 'Graduation, Hifz & Nikah Certificates',
        description: 'Premium certificates with custom arabesque borders, intricate security guilloché patterns, and verified calligraphy for special milestones.',
        priceRange: '$50 - $120 (Pack of 20)',
        orderPattern: 'Ongoing/Annual graduation cycle',
        benefit: 'Provides graduates and families with a breathtaking, archival-quality keepsake.',
        specs: ['100% cotton rag heavy textured parchment paper', 'Embossed gold foil seals', 'Compatible with standard calligraphy ink and calligraphy pens']
      }
    ]
  },
  {
    id: 'branding',
    title: '🏢 Islamic Center Wayfinding & Signage',
    icon: <Users className="h-5 w-5 text-amber-500" />,
    bgGradient: 'from-[#1E1B18] to-stone-900',
    description: 'Ensure clean navigation and dignified space separation with custom-tailored wayfinding signage for administrative offices, wudu areas, and prayer halls.',
    products: [
      {
        id: 'branding-wayfinding',
        name: 'Directional, Wudu & Section Signage',
        description: 'Modern signage boards indicating the Main Prayer Hall, Women\'s Section, Wudu Areas, Restrooms, and Offices. Features clear Arabic and English text.',
        priceRange: '$45 - $120 per sign',
        orderPattern: 'Renovation or new project',
        benefit: 'Ensures fluid visitor traffic flow and maintains aesthetic unity across the facility.',
        specs: ['Waterproof, humidity-resistant aluminum composite', 'Clear braille options and high-contrast pictograms', '3D floating standoff mountings or double-sided ceiling suspensions']
      }
    ]
  }
];

// Premium Curated B2B Packages
interface B2BPackage {
  id: string;
  name: string;
  badge: string;
  description: string;
  items: string[];
  basePrice: number;
  savings: string;
}

const B2B_PACKAGES: B2BPackage[] = [
  {
    id: 'pkg-starter',
    name: 'Starter Mosque Package',
    badge: 'Essential Sanctuary',
    description: 'Perfect for newly opened community centers or smaller prayer halls looking to establish an elegant, unified visual aesthetic.',
    items: [
      '5-Piece Grand Canvas Set (Ayat al-Kursi, central theme, 120cm span)',
      '1x Premium Welcome Foyer Banner (6ft x 3ft heavy duty blockout)',
      '1x Dry-Erase Custom Branded Prayer Timetable Board (A2 size)'
    ],
    basePrice: 1150,
    savings: 'Save $240 compared to individual ordering'
  },
  {
    id: 'pkg-ramadan',
    name: 'Seasonal Ramadan Campaign Package',
    badge: 'Seasonal Best Seller',
    description: 'Equip your community fully for the busiest month of the year with welcome signage, donor recognition tools, and community branding assets.',
    items: [
      '2x Large Outdoor Welcome & Eid Entrance Banners (8ft x 4ft mesh or vinyl)',
      '1x Custom Acrylic Iftar Sponsor Board with interchangeable cards',
      '1x Writable Dry-Erase Ramadan & Prayer Timetable Board (A1 massive)',
      '20x Smart QR Code Table/Pillar Standee Signs for frictionless charity'
    ],
    basePrice: 1450,
    savings: 'Save $320 + includes free priority air shipping'
  },
  {
    id: 'pkg-complete',
    name: 'Complete Mosque Branding Transformation',
    badge: 'Full Architectural Upgrade',
    description: 'A comprehensive visual overhaul for major Islamic centers. Covers the main sanctuary prayer hall, entrance ways, administrative offices, and classrooms.',
    items: [
      '1x Mihrab Monolithic Centerpiece Canvas (60" x 40" fine art print with gold gilt)',
      '1x Rub el Hizb 99 Names of Allah Wall Installation (40-tile layout, 12ft span)',
      '1x Waqf & Building Expansion Progress Thermometer Sign (120cm tall)',
      '10x Custom Acrylic Room Plates (Offices, Prayer Hall, Wudu, Sister\'s Area)',
      '5x Classrooms Educational Poster Bundles + Step-by-Step Prayer Guides'
    ],
    basePrice: 4800,
    savings: 'Save $1,150 + includes personal CAD layout custom consulting'
  }
];

export default function B2BPortal() {
  const [selectedCategory, setSelectedCategory] = useState<string>('mosque');
  const [activePackage, setActivePackage] = useState<string>('pkg-starter');
  
  // Custom Mosque Customizer States
  const [mosqueName, setMosqueName] = useState('Al-Noor Islamic Center');
  const [contactName, setContactName] = useState('Dr. Tariq Ahmed');
  const [contactEmail, setContactEmail] = useState('board@alnooric.org');
  const [contactPhone, setContactPhone] = useState('+1 (555) 786-1924');
  const [customNotes, setCustomNotes] = useState('We would prefer the Emerald Gold palette for the Prayer Hall canvas sets to match our carpet molding.');
  const [selectedFrame, setSelectedFrame] = useState<'wood' | 'aluminum' | 'frameless'>('wood');
  const [includeInstallationKit, setIncludeInstallationKit] = useState(true);
  
  // Interactive Fundraising Thermometer Simulator States
  const [thermTarget, setThermTarget] = useState(100000);
  const [thermCurrent, setThermCurrent] = useState(65000);
  const [thermColor, setThermColor] = useState('#022c22'); // Emerald by default

  // TIMETABLE PREVIEW STATE
  const [fajrTime, setFajrTime] = useState('4:45 AM');
  const [dhuhrTime, setDhuhrTime] = useState('1:15 PM');
  const [asrTime, setAsrTime] = useState('5:30 PM');
  const [maghribTime, setMaghribTime] = useState('8:22 PM');
  const [ishaTime, setIshaTime] = useState('9:50 PM');

  // Quotation Success state
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);
  const [quoteSuccessMessage, setQuoteSuccessMessage] = useState<string | null>(null);

  // Calculate pricing based on selections
  const currentPkgDetails = B2B_PACKAGES.find(p => p.id === activePackage) || B2B_PACKAGES[0];
  const frameUpcharge = selectedFrame === 'wood' ? 150 : selectedFrame === 'aluminum' ? 220 : 0;
  const installationFee = includeInstallationKit ? 45 : 0;
  const subtotal = currentPkgDetails.basePrice + frameUpcharge + installationFee;
  const volumeDiscount = Math.round(subtotal * 0.15); // 15% automatic B2B institutional discount
  const finalTotal = subtotal - volumeDiscount;

  const handleIncrementTherm = (amt: number) => {
    setThermCurrent(prev => Math.min(thermTarget, Math.max(0, prev + amt)));
  };

  // Automated B2B Proposal PDF Generator using jsPDF
  const generateB2BQuotePDF = async () => {
    setIsGeneratingQuote(true);
    try {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      // A4 is 210 x 297 mm
      const margin = 18;
      
      // Color scheme (Emerald Green and Elegant Gold)
      const primaryColor = [2, 44, 34]; // Emerald
      const goldColor = [197, 160, 89]; // Gold
      const darkColor = [28, 25, 23]; // Charcoal
      const grayColor = [110, 115, 120];

      // 1. Decorative Border Header
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 15, 'F');
      
      // Thin Gold Stripe under header block
      doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
      doc.rect(0, 15, 210, 2.5, 'F');

      // 2. Brand Identity Block
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(26);
      doc.text('AYATPRINT', margin, 32);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      doc.text('Sacred Art & Institutional Visual Branding Atelier', margin, 37);
      doc.text('Tanzil Quranic Verification Network Verified • AyatPrint B2B', margin, 41);

      // Quote Metadata (Right Side)
      const rightAlignX = 150;
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.text('PROPOSAL FOR:', rightAlignX, 32);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(mosqueName, rightAlignX, 37);
      doc.text(contactName, rightAlignX, 41);
      doc.text(contactEmail, rightAlignX, 45);
      doc.text(contactPhone, rightAlignX, 49);

      // Divider line
      doc.setDrawColor(220, 215, 205);
      doc.setLineWidth(0.4);
      doc.line(margin, 54, 210 - margin, 54);

      // 3. Document Title
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('OFFICIAL B2B INSTITUTIONAL PROPOSAL', margin, 62);

      // Invoice / Quote Info Box
      const dateStr = new Date().toISOString().slice(0, 10);
      const expiryDateStr = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      
      doc.text(`Proposal Ref: AP-B2B-${Math.floor(100000 + Math.random() * 900000)}`, margin, 68);
      doc.text(`Date Generated: ${dateStr}`, margin, 72);
      doc.text(`Validity Period: 30 Days (Expires: ${expiryDateStr})`, margin, 76);
      doc.text(`Target Package: ${currentPkgDetails.name}`, margin, 80);

      // 4. Custom Configuration Breakdown Section
      doc.setFillColor(250, 249, 245);
      doc.rect(margin, 85, 210 - 2 * margin, 24, 'F');
      doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
      doc.setLineWidth(0.3);
      doc.rect(margin, 85, 210 - 2 * margin, 24, 'D');

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Atelier Design Specifications Selected:', margin + 4, 91);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.text(`• Selected Frame System: ${selectedFrame.toUpperCase()} (Floating Solid Wood or Premium Aluminum)`, margin + 4, 96);
      doc.text(`• Mounting & Leveling Accessory Kit: ${includeInstallationKit ? 'Included (Anti-Theft Securing Studs)' : 'Omitted'}`, margin + 4, 100);
      doc.text(`• Authenticated Text Verification: Dynamic Tanzil Engine Real-time Active`, margin + 4, 104);

      // 5. Itemized Order Table
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Estimated Package Deliverables:', margin, 116);

      // Table Header Row
      let startY = 121;
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(margin, startY, 210 - 2 * margin, 7.5, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('Itemized Product Description', margin + 3, startY + 5);
      doc.text('Type', 130, startY + 5);
      doc.text('Est. Value', 170, startY + 5);

      // Table Rows
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8);

      let rowY = startY + 7.5;
      
      // Print individual items from package
      currentPkgDetails.items.forEach((item, index) => {
        // Draw light zebra striping
        if (index % 2 === 1) {
          doc.setFillColor(245, 244, 240);
          doc.rect(margin, rowY, 210 - 2 * margin, 8.5, 'F');
        }
        
        doc.text(item.length > 70 ? item.slice(0, 68) + '...' : item, margin + 3, rowY + 5.5);
        doc.text('Bespoke POD', 130, rowY + 5.5);
        doc.text('Included', 170, rowY + 5.5);
        
        // draw row bottom divider line
        doc.setDrawColor(235, 230, 220);
        doc.line(margin, rowY + 8.5, 210 - margin, rowY + 8.5);
        rowY += 8.5;
      });

      // Frame selection upcharge row
      if (frameUpcharge > 0) {
        doc.setFillColor(252, 250, 245);
        doc.rect(margin, rowY, 210 - 2 * margin, 8.5, 'F');
        doc.text(`Premium Frame Package - Double Gilt Frame Type (${selectedFrame.toUpperCase()})`, margin + 3, rowY + 5.5);
        doc.text('Solid Wood/Alum', 130, rowY + 5.5);
        doc.text(`$${frameUpcharge}.00`, 170, rowY + 5.5);
        doc.line(margin, rowY + 8.5, 210 - margin, rowY + 8.5);
        rowY += 8.5;
      }

      // Installation accessories row
      if (installationFee > 0) {
        doc.text(`Mosque Leveling, Aligning & Hanging Template Kit`, margin + 3, rowY + 5.5);
        doc.text('Heavy Hardware', 130, rowY + 5.5);
        doc.text(`$${installationFee}.00`, 170, rowY + 5.5);
        doc.line(margin, rowY + 8.5, 210 - margin, rowY + 8.5);
        rowY += 8.5;
      }

      // Spacer
      rowY += 5;

      // 6. Pricing Summary and Discounts (Right Aligned)
      const pricingStartX = 120;
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text('Package Base Rate:', pricingStartX, rowY);
      doc.text(`$${currentPkgDetails.basePrice.toFixed(2)}`, 170, rowY);
      
      rowY += 5;
      doc.text('Frame Selection Surcharges:', pricingStartX, rowY);
      doc.text(`$${frameUpcharge.toFixed(2)}`, 170, rowY);
      
      rowY += 5;
      doc.text('Hanging & Mounting Kit:', pricingStartX, rowY);
      doc.text(`$${installationFee.toFixed(2)}`, 170, rowY);

      rowY += 55 / 10; // offset
      // Underline before totals
      doc.setDrawColor(180, 175, 160);
      doc.line(pricingStartX, rowY, 192, rowY);
      rowY += 4;

      doc.setFont('Helvetica', 'bold');
      doc.text('Gross Subtotal:', pricingStartX, rowY);
      doc.text(`$${subtotal.toFixed(2)}`, 170, rowY);

      rowY += 5;
      doc.setTextColor(30, 130, 76); // Emerald Green color
      doc.text('Mosque / School Discount (15%):', pricingStartX, rowY);
      doc.text(`-$${volumeDiscount.toFixed(2)}`, 170, rowY);

      rowY += 5;
      doc.text('Shipping & Handling (Freight Insured):', pricingStartX, rowY);
      doc.text('FREE', 170, rowY);

      rowY += 2;
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.6);
      doc.line(pricingStartX, rowY, 192, rowY);
      rowY += 5;

      doc.setFontSize(10.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Bespoke Net Investment:', pricingStartX, rowY);
      doc.text(`$${finalTotal.toFixed(2)}`, 170, rowY);

      // 7. Custom Notes Box (Bottom Left)
      const notesBoxY = rowY - 32;
      doc.setFillColor(254, 253, 250);
      doc.rect(margin, notesBoxY, 95, 36, 'F');
      doc.setDrawColor(220, 215, 205);
      doc.setLineWidth(0.2);
      doc.rect(margin, notesBoxY, 95, 36, 'D');

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Special Prepress Custom Instructions:', margin + 4, notesBoxY + 5);
      
      doc.setFont('Helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      
      // Wrap custom notes text
      const notesLines = doc.splitTextToSize(customNotes, 87);
      notesLines.slice(0, 5).forEach((line: string, i: number) => {
        doc.text(line, margin + 4, notesBoxY + 10 + (i * 4));
      });

      // 8. Terms and prepress details (Bottom)
      rowY = Math.max(rowY + 14, notesBoxY + 42);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Institutional Procurement Terms:', margin, rowY);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      doc.text('1. Production lead-time is 7-10 business days from layout signoff. Each set is custom-assembled.', margin, rowY + 4);
      doc.text('2. Payments are structured Net 30 upon delivery for certified non-profit mosques and schools.', margin, rowY + 8);
      doc.text('3. Fine Art PDFs with 3mm print bleeds, CMYK color profiles, and crop marks will be supplied for digital archives.', margin, rowY + 12);

      // Prepress Seal Sign-off
      const footerY = 278;
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 290, 210, 7, 'F'); // Bottom border

      doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
      doc.circle(margin + 12, footerY - 5, 8, 'S');
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(5);
      doc.text('TANZIL', margin + 9, footerY - 6.5);
      doc.text('VERIFIED', margin + 8.5, footerY - 4);
      doc.text('INTEGRITY', margin + 8.5, footerY - 1.5);

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Atelier Prepress Master Signature', margin + 25, footerY - 6);
      doc.line(margin + 25, footerY - 4, margin + 75, footerY - 4);
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.text('AyatPrint Professional Prepress Office Authorized Sign-off', margin + 25, footerY - 1);

      // Trigger pdf download
      doc.save(`AyatPrint_B2B_Proposal_${mosqueName.replace(/\s+/g, '_')}.pdf`);
      
      setQuoteSuccessMessage(`Masha\'Allah! Professional B2B PDF Proposal compiled for ${mosqueName}. File downloaded successfully.`);
      setTimeout(() => setQuoteSuccessMessage(null), 8000);
    } catch (e) {
      console.error('B2B Quote PDF generation failed:', e);
    } finally {
      setIsGeneratingQuote(false);
    }
  };

  return (
    <div className="space-y-12 py-4 px-1 text-art-charcoal">
      
      {/* 1. HERO PITCH BANNER */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl border border-emerald-900 bg-emerald-950">
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-repeat" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")' }}></div>
        <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-emerald-800/25 blur-3xl"></div>
        <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl"></div>

        <div className="relative z-10 p-8 md:p-12 max-w-4xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-[9px] font-mono tracking-widest text-amber-200 font-bold uppercase">
            🕌 COMPLETE VISUAL BRANDING PARTNER
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-white font-medium leading-tight">
            Premium Institutional Solutions for <br />
            <span className="italic text-amber-400 font-serif font-semibold">Mosques, Madrasas & Islamic Organizations</span>
          </h1>
          <p className="text-stone-300 text-xs md:text-sm leading-relaxed max-w-3xl font-light">
            AyatPrint provides high-margin, professional visual solutions designed to withstand high-altitude prayer hall walls, celebrate annual seasonal milestones, and actively support your fundraising goals. Backed by absolute Tanzil text security.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-stone-200">
              <Check className="h-4 w-4 text-amber-400" />
              <span>15% Flat Mosque Discount</span>
            </div>
            <div className="flex items-center gap-2 text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-stone-200">
              <Check className="h-4 w-4 text-amber-400" />
              <span>Free Insured Cargo Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-stone-200">
              <Check className="h-4 w-4 text-amber-400" />
              <span>Free CAD Layout Layout Consultation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC EXPLORATION CATALOG GRID */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-art-sand pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A059] uppercase block">Explore Collections</span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-900 mt-1">Browse Sacred Institutional Signage & Decor</h2>
          </div>
          
          {/* Quick Selection Pills */}
          <div className="flex gap-2 overflow-x-auto max-w-full pb-1">
            {B2B_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-stone-950 border-stone-950 text-white shadow-md'
                    : 'bg-white border-stone-200 hover:border-amber-500/50 text-stone-600'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category Feature Display */}
        {(() => {
          const cat = B2B_CATEGORIES.find(c => c.id === selectedCategory)!;
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Category Sidebar Column */}
              <div className={`lg:col-span-4 rounded-3xl p-6 text-white bg-gradient-to-br ${cat.bgGradient} flex flex-col justify-between border border-stone-800 shadow-md relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-repeat" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")' }}></div>
                <div className="space-y-4 relative z-10">
                  <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-serif font-bold tracking-tight">{cat.title}</h3>
                  <p className="text-[11.5px] text-stone-300 leading-relaxed font-light">{cat.description}</p>
                </div>
                
                <div className="pt-8 space-y-3 border-t border-white/10 relative z-10 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-stone-400 uppercase">Typical Pattern:</span>
                    <span className="font-semibold text-amber-300">Ongoing Seasonal / Project</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 uppercase">Verification Level:</span>
                    <span className="font-semibold text-emerald-400">Tanzil Certified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 uppercase">Aesthetic Vibe:</span>
                    <span className="font-semibold text-stone-200">Sovereign Traditional</span>
                  </div>
                </div>
              </div>

              {/* Category Products Cards Column */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.products.map(prod => (
                  <div key={prod.id} className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between hover:border-amber-500/40 transition-all">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-serif font-bold text-stone-900">{prod.name}</h4>
                        <span className="text-[9.5px] font-mono text-stone-400 uppercase">{prod.orderPattern}</span>
                      </div>
                      
                      <p className="text-[11px] text-stone-500 leading-relaxed font-light">{prod.description}</p>
                      
                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 space-y-1.5">
                        <span className="block text-[8px] font-mono font-bold text-stone-400 uppercase tracking-widest">Premium Specifications</span>
                        {prod.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex gap-1.5 items-center text-[10px] text-stone-600">
                            <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex justify-between items-center">
                      <div>
                        <span className="block text-[8px] text-stone-400 font-mono uppercase">Est. Investment Range</span>
                        <span className="text-xs font-serif font-extrabold text-[#C5A059]">{prod.priceRange}</span>
                      </div>
                      <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded uppercase">Bulk Discount Applied</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })()}
      </section>

      {/* 3. INTERACTIVE B2B DEMONSTRATOR WIDGETS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Widget A: Live Acrylic Donation Thermometer Simulator */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-bold text-[#C5A059] uppercase tracking-widest">Interactive Physical Preview</span>
            <h3 className="text-base font-serif font-bold text-stone-900">Fundraising Thermometer Interactive Preview</h3>
            <p className="text-[11px] text-stone-500 font-light">
              See how a custom building campaign progress board or Waqf campaign thermometer visualizer looks scaled to your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Thermometer Visual representation */}
            <div className="md:col-span-5 bg-[#faf9f5] border border-[#C5A059]/30 rounded-2xl p-4 flex flex-col items-center justify-between aspect-[3/4] shadow-inner relative">
              <div className="absolute top-2 left-2 text-[6px] font-mono font-bold text-[#C5A059]/70 uppercase">Waqf Campaign Board</div>
              
              <div className="text-[9px] font-serif font-extrabold text-stone-800 text-center uppercase truncate w-full px-1">
                {mosqueName || 'Our Mosque'}
              </div>

              {/* Vertical Thermometer tube */}
              <div className="w-10 h-44 bg-stone-200 rounded-full border border-stone-300 relative overflow-hidden flex flex-col justify-end">
                <div 
                  className="w-full rounded-b-full transition-all duration-500 ease-out flex items-center justify-center text-[8px] text-white font-bold"
                  style={{ 
                    height: `${Math.min(100, (thermCurrent / thermTarget) * 100)}%`,
                    backgroundColor: thermColor 
                  }}
                >
                  <span className="rotate-270 block whitespace-nowrap">
                    {Math.round((thermCurrent / thermTarget) * 100)}%
                  </span>
                </div>
              </div>

              {/* Core numbers */}
              <div className="text-center space-y-0.5">
                <span className="block text-[7px] text-stone-400 font-mono uppercase tracking-widest">Collected So Far</span>
                <span className="block text-xs font-serif font-extrabold text-stone-900">${thermCurrent.toLocaleString()}</span>
                <span className="block text-[8px] text-stone-500 font-sans">Target: ${thermTarget.toLocaleString()}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] text-stone-500 font-mono uppercase">Campaign Target Goal ($)</label>
                <input 
                  type="number" 
                  value={thermTarget} 
                  onChange={(e) => setThermTarget(Math.max(1000, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border border-stone-200 rounded-xl text-xs font-mono focus:border-amber-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] text-stone-500 font-mono uppercase">Current Progress ($)</label>
                <div className="flex items-center gap-1">
                  <input 
                    type="number" 
                    value={thermCurrent} 
                    onChange={(e) => setThermCurrent(Math.min(thermTarget, Math.max(0, Number(e.target.value))))}
                    className="flex-1 px-3 py-1.5 border border-stone-200 rounded-xl text-xs font-mono focus:border-amber-500 outline-none"
                  />
                  <span className="text-xs text-stone-400 font-mono">/{Math.round((thermCurrent / thermTarget) * 100)}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-stone-500 font-mono uppercase">Simulation Quick Increments</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => handleIncrementTherm(5000)}
                    className="px-2 py-1.5 border border-stone-200 hover:border-amber-500 text-[10px] text-stone-700 font-bold rounded-lg transition-all cursor-pointer bg-white"
                  >
                    + $5,000 Donation
                  </button>
                  <button 
                    onClick={() => handleIncrementTherm(10000)}
                    className="px-2 py-1.5 border border-[#C5A059] text-[10px] text-[#C5A059] font-bold rounded-lg transition-all cursor-pointer bg-[#faf9f5]"
                  >
                    + $10,000 Sponsor
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] text-stone-500 font-mono uppercase">Board Background Color</label>
                <div className="flex gap-2">
                  {[
                    { label: 'Emerald Green', hex: '#022c22' },
                    { label: 'Damascus Blue', hex: '#0f172a' },
                    { label: 'Classic Crimson', hex: '#450a0a' },
                    { label: 'Gold Bronze', hex: '#78350f' }
                  ].map(c => (
                    <button
                      key={c.hex}
                      onClick={() => setThermColor(c.hex)}
                      className="h-6 w-6 rounded-full border border-stone-300 transition-transform cursor-pointer hover:scale-110 flex items-center justify-center"
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    >
                      {thermColor === c.hex && <Check className="h-3 w-3 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Widget B: Prayer Timetable Simulator */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-bold text-[#C5A059] uppercase tracking-widest">Interactive Classroom or Foyer display</span>
            <h3 className="text-base font-serif font-bold text-stone-900">Masjid Timetable Board Builder</h3>
            <p className="text-[11px] text-stone-500 font-light">
              Customize daily congregational timings. Beautifully formatted on heavy, glossy dry-erase crystal plexiglass.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Timetable Visual representation */}
            <div className="md:col-span-5 bg-stone-950 border-2 border-[#C5A059] rounded-2xl p-4 text-stone-100 font-serif flex flex-col justify-between aspect-[3/4] shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-900/40 via-stone-950/20 to-black/60 pointer-events-none"></div>
              
              {/* Header */}
              <div className="text-center border-b border-[#C5A059]/30 pb-2 relative z-10 space-y-0.5">
                <span className="text-[7px] tracking-widest text-[#C5A059] font-mono uppercase block">Daily Congregated Prayers</span>
                <h4 className="text-[9px] font-bold text-white uppercase truncate">{mosqueName || 'Al-Noor Center'}</h4>
              </div>

              {/* Timing Grid */}
              <div className="space-y-2 relative z-10 text-[9px] font-sans pt-1">
                {[
                  { name: 'FAJR', time: fajrTime },
                  { name: 'DHUHR', time: dhuhrTime },
                  { name: 'ASR', time: asrTime },
                  { name: 'MAGHRIB', time: maghribTime },
                  { name: 'ISHA', time: ishaTime }
                ].map(p => (
                  <div key={p.name} className="flex justify-between items-center border-b border-stone-800/60 pb-1">
                    <span className="font-mono text-stone-400 font-bold">{p.name}</span>
                    <span className="font-bold text-amber-300 font-mono">{p.time}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="text-center text-[5.5px] font-mono tracking-wider text-[#C5A059]/80 border-t border-[#C5A059]/30 pt-1 relative z-10">
                AYATPRINT ARCHIVAL SIGNAGE SERIES
              </div>
            </div>

            {/* Controls */}
            <div className="md:col-span-7 grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[8.5px] text-stone-400 font-mono uppercase">Fajr Iqamah</label>
                <input 
                  type="text" 
                  value={fajrTime} 
                  onChange={(e) => setFajrTime(e.target.value)}
                  className="w-full px-2 py-1 border border-stone-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[8.5px] text-stone-400 font-mono uppercase">Dhuhr Iqamah</label>
                <input 
                  type="text" 
                  value={dhuhrTime} 
                  onChange={(e) => setDhuhrTime(e.target.value)}
                  className="w-full px-2 py-1 border border-stone-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[8.5px] text-stone-400 font-mono uppercase">Asr Iqamah</label>
                <input 
                  type="text" 
                  value={asrTime} 
                  onChange={(e) => setAsrTime(e.target.value)}
                  className="w-full px-2 py-1 border border-stone-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[8.5px] text-stone-400 font-mono uppercase">Maghrib Adhan</label>
                <input 
                  type="text" 
                  value={maghribTime} 
                  onChange={(e) => setMaghribTime(e.target.value)}
                  className="w-full px-2 py-1 border border-stone-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="space-y-1 col-span-2">
                <label className="block text-[8.5px] text-stone-400 font-mono uppercase">Isha Iqamah</label>
                <input 
                  type="text" 
                  value={ishaTime} 
                  onChange={(e) => setIshaTime(e.target.value)}
                  className="w-full px-2 py-1 border border-stone-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 4. PREMIUM B2B PACKAGES & LIVE PROPOSAL GENERATION BUILDER */}
      <section className="bg-[#faf9f5] rounded-3xl border border-art-sand/80 p-6 md:p-10 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A059] uppercase block">Interactive Procurement Studio</span>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">Generate Custom Institutional Proposal</h2>
          <p className="text-xs text-stone-500 leading-relaxed font-light">
            Select a tailored package bundle below, customize frame style and installation options, fill in your mosque/school details, and instantly compile a formal high-resolution PDF quotation with legal procurement terms.
          </p>
        </div>

        {/* Package Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {B2B_PACKAGES.map(pkg => (
            <div
              key={pkg.id}
              onClick={() => setActivePackage(pkg.id)}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between text-left h-full ${
                activePackage === pkg.id
                  ? 'border-[#C5A059] bg-white shadow-md'
                  : 'border-stone-200/60 bg-white/50 hover:border-stone-400'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] font-mono font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded uppercase">
                    {pkg.badge}
                  </span>
                  {activePackage === pkg.id && (
                    <CheckCircle2 className="h-5 w-5 text-[#C5A059]" />
                  )}
                </div>

                <h3 className="text-sm font-serif font-bold text-stone-900">{pkg.name}</h3>
                <p className="text-[10.5px] text-stone-500 font-light leading-relaxed">{pkg.description}</p>
                
                <div className="pt-2.5 space-y-1.5">
                  <span className="block text-[8px] font-mono font-bold text-stone-400 uppercase tracking-widest">Included Deliverables</span>
                  {pkg.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex gap-1.5 items-start text-[10px] text-stone-600 leading-snug">
                      <Check className="h-3.5 w-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-stone-100 flex justify-between items-baseline">
                <div>
                  <span className="block text-[8px] font-mono text-stone-400 uppercase leading-none">Starting Investment</span>
                  <span className="text-base font-serif font-extrabold text-stone-900">${pkg.basePrice}</span>
                </div>
                <span className="text-[9px] font-mono text-emerald-600 font-bold">{pkg.savings}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Customize & Proposal Details Form */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-sm font-mono font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">
              Institution & Delivery Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] text-stone-500 font-mono uppercase font-bold">Mosque or Organization Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    value={mosqueName}
                    onChange={(e) => setMosqueName(e.target.value)}
                    placeholder="e.g. Al-Noor Mosque"
                    className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-xl text-xs font-medium outline-none focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] text-stone-500 font-mono uppercase font-bold">Authorized Coordinator / Imam</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Dr. Tariq Ahmed"
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs font-medium outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] text-stone-500 font-mono uppercase font-bold">Official Email Address</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="board@masjid.org"
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs font-medium outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] text-stone-500 font-mono uppercase font-bold">Coordinator Phone Number</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+1 (555) 786-1111"
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs font-medium outline-none focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Custom Specifications Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="block text-[10px] text-stone-500 font-mono uppercase font-bold">Double-Gilt Framing System Upgrade</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'wood', label: 'Solid Wood', upcharge: '+$150' },
                    { id: 'aluminum', label: 'Alum Frame', upcharge: '+$220' },
                    { id: 'frameless', label: 'Frameless', upcharge: '+$0' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFrame(f.id as any)}
                      className={`px-3 py-2 border rounded-xl text-[10px] font-bold flex flex-col items-center justify-center cursor-pointer transition-all ${
                        selectedFrame === f.id
                          ? 'border-[#C5A059] bg-[#faf9f5] text-stone-900 shadow-xs'
                          : 'border-stone-200 bg-white text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <span>{f.label}</span>
                      <span className="text-[8.5px] font-mono text-stone-400 mt-0.5">{f.upcharge}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-stone-500 font-mono uppercase font-bold">Mounting & Alignment Accessory Kit</label>
                <button
                  type="button"
                  onClick={() => setIncludeInstallationKit(!includeInstallationKit)}
                  className={`w-full px-4 py-2 border rounded-xl text-[10px] font-bold flex items-center justify-between cursor-pointer transition-all ${
                    includeInstallationKit
                      ? 'border-[#C5A059] bg-[#faf9f5] text-[#C5A059]'
                      : 'border-stone-200 bg-white text-stone-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className={`h-4 w-4 ${includeInstallationKit ? 'text-[#C5A059]' : 'text-stone-300'}`} />
                    <span>Heavy-duty align guide + anti-theft kit</span>
                  </div>
                  <span className="font-mono">+$45</span>
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] text-stone-500 font-mono uppercase font-bold">Layout Specifications / Calligraphy Sizing Requests</label>
              <textarea
                rows={3}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Specify details, dimensions, specific Surahs requested, color palette overrides, or shipping guidelines."
                className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs font-light outline-none focus:border-amber-500 transition-all leading-relaxed"
              />
            </div>
          </div>

          {/* Pricing Summary Side */}
          <div className="lg:col-span-4 bg-[#faf9f5] border border-stone-200 rounded-2xl p-6 space-y-4 self-stretch flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-stone-200/60 pb-3">
                <span className="text-[8.5px] font-mono font-bold text-[#C5A059] uppercase tracking-widest block">Selected Package</span>
                <h4 className="text-sm font-serif font-bold text-stone-900 mt-0.5">{currentPkgDetails.name}</h4>
              </div>

              {/* Dynamic calculations itemization */}
              <div className="space-y-2.5 text-xs text-stone-600 font-sans">
                <div className="flex justify-between">
                  <span>Base Package Rate:</span>
                  <span className="font-mono text-stone-800">${currentPkgDetails.basePrice.toFixed(2)}</span>
                </div>
                
                {frameUpcharge > 0 && (
                  <div className="flex justify-between">
                    <span className="capitalize">{selectedFrame} Frame Upgrade:</span>
                    <span className="font-mono text-stone-800">+${frameUpcharge.toFixed(2)}</span>
                  </div>
                )}

                {installationFee > 0 && (
                  <div className="flex justify-between">
                    <span>Alignment Hardware:</span>
                    <span className="font-mono text-stone-800">+${installationFee.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-stone-200/60 pt-2 flex justify-between font-bold text-stone-800">
                  <span>Gross Subtotal:</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>15% Mosque Discount:</span>
                  <span className="font-mono">-${volumeDiscount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-emerald-700 font-medium border-b border-stone-200/60 pb-3">
                  <span>Freight Delivery (USA/EU):</span>
                  <span className="font-mono uppercase text-[10px] font-bold">Free</span>
                </div>

                <div className="flex justify-between items-baseline pt-1">
                  <div>
                    <span className="block text-[8px] text-stone-400 font-mono uppercase font-bold">Estimated Investment</span>
                    <span className="text-xl font-serif font-extrabold text-[#C5A059]">${finalTotal.toFixed(2)}</span>
                  </div>
                  <span className="text-[8px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Free S&H</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <button
                onClick={generateB2BQuotePDF}
                disabled={isGeneratingQuote}
                className="w-full py-3.5 bg-stone-950 hover:bg-stone-900 text-amber-400 border border-[#C5A059]/40 font-bold uppercase tracking-widest rounded-xl text-[10.5px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-stone-950/20"
              >
                {isGeneratingQuote ? (
                  <span className="animate-pulse">Compiling Document...</span>
                ) : (
                  <>
                    <Printer className="h-4 w-4 text-amber-500 animate-pulse" />
                    <span>Generate Proposal (PDF)</span>
                  </>
                )}
              </button>

              <span className="block text-center text-[7.5px] text-stone-400 font-mono leading-relaxed">
                ✔ Strictly complies with non-profit visual procurement rules. Includes crop marks, standard 3mm bleeds, CMYK proof bar, and authenticated Tanzil seals.
              </span>
            </div>

          </div>

        </div>

        {/* Success Alert Banner */}
        {quoteSuccessMessage && (
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-start gap-3 text-left font-sans shadow-md">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Masha\'Allah! Institutional Quote Generated Successfully</p>
              <p className="mt-1 text-emerald-600 leading-relaxed font-light">{quoteSuccessMessage}</p>
            </div>
          </div>
        )}

      </section>

      {/* 5. PREPRESS STANDARDS ACCREDITATION BLOCK */}
      <section className="bg-stone-900 text-white rounded-3xl border border-stone-800 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="space-y-2">
          <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
            <ShieldCheck className="h-4 w-4 text-amber-500" />
          </div>
          <h4 className="text-xs font-serif font-bold text-[#C5A059]">Authenticated Script</h4>
          <p className="text-[11px] text-stone-400 leading-relaxed font-light">
            Every verse is generated and verified dynamically with the global Tanzil database, ensuring zero spelling or diacritic errors on sacred prayer hall walls.
          </p>
        </div>

        <div className="space-y-2">
          <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
            <Compass className="h-4 w-4 text-amber-500" />
          </div>
          <h4 className="text-xs font-serif font-bold text-[#C5A059]">Museum Archival Quality</h4>
          <p className="text-[11px] text-stone-400 leading-relaxed font-light">
            Each custom physical item is built with acid-free heavyweight canvas, moisture-resistant aluminum, or premium hardwood framing to endure massive scale installations.
          </p>
        </div>

        <div className="space-y-2">
          <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
            <Printer className="h-4 w-4 text-amber-500" />
          </div>
          <h4 className="text-xs font-serif font-bold text-[#C5A059]">Prepress Bleeds Included</h4>
          <p className="text-[11px] text-stone-400 leading-relaxed font-light">
            All PDF exports include 3mm trims, registration crops, CMYK controls, and high-DPI outputs optimized perfectly for commercial wide-format printing presses.
          </p>
        </div>
      </section>

    </div>
  );
}
