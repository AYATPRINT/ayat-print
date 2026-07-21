export interface QuranVerse {
  id: string;
  surah: number;
  ayah: string; // e.g. "255" or "1-7"
  surahNameArabic: string;
  surahNameEnglish: string;
  arabicText: string;
  englishTranslation: string;
  transliteration: string;
  meaningCategory: string; // e.g. "Protection", "Gratitude", "Patience", "Mercy"
  recommendedLayout: string; // e.g. "Circular Thuluth", "Square Kufic", "Minimalist"
  juz?: number;
  hizb?: number;
  revelationType?: 'Makki' | 'Madani';
}

export interface DesignElement {
  id: string;
  type: 'text' | 'ornament' | 'border' | 'frame';
  content: string; // text or SVG path
  x: number; // percentage based 0-100
  y: number;
  scale: number;
  color: string;
  opacity: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  alignment?: 'center' | 'left' | 'right';
  letterSpacing?: number;
  lineHeight?: number;
  glowColor?: string;
  glowRadius?: number;
  gradient?: string; // CSS gradient class
}

export interface CanvasPreset {
  id: string;
  name: string;
  bgGradient: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  ornamentColor: string;
  texture: 'none' | 'marble' | 'gold-foil' | 'textured-paper' | 'emerald-silk' | 'dark-slate';
  fontFamily: string;
}

export interface MockupScene {
  id: string;
  name: string;
  imageUrl: string;
  canvasX: string; // CSS position left
  canvasY: string; // CSS position top
  canvasW: string; // CSS width
  canvasH: string; // CSS height
  rotation?: string; // optional rotation style
  shadow?: string;
}
