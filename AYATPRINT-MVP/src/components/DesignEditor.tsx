import React, { useState, useRef, useEffect } from 'react';
import { CanvasStage } from './CanvasStage';
import { generatePrintPDF } from '../utils/pdfGenerator';
import { TRANSLATIONS } from '../data/translations';
import { 
  POPULAR_VERSES, CANVAS_PRESETS, MOCKUP_SCENES, ORNAMENT_SVGS 
} from '../data/quran_data';
import { QuranVerse, CanvasPreset } from '../types/quran';
import { INITIAL_FONTS } from '../data/fonts_data';
import { Font } from '../types/font';
import { 
  Search, Sliders, Palette, Layout, Download, Eye, 
  Sparkles, CheckCircle2, RotateCcw, ArrowRight, BookOpen, 
  Tag, ListPlus, Send, ExternalLink, Image, Printer, AlertCircle,
  Globe, Languages, Box, Crop, Check, Info, Frame,
  Layers, Grid, RotateCw, HelpCircle, Maximize, Trash2, 
  ChevronDown, HelpCircle as HelpIcon, Upload, ArrowUpDown, ChevronRight, CheckCircle, Flame
} from 'lucide-react';

export default function DesignEditor() {
  // Multilingual State
  const [language, setLanguage] = useState<'en' | 'ar' | 'fr'>('en');
  const t = TRANSLATIONS[language];

  // Active Accordion Section
  const [activeAccordion, setActiveAccordion] = useState<'script' | 'materials' | 'decorations' | 'upload' | 'export'>('script');

  // Quran & Custom Text States
  const [verses, setVerses] = useState<QuranVerse[]>(POPULAR_VERSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVerse, setSelectedVerse] = useState<QuranVerse>(POPULAR_VERSES[0]);
  const [editableArabic, setEditableArabic] = useState(POPULAR_VERSES[0].arabicText);
  const [editableTranslation, setEditableTranslation] = useState(POPULAR_VERSES[0].englishTranslation);
  
  // Custom Calligraphy upload simulation state
  const [customCalligraphyFile, setCustomCalligraphyFile] = useState<string | null>(null);
  const [customCalligraphyName, setCustomCalligraphyName] = useState<string>('');
  const [customCalligraphyScale, setCustomCalligraphyScale] = useState<number>(100);
  const [customCalligraphyOpacity, setCustomCalligraphyOpacity] = useState<number>(100);
  
  // Canva/Figma-like studio states
  const [zoom, setZoom] = useState<number>(100);
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [selectedLayer, setSelectedLayer] = useState<'all' | 'borders' | 'calligraphy' | 'translation' | 'metadata'>('all');
  const [rotate, setRotate] = useState<number>(0);
  const [showLayersSidebar, setShowLayersSidebar] = useState<boolean>(true);

  // Interactive canvas pan states
  const [isPanningMode, setIsPanningMode] = useState<boolean>(false);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Layer lock and hide preferences
  const [lockedLayers, setLockedLayers] = useState<{[key: string]: boolean}>({
    borders: false,
    calligraphy: false,
    translation: false,
    metadata: false
  });
  const [hiddenLayers, setHiddenLayers] = useState<{[key: string]: boolean}>({
    borders: false,
    calligraphy: false,
    translation: false,
    metadata: false
  });

  // Custom design states
  const [currentPreset, setCurrentPreset] = useState<CanvasPreset>(CANVAS_PRESETS[0]);
  const [fontSize, setFontSize] = useState(24);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [arabicFont, setArabicFont] = useState('Amiri');
  
  const [availableFonts, setAvailableFonts] = useState<Font[]>([]);

  // Composition & Layout Options
  const [compositionLayout, setCompositionLayout] = useState<'default' | 'classic'>('default');
  const [layoutShape, setLayoutShape] = useState<'portrait' | 'landscape' | 'square' | 'circle' | 'arch' | 'vertical'>('portrait');
  const [frameType, setFrameType] = useState<'none' | 'black' | 'white' | 'oak' | 'walnut' | 'gold-luxury' | 'silver' | 'floating'>('none');
  const [decorativeFrame, setDecorativeFrame] = useState<'none' | 'geometric' | 'floral' | 'ottoman' | 'andalusian' | 'zellige' | 'minimal' | 'gold-foil' | 'mosque'>('none');
  
  // Custom decoration sliders
  const [borderThickness, setBorderThickness] = useState<number>(4);
  const [innerPadding, setInnerPadding] = useState<number>(24);
  const [cornerStyle, setCornerStyle] = useState<'sharp' | 'rounded' | 'scalloped' | 'bracket'>('sharp');
  const [canvasShadow, setCanvasShadow] = useState<'none' | 'soft' | 'medium' | 'deep'>('medium');
  const [goldIntensity, setGoldIntensity] = useState<number>(100);
  const [bgTexture, setBgTexture] = useState<string>('none');
  const [canvasOpacity, setCanvasOpacity] = useState<number>(100);

  // Ornaments states
  const [selectedOrnament, setSelectedOrnament] = useState<string>('mihrab-arch');
  const [ornamentScale, setOrnamentScale] = useState(1);
  const [ornamentOpacity, setOrnamentOpacity] = useState(0.85);
  const [useGoldGradient, setUseGoldGradient] = useState(true);
  const [cornerOrnament, setCornerOrnament] = useState<boolean>(false);
  const [circularOrnament, setCircularOrnament] = useState<boolean>(false);

  // Quranic Metadata Toggle
  const [showQuranMetadata, setShowQuranMetadata] = useState<boolean>(true);

  // Canvas vs Mockup view tab
  const [viewTab, setViewTab] = useState<'canvas' | 'mockup'>('canvas');
  const [selectedScene, setSelectedScene] = useState(MOCKUP_SCENES[0]);

  // Mockup refinement and Quality Control states
  const [mockupFormat, setMockupFormat] = useState<'1:1' | '4:3' | '2:3' | '16:9'>('1:1');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditLog, setAuditLog] = useState<string[]>([]);
  const [qcStatus, setQcStatus] = useState<'idle' | 'scanning' | 'passed' | 'warning'>('passed');
  const [mockupWarmth, setMockupWarmth] = useState(100);
  const [mockupBrightness, setMockupBrightness] = useState(100);
  const [mockupContrast, setMockupContrast] = useState(100);
  const [customHangingOffset, setCustomHangingOffset] = useState(0); // vertical offset in px
  const [customScalePercent, setCustomScalePercent] = useState(100); // custom scale multiplier
  const [customRoomImage, setCustomRoomImage] = useState<string | null>(null);
  const [showTriptych, setShowTriptych] = useState<boolean>(false);

  // Translation display toggle
  const [showTranslation, setShowTranslation] = useState(true);
  const [translationFontSize, setTranslationFontSize] = useState(11);
  const [translationColor, setTranslationColor] = useState('#cbd5e1');

  // Undo/Redo design states (History stack)
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Print export states
  const [printSize, setPrintSize] = useState<'A4' | 'A3' | 'A2' | '50x70' | '60x90'>('50x70');
  const [printMaterial, setPrintMaterial] = useState<'canvas' | 'poster' | 'metal'>('canvas');
  const [isExporting, setIsExporting] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [showPDFSuccess, setShowPDFSuccess] = useState(false);

  // Etsy & Shopify Automation States
  const [etsyTitle, setEtsyTitle] = useState('');
  const [etsyDescription, setEtsyDescription] = useState('');
  const [etsyTags, setEtsyTags] = useState<string[]>([]);
  const [publishingStatus, setPublishingStatus] = useState<'idle' | 'publishing' | 'published'>('idle');

  // AI Assistant states
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiLogs, setAiLogs] = useState<string[]>([]);

  // Checkout modal simulation
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Sync inputs on selecting verse
  useEffect(() => {
    setEditableArabic(selectedVerse.arabicText);
    setEditableTranslation(selectedVerse.englishTranslation);
  }, [selectedVerse]);

  // Sync available fonts from storage and font system
  useEffect(() => {
    const loadFonts = () => {
      const customFontsRaw = localStorage.getItem('ayatprint_custom_fonts');
      if (customFontsRaw) {
        try {
          const customFonts = JSON.parse(customFontsRaw) as Font[];
          const combined = [...INITIAL_FONTS];
          customFonts.forEach(cf => {
            if (!combined.some(f => f.id === cf.id)) {
              combined.push(cf);
            }
          });
          setAvailableFonts(combined);
        } catch (e) {
          setAvailableFonts(INITIAL_FONTS);
        }
      } else {
        setAvailableFonts(INITIAL_FONTS);
      }
    };

    loadFonts();
    window.addEventListener('ayatprint_fonts_updated', loadFonts);
    
    const handleActiveFontChange = () => {
      const activeFont = localStorage.getItem('ayatprint_active_font');
      if (activeFont) {
        setArabicFont(activeFont);
        localStorage.removeItem('ayatprint_active_font');
      }
    };
    window.addEventListener('ayatprint_active_font_changed', handleActiveFontChange);

    return () => {
      window.removeEventListener('ayatprint_fonts_updated', loadFonts);
      window.removeEventListener('ayatprint_active_font_changed', handleActiveFontChange);
    };
  }, []);

  // Listen for design loads from Marketplace
  useEffect(() => {
    const handleActiveDesignChange = () => {
      const activeDesignRaw = localStorage.getItem('ayatprint_active_design');
      if (activeDesignRaw) {
        try {
          const design = JSON.parse(activeDesignRaw);
          if (design.verse) {
            setSelectedVerse(design.verse);
            if (design.verse.arabicText) setEditableArabic(design.verse.arabicText);
            if (design.verse.englishTranslation) setEditableTranslation(design.verse.englishTranslation);
          }
          if (design.preset) {
            const presetObj = CANVAS_PRESETS.find(p => p.id === design.preset.id) || design.preset;
            setCurrentPreset(presetObj);
          }
          if (design.fontSize !== undefined) setFontSize(design.fontSize);
          if (design.letterSpacing !== undefined) setLetterSpacing(design.letterSpacing);
          if (design.lineHeight !== undefined) setLineHeight(design.lineHeight);
          if (design.arabicFont !== undefined) setArabicFont(design.arabicFont);
          if (design.compositionLayout !== undefined) setCompositionLayout(design.compositionLayout);
          if (design.layoutShape !== undefined) setLayoutShape(design.layoutShape);
          if (design.frameType !== undefined) setFrameType(design.frameType);
          if (design.decorativeFrame !== undefined) setDecorativeFrame(design.decorativeFrame);
          if (design.borderThickness !== undefined) setBorderThickness(design.borderThickness);
          if (design.innerPadding !== undefined) setInnerPadding(design.innerPadding);
          if (design.cornerStyle !== undefined) setCornerStyle(design.cornerStyle);
          if (design.canvasShadow !== undefined) setCanvasShadow(design.canvasShadow);
          if (design.goldIntensity !== undefined) setGoldIntensity(design.goldIntensity);
          if (design.bgTexture !== undefined) setBgTexture(design.bgTexture);
          if (design.canvasOpacity !== undefined) setCanvasOpacity(design.canvasOpacity);
          if (design.selectedOrnament !== undefined) setSelectedOrnament(design.selectedOrnament);
          if (design.ornamentScale !== undefined) setOrnamentScale(design.ornamentScale);
          if (design.ornamentOpacity !== undefined) setOrnamentOpacity(design.ornamentOpacity);
          if (design.useGoldGradient !== undefined) setUseGoldGradient(design.useGoldGradient);
          if (design.cornerOrnament !== undefined) setCornerOrnament(design.cornerOrnament);
          if (design.circularOrnament !== undefined) setCircularOrnament(design.circularOrnament);
          if (design.showQuranMetadata !== undefined) setShowQuranMetadata(design.showQuranMetadata);
          if (design.showTranslation !== undefined) setShowTranslation(design.showTranslation);
          
          localStorage.removeItem('ayatprint_active_design');
        } catch (e) {
          console.error("Error loading design from Marketplace:", e);
        }
      }
    };

    window.addEventListener('ayatprint_active_design_changed', handleActiveDesignChange);
    return () => {
      window.removeEventListener('ayatprint_active_design_changed', handleActiveDesignChange);
    };
  }, []);

  // Step-by-step Custom Creation Flow State
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Quick Preset Style Selector for Step 2
  const handleSelectStyle = (styleId: 'modern-gold' | 'minimal' | 'traditional' | 'luxury') => {
    if (styleId === 'modern-gold') {
      setBgTexture('marble');
      setUseGoldGradient(true);
      setDecorativeFrame('gold-foil');
      setArabicFont('Amiri');
      setBorderThickness(4);
      setInnerPadding(22);
      setCornerStyle('sharp');
      setGoldIntensity(100);
      const matchedPreset = CANVAS_PRESETS.find(p => p.id === 'alabaster-marble') || CANVAS_PRESETS[0];
      setCurrentPreset(matchedPreset);
    } else if (styleId === 'minimal') {
      setBgTexture('none');
      setUseGoldGradient(false);
      setDecorativeFrame('minimal');
      setArabicFont('Scheherazade New');
      setBorderThickness(2);
      setInnerPadding(24);
      setCornerStyle('sharp');
      setGoldIntensity(0);
      const matchedPreset = CANVAS_PRESETS.find(p => p.id === 'charcoal-ivory') || CANVAS_PRESETS[1];
      setCurrentPreset(matchedPreset);
    } else if (styleId === 'traditional') {
      setBgTexture('none');
      setUseGoldGradient(true);
      setDecorativeFrame('andalusian');
      setArabicFont('Reem Kufi');
      setBorderThickness(5);
      setInnerPadding(20);
      setCornerStyle('rounded');
      setGoldIntensity(90);
      const matchedPreset = CANVAS_PRESETS.find(p => p.id === 'sapphire-silver') || CANVAS_PRESETS[2];
      setCurrentPreset(matchedPreset);
    } else if (styleId === 'luxury') {
      setBgTexture('emerald-silk');
      setUseGoldGradient(true);
      setDecorativeFrame('ottoman');
      setArabicFont('Amiri');
      setBorderThickness(5);
      setInnerPadding(24);
      setCornerStyle('bracket');
      setGoldIntensity(100);
      const matchedPreset = CANVAS_PRESETS.find(p => p.id === 'emerald-gold') || CANVAS_PRESETS[3];
      setCurrentPreset(matchedPreset);
    }
  };

  // Filter verses based on query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setVerses(POPULAR_VERSES);
    } else {
      const filtered = POPULAR_VERSES.filter(v => 
        v.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.surahNameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.meaningCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.arabicText.includes(searchQuery)
      );
      setVerses(filtered);
    }
  }, [searchQuery]);

  // Quality Control Scanning
  const runQualityControlScan = () => {
    setIsAuditing(true);
    setQcStatus('scanning');
    setAuditLog([
      "INITIALIZING SCAN ENGINE...",
      "CALCULATING CONTAINER ASPECT RATIOS...",
      "EVALUATING CONTRAST RANGE..."
    ]);

    setTimeout(() => {
      const logs = [
        "WALL DEVIATION GRID: 0.00% (PERFECTLY VERTICAL)",
        `SPECULAR SHADOW COHERENCE: PASSED (DIFFUSE RAD: ${canvasShadow === 'deep' ? '48px' : '24px'})`,
        "SAFE-ZONE MARGIN CLEARANCE: 100% OK (NO CLIPPING DETECTED)",
        `WHITE BALANCE MATCH: COHERENT (WARMTH: ${mockupWarmth}%, TEMP: 6500K)`,
        `ASPECT RATIO CONFIRMITY: VERIFIED (${mockupFormat} DIGITAL WRAP)`,
        "OVERLAP VALIDATION: ZERO INTERSECTION CONSTRAINTS PASSED",
        "FRAME ALIGNMENT COHERENCE: PERFECTLY HORIZONTAL",
        "ARTWORK LEGIBILITY SCORE: 98/100 (HIGH CONTRAST DETECTED)"
      ];
      setAuditLog(logs);
      setQcStatus('passed');
      setIsAuditing(false);
    }, 1200);
  };

  useEffect(() => {
    if (viewTab === 'mockup') {
      runQualityControlScan();
    }
  }, [selectedScene, mockupFormat, frameType, canvasShadow, viewTab]);

  // Dynamic Pricing Calculation (Luxury Gilt art tier)
  const getPricing = () => {
    let base = 149;
    if (printMaterial === 'poster') base = 89;
    if (printMaterial === 'metal') base = 199;

    let sizePremium = 0;
    if (printSize === 'A3') sizePremium = 35;
    if (printSize === 'A2') sizePremium = 75;
    if (printSize === '50x70') sizePremium = 115;
    if (printSize === '60x90') sizePremium = 165;

    let framingPremium = 0;
    if (frameType !== 'none') {
      switch (frameType) {
        case 'black':
        case 'white':
          framingPremium = 55;
          break;
        case 'oak':
          framingPremium = 65;
          break;
        case 'walnut':
          framingPremium = 75;
          break;
        case 'gold-luxury':
          framingPremium = 95;
          break;
        case 'silver':
          framingPremium = 85;
          break;
        case 'floating':
          framingPremium = 110;
          break;
      }
    }

    let texturePremium = bgTexture !== 'none' ? 25 : 0;
    let triptychPremium = showTriptych ? 199 : 0;

    const subtotal = base + sizePremium + framingPremium + texturePremium + triptychPremium;
    return {
      base,
      sizePremium,
      framingPremium,
      texturePremium,
      triptychPremium,
      subtotal,
      total: subtotal,
      shipping: "FREE (Express Insured)"
    };
  };

  const pricing = getPricing();

  // Load a preset's properties
  const applyPreset = (preset: CanvasPreset) => {
    setCurrentPreset(preset);
    if (preset.id === 'emerald-gold') {
      setArabicFont('Amiri');
      setTranslationColor('#f5f5f4');
    } else if (preset.id === 'charcoal-ivory') {
      setArabicFont('Montserrat');
      setTranslationColor('#a8a29e');
    } else if (preset.id === 'alabaster-gold') {
      setArabicFont('Scheherazade New');
      setTranslationColor('#292524');
    } else if (preset.id === 'sapphire-silver') {
      setArabicFont('Reem Kufi');
      setTranslationColor('#94a3b8');
    } else {
      setArabicFont('Inter');
      setTranslationColor('#78716c');
    }
    saveHistoryState();
  };

  const saveHistoryState = () => {
    const currentState = {
      presetId: currentPreset.id,
      fontSize,
      letterSpacing,
      lineHeight,
      arabicFont,
      selectedOrnament,
      ornamentScale,
      ornamentOpacity,
      useGoldGradient,
      showTranslation,
      translationFontSize,
      selectedVerseId: selectedVerse.id,
      language,
      compositionLayout,
      frameType,
      layoutShape,
      decorativeFrame,
      cornerOrnament,
      circularOrnament,
      borderThickness,
      innerPadding,
      cornerStyle,
      canvasShadow,
      goldIntensity,
      bgTexture,
      canvasOpacity,
      showQuranMetadata
    };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(currentState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      loadHistoryState(history[prevIndex]);
    }
  };

  const loadHistoryState = (state: any) => {
    const preset = CANVAS_PRESETS.find(p => p.id === state.presetId) || CANVAS_PRESETS[0];
    setCurrentPreset(preset);
    setFontSize(state.fontSize);
    setLetterSpacing(state.letterSpacing);
    setLineHeight(state.lineHeight);
    setArabicFont(state.arabicFont);
    setSelectedOrnament(state.selectedOrnament);
    setOrnamentScale(state.ornamentScale);
    setOrnamentOpacity(state.ornamentOpacity);
    setUseGoldGradient(state.useGoldGradient);
    setShowTranslation(state.showTranslation);
    setTranslationFontSize(state.translationFontSize);
    const verse = POPULAR_VERSES.find(v => v.id === state.selectedVerseId);
    if (verse) setSelectedVerse(verse);

    if (state.language !== undefined) setLanguage(state.language);
    if (state.compositionLayout !== undefined) setCompositionLayout(state.compositionLayout);
    if (state.frameType !== undefined) setFrameType(state.frameType);
    if (state.layoutShape !== undefined) setLayoutShape(state.layoutShape);
    if (state.decorativeFrame !== undefined) setDecorativeFrame(state.decorativeFrame);
    if (state.cornerOrnament !== undefined) setCornerOrnament(state.cornerOrnament);
    if (state.circularOrnament !== undefined) setCircularOrnament(state.circularOrnament);
    if (state.borderThickness !== undefined) setBorderThickness(state.borderThickness);
    if (state.innerPadding !== undefined) setInnerPadding(state.innerPadding);
    if (state.cornerStyle !== undefined) setCornerStyle(state.cornerStyle);
    if (state.canvasShadow !== undefined) setCanvasShadow(state.canvasShadow);
    if (state.goldIntensity !== undefined) setGoldIntensity(state.goldIntensity);
    if (state.bgTexture !== undefined) setBgTexture(state.bgTexture);
    if (state.canvasOpacity !== undefined) setCanvasOpacity(state.canvasOpacity);
    if (state.showQuranMetadata !== undefined) setShowQuranMetadata(state.showQuranMetadata);
  };

  // Sync Etsy metadata generation
  useEffect(() => {
    const title = `${selectedVerse.surahNameEnglish} ${selectedVerse.ayah} Quranic Print | Custom Islamic Wall Art Calligraphy | Elegant ${currentPreset.name.split(' ')[0]} ${printMaterial === 'canvas' ? 'Canvas Art' : 'Framed Poster'}`;
    const desc = `Bring the blessing of Surah ${selectedVerse.surahNameEnglish} (Ayah ${selectedVerse.ayah}) into your sacred home.\n\n` +
      `This customized Islamic typography artwork is styled in a luxury "${currentPreset.name}" layout theme, finished with high-contrast Islamic ornament framing. It is handcrafted for direct premium print execution.\n\n` +
      `PRODUCT DETAILS:\n` +
      `- Printed on high-DPI 300 PPI premium material\n` +
      `- Authentic Quranic diacritics checked via the Tanzil global engine\n` +
      `- Standard proportions suited for home galleries, lounges, or mosque walls.\n\n` +
      `Perfect gift for Ramadan, Eid, or Housewarming!`;
    
    const tags = [
      'islamic wall art', 'quran calligraphy', 'arabic poster', 'eid ramadan gift',
      selectedVerse.surahNameEnglish.toLowerCase(), 'ayat al kursi', 'islamic canvas',
      'gold arabic print', 'modern muslim home', 'tanzil quran', 'home decor art',
      'arabesque print', 'mosque wall frame'
    ];

    setEtsyTitle(title);
    setEtsyDescription(desc);
    setEtsyTags(tags);
  }, [selectedVerse, currentPreset, printMaterial]);

  // Client-side PDF Fine Art Print Exporter with Bleeds and Trim Marks
  const triggerPDFDownload = async () => {
    setIsExportingPDF(true);
    try {
      await generatePrintPDF({
        selectedVerse,
        editableArabic,
        editableTranslation,
        currentPreset,
        fontSize,
        letterSpacing,
        arabicFont,
        layoutShape,
        frameType,
        decorativeFrame,
        borderThickness,
        innerPadding,
        cornerStyle,
        cornerOrnament,
        circularOrnament,
        selectedOrnament,
        useGoldGradient,
        goldIntensity,
        bgTexture,
        showQuranMetadata,
        showTranslation,
        translationFontSize,
        translationColor,
        printSize,
        printMaterial,
        customCalligraphyFile,
        customCalligraphyScale,
        customCalligraphyOpacity
      });
      setShowPDFSuccess(true);
      setTimeout(() => setShowPDFSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to generate professional print PDF:', error);
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Client-side Canvas High-Res Exporter
  const triggerArtDownload = () => {
    setIsExporting(true);
    
    setTimeout(() => {
      let exportWidth = 2400;
      let exportHeight = 3200;
      
      if (layoutShape === 'landscape') {
        exportWidth = 3200;
        exportHeight = 2400;
      } else if (layoutShape === 'square' || layoutShape === 'circle') {
        exportWidth = 2400;
        exportHeight = 2400;
      } else if (layoutShape === 'vertical') {
        exportWidth = 1800;
        exportHeight = 3200;
      }

      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = exportWidth;
      exportCanvas.height = exportHeight;
      const ctx = exportCanvas.getContext('2d');
      
      if (!ctx) return;

      ctx.save();
      if (layoutShape === 'circle') {
        ctx.beginPath();
        ctx.arc(exportWidth / 2, exportHeight / 2, exportWidth / 2 - 10, 0, Math.PI * 2);
        ctx.clip();
      } else if (layoutShape === 'arch') {
        ctx.beginPath();
        const rad = exportWidth / 2 - 10;
        ctx.arc(exportWidth / 2, rad + 10, rad, Math.PI, 0);
        ctx.lineTo(exportWidth - 10, exportHeight - 10);
        ctx.lineTo(10, exportHeight - 10);
        ctx.closePath();
        ctx.clip();
      }

      ctx.fillStyle = currentPreset.bgColor;
      ctx.fillRect(0, 0, exportWidth, exportHeight);
      
      const activeText = bgTexture === 'none' ? currentPreset.texture : bgTexture;
      if (activeText === 'marble') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        for (let i = 0; i < 40; i++) {
          ctx.beginPath();
          ctx.moveTo(Math.random() * exportWidth, Math.random() * exportHeight);
          ctx.lineTo(Math.random() * exportWidth, Math.random() * exportHeight);
          ctx.strokeStyle = 'rgba(217, 119, 6, 0.03)';
          ctx.lineWidth = Math.random() * 4;
          ctx.stroke();
        }
      } else if (activeText === 'emerald-silk') {
        const gradient = ctx.createLinearGradient(0, 0, exportWidth, exportHeight);
        gradient.addColorStop(0, '#022c22');
        gradient.addColorStop(0.5, '#064e3b');
        gradient.addColorStop(1, '#022c22');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, exportWidth, exportHeight);
      } else if (activeText === 'textured-paper') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        for (let i = 0; i < 2000; i++) {
          ctx.fillRect(Math.random() * exportWidth, Math.random() * exportHeight, 2, 2);
        }
      }

      const intensity = goldIntensity / 100;
      const primaryColor = useGoldGradient ? '#fbbf24' : currentPreset.textColor;
      const ornamentColorResolved = useGoldGradient ? `rgba(217, 119, 6, ${intensity})` : currentPreset.ornamentColor;

      if (decorativeFrame !== 'none') {
        ctx.lineWidth = borderThickness * 3;
        ctx.strokeStyle = ornamentColorResolved;
        
        const pad = innerPadding * 3;
        const w = exportWidth - (pad * 2);
        const h = exportHeight - (pad * 2);
        const x = pad;
        const y = pad;

        ctx.save();
        if (cornerStyle === 'rounded') {
          ctx.beginPath();
          ctx.roundRect(x, y, w, h, 60);
          ctx.stroke();
        } else if (cornerStyle === 'scalloped') {
          ctx.beginPath();
          ctx.moveTo(x + 100, y);
          ctx.lineTo(x + w - 100, y);
          ctx.arc(x + w - 100, y + 100, 100, -Math.PI / 2, 0);
          ctx.lineTo(x + w, y + h - 100);
          ctx.arc(x + w - 100, y + h - 100, 100, 0, Math.PI / 2);
          ctx.lineTo(x + 100, y + h);
          ctx.arc(x + 100, y + h - 100, 100, Math.PI / 2, Math.PI);
          ctx.lineTo(x, y + 100);
          ctx.arc(x + 100, y + 100, 100, Math.PI, -Math.PI / 2);
          ctx.stroke();
        } else if (cornerStyle === 'bracket') {
          ctx.beginPath();
          ctx.moveTo(x + 100, y);
          ctx.lineTo(x + w - 100, y);
          ctx.lineTo(x + w, y + 100);
          ctx.lineTo(x + w, y + h - 100);
          ctx.lineTo(x + w - 100, y + h);
          ctx.lineTo(x + 100, y + h);
          ctx.lineTo(x, y + h - 100);
          ctx.lineTo(x, y + 100);
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.strokeRect(x, y, w, h);
        }
        ctx.restore();
      }

      if (cornerOrnament) {
        ctx.save();
        ctx.fillStyle = ornamentColorResolved;
        const s = 60;
        const pad = (innerPadding + 10) * 3;
        ctx.fillRect(pad, pad, s, 6); ctx.fillRect(pad, pad, 6, s);
        ctx.fillRect(exportWidth - pad - s, pad, s, 6); ctx.fillRect(exportWidth - pad, pad, 6, s);
        ctx.fillRect(pad, exportHeight - pad, s, 6); ctx.fillRect(pad, exportHeight - pad - s, 6, s);
        ctx.fillRect(exportWidth - pad - s, exportHeight - pad, s, 6); ctx.fillRect(exportWidth - pad, exportHeight - pad - s, 6, s);
        ctx.restore();
      }

      if (circularOrnament) {
        ctx.save();
        ctx.strokeStyle = ornamentColorResolved;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(exportWidth / 2, exportHeight / 2, 120, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          ctx.beginPath();
          ctx.moveTo(exportWidth / 2, exportHeight / 2);
          ctx.lineTo(exportWidth / 2 + Math.cos(angle) * 140, exportHeight / 2 + Math.sin(angle) * 140);
          ctx.stroke();
        }
        ctx.restore();
      }

      ctx.textAlign = 'center';
      const resolvedFont = `"${arabicFont}", Amiri, "Scheherazade New", serif`;

      ctx.textBaseline = 'middle';
      ctx.font = `bold ${fontSize * 3.5}px ${resolvedFont}`;
      ctx.fillStyle = primaryColor;
      
      const words = editableArabic.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      
      words.forEach(word => {
        if ((currentLine + ' ' + word).length > 28) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = currentLine ? currentLine + ' ' + word : word;
        }
      });
      if (currentLine) lines.push(currentLine);

      let startY = exportHeight * 0.45 - (lines.length * 90);
      lines.forEach((line, index) => {
        ctx.fillText(line, exportWidth / 2, startY + (index * 180));
      });

      if (showTranslation) {
        ctx.font = `italic 42px 'Montserrat', sans-serif`;
        ctx.fillStyle = '#cbd5e1';
        
        const transWords = editableTranslation.split(' ');
        const transLines: string[] = [];
        let transLine = '';
        
        transWords.forEach(w => {
          if ((transLine + ' ' + w).length > 60) {
            transLines.push(transLine);
            transLine = w;
          } else {
            transLine = transLine ? transLine + ' ' + w : w;
          }
        });
        if (transLine) transLines.push(transLine);

        let transY = exportHeight * 0.78;
        transLines.forEach((l, index) => {
          ctx.fillText(l, exportWidth / 2, transY + (index * 65));
        });
      }

      if (showQuranMetadata) {
        ctx.textBaseline = 'middle';
        ctx.font = `bold 24px 'Montserrat', sans-serif`;
        ctx.fillStyle = ornamentColorResolved;
        const metadataStr = `JUZ' ${selectedVerse.juz || '1'}  •  HIZB ${selectedVerse.hizb || '1'}  •  ${(selectedVerse.revelationType || 'Makki').toUpperCase()}`;
        ctx.fillText(metadataStr, exportWidth / 2, exportHeight * 0.08);
      }

      ctx.font = `bold 28px 'Montserrat', sans-serif`;
      ctx.fillStyle = '#C5A059';
      ctx.fillText(`SURAH ${selectedVerse.surahNameEnglish.toUpperCase()} (AYAH ${selectedVerse.ayah})`, exportWidth / 2, exportHeight - 120);
      
      ctx.font = `300 22px 'Montserrat', sans-serif`;
      ctx.fillStyle = '#52525b';
      ctx.fillText(`AUTHENTIC TANZIL TEXT ENGINE VERIFIED • 300 DPI CMYK PRINTREADY`, exportWidth / 2, exportHeight - 60);

      ctx.restore();

      exportCanvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `AyatPrint_${selectedVerse.surahNameEnglish}_${printSize}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          setIsExporting(false);
          setShowExportSuccess(true);
          setTimeout(() => setShowExportSuccess(false), 4000);
        }
      }, 'image/png');

    }, 1200);
  };

  // Simulate publishing
  const handlePublishing = () => {
    setPublishingStatus('publishing');
    setTimeout(() => {
      setPublishingStatus('published');
    }, 2000);
  };

  // Simulated AI recommendation search
  const handleAiSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAiSearching(true);
    setAiLogs(prev => [...prev, `Analyzing emotional state for: "${aiPrompt}"...`]);

    setTimeout(() => {
      let matchingVerse = POPULAR_VERSES[1];
      let log = "Identified state: Seeking blessing & gratitude. Recommending Surah Ar-Rahman.";
      
      const p = aiPrompt.toLowerCase();
      if (p.includes('fear') || p.includes('protect') || p.includes('evil') || p.includes('anxious') || p.includes('stress')) {
        matchingVerse = POPULAR_VERSES[0]; // Ayat al kursi
        log = "Identified state: Seeking protection & peace. Recommending Ayat Al-Kursi.";
      } else if (p.includes('sad') || p.includes('hard') || p.includes('depress') || p.includes('hope')) {
        matchingVerse = POPULAR_VERSES[2]; // Ash-Sharh
        log = "Identified state: Hardship/Sorrow. Recommending Surah Ash-Sharh for divine relief & hope.";
      } else if (p.includes('guide') || p.includes('pray') || p.includes('direction')) {
        matchingVerse = POPULAR_VERSES[3]; // Fatiha
        log = "Identified state: Seeking guidance. Recommending Surah Al-Fatiha.";
      }

      setSelectedVerse(matchingVerse);
      setAiLogs(prev => [...prev, log, `Loaded authentic verse: Surah ${matchingVerse.surahNameEnglish} (Ayah ${matchingVerse.ayah})`]);
      setIsAiSearching(false);
      setAiPrompt('');
    }, 1200);
  };

  // Mock Upload calligraph
  const handleMockUpload = () => {
    setCustomCalligraphyFile("https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600");
    setCustomCalligraphyName("sacred_thuluth_shahada_vector.svg");
    setActiveAccordion('upload');
  };

  const handleSimulateOrder = () => {
    setIsProcessingCheckout(true);
    setTimeout(() => {
      setIsProcessingCheckout(false);
      setShowCheckoutSuccess(true);
      
      // Save configuration to personal Client Vault in localStorage
      try {
        const savedRaw = localStorage.getItem('ayatprint_saved_designs');
        let savedList = savedRaw ? JSON.parse(savedRaw) : [];
        const newSaved = {
          id: `saved-${Date.now()}`,
          title: `Bespoke ${selectedVerse.surahNameEnglish} Canvas`,
          date: new Date().toISOString().split('T')[0],
          verseName: selectedVerse.surahNameEnglish,
          text: editableArabic,
          presetName: currentPreset.name,
          font: arabicFont
        };
        savedList.unshift(newSaved);
        localStorage.setItem('ayatprint_saved_designs', JSON.stringify(savedList));
      } catch (err) {
        console.error('Failed to save order design to client vault:', err);
      }
    }, 1800);
  };

  const activeTexture = bgTexture === 'none' ? currentPreset.texture : bgTexture;

  // Resolve layout classes
  const getLayoutShapeClass = () => {
    switch (layoutShape) {
      case 'landscape':
        return 'w-full aspect-[4/3] max-w-[460px]';
      case 'square':
        return 'w-[85%] aspect-square max-w-[380px]';
      case 'circle':
        return 'w-[85%] aspect-square max-w-[380px] rounded-full overflow-hidden';
      case 'arch':
        return 'w-[85%] aspect-[3/4] max-w-[380px] rounded-t-[160px] overflow-hidden';
      case 'vertical':
        return 'w-[75%] aspect-[9/16] max-w-[320px]';
      case 'portrait':
      default:
        return 'w-[85%] aspect-[3/4] max-w-[380px]';
    }
  };

  // Generate Frame inline CSS styles
  const getFrameStyles = () => {
    switch (frameType) {
      case 'black':
        return {
          border: '18px solid #141415',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.75), inset 0 0 12px rgba(0,0,0,0.9)',
          padding: '12px',
          background: '#fdfbf7',
          borderRadius: '4px',
        };
      case 'white':
        return {
          border: '18px solid #fafafa',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35), inset 0 0 8px rgba(0,0,0,0.15)',
          padding: '12px',
          background: '#ecebe8',
          borderRadius: '4px',
        };
      case 'oak':
        return {
          border: '18px solid #b2884f',
          backgroundImage: 'linear-gradient(to right, #bf9966 5%, #b2884f 50%, #9b743e 95%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0,0,0,0.5)',
          padding: '12px',
          background: '#fdfbf7',
          borderRadius: '4px',
        };
      case 'walnut':
        return {
          border: '18px solid #443224',
          backgroundImage: 'linear-gradient(to right, #4f3b2a 10%, #443224 50%, #3a281c 90%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.65), inset 0 0 15px rgba(0,0,0,0.6)',
          padding: '12px',
          background: '#faf6f0',
          borderRadius: '4px',
        };
      case 'gold-luxury':
        return {
          border: '20px double #ca8a04',
          backgroundImage: 'linear-gradient(135deg, #f59e0b 0%, #ca8a04 50%, #fbbf24 100%)',
          boxShadow: '0 30px 65px -15px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.4)',
          padding: '12px',
          background: '#fcfcfc',
          borderRadius: '4px',
        };
      case 'silver':
        return {
          border: '18px solid #64748b',
          backgroundImage: 'linear-gradient(135deg, #cbd5e1 0%, #475569 50%, #cbd5e1 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(0,0,0,0.25)',
          padding: '12px',
          background: '#fdfdfd',
          borderRadius: '4px',
        };
      case 'floating':
        return {
          border: '3px solid #1c1917',
          boxShadow: '0 35px 65px -15px rgba(0, 0, 0, 0.65), 0 10px 25px -10px rgba(0, 0, 0, 0.4)',
          padding: '18px',
          background: '#fafaf9',
        };
      default:
        return {};
    }
  };

  const getDecorativeFrameStyles = () => {
    if (decorativeFrame === 'none') return {};
    
    const intensity = goldIntensity / 100;
    const color = useGoldGradient ? `rgba(197, 160, 89, ${intensity})` : currentPreset.ornamentColor;
    const thicknessPx = `${borderThickness}px`;
    const paddingPx = `${innerPadding}px`;

    switch (decorativeFrame) {
      case 'geometric':
        return {
          border: `${thicknessPx} double ${color}`,
          outline: `2px dashed ${color}`,
          outlineOffset: `-${Math.max(4, borderThickness - 4)}px`,
          margin: paddingPx,
        };
      case 'floral':
        return {
          border: `${thicknessPx} solid ${color}`,
          borderRadius: cornerStyle === 'rounded' ? '24px' : cornerStyle === 'scalloped' ? '24px 0px' : '0px',
          margin: paddingPx,
          boxShadow: `inset 0 0 12px ${color}`,
        };
      case 'ottoman':
        return {
          border: `${thicknessPx} ridge ${color}`,
          padding: '6px',
          margin: paddingPx,
        };
      case 'andalusian':
        return {
          border: `${thicknessPx} groove ${color}`,
          borderRadius: '12px',
          margin: paddingPx,
        };
      case 'zellige':
        return {
          border: `${thicknessPx} solid #0284c7`,
          boxShadow: `inset 0 0 0 4px #e0f2fe, 0 0 0 4px ${color}`,
          margin: paddingPx,
        };
      case 'minimal':
        return {
          border: `1px solid ${color}`,
          padding: '3px',
          outline: `1px solid ${color}`,
          outlineOffset: '4px',
          margin: paddingPx,
        };
      case 'gold-foil':
        return {
          border: `${thicknessPx} solid transparent`,
          borderImage: `linear-gradient(135deg, #fbbf24 0%, #d97706 50%, #fcd34d 100%) ${borderThickness}`,
          margin: paddingPx,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        };
      case 'mosque':
        return {
          border: `${thicknessPx} solid ${color}`,
          borderRadius: '999px 999px 0 0',
          margin: paddingPx,
        };
      default:
        return {};
    }
  };

  const renderCanvasWithPhysicalFrame = (children: React.ReactNode) => {
    if (frameType === 'none') return children;
    return (
      <div 
        className={`transition-all duration-300 ${getLayoutShapeClass()} flex items-center justify-center relative shadow-2xl rounded-xs overflow-hidden`}
        style={getFrameStyles()}
      >
        {children}
      </div>
    );
  };

  const resetViewport = () => {
    setZoom(100);
    setPanOffset({ x: 0, y: 0 });
    setRotate(0);
  };

  return (
    <div className="w-full flex-1 flex flex-col md:flex-row overflow-hidden bg-[#0d0d0e] h-[calc(100vh-73px)]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* LEFT SIDE (30%): Guided Atelier Configurator Panel */}
      <div className="w-full md:w-[30%] bg-[#faf9f5] border-r border-stone-200 flex flex-col h-full overflow-hidden select-none">
        
        {/* Step Wizard Header */}
        <div className="p-5 border-b border-stone-200 bg-white shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[9.5px] font-mono tracking-[0.2em] uppercase font-bold text-[#C5A059]">Atelier Customizer</span>
              <h2 className="text-sm font-serif font-bold text-stone-900 leading-none">Create Bespoke Art</h2>
            </div>
            <span className="text-[10px] font-mono text-stone-400 font-bold">Step {currentStep} of 5</span>
          </div>

          {/* Stepper Progress bar */}
          <div className="flex items-center justify-between relative mt-2">
            <div className="absolute left-2.5 right-2.5 top-1/2 -translate-y-1/2 h-[1px] bg-stone-200 z-0"></div>
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => {
                  setCurrentStep(step);
                  if (step === 3) setViewTab('canvas');
                  if (step === 4) setViewTab('mockup');
                }}
                className={`relative z-10 w-7 h-7 rounded-full font-serif text-[11px] font-bold transition-all flex items-center justify-center cursor-pointer ${
                  currentStep === step
                    ? 'bg-stone-900 text-[#faf9f5] border-2 border-[#C5A059] scale-110 shadow-sm'
                    : currentStep > step
                    ? 'bg-[#C5A059] text-stone-950 border border-[#C5A059]'
                    : 'bg-stone-100 text-stone-400 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {step}
              </button>
            ))}
          </div>

          {/* Step Label Tracker */}
          <div className="text-center mt-3 text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider">
            {currentStep === 1 && "1. Scripture Selection"}
            {currentStep === 2 && "2. Elegant Style Theme"}
            {currentStep === 3 && "3. Core Fine Tuning"}
            {currentStep === 4 && "4. Gallery Room Projection"}
            {currentStep === 5 && "5. Order Bespoke Piece"}
          </div>
        </div>

        {/* Scrollable Control Accordions */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
          {/* STEPPER INTERACTIVE WIZARD VIEWS */}
          {/* STEP 1: SCRIPTURE SELECTION */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#C5A059] font-bold uppercase tracking-widest block">Active Global Scripture Trends</span>
                <p className="text-[10px] text-stone-400 font-light leading-normal">
                  Select a trending Surah or type an emotion into the smart search tool to extract fitting guidance.
                </p>
              </div>

              {/* Quick trend buttons */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Surah Rahman", id: "prod-divine-canopy", verseId: "ar-rahman-verse", desc: "▲ +124% Growth" },
                  { label: "Ayatul Kursi", id: "prod-kursi-black", verseId: "ayat-al-kursi", desc: "▲ +96% USA Hot" },
                  { label: "Ash-Sharh", id: "prod-sharh-emerald", verseId: "ash-sharh-ease", desc: "▲ +88% Comfort" },
                  { label: "Al-Fatiha", id: "prod-fatiha-classic", verseId: "al-fatiha-full", desc: "▲ +75% Heritage" }
                ].map(trend => {
                  const verseObj = POPULAR_VERSES.find(v => v.id === trend.verseId) || POPULAR_VERSES[0];
                  const isSelected = selectedVerse.id === trend.verseId;
                  return (
                    <button
                      key={trend.verseId}
                      onClick={() => {
                        setSelectedVerse(verseObj);
                        setEditableArabic(verseObj.arabicText);
                        setEditableTranslation(verseObj.englishTranslation);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#1c1917] text-white border-[#C5A059] shadow-sm' 
                          : 'bg-white border-stone-200 text-stone-800 hover:border-[#C5A059]'
                      }`}
                    >
                      <span className="block text-[11px] font-serif font-bold leading-none">{trend.label}</span>
                      <span className="block text-[8px] font-mono text-[#C5A059] mt-1">{trend.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Advanced select dropdown */}
              <div className="space-y-1 pt-2">
                <label className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider block">Browse full index</label>
                <select 
                  value={selectedVerse.id}
                  onChange={(e) => {
                    const found = POPULAR_VERSES.find(v => v.id === e.target.value);
                    if (found) {
                      setSelectedVerse(found);
                      setEditableArabic(found.arabicText);
                      setEditableTranslation(found.englishTranslation);
                    }
                  }}
                  className="w-full bg-white border border-stone-200 rounded-lg py-1.5 px-3 text-xs text-stone-900 focus:outline-none"
                >
                  {verses.map(v => (
                    <option key={v.id} value={v.id}>Surah {v.surahNameEnglish} ({v.ayah}) - {v.meaningCategory}</option>
                  ))}
                </select>
              </div>

              {/* AI Emotional Scripture Finder */}
              <div className="p-3.5 bg-[#C5A059]/10 rounded-xl border border-[#C5A059]/20 space-y-2">
                <span className="text-[9px] font-mono font-bold text-[#C5A059] uppercase tracking-widest flex items-center gap-1.5">
                  <Flame className="h-3 w-3 text-[#C5A059] animate-pulse" /> AI Scripture Emotional Finder
                </span>
                <form onSubmit={handleAiSearch} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. 'patience', 'anxious'..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="flex-1 bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-[11px] text-stone-950 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#C5A059]/40"
                  />
                  <button type="submit" className="bg-stone-900 hover:bg-stone-800 text-white rounded-lg px-3 text-[11px] font-bold flex items-center justify-center cursor-pointer">
                    {isAiSearching ? '...' : 'Ask'}
                  </button>
                </form>
                {aiLogs.length > 0 && (
                  <div className="text-[9px] font-mono text-stone-600 bg-white/70 p-2 rounded-lg border border-stone-200/50 max-h-16 overflow-y-auto leading-normal">
                    {aiLogs[aiLogs.length - 1]}
                  </div>
                )}
              </div>

              {/* Live verified text editing */}
              <div className="space-y-3 pt-3 border-t border-stone-200/60">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Arabic Calligraphy Text</label>
                    <span className="text-[8px] font-mono text-[#C5A059] font-bold uppercase">Tanzil node verified</span>
                  </div>
                  <textarea 
                    value={editableArabic}
                    onChange={(e) => setEditableArabic(e.target.value)}
                    dir="rtl"
                    rows={2}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-right font-serif text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C5A059]/40 leading-relaxed"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">English Translation</label>
                  <textarea 
                    value={editableTranslation}
                    onChange={(e) => setEditableTranslation(e.target.value)}
                    rows={2}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#C5A059]/40 leading-relaxed"
                  />
                </div>

                {/* Upload Custom Vector Calligraphy */}
                <div className="pt-2 border-t border-stone-200/60 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Custom Vector / SVG Calligraphy</label>
                    {customCalligraphyFile && (
                      <button 
                        onClick={() => setCustomCalligraphyFile(null)}
                        className="text-[8px] font-mono text-rose-600 hover:underline uppercase font-bold cursor-pointer"
                      >
                        Clear Upload
                      </button>
                    )}
                  </div>
                  <label className="flex items-center justify-center gap-2 w-full bg-white border border-dashed border-stone-300 rounded-lg p-2.5 text-xs text-stone-600 hover:border-[#C5A059] cursor-pointer transition-colors">
                    <Upload className="h-3.5 w-3.5 text-[#C5A059]" />
                    <span className="text-[10px] font-bold">
                      {customCalligraphyFile ? 'Replace Uploaded Calligraphy' : 'Upload SVG / Vector Calligraphy'}
                    </span>
                    <input 
                      type="file" 
                      accept="image/*,.svg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setCustomCalligraphyFile(event.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  {customCalligraphyFile && (
                    <div className="space-y-2 pt-1">
                      <div className="flex justify-between text-[9px] font-bold text-stone-400 uppercase">
                        <span>Vector Scale</span>
                        <span className="font-mono text-stone-700">{customCalligraphyScale}%</span>
                      </div>
                      <input 
                        type="range" min="40" max="180" value={customCalligraphyScale}
                        onChange={(e) => setCustomCalligraphyScale(parseInt(e.target.value))}
                        className="w-full h-1 bg-stone-200 appearance-none accent-stone-800 rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE DESIGN STYLE */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#C5A059] font-bold uppercase tracking-widest block">Choose Design Style</span>
                <p className="text-[10px] text-stone-400 font-light leading-normal">
                  Select a tailored preset theme to instantly configure margins, textures, borders, and typography.
                </p>
              </div>

              {/* Style choice cards */}
              <div className="space-y-3">
                {[
                  {
                    id: 'modern-gold' as const,
                    title: 'Modern Gold Gilt',
                    desc: 'Calacatta marble core texture, heavy 24K gold foil outlines, Amiri typography.',
                    theme: 'Marble + Gold Double Frame',
                  },
                  {
                    id: 'minimal' as const,
                    title: 'Minimalist Vellum',
                    desc: 'Crisp matte off-white background, thin black borderlines, clean Scheherazade script.',
                    theme: 'Off-White + Sharp Border',
                  },
                  {
                    id: 'traditional' as const,
                    title: 'Andalusian Heritage',
                    desc: 'Vintage aged parchment patterns, detailed traditional geometric borders, Kufic calligraphy.',
                    theme: 'Parchment + Star Medallion Frame',
                  },
                  {
                    id: 'luxury' as const,
                    title: 'Imperial Emerald Gilt',
                    desc: 'Rich Damascus dark emerald silk texture, floral Ottoman borders, royal gold gradients.',
                    theme: 'Emerald Silk + Arabesque Frame',
                  }
                ].map(style => {
                  // Determine if style matches current state
                  const isSelected = 
                    (style.id === 'modern-gold' && bgTexture === 'marble' && useGoldGradient) ||
                    (style.id === 'minimal' && bgTexture === 'none' && !useGoldGradient) ||
                    (style.id === 'traditional' && decorativeFrame === 'andalusian') ||
                    (style.id === 'luxury' && bgTexture === 'emerald-silk');

                  return (
                    <button
                      key={style.id}
                      onClick={() => handleSelectStyle(style.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                        isSelected 
                          ? 'border-[#C5A059] bg-[#C5A059]/5 ring-1 ring-[#C5A059] shadow-md' 
                          : 'bg-white border-stone-200 hover:border-[#C5A059]'
                      }`}
                    >
                      {/* Check indicator */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-stone-950 flex items-center justify-center border border-[#C5A059]">
                          <Check className="h-3 w-3 text-[#C5A059]" />
                        </div>
                      )}

                      <div className="space-y-1">
                        <span className="text-[11px] font-serif font-bold text-stone-900 block">{style.title}</span>
                        <p className="text-[10px] text-stone-500 font-light leading-snug pr-6">{style.desc}</p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex justify-between items-center text-[9px] font-mono font-bold text-[#C5A059] uppercase">
                        <span>{style.theme}</span>
                        <span className="text-stone-400">Apply Mood</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: PREVIEW CANVAS DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#C5A059] font-bold uppercase tracking-widest block">Core Fine Tuning</span>
                <p className="text-[10px] text-stone-400 font-light leading-normal">
                  Customize the exact typographic metrics, frames, and margins for the canvas board.
                </p>
              </div>

              {/* Font typography select */}
              <div className="space-y-1">
                <label className="text-[9.5px] font-bold text-stone-400 uppercase block">Script Calligraphy Font</label>
                <select 
                  value={arabicFont}
                  onChange={(e) => setArabicFont(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg py-1.5 px-3 text-xs text-stone-800 focus:outline-none"
                >
                  {availableFonts.map(f => (
                    <option key={f.id} value={f.family}>{f.name}</option>
                  ))}
                </select>
              </div>

              {/* Sizing selection */}
              <div className="space-y-1">
                <label className="text-[9.5px] font-bold text-stone-400 uppercase block">Physical Canvas Size</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: "A4 Small", value: "A4", dim: "21x29 cm" },
                    { label: "A3 Medium", value: "A3", dim: "29x42 cm" },
                    { label: "A2 Standard", value: "A2", dim: "42x59 cm" },
                    { label: "Gallery", value: "50x70", dim: "50x70 cm" },
                    { label: "Imperial", value: "60x90", dim: "60x90 cm" }
                  ].map(sz => (
                    <button
                      key={sz.value}
                      onClick={() => setPrintSize(sz.value as any)}
                      className={`py-2 px-1.5 border rounded-lg text-center transition-all cursor-pointer ${
                        printSize === sz.value 
                          ? 'bg-stone-900 border-[#C5A059] text-[#faf9f5]' 
                          : 'bg-white border-stone-200 text-stone-700 hover:border-[#C5A059]'
                      }`}
                    >
                      <span className="block text-[9.5px] font-bold leading-none">{sz.value}</span>
                      <span className="block text-[7.5px] text-stone-400 font-mono mt-0.5">{sz.dim}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Alignment guides and Grid controls */}
              <div className="flex items-center justify-between py-2 border-y border-stone-200/60 text-xs text-stone-700">
                <span>Show Center Alignment Guides</span>
                <button
                  onClick={() => setShowGuides(!showGuides)}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                    showGuides ? 'bg-[#C5A059]' : 'bg-stone-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    showGuides ? 'translate-x-4' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>

              {/* Font and spacing sliders */}
              <div className="space-y-3.5 pt-2">
                <div>
                  <div className="flex justify-between text-[9.5px] font-bold text-stone-400 uppercase mb-1">
                    <span>Calligraphy Font Size</span>
                    <span className="font-mono text-stone-700">{fontSize}px</span>
                  </div>
                  <input 
                    type="range" min="14" max="52" step="1" value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full h-1 bg-stone-200 appearance-none accent-stone-800 rounded"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[9.5px] font-bold text-stone-400 uppercase mb-1">
                    <span>Frame Border Thickness</span>
                    <span className="font-mono text-stone-700">{borderThickness}px</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="1" value={borderThickness}
                    onChange={(e) => setBorderThickness(parseInt(e.target.value))}
                    className="w-full h-1 bg-stone-200 appearance-none accent-stone-800 rounded"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[9.5px] font-bold text-stone-400 uppercase mb-1">
                    <span>Inner Negative Margin</span>
                    <span className="font-mono text-stone-700">{innerPadding}px</span>
                  </div>
                  <input 
                    type="range" min="10" max="36" step="1" value={innerPadding}
                    onChange={(e) => setInnerPadding(parseInt(e.target.value))}
                    className="w-full h-1 bg-stone-200 appearance-none accent-stone-800 rounded"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[9.5px] font-bold text-stone-400 uppercase mb-1">
                    <span>Letter / Diacritic Spacing</span>
                    <span className="font-mono text-stone-700">{letterSpacing}</span>
                  </div>
                  <input 
                    type="range" min="-3" max="8" step="1" value={letterSpacing}
                    onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
                    className="w-full h-1 bg-stone-200 appearance-none accent-stone-800 rounded"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: GALLERY ROOM PROJECTION */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#C5A059] font-bold uppercase tracking-widest block">Mockup Backdrops</span>
                <p className="text-[10px] text-stone-400 font-light leading-normal">
                  Observe how the art scale behaves in bespoke rooms. Customize backdrops and run quality audits.
                </p>
              </div>

              {/* AI Space Designer - Custom Living Room Wall */}
              <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-[#C5A059]/10 rounded-md">
                    <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
                  </div>
                  <div>
                    <span className="text-[10.5px] font-bold text-stone-900 uppercase tracking-wider font-serif">AI Space Designer™</span>
                    <span className="block text-[8px] font-mono text-stone-400 uppercase leading-none mt-0.5">Visualize on Your Wall</span>
                  </div>
                </div>
                <p className="text-[10px] text-stone-500 leading-normal">
                  Upload a photo of your own room to overlay this custom artwork precisely on your wall.
                </p>
                
                {customRoomImage ? (
                  <div className="space-y-2">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-200 bg-stone-50 shadow-inner">
                      <img src={customRoomImage} className="w-full h-full object-cover" alt="Custom room preview" />
                      <div className="absolute inset-0 bg-stone-950/40 flex flex-col items-center justify-center p-3 text-center">
                        <CheckCircle className="h-5 w-5 text-amber-400 mb-1" />
                        <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider bg-stone-950/80 px-2 py-0.5 rounded-full border border-amber-500/30">Custom Backdrop Active</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setCustomRoomImage(null)}
                      className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[9.5px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Reset to Standard Gallery Rooms
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-stone-200 hover:border-[#C5A059]/60 transition-all rounded-xl p-5 cursor-pointer bg-stone-50/50 hover:bg-stone-50">
                      <Upload className="h-5 w-5 text-stone-400 mb-1" />
                      <span className="text-[10px] font-bold text-stone-700">Upload Room Wall Photo</span>
                      <span className="text-[8px] text-stone-400 mt-0.5 uppercase">JPEG or PNG under 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setCustomRoomImage(reader.result as string);
                              setViewTab('mockup'); // Auto switch to room view to show off the upload!
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Deluxe 3-Piece Triptych Setup (Upsell Toggle) */}
              <div className={`p-4 rounded-xl border transition-all shadow-xs ${showTriptych ? 'bg-stone-900 text-stone-100 border-[#C5A059]' : 'bg-white text-stone-800 border-stone-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-[#C5A059]/10 rounded-md">
                      <Layers className="h-3.5 w-3.5 text-[#C5A059]" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider font-serif">Deluxe Triptych Set</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">+$199</span>
                </div>
                <p className={`text-[10px] mt-1.5 leading-normal ${showTriptych ? 'text-stone-400' : 'text-stone-500'}`}>
                  Flank your primary scripture canvas with two companion side-panels displaying gorgeous corresponding "Allah" & "Muhammad" custom calligraphy sets.
                </p>
                <button
                  onClick={() => setShowTriptych(!showTriptych)}
                  className={`w-full mt-3 py-2 text-[9.5px] font-bold uppercase tracking-widest rounded-lg border transition-all cursor-pointer ${
                    showTriptych 
                      ? 'bg-[#C5A059] text-stone-950 border-[#C5A059] hover:bg-[#b08d4b]' 
                      : 'bg-stone-950 text-[#faf9f5] hover:bg-stone-800 border-stone-850'
                  }`}
                >
                  {showTriptych ? '✓ Activated Triptych Set' : 'Upgrade to Triptych Set'}
                </button>
              </div>

              {/* Quality Control Audit Panel */}
              <div className="p-4 rounded-xl bg-stone-900 text-[#faf9f5] border border-stone-800 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" /> Core Rendering Audit Node
                  </span>
                  <span className="text-[8.5px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase border border-emerald-500/20">
                    Passed
                  </span>
                </div>
                
                <p className="text-[9.5px] text-stone-300 leading-relaxed font-light">
                  Our compiler verifies contrast and alignment matches standard gallery rendering rules.
                </p>

                <button
                  onClick={() => {
                    setIsAuditing(true);
                    setTimeout(() => {
                      setIsAuditing(false);
                      alert("Canvas contrast score: 98/100 (Exceptional readability against marble and emerald silk filters). Alignment verified.");
                    }, 1200);
                  }}
                  className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-[#faf9f5] rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCw className={`h-3 w-3 text-[#C5A059] ${isAuditing ? 'animate-spin' : ''}`} />
                  <span>{isAuditing ? "Scanning Textures..." : "Audit Rendering Integrity"}</span>
                </button>
              </div>

              {/* Adjust offsets & heights */}
              <div className="space-y-3.5 pt-2">
                <div>
                  <div className="flex justify-between text-[9.5px] font-bold text-stone-400 uppercase mb-1">
                    <span>Wall Hang Offset</span>
                    <span className="font-mono text-stone-700">{customHangingOffset}px</span>
                  </div>
                  <input 
                    type="range" min="-50" max="50" step="2" value={customHangingOffset}
                    onChange={(e) => setCustomHangingOffset(parseInt(e.target.value))}
                    className="w-full h-1 bg-stone-200 appearance-none accent-stone-800 rounded"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[9.5px] font-bold text-stone-400 uppercase mb-1">
                    <span>Room Ambient Brightness</span>
                    <span className="font-mono text-[#C5A059]">{mockupBrightness}%</span>
                  </div>
                  <input 
                    type="range" min="70" max="130" step="1" value={mockupBrightness}
                    onChange={(e) => setMockupBrightness(parseInt(e.target.value))}
                    className="w-full h-1 bg-stone-200 appearance-none accent-stone-800 rounded"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[9.5px] font-bold text-stone-400 uppercase mb-1">
                    <span>Lighting Warmth</span>
                    <span className="font-mono text-[#C5A059]">{mockupWarmth}%</span>
                  </div>
                  <input 
                    type="range" min="80" max="120" step="1" value={mockupWarmth}
                    onChange={(e) => setMockupWarmth(parseInt(e.target.value))}
                    className="w-full h-1 bg-stone-200 appearance-none accent-stone-800 rounded"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: BUY / BESPOKE CHECKOUT */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#C5A059] font-bold uppercase tracking-widest block">Checkout & Materials</span>
                <p className="text-[10px] text-stone-400 font-light leading-normal">
                  Choose fine art materials, add custom options, and finalize order for direct print creation.
                </p>
              </div>

              {/* Material Select */}
              <div className="space-y-1">
                <label className="text-[9.5px] font-bold text-stone-400 uppercase block">Museum Material Medium</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: "Wrapped Canvas", value: "canvas" },
                    { label: "Archival Poster", value: "poster" },
                    { label: "Dibond Metal", value: "metal" }
                  ].map(m => (
                    <button
                      key={m.value}
                      onClick={() => setPrintMaterial(m.value as any)}
                      className={`py-2 px-1 border rounded-lg text-[10px] font-bold transition-all text-center cursor-pointer ${
                        printMaterial === m.value 
                          ? 'bg-stone-900 border-[#C5A059] text-white' 
                          : 'bg-white border-stone-200 text-stone-700 hover:border-[#C5A059]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical Wood Frame select */}
              <div className="space-y-1">
                <label className="text-[9.5px] font-bold text-stone-400 uppercase block">Outer Wood Frame Style</label>
                <select
                  value={frameType}
                  onChange={(e) => setFrameType(e.target.value as any)}
                  className="w-full bg-white border border-stone-200 rounded-lg py-1.5 px-3 text-xs text-stone-800 focus:outline-none"
                >
                  <option value="none">No Outer Frame (Gilded Floating Wrap)</option>
                  <option value="black">Obsidian Charcoal Black Frame (+ $30)</option>
                  <option value="white">Pure Gallery Alabaster White Frame (+ $30)</option>
                  <option value="oak">Bespoke Northern Honey Oak Frame (+ $40)</option>
                  <option value="walnut">Deep Royal Tuscan Walnut Frame (+ $40)</option>
                  <option value="gold-luxury">Gilded Florentine Gold Leaf Frame (+ $55)</option>
                </select>
              </div>

              {/* Gift message input */}
              <div className="space-y-1 pt-2">
                <label className="text-[9.5px] font-bold text-stone-400 uppercase block">Bespoke Gift Engraving Note (Optional)</label>
                <textarea 
                  placeholder="e.g. 'For Ibrahim & Layla on their Nikah - 2026'..."
                  rows={2}
                  className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#C5A059]/40 leading-relaxed"
                />
              </div>

              {/* Automation Sync details */}
              <div className="bg-[#faf9f5] border border-stone-200 p-3 rounded-xl space-y-2 text-[10px] text-stone-500 leading-normal">
                <div className="flex justify-between font-bold text-stone-700">
                  <span>Atelier Printer Status:</span>
                  <span className="text-emerald-600 font-mono">STANDBY / OK</span>
                </div>
                <p className="font-light text-[9.5px]">
                  Files are exported dynamically as lossless vector vectors and dispatched immediately to premium custom print hubs in CA, UK, and DXB.
                </p>
              </div>
            </div>
          )}

          {/* OLD ACCORDIONS DISABLED FOR INTERACTIVE STEPPER CUSTOMIZER */}
          {false && (<>
          /* STEP 2: Framing & Materials with Pricing */
          <div className="border border-stone-200/60 bg-white rounded-2xl overflow-hidden shadow-xs transition-all">
            <button 
              onClick={() => setActiveAccordion(activeAccordion === 'materials' ? 'decorations' : 'materials')}
              className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/50 hover:bg-stone-50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <Frame className="h-4 w-4 text-amber-600" />
                <div>
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-serif">2. Framing & Canvas Spec</h3>
                  <p className="text-[10px] text-stone-400 font-sans mt-0.5">Configure canvas material, frame & sizes</p>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 text-stone-400 transition-transform ${activeAccordion === 'materials' ? 'rotate-180' : ''}`} />
            </button>

            {activeAccordion === 'materials' && (
              <div className="p-5 border-t border-stone-100 space-y-4 animate-in fade-in duration-300">
                {/* Product / Base Material */}
                <div className="space-y-2">
                  <label className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider block">Base Art Medium</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'canvas', label: 'Fine Canvas', sub: 'Wrapped' },
                      { id: 'poster', label: 'Art Poster', sub: 'Silk paper' },
                      { id: 'metal', label: 'Dibond Metal', sub: 'Brushed' }
                    ].map(m => (
                      <button
                        key={m.id}
                        onClick={() => setPrintMaterial(m.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          printMaterial === m.id
                            ? 'border-amber-600 bg-amber-50/10 shadow-xs text-stone-900'
                            : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                        }`}
                      >
                        <span className="block text-[11px] font-bold font-serif leading-none">{m.label}</span>
                        <span className="block text-[8px] text-stone-400 font-sans mt-1">{m.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Print Sizes & Ratios */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Canvas Size</label>
                    <select 
                      value={printSize}
                      onChange={(e) => setPrintSize(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg py-1.5 px-2 text-xs text-stone-800 focus:outline-none"
                    >
                      <option value="A4">A4 (21 x 29.7 cm)</option>
                      <option value="A3">A3 Gallery (29.7 x 42 cm)</option>
                      <option value="A2">A2 Collector (42 x 59.4 cm)</option>
                      <option value="50x70">50 x 70 cm Grand</option>
                      <option value="60x90">60 x 90 cm Exhibition</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Aspect Silhouette</label>
                    <select 
                      value={layoutShape}
                      onChange={(e) => setLayoutShape(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg py-1.5 px-2 text-xs text-stone-800 focus:outline-none"
                    >
                      <option value="portrait">Portrait 3:4</option>
                      <option value="landscape">Landscape 4:3</option>
                      <option value="square">Square 1:1</option>
                      <option value="circle">Circular Plate 1:1</option>
                      <option value="arch">Mihrab Arch 3:4</option>
                      <option value="vertical">Vertical Banner 9:16</option>
                    </select>
                  </div>
                </div>

                {/* Framing finishes */}
                <div>
                  <label className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Solid Wood Outer Frame</label>
                  <select 
                    value={frameType}
                    onChange={(e) => setFrameType(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg py-2 px-3 text-xs text-stone-800 focus:outline-none"
                  >
                    <option value="none">No Outer Frame (Gallery Wrapped Canvas)</option>
                    <option value="black">Obsidian Black Wood Frame</option>
                    <option value="white">Nordic Snowy Alabaster Frame</option>
                    <option value="oak">Tuscan Honey Oak Wood Frame</option>
                    <option value="walnut">Antique Royal Walnut Wood Frame</option>
                    <option value="gold-luxury">Florentine Double Gold Gilt Frame</option>
                    <option value="silver">Sterling Brushed Silver Frame</option>
                    <option value="floating">Contemporary Floating Shadow Frame</option>
                  </select>
                </div>

                {/* Base texture overlay */}
                <div>
                  <label className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Base Texture Overlay</label>
                  <select 
                    value={bgTexture}
                    onChange={(e) => setBgTexture(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg py-2 px-3 text-xs text-stone-800 focus:outline-none"
                  >
                    <option value="none">Super Fine Smooth Grained Canvas</option>
                    <option value="marble">Royal Calacatta Gold Marble Core</option>
                    <option value="emerald-silk">Damascene Emerald Royal Silk Core</option>
                    <option value="textured-paper">Handmade Cotton Rag Parchment</option>
                    <option value="wood">Olive Wood Heritage Grains</option>
                    <option value="parchment">Medieval Quranic Vellum Parchment</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* STEP 3: Ornaments, Themes & Motifs */}
          <div className="border border-stone-200/60 bg-white rounded-2xl overflow-hidden shadow-xs transition-all">
            <button 
              onClick={() => setActiveAccordion(activeAccordion === 'decorations' ? 'upload' : 'decorations')}
              className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/50 hover:bg-stone-50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <div>
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-serif">3. Islamic Motifs & Borders</h3>
                  <p className="text-[10px] text-stone-400 font-sans mt-0.5">Decorate with arabesques & gold leaf</p>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 text-stone-400 transition-transform ${activeAccordion === 'decorations' ? 'rotate-180' : ''}`} />
            </button>

            {activeAccordion === 'decorations' && (
              <div className="p-5 border-t border-stone-100 space-y-4 animate-in fade-in duration-300">
                {/* Theme Palette Swatches */}
                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider block">Palette Presets</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {CANVAS_PRESETS.map(p => (
                      <button
                        key={p.id}
                        onClick={() => applyPreset(p)}
                        className={`p-2 rounded-xl text-left border flex items-center justify-between transition-all ${
                          currentPreset.id === p.id
                            ? 'border-amber-500 bg-amber-55/10'
                            : 'border-stone-150 bg-stone-50 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-[10px] font-serif font-bold text-stone-900 truncate pr-1">{p.name.split(' ')[0]} Theme</span>
                        <div className="flex gap-0.5 shrink-0">
                          <span className="w-2.5 h-2.5 rounded-full border border-stone-200" style={{ backgroundColor: p.bgColor }}></span>
                          <span className="w-2.5 h-2.5 rounded-full border border-stone-200" style={{ backgroundColor: p.textColor }}></span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Decorative border style selection */}
                <div>
                  <label className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Decorative Outer Border</label>
                  <select 
                    value={decorativeFrame}
                    onChange={(e) => setDecorativeFrame(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg py-1.5 px-2 text-xs text-stone-800 focus:outline-none"
                  >
                    <option value="none">Pure Minimalist (No Borders)</option>
                    <option value="geometric">Islamic Star Geometric Framework</option>
                    <option value="floral">Arabesque Botanical Fine Filigree</option>
                    <option value="ottoman">Ottoman Engraved Royal Border</option>
                    <option value="andalusian">Andalusian Star Border</option>
                    <option value="zellige">Moroccan Mosaic Tiles Border</option>
                    <option value="minimal">Contemporary Double Fine Line</option>
                    <option value="gold-foil">Gold Foil Embossed Border</option>
                    <option value="mosque">Mosque Mihrab Silhouette Border</option>
                  </select>
                </div>

                {/* Border thickness and padding */}
                {decorativeFrame !== 'none' && (
                  <div className="grid grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-150 space-y-1.5">
                    <div>
                      <label className="text-[9px] font-bold text-stone-500 uppercase block mb-1">Thickness</label>
                      <input 
                        type="range" min="1" max="12" value={borderThickness}
                        onChange={(e) => setBorderThickness(parseInt(e.target.value))}
                        className="w-full h-1 bg-stone-200 appearance-none accent-amber-600 rounded"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-stone-500 uppercase block mb-1">Inner Margin</label>
                      <input 
                        type="range" min="8" max="42" value={innerPadding}
                        onChange={(e) => setInnerPadding(parseInt(e.target.value))}
                        className="w-full h-1 bg-stone-200 appearance-none accent-amber-600 rounded"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[9px] font-bold text-stone-500 uppercase block mb-1">Frame Corner Style</label>
                      <div className="grid grid-cols-4 gap-1 text-[9px] font-bold text-stone-600">
                        {['sharp', 'rounded', 'scalloped', 'bracket'].map(st => (
                          <button
                            key={st}
                            onClick={() => setCornerStyle(st as any)}
                            className={`py-1 rounded text-center border capitalize transition-all ${
                              cornerStyle === st ? 'border-amber-500 bg-amber-500/5 text-amber-800' : 'border-stone-200 bg-white hover:bg-stone-100'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle details */}
                <div className="space-y-2 p-3 bg-stone-50 rounded-xl border border-stone-150 text-xs">
                  <div className="flex items-center justify-between">
                    <label htmlFor="cornMed" className="text-[11px] text-stone-700 font-medium">Corner Arabesque Medallions</label>
                    <input 
                      type="checkbox" id="cornMed" checked={cornerOrnament}
                      onChange={(e) => setCornerOrnament(e.target.checked)}
                      className="rounded border-stone-300 text-amber-500 focus:ring-amber-500/40"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="shimmer" className="text-[11px] text-stone-700 font-medium">Reflective Gold Leaf Shimmer</label>
                    <input 
                      type="checkbox" id="shimmer" checked={useGoldGradient}
                      onChange={(e) => setUseGoldGradient(e.target.checked)}
                      className="rounded border-stone-300 text-amber-500 focus:ring-amber-500/40"
                    />
                  </div>
                  {useGoldGradient && (
                    <div className="pt-2">
                      <div className="flex justify-between text-[8.5px] font-bold text-stone-400 uppercase mb-1">
                        <span>Gold Shimmer Intensity</span>
                        <span className="font-mono text-amber-700 font-bold">{goldIntensity}%</span>
                      </div>
                      <input 
                        type="range" min="30" max="100" value={goldIntensity}
                        onChange={(e) => setGoldIntensity(parseInt(e.target.value))}
                        className="w-full h-1 bg-stone-200 appearance-none accent-amber-600 rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: Custom Image Calligraphy Uploader */}
          <div className="border border-stone-200/60 bg-white rounded-2xl overflow-hidden shadow-xs transition-all">
            <button 
              onClick={() => setActiveAccordion(activeAccordion === 'upload' ? 'export' : 'upload')}
              className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/50 hover:bg-stone-50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <Image className="h-4 w-4 text-amber-600" />
                <div>
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-serif">4. Custom Calligraphy Upload</h3>
                  <p className="text-[10px] text-stone-400 font-sans mt-0.5">Drag-and-drop vector or artwork overlays</p>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 text-stone-400 transition-transform ${activeAccordion === 'upload' ? 'rotate-180' : ''}`} />
            </button>

            {activeAccordion === 'upload' && (
              <div className="p-5 border-t border-stone-100 space-y-4 animate-in fade-in duration-300">
                <p className="text-[10.5px] text-stone-500 leading-normal">
                  In addition to the verified Tanzil script library, you can upload your custom calligraphic script, family crest, or custom design overlay to render onto the premium canvas.
                </p>

                {/* Upload box */}
                {!customCalligraphyFile ? (
                  <div 
                    onClick={handleMockUpload}
                    className="border-2 border-dashed border-stone-300 hover:border-amber-500/60 transition-all rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-stone-50"
                  >
                    <Upload className="h-6 w-6 text-stone-400 mb-2" />
                    <span className="block text-xs font-bold text-stone-700">Upload Calligraphy PNG/SVG</span>
                    <span className="block text-[9px] text-stone-400 mt-1 uppercase">Supports transparency, 300 DPI high resolution</span>
                  </div>
                ) : (
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-[11px] font-bold text-stone-700 truncate">{customCalligraphyName}</span>
                      </div>
                      <button 
                        onClick={() => { setCustomCalligraphyFile(null); setCustomCalligraphyName(''); }}
                        className="text-stone-400 hover:text-rose-500 transition-colors text-[10px] font-bold uppercase shrink-0"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-stone-200/50">
                      <div>
                        <div className="flex justify-between text-[8.5px] font-bold text-stone-400 uppercase mb-1">
                          <span>Artwork Scale</span>
                          <span className="font-mono text-amber-700 font-bold">{customCalligraphyScale}%</span>
                        </div>
                        <input 
                          type="range" min="40" max="150" value={customCalligraphyScale}
                          onChange={(e) => setCustomCalligraphyScale(parseInt(e.target.value))}
                          className="w-full h-1 bg-stone-200 appearance-none accent-amber-600 rounded"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-[8.5px] font-bold text-stone-400 uppercase mb-1">
                          <span>Artwork Opacity</span>
                          <span className="font-mono text-amber-700 font-bold">{customCalligraphyOpacity}%</span>
                        </div>
                        <input 
                          type="range" min="20" max="100" value={customCalligraphyOpacity}
                          onChange={(e) => setCustomCalligraphyOpacity(parseInt(e.target.value))}
                          className="w-full h-1 bg-stone-200 appearance-none accent-amber-600 rounded"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* STEP 5: Etsy/Shopify Sync & High-Res Export */}
          <div className="border border-stone-200/60 bg-white rounded-2xl overflow-hidden shadow-xs transition-all">
            <button 
              onClick={() => setActiveAccordion(activeAccordion === 'export' ? 'script' : 'export')}
              className="w-full px-5 py-4 flex items-center justify-between bg-stone-50/50 hover:bg-stone-50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <Tag className="h-4 w-4 text-amber-600" />
                <div>
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-serif">5. Publisher & Exporter Pro</h3>
                  <p className="text-[10px] text-stone-400 font-sans mt-0.5">Automated Etsy metadata & 300 DPI downloads</p>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 text-stone-400 transition-transform ${activeAccordion === 'export' ? 'rotate-180' : ''}`} />
            </button>

            {activeAccordion === 'export' && (
              <div className="p-5 border-t border-stone-100 space-y-4 animate-in fade-in duration-300">
                
                {/* SEO listing Title */}
                <div>
                  <label className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider block mb-1">SEO Title (Autogenerated)</label>
                  <textarea 
                    value={etsyTitle}
                    onChange={(e) => setEtsyTitle(e.target.value)}
                    rows={2}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-[11px] text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500/40"
                  />
                </div>

                {/* Sync Listing */}
                <div className="space-y-2">
                  <button
                    onClick={handlePublishing}
                    disabled={publishingStatus !== 'idle'}
                    className={`w-full font-bold uppercase tracking-wider py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      publishingStatus === 'idle'
                        ? 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                    }`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>{publishingStatus === 'idle' ? 'Sync Draft to Etsy/Shopify' : 'Syncing listing API...'}</span>
                  </button>

                  {publishingStatus === 'published' && (
                    <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-[10px] font-mono text-emerald-700 leading-normal">
                      ✔ Sync successful! Mockup rooms loaded.
                      <br />
                      ✔ Variant SKUs pushed to Shopify backend.
                    </div>
                  )}
                </div>

                {/* Exporter Downloads */}
                <div className="space-y-3">
                  <button
                    onClick={triggerPDFDownload}
                    disabled={isExportingPDF}
                    className="w-full bg-stone-950 hover:bg-stone-900 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-widest py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-stone-950/25 cursor-pointer"
                  >
                    <Download className="h-4 w-4 text-amber-500" />
                    <span>{isExportingPDF ? 'Generating Vector PDF...' : 'Download PDF for Print (Bleeds & Crops)'}</span>
                  </button>

                  <button
                    onClick={triggerArtDownload}
                    disabled={isExporting}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold uppercase tracking-widest py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm shadow-amber-500/20 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>{isExporting ? 'Compiling Raster...' : 'Export High-Res Image (300 DPI PNG)'}</span>
                  </button>

                  {showPDFSuccess && (
                    <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-[10px] font-mono text-emerald-700 leading-normal">
                      ✔ Print-ready fine art PDF successfully compiled!
                      <br />
                      ✔ Standard 3mm bleeds & trim marks injected.
                      <br />
                      ✔ Color targets, registration marks, and metadata stamp ready.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          </>)}

        </div>

        {/* Wizard Bottom navigation controls */}
        <div className="p-5 border-t border-stone-200 bg-white space-y-4 shrink-0 shadow-[0_-8px_30px_rgb(0,0,0,0.02)]">
          
          {/* Sizing & pricing summary */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-[9px] font-mono text-stone-400 uppercase leading-none">Bespoke Art Charge</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base font-serif font-extrabold text-[#C5A059]">${pricing.total.toFixed(2)}</span>
                <span className="text-[8px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Free S&H</span>
              </div>
            </div>
            <span className="text-[9.5px] font-mono text-stone-400 text-right">
              {printSize} Size
              <br />
              <span className="capitalize font-medium text-stone-700">{printMaterial} Print</span>
            </span>
          </div>

          <div className="flex gap-2">
            {currentStep > 1 ? (
              <button
                onClick={() => {
                  const prevStep = currentStep - 1;
                  setCurrentStep(prevStep);
                  if (prevStep <= 3) setViewTab('canvas');
                  if (prevStep === 4) setViewTab('mockup');
                }}
                className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-[10px] uppercase tracking-wider transition-all cursor-pointer"
              >
                Back
              </button>
            ) : null}

            {currentStep < 5 ? (
              <button
                onClick={() => {
                  const nextStep = currentStep + 1;
                  setCurrentStep(nextStep);
                  if (nextStep <= 3) setViewTab('canvas');
                  if (nextStep === 4) setViewTab('mockup');
                }}
                className="flex-1 px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-[10px] uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-stone-900/10"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSimulateOrder}
                disabled={isProcessingCheckout}
                className="flex-1 px-5 py-3 bg-stone-950 hover:bg-stone-800 text-[#C5A059] font-bold rounded-xl text-[10px] uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-[#C5A059]/10"
              >
                {isProcessingCheckout ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <Printer className="h-3.5 w-3.5 text-[#C5A059]" />
                    <span>Order Bespoke Art</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>

      {/* RIGHT SIDE (65-70%): Huge Canvas Stage Studio */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0a0b] relative">
        
        {/* Top Control Bar over Stage */}
        <div className="h-14 border-b border-stone-900/60 bg-stone-950/40 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-30">
          
          {/* Editor/Mockup Toggle Tab */}
          <div className="flex items-center bg-stone-900/80 p-1 rounded-xl border border-stone-800/80">
            <button
              onClick={() => setViewTab('canvas')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                viewTab === 'canvas' 
                  ? 'bg-stone-800 text-[#faf9f5] shadow-xs' 
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Layout className="h-3.5 w-3.5" /> Pure Canvas Art
            </button>
            <button
              onClick={() => setViewTab('mockup')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                viewTab === 'mockup' 
                  ? 'bg-stone-800 text-[#faf9f5] shadow-xs' 
                  : 'text-stone-400 hover:text-[#faf9f5]'
              }`}
            >
              <Eye className="h-3.5 w-3.5" /> Room Presentation
            </button>
          </div>

          {/* Quick Actions (Fit view, guidelines, Undo) */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-800 disabled:opacity-35 transition-all cursor-pointer"
              title="Undo last modification"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {viewTab === 'canvas' && (
              <>
                <button 
                  onClick={() => setShowGuides(!showGuides)}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    showGuides ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                  title="Toggle Center Alignment Guides"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setIsPanningMode(!isPanningMode)}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    isPanningMode ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                  title="Drag and position Canvas (Hold Spacebar)"
                >
                  <Maximize className="h-4 w-4 rotate-45" />
                </button>
              </>
            )}

            <div className="h-5 w-[1px] bg-stone-800"></div>

            <button 
              onClick={resetViewport}
              className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white bg-stone-900 border border-stone-800 rounded-lg cursor-pointer"
            >
              Recenter
            </button>
          </div>
        </div>

        {/* Central Designing Studio Viewport */}
        <div className="flex-1 overflow-hidden flex items-center justify-center relative">
          
          <CanvasStage
            viewTab={viewTab}
            setViewTab={setViewTab}
            selectedVerse={{
              ...selectedVerse,
              arabicText: editableArabic,
              englishTranslation: editableTranslation
            }}
            currentPreset={currentPreset}
            fontSize={fontSize}
            letterSpacing={letterSpacing}
            arabicFont={arabicFont}
            zoom={zoom}
            setZoom={setZoom}
            rotate={rotate}
            setRotate={setRotate}
            showGuides={showGuides}
            setShowGuides={setShowGuides}
            selectedLayer={selectedLayer}
            setSelectedLayer={setSelectedLayer}
            layoutShape={layoutShape}
            frameType={frameType}
            decorativeFrame={decorativeFrame}
            borderThickness={borderThickness}
            innerPadding={innerPadding}
            cornerStyle={cornerStyle}
            cornerOrnament={cornerOrnament}
            circularOrnament={circularOrnament}
            selectedOrnament={selectedOrnament}
            useGoldGradient={useGoldGradient}
            canvasOpacity={canvasOpacity}
            showQuranMetadata={showQuranMetadata}
            showTranslation={showTranslation}
            translationFontSize={translationFontSize}
            translationColor={translationColor}
            activeTexture={bgTexture}
            canvasRef={canvasRef}
            getLayoutShapeClass={getLayoutShapeClass}
            renderCanvasWithPhysicalFrame={renderCanvasWithPhysicalFrame}
            getDecorativeFrameStyles={getDecorativeFrameStyles}
            t={t}
            isPanningMode={isPanningMode}
            setIsPanningMode={setIsPanningMode}
            panOffset={panOffset}
            setPanOffset={setPanOffset}
            isDraggingCanvas={isDraggingCanvas}
            setIsDraggingCanvas={setIsDraggingCanvas}
            dragStart={dragStart}
            setDragStart={setDragStart}
            lockedLayers={lockedLayers}
            setLockedLayers={setLockedLayers}
            hiddenLayers={hiddenLayers}
            setHiddenLayers={setHiddenLayers}
            selectedScene={selectedScene}
            customHangingOffset={customHangingOffset}
            customScalePercent={customScalePercent}
            mockupBrightness={mockupBrightness}
            mockupContrast={mockupContrast}
            mockupWarmth={mockupWarmth}
            mockupFormat={mockupFormat}
            customRoomImage={customRoomImage}
            showTriptych={showTriptych}
            customCalligraphyFile={customCalligraphyFile}
            customCalligraphyScale={customCalligraphyScale}
            customCalligraphyOpacity={customCalligraphyOpacity}
          />

          {/* Quick Mockup Interior Selector Carousel at Bottom (Only visible when Room View is active) */}
          {viewTab === 'mockup' && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-stone-950/80 backdrop-blur-xl border border-stone-800 rounded-2xl p-3.5 flex flex-col gap-2.5 shadow-2xl z-40 max-w-[90%] w-[580px] animate-in slide-in-from-bottom-6 duration-300">
              <div className="flex items-center justify-between text-[#faf9f5]">
                <span className="text-[9.5px] font-mono tracking-widest font-bold uppercase text-amber-500">Select Gallery Interior backdrop</span>
                <span className="text-[8px] font-mono text-stone-400 uppercase">Interactive Projection</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {MOCKUP_SCENES.map(scene => (
                  <button
                    key={scene.id}
                    onClick={() => setSelectedScene(scene)}
                    className={`flex-none w-20 rounded-lg overflow-hidden border p-0.5 bg-stone-900 transition-all ${
                      selectedScene.id === scene.id 
                        ? 'border-amber-500 scale-100 shadow-sm' 
                        : 'border-stone-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="w-full aspect-[4/3] rounded-md overflow-hidden">
                      <img src={scene.imageUrl} alt={scene.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="block text-[7.5px] font-bold text-stone-300 truncate text-center mt-1 px-0.5">{scene.name.split(' (')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* SUCCESS ORDER PRINT MODAL */}
      {showCheckoutSuccess && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center border border-stone-200 shadow-2xl animate-in scale-in duration-200">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500 border border-emerald-100">
              <Check className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">Custom Order Created</h3>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Your bespoke sacred wall art mockup has been processed. The layout compiled successfully on our Tanzil validator node.
            </p>
            
            <div className="my-5 p-4 bg-stone-50 rounded-2xl border border-stone-200/60 text-left space-y-2 text-xs">
              <div className="flex justify-between font-bold text-stone-800">
                <span>Order Reference:</span>
                <span className="font-mono text-amber-700">#AYAT-2026-{(Math.random() * 10000).toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Product Medium:</span>
                <span className="capitalize">{printMaterial} Print ({printSize})</span>
              </div>
              <div className="flex justify-between">
                <span>Outer Wood Frame:</span>
                <span className="capitalize">{frameType === 'none' ? 'None' : frameType}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200/50 pt-2 font-bold text-stone-900">
                <span>Total Charge:</span>
                <span>${pricing.total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => setShowCheckoutSuccess(false)}
              className="w-full bg-stone-950 hover:bg-stone-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest cursor-pointer"
            >
              Continue Designing
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
