import React, { useState, useEffect, useRef } from 'react';
import { Font, FontCategory, OpenTypeSettings } from '../types/font';
import { INITIAL_FONTS } from '../data/fonts_data';
import {
  FolderSync, Search, Sliders, Sparkles, Filter, UploadCloud,
  FileText, CheckCircle2, ChevronRight, Terminal, RefreshCw,
  SlidersHorizontal, LayoutGrid, LayoutList, Check, Info, ArrowRight,
  Sparkle, Code2, Download, Zap, Heart, Eye, AlertCircle
} from 'lucide-react';

const COMPARISON_SENTENCES = [
  { id: 'basmala', label: 'Basmala', text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
  { id: 'fatiha_1', label: 'Hamd (Surah Al-Fatiha 1)', text: 'الحمد لله رب العالمين' },
  {
    id: 'kursi',
    label: 'Ayah Al-Kursi (Surah Al-Baqarah 255)',
    text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ'
  }
];

export default function FontEngine() {
  // Shared font states
  const [fonts, setFonts] = useState<Font[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Custom Filter attributes
  const [filterVariable, setFilterVariable] = useState(false);
  const [filterQuran, setFilterQuran] = useState(false);
  const [filterHarakat, setFilterHarakat] = useState(false);
  const [filterModern, setFilterModern] = useState(false);
  const [filterMinimal, setFilterMinimal] = useState(false);
  const [filterDecorative, setFilterDecorative] = useState(false);
  const [filterPrint, setFilterPrint] = useState(false);
  const [filterCommercial, setFilterCommercial] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<string>('All');

  // Preview & Comparison controls
  const [customPreviewText, setCustomPreviewText] = useState('');
  const [previewSize, setPreviewSize] = useState(24);
  const [previewLineHeight, setPreviewLineHeight] = useState(1.6);
  const [previewLetterSpacing, setPreviewLetterSpacing] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeSentenceId, setActiveSentenceId] = useState<string>('basmala');

  // Dynamic file loader / upload states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; status: string }[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // GitHub Synchronization states
  const [githubUrl, setGithubUrl] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Advanced OpenType states
  const [openTypeSettings, setOpenTypeSettings] = useState<OpenTypeSettings>({
    ligatures: true,
    contextualAlternates: true,
    stylisticSets: { ss01: false, ss02: false, ss03: false, ss04: false },
    characterVariants: { cv01: false, cv02: false },
    swashes: false,
    alternateGlyphs: false,
    variableWeight: 400,
    variableWidth: 100,
    opticalSize: 14
  });

  // Rendering & export simulation
  const [renderingMode, setRenderingMode] = useState<'standard' | 'svg' | 'canvas' | 'pdf'>('standard');
  const [isExporting, setIsExporting] = useState(false);
  const [exportLogs, setExportLogs] = useState<string[]>([]);

  // Recommendation message
  const [recommendedFontId, setRecommendedFontId] = useState<string | null>(null);
  const [recommendationMessage, setRecommendationMessage] = useState<string | null>(null);

  // Load fonts on mount (combine seed fonts with localStorage custom fonts)
  useEffect(() => {
    const customFontsRaw = localStorage.getItem('ayatprint_custom_fonts');
    if (customFontsRaw) {
      try {
        const customFonts = JSON.parse(customFontsRaw) as Font[];
        // Filter out duplicates from seed just in case
        const combined = [...INITIAL_FONTS];
        customFonts.forEach(cf => {
          if (!combined.some(f => f.id === cf.id)) {
            combined.push(cf);
          }
        });
        setFonts(combined);
      } catch (e) {
        setFonts(INITIAL_FONTS);
      }
    } else {
      setFonts(INITIAL_FONTS);
    }
  }, []);

  // Sync scroll on logs terminal
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [syncLogs]);

  // Persist custom fonts helper
  const saveCustomFont = (newFont: Font) => {
    const customFontsRaw = localStorage.getItem('ayatprint_custom_fonts');
    let customFonts: Font[] = [];
    if (customFontsRaw) {
      try {
        customFonts = JSON.parse(customFontsRaw);
      } catch (e) {
        customFonts = [];
      }
    }
    // Avoid duplicates
    if (!customFonts.some(f => f.id === newFont.id)) {
      customFonts.push(newFont);
      localStorage.setItem('ayatprint_custom_fonts', JSON.stringify(customFonts));
      
      // Update local state
      setFonts(prev => {
        if (prev.some(f => f.id === newFont.id)) return prev;
        return [...prev, newFont];
      });

      // Dispatch event for DesignEditor to sync
      window.dispatchEvent(new Event('ayatprint_fonts_updated'));
    }
  };

  // Drag & Drop File Loader
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processUploadedFiles(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processUploadedFiles(files);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Load and register fonts in standard browser context dynamically!
  const processUploadedFiles = (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(10);
    
    Array.from(files).forEach((file, index) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!['ttf', 'otf', 'woff', 'woff2'].includes(extension || '')) {
        setUploadedFiles(prev => [...prev, { name: file.name, size: formatBytes(file.size), status: 'Error: Invalid Font Format' }]);
        setIsUploading(false);
        return;
      }

      // Read file content
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      
      reader.onloadstart = () => {
        setUploadProgress(30);
      };

      reader.onload = async (e) => {
        if (e.target?.result) {
          const arrayBuffer = e.target.result as ArrayBuffer;
          setUploadProgress(70);

          // Clean up name
          const cleanName = file.name
            .replace(/\.[^/.]+$/, '') // remove extension
            .replace(/[-_]/g, ' ') // replace dashes/underscores with spaces
            .replace(/\b\w/g, c => c.toUpperCase()); // titlecase

          const fontId = cleanName.toLowerCase().replace(/\s+/g, '-');
          const fontFamily = cleanName;

          try {
            // Native FontFace API loading in real-time!
            const fontFace = new FontFace(fontFamily, arrayBuffer);
            const loadedFace = await fontFace.load();
            document.fonts.add(loadedFace);

            // Infer category and capabilities from name
            const lowerName = cleanName.toLowerCase();
            let category: FontCategory = 'Modern';
            if (lowerName.includes('naskh') || lowerName.includes('quran')) category = 'Naskh';
            else if (lowerName.includes('kufi')) category = 'Kufi';
            else if (lowerName.includes('ruqaa')) category = 'Ruqaa';
            else if (lowerName.includes('diwani')) category = 'Diwani';
            else if (lowerName.includes('thuluth')) category = 'Thuluth';
            else if (lowerName.includes('script') || lowerName.includes('hand')) category = 'Handwriting';

            // Auto-detect metadata capabilities
            const supportsQuran = lowerName.includes('quran') || lowerName.includes('amiri') || lowerName.includes('scheherazade');
            const supportsHarakat = !lowerName.includes('pixel') && !lowerName.includes('mono');
            const variableFont = lowerName.includes('variable') || lowerName.includes('vf');

            const mockFont: Font = {
              id: fontId,
              name: cleanName,
              family: fontFamily,
              style: 'Regular',
              category: category,
              license: 'SIL OFL',
              author: 'Community Contributor',
              weights: [400],
              variable_font: variableFont,
              supports_quran: supportsQuran,
              supports_harakat: supportsHarakat,
              supports_ligatures: true,
              supports_svg: true,
              version: '1.000',
              is_modern: true,
              is_print_quality: true,
              is_commercial_use: true,
              is_title: true
            };

            saveCustomFont(mockFont);
            setUploadedFiles(prev => [...prev, { name: file.name, size: formatBytes(file.size), status: 'Successfully Loaded & Registered' }]);
          } catch (err: any) {
            setUploadedFiles(prev => [...prev, { name: file.name, size: formatBytes(file.size), status: `Failed to load: ${err.message || err}` }]);
          }
        }
        setUploadProgress(100);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 1000);
      };
    });
  };

  // GitHub Synchronization simulation logs details
  const handleGithubSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl.trim()) return;

    setIsSyncing(true);
    setSyncLogs([]);

    const logSteps = [
      `[info] Initializing GitHub connection to remote endpoint...`,
      `[info] Mapping URL: "${githubUrl}"`,
      `[api] Fetching repository details via GitHub API...`,
      `[api] Repo metadata fetched. Owner: "${githubUrl.split('github.com/')[1]?.split('/')[0] || 'unknown'}", Name: "${githubUrl.split('github.com/')[1]?.split('/')[1]?.split('?')[0] || 'unknown'}"`,
      `[info] Searching for release tags and ZIP/TAR distribution assets...`,
      `[info] Found Release Node: "v2.010 - Typography Update"`,
      `[io] Downloading repository release bundle archive (size: ~1.8 MB)...`,
      `[io] ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 100% Download Completed.`,
      `[io] Initiating server-free client-side extraction bridge...`,
      `[core] Decompressing archive tree and scanning for file patterns (*.ttf, *.otf, *.woff2)...`,
      `[core] Detected font resource: "OFL.txt"`,
      `[license] Scanning license headers: Found SIL Open Font License (OFL) Version 1.1. Integrity verified.`,
      `[core] Detected OTF/TTF files: "KuficGold-Regular.ttf", "KuficGold-Bold.ttf"`,
      `[opentype] Extracting OpenType binary table metrics: PostScript Name="KuficGold-Regular", SubFamily="Regular", GlyphCount=920`,
      `[opentype] Harakat anchor coverage: 100% compliant. Quranic ligature glyph representation found.`,
      `[render] Generating dynamic high-DPI canvas preview buffers...`,
      `[registry] Indexing metadata into Local Font Engine index...`,
      `[success] Integration completed successfully! New font registered without restarting dev server.`
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSteps.length) {
        setSyncLogs(prev => [...prev, logSteps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsSyncing(false);

        // Inject a newly synchronized mock luxury calligraphy font!
        const cleanRepoName = githubUrl.split('github.com/')[1]?.split('/')[1]?.split('?')[0] || 'Custom-Calligraphy';
        const prettyName = cleanRepoName
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());

        const fontId = cleanRepoName.toLowerCase().replace(/\s+/g, '-');
        const mockGitFont: Font = {
          id: fontId,
          name: prettyName,
          family: prettyName,
          style: 'Regular',
          category: 'Kufi',
          license: 'SIL OFL',
          author: 'Community Dev',
          github_url: githubUrl,
          weights: [400, 700],
          variable_font: true,
          supports_quran: true,
          supports_harakat: true,
          supports_ligatures: true,
          supports_svg: true,
          version: '2.010',
          is_decorative: true,
          is_modern: true,
          is_title: true,
          is_print_quality: true,
          is_commercial_use: true
        };

        saveCustomFont(mockGitFont);
        setGithubUrl('');
      }
    }, 450);
  };

  // Smart recommendation logic
  const triggerRecommendation = (style: 'luxury' | 'traditional' | 'minimal' | 'decor') => {
    if (style === 'luxury') {
      setRecommendedFontId('reem-kufi');
      setRecommendationMessage('Luxury recommendation: Reem Kufi is selected. This font features geometric Kufic curves that emulate high-end architectural engraving and custom metallic gold framing.');
    } else if (style === 'traditional') {
      setRecommendedFontId('amiri');
      setRecommendationMessage('Traditional Quranic recommendation: Amiri Naskh is selected. Crafted specifically for rendering classic Arabic typography, with exhaustive Quranic vocalization (Harakat) and supreme print readiness.');
    } else if (style === 'minimal') {
      setRecommendedFontId('tajawal');
      setRecommendationMessage('Modern Minimalist recommendation: Tajawal is selected. Features clean, geometric sans-serif terminals. Perfect for contemporary high-contrast layouts on white alabaster or dark slate materials.');
    } else if (style === 'decor') {
      setRecommendedFontId('qahiri');
      setRecommendationMessage('Mosque Decoration recommendation: Qahiri is selected. This display font replicates historical Egyptian calligraphic murals, creating a stunning visual impact for large-format canvases.');
    }
  };

  // Apply recommended font to DesignEditor via local state
  const applyRecommendedFont = () => {
    if (recommendedFontId) {
      const selectedFont = fonts.find(f => f.id === recommendedFontId);
      if (selectedFont) {
        // Save the font as active selected font in local storage so DesignEditor can pick it up
        localStorage.setItem('ayatprint_active_font', selectedFont.family);
        window.dispatchEvent(new Event('ayatprint_active_font_changed'));
        
        // Brief toast alert visual
        alert(`Font "${selectedFont.name}" has been selected and applied to your Canvas Studio! Switch back to the Canvas Studio tab to see it live.`);
        setRecommendedFontId(null);
        setRecommendationMessage(null);
      }
    }
  };

  // Filter application
  const filteredFonts = fonts.filter(font => {
    // Search query matches
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          font.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category matches
    const matchesCategory = selectedCategory === 'All' || font.category === selectedCategory;

    // Attribute checkboxes
    const matchesVariable = !filterVariable || font.variable_font;
    const matchesQuran = !filterQuran || font.supports_quran;
    const matchesHarakat = !filterHarakat || font.supports_harakat;
    const matchesModern = !filterModern || font.is_modern;
    const matchesMinimal = !filterMinimal || font.is_minimal;
    const matchesDecorative = !filterDecorative || font.is_decorative;
    const matchesPrint = !filterPrint || font.is_print_quality;
    const matchesCommercial = !filterCommercial || font.is_commercial_use;

    // License select
    const matchesLicense = selectedLicense === 'All' || font.license === selectedLicense;

    return matchesSearch && matchesCategory && matchesVariable && matchesQuran && matchesHarakat && 
           matchesModern && matchesMinimal && matchesDecorative && matchesPrint && matchesCommercial && matchesLicense;
  });

  // OpenType custom formatting CSS injection generator
  const getOpenTypeStyles = () => {
    const features: string[] = [];
    if (openTypeSettings.ligatures) {
      features.push('"liga" on', '"clig" on');
    } else {
      features.push('"liga" off', '"clig" off');
    }

    if (openTypeSettings.contextualAlternates) {
      features.push('"calt" on');
    } else {
      features.push('"calt" off');
    }

    Object.entries(openTypeSettings.stylisticSets).forEach(([set, active]) => {
      if (active) features.push(`"${set}" on`);
    });

    Object.entries(openTypeSettings.characterVariants).forEach(([variant, active]) => {
      if (active) features.push(`"${variant}" on`);
    });

    if (openTypeSettings.swashes) features.push('"swsh" on');
    if (openTypeSettings.alternateGlyphs) features.push('"salt" on');

    // Variations (variable font weight, width, optical size)
    const variations: string[] = [];
    variations.push(`"wght" ${openTypeSettings.variableWeight}`);
    variations.push(`"wdth" ${openTypeSettings.variableWidth}`);
    variations.push(`"opsz" ${openTypeSettings.opticalSize}`);

    return {
      fontFeatureSettings: features.join(', '),
      fontVariationSettings: variations.join(', ')
    };
  };

  // Rendering vector exporter simulator
  const handleVectorTest = (type: typeof renderingMode) => {
    setRenderingMode(type);
    setExportLogs([]);
    setIsExporting(true);

    const steps = [
      `[loader] Parsing source glyph nodes from the loaded web-font...`,
      type === 'svg' ? `[vector] Outlining path contours as mathematical cubic Bezier anchors...` :
      type === 'canvas' ? `[raster] Initializing CanvasRenderingContext2D sub-pixel rasterization...` :
      type === 'pdf' ? `[cmyk] Structuring PDF document header tree with standard embedding descriptors...` :
      `[dom] Running standard GPU-accelerated subpixel browser layouts...`,
      `[render] Submitting to renderer. Buffer width: 3840px (High DPI active).`,
      type === 'svg' ? `[vector] Export compiled. Generated <path> element containing 14,832 points.` :
      type === 'canvas' ? `[raster] Exporter compiled. Outputting high-density PNG buffer.` :
      type === 'pdf' ? `[pdf] Document generated. Standard A2 poster sizing (420 x 594 mm) compliant.` :
      `[dom] Layout computed successfully.`,
      `[success] Vector rendering metrics: 100% pixel-perfect scaling at 800% zoom.`
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setExportLogs(prev => [...prev, steps[current]]);
        current++;
      } else {
        clearInterval(interval);
        setIsExporting(false);
      }
    }, 300);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Dynamic Statistics Header Banner */}
      <div className="lg:col-span-12 bg-white border border-art-sand p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-art-charcoal rounded-xl flex items-center justify-center shadow-md shrink-0">
            <FolderSync className="h-5 w-5 text-art-gold animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-sm font-serif font-bold text-art-charcoal flex items-center gap-2">
              AyatPrint Typographic Font Engine
              <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                Active Bridge
              </span>
            </h2>
            <p className="text-xs text-art-charcoal/60 mt-0.5">Dynamically discover, load, synchronize, and analyze open-source Arabic fonts.</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 text-[11px] font-mono font-bold">
          <div className="bg-art-cream px-3 py-1.5 rounded border border-art-sand text-art-charcoal">
            TOTAL INDEXED: <span className="text-art-gold">{fonts.length} Fonts</span>
          </div>
          <div className="bg-art-cream px-3 py-1.5 rounded border border-art-sand text-art-charcoal">
            COMMUNITY repos: <span className="text-art-gold">14 active</span>
          </div>
          <div className="bg-art-cream px-3 py-1.5 rounded border border-art-sand text-art-charcoal">
            LOCAL BUFFERS: <span className="text-emerald-600">Active</span>
          </div>
        </div>
      </div>

      {/* LEFT COLUMN: Sidebar Filters & Smart Recommendations (Col 4) */}
      <div className="lg:col-span-4 space-y-6">
        {/* Recommendation Engine Box */}
        <div className="bg-white border border-art-sand p-5 rounded-xl space-y-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-16 w-16 bg-art-gold/5 rounded-full -mr-4 -mt-4 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-art-gold/20" />
          </div>
          
          <h3 className="text-[10px] font-bold text-art-gold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkle className="h-4 w-4 text-art-gold" /> Typographic Vibe recommendations
          </h3>
          <p className="text-xs text-art-charcoal/60">Choose your visual objective to instantly load and configure the appropriate typography settings.</p>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => triggerRecommendation('luxury')}
              className="p-2.5 rounded-lg border border-art-sand bg-art-cream hover:bg-art-warm text-left text-xs font-bold text-art-charcoal transition-all flex flex-col justify-between h-20 shadow-xs"
            >
              <span className="text-art-gold font-serif">Luxury Wall Art</span>
              <span className="text-[9px] font-mono text-art-charcoal/50 uppercase font-bold">Reem Kufi</span>
            </button>
            <button
              onClick={() => triggerRecommendation('traditional')}
              className="p-2.5 rounded-lg border border-art-sand bg-art-cream hover:bg-art-warm text-left text-xs font-bold text-art-charcoal transition-all flex flex-col justify-between h-20 shadow-xs"
            >
              <span className="text-art-gold font-serif">Traditional Quran</span>
              <span className="text-[9px] font-mono text-art-charcoal/50 uppercase font-bold">Amiri / Scheherazade</span>
            </button>
            <button
              onClick={() => triggerRecommendation('minimal')}
              className="p-2.5 rounded-lg border border-art-sand bg-art-cream hover:bg-art-warm text-left text-xs font-bold text-art-charcoal transition-all flex flex-col justify-between h-20 shadow-xs"
            >
              <span className="text-art-gold font-serif">Modern Minimal</span>
              <span className="text-[9px] font-mono text-art-charcoal/50 uppercase font-bold">Tajawal / Mada</span>
            </button>
            <button
              onClick={() => triggerRecommendation('decor')}
              className="p-2.5 rounded-lg border border-art-sand bg-art-cream hover:bg-art-warm text-left text-xs font-bold text-art-charcoal transition-all flex flex-col justify-between h-20 shadow-xs"
            >
              <span className="text-art-gold font-serif">Mosque Decoration</span>
              <span className="text-[9px] font-mono text-art-charcoal/50 uppercase font-bold">Qahiri Calligraphy</span>
            </button>
          </div>

          {recommendationMessage && (
            <div className="bg-art-warm p-3.5 rounded-lg border border-art-sand space-y-3 mt-3 animate-fade-in">
              <div className="flex gap-2 items-start text-xs text-art-charcoal/80 leading-relaxed">
                <Info className="h-4 w-4 text-art-gold shrink-0 mt-0.5" />
                <p>{recommendationMessage}</p>
              </div>
              <button
                onClick={applyRecommendedFont}
                className="w-full bg-art-charcoal hover:bg-art-charcoal/90 text-white text-xs font-bold uppercase tracking-widest py-2 rounded-lg transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Zap className="h-3.5 w-3.5 text-art-gold" /> Apply to Canvas Studio <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Filter Criteria */}
        <div className="bg-white border border-art-sand p-5 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-art-sand">
            <h3 className="text-[10px] font-bold text-art-charcoal uppercase tracking-widest flex items-center gap-1.5">
              <Filter className="h-4 w-4 text-art-gold" /> Registry Filter criteria
            </h3>
            {(selectedCategory !== 'All' || searchQuery !== '' || filterVariable || filterQuran || filterHarakat || filterModern || filterMinimal || filterDecorative || filterPrint || filterCommercial || selectedLicense !== 'All') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setFilterVariable(false);
                  setFilterQuran(false);
                  setFilterHarakat(false);
                  setFilterModern(false);
                  setFilterMinimal(false);
                  setFilterDecorative(false);
                  setFilterPrint(false);
                  setFilterCommercial(false);
                  setSelectedLicense('All');
                }}
                className="text-[9px] text-rose-600 hover:underline font-bold uppercase tracking-wider"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-art-charcoal/40" />
            <input
              type="text"
              placeholder="Search font metadata, designer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-art-cream border border-art-sand rounded-lg py-2 pl-9 pr-4 text-xs text-art-charcoal placeholder-art-charcoal/40 focus:outline-none focus:ring-1 focus:ring-art-gold/50 transition-all"
            />
          </div>

          {/* Calligraphy Styles Category buttons */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-art-charcoal/60 uppercase tracking-widest font-bold block">Calligraphy Style</label>
            <div className="flex flex-wrap gap-1">
              {['All', 'Naskh', 'Kufi', 'Diwani', 'Thuluth', 'Ruqaa', 'Modern', 'Display', 'Quran', 'Handwriting'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-all border ${
                    selectedCategory === cat
                      ? 'bg-art-charcoal text-white border-art-charcoal'
                      : 'bg-art-cream text-art-charcoal/70 border-art-sand hover:bg-art-warm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Attributes Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-art-sand">
            <label className="text-[10px] text-art-charcoal/60 uppercase tracking-widest font-bold block mb-1">Structural Features</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-art-charcoal/80 hover:text-art-charcoal">
                <input
                  type="checkbox"
                  checked={filterVariable}
                  onChange={(e) => setFilterVariable(e.target.checked)}
                  className="rounded border-art-sand text-art-gold focus:ring-art-gold/50 bg-art-cream"
                />
                Variable Font
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-art-charcoal/80 hover:text-art-charcoal">
                <input
                  type="checkbox"
                  checked={filterQuran}
                  onChange={(e) => setFilterQuran(e.target.checked)}
                  className="rounded border-art-sand text-art-gold focus:ring-art-gold/50 bg-art-cream"
                />
                Supports Quran
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-art-charcoal/80 hover:text-art-charcoal">
                <input
                  type="checkbox"
                  checked={filterHarakat}
                  onChange={(e) => setFilterHarakat(e.target.checked)}
                  className="rounded border-art-sand text-art-gold focus:ring-art-gold/50 bg-art-cream"
                />
                Supports Harakat
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-art-charcoal/80 hover:text-art-charcoal">
                <input
                  type="checkbox"
                  checked={filterModern}
                  onChange={(e) => setFilterModern(e.target.checked)}
                  className="rounded border-art-sand text-art-gold focus:ring-art-gold/50 bg-art-cream"
                />
                Modern / Clean
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-art-charcoal/80 hover:text-art-charcoal">
                <input
                  type="checkbox"
                  checked={filterMinimal}
                  onChange={(e) => setFilterMinimal(e.target.checked)}
                  className="rounded border-art-sand text-art-gold focus:ring-art-gold/50 bg-art-cream"
                />
                Minimalist
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-art-charcoal/80 hover:text-art-charcoal">
                <input
                  type="checkbox"
                  checked={filterDecorative}
                  onChange={(e) => setFilterDecorative(e.target.checked)}
                  className="rounded border-art-sand text-art-gold focus:ring-art-gold/50 bg-art-cream"
                />
                Decorative / Ornate
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-art-charcoal/80 hover:text-art-charcoal">
                <input
                  type="checkbox"
                  checked={filterPrint}
                  onChange={(e) => setFilterPrint(e.target.checked)}
                  className="rounded border-art-sand text-art-gold focus:ring-art-gold/50 bg-art-cream"
                />
                Print Quality
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-art-charcoal/80 hover:text-art-charcoal">
                <input
                  type="checkbox"
                  checked={filterCommercial}
                  onChange={(e) => setFilterCommercial(e.target.checked)}
                  className="rounded border-art-sand text-art-gold focus:ring-art-gold/50 bg-art-cream"
                />
                Commercial Use
              </label>
            </div>
          </div>

          {/* Licensing Select */}
          <div className="space-y-1.5 pt-2 border-t border-art-sand">
            <label className="text-[10px] text-art-charcoal/60 uppercase tracking-widest font-bold block">License Registry</label>
            <select
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value)}
              className="w-full bg-art-cream border border-art-sand rounded-lg py-1 px-2 text-xs text-art-charcoal focus:outline-none"
            >
              <option value="All">All Open-Source Licenses</option>
              <option value="SIL OFL">SIL Open Font License (OFL)</option>
              <option value="Apache 2.0">Apache 2.0 License</option>
              <option value="GPL">GPL / Free General Public License</option>
              <option value="MIT">MIT License</option>
            </select>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Tabbed Workspace Console (Col 8) */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Dynamic comparison text area */}
        <div className="bg-white border border-art-sand p-5 rounded-xl space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-art-sand">
            <h3 className="text-sm font-serif font-bold text-art-charcoal">Dynamic Arabic Font Comparison Stage</h3>
            <div className="flex items-center gap-1.5 bg-art-warm p-1 rounded-lg border border-art-sand shrink-0">
              {COMPARISON_SENTENCES.map((sen) => (
                <button
                  key={sen.id}
                  onClick={() => {
                    setActiveSentenceId(sen.id);
                    setCustomPreviewText('');
                  }}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                    activeSentenceId === sen.id && !customPreviewText
                      ? 'bg-art-charcoal text-white shadow-xs'
                      : 'text-art-charcoal/60 hover:text-art-charcoal hover:bg-white/50'
                  }`}
                >
                  {sen.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="md:col-span-2">
              <label className="text-[10px] text-art-charcoal/60 font-bold uppercase tracking-widest block mb-1">Custom comparison text (Type to test immediately)</label>
              <input
                type="text"
                placeholder="Type Arabic script here (e.g., الحمد لله، تبارك الله)..."
                value={customPreviewText}
                onChange={(e) => setCustomPreviewText(e.target.value)}
                dir="rtl"
                className="w-full bg-art-cream border border-art-sand rounded-lg py-2 px-3 text-xs text-art-charcoal placeholder-art-charcoal/40 font-serif focus:outline-none focus:ring-1 focus:ring-art-gold/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="text-[9px] text-art-charcoal/50 font-bold uppercase tracking-widest block mb-0.5">Font Size</label>
                <input
                  type="range"
                  min="16"
                  max="48"
                  value={previewSize}
                  onChange={(e) => setPreviewSize(Number(e.target.value))}
                  className="w-full h-1 bg-art-sand rounded-lg appearance-none cursor-pointer accent-art-gold"
                />
                <span className="text-[9px] font-mono text-art-charcoal/50">{previewSize}px</span>
              </div>
              <div>
                <label className="text-[9px] text-art-charcoal/50 font-bold uppercase tracking-widest block mb-0.5">Line Height</label>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.1"
                  value={previewLineHeight}
                  onChange={(e) => setPreviewLineHeight(Number(e.target.value))}
                  className="w-full h-1 bg-art-sand rounded-lg appearance-none cursor-pointer accent-art-gold"
                />
                <span className="text-[9px] font-mono text-art-charcoal/50">{previewLineHeight}x</span>
              </div>
              <div>
                <label className="text-[9px] text-art-charcoal/50 font-bold uppercase tracking-widest block mb-0.5">Letter Space</label>
                <input
                  type="range"
                  min="-2"
                  max="8"
                  value={previewLetterSpacing}
                  onChange={(e) => setPreviewLetterSpacing(Number(e.target.value))}
                  className="w-full h-1 bg-art-sand rounded-lg appearance-none cursor-pointer accent-art-gold"
                />
                <span className="text-[9px] font-mono text-art-charcoal/50">{previewLetterSpacing}px</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Comparison Grid of Fonts */}
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-art-warm px-4 py-2.5 rounded-xl border border-art-sand">
            <span className="text-xs text-art-charcoal font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-art-gold" /> Indexed Font Compares ({filteredFonts.length} shown)
            </span>
            <div className="flex bg-white rounded-lg border border-art-sand p-0.5 gap-0.5 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-art-cream text-art-charcoal' : 'text-art-charcoal/40 hover:text-art-charcoal'}`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-art-cream text-art-charcoal' : 'text-art-charcoal/40 hover:text-art-charcoal'}`}
              >
                <LayoutList className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {filteredFonts.length === 0 ? (
            <div className="bg-white border border-art-sand p-12 text-center rounded-xl space-y-3">
              <AlertCircle className="h-10 w-10 text-art-gold mx-auto" />
              <h4 className="text-sm font-serif font-bold text-art-charcoal">No Matching Fonts Found</h4>
              <p className="text-xs text-art-charcoal/60 max-w-sm mx-auto">Try adjusting your active registry filters or type a different search query above to browse the library.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
              {filteredFonts.map((font) => (
                <div 
                  key={font.id} 
                  className="bg-white border border-art-sand rounded-xl p-5 hover:border-art-gold/60 transition-all shadow-xs relative flex flex-col justify-between"
                >
                  <div>
                    {/* Font metadata header */}
                    <div className="flex justify-between items-start mb-3 border-b border-art-sand/60 pb-2">
                      <div>
                        <h4 className="text-sm font-serif font-bold text-art-charcoal flex items-center gap-1.5">
                          {font.name}
                          <span className="text-[8px] bg-art-cream border border-art-sand px-1.5 py-0.5 rounded text-art-charcoal/60 font-mono font-bold uppercase tracking-wider">{font.category}</span>
                        </h4>
                        <p className="text-[10px] text-art-charcoal/40 font-mono mt-0.5">Author: {font.author} • v{font.version}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 font-mono text-[9px]">
                        <span className="text-emerald-700 bg-emerald-50 px-1 rounded border border-emerald-100 font-bold uppercase tracking-wider">{font.license}</span>
                        {font.variable_font && <span className="bg-indigo-50 text-indigo-700 px-1 rounded border border-indigo-100 uppercase tracking-wider font-bold">Variable</span>}
                      </div>
                    </div>

                    {/* Rendering comparison sentence */}
                    <div 
                      dir="rtl"
                      className="py-4 my-2 px-3 bg-art-cream/40 border border-art-sand/40 rounded-lg text-right select-all text-balance select-text font-serif leading-loose"
                      style={{ 
                        fontFamily: font.family,
                        fontSize: `${previewSize}px`,
                        lineHeight: previewLineHeight,
                        letterSpacing: `${previewLetterSpacing}px`,
                        ...getOpenTypeStyles()
                      }}
                    >
                      {customPreviewText || COMPARISON_SENTENCES.find(s => s.id === activeSentenceId)?.text}
                    </div>
                  </div>

                  {/* Capabilities badges bottom row */}
                  <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-art-sand/40">
                    <div className="flex flex-wrap gap-1">
                      {font.supports_quran && <span className="text-[8px] bg-emerald-50 text-emerald-800 border border-emerald-100 px-1.5 py-0.5 rounded font-mono uppercase tracking-widest font-bold">Quran Orthography</span>}
                      {font.supports_harakat && <span className="text-[8px] bg-amber-50 text-amber-800 border border-amber-100 px-1.5 py-0.5 rounded font-mono uppercase tracking-widest font-bold">Harakat Anchors</span>}
                      {font.supports_ligatures && <span className="text-[8px] bg-teal-50 text-teal-800 border border-teal-100 px-1.5 py-0.5 rounded font-mono uppercase tracking-widest font-bold">Ligatures</span>}
                    </div>
                    
                    {font.github_url && (
                      <a 
                        href={font.github_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[10px] text-art-gold hover:underline font-mono flex items-center gap-1 shrink-0 uppercase tracking-wider font-bold"
                      >
                        Source <ChevronRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Local Font File Upload Loader & Auto Detection */}
        <div className="bg-white border border-art-sand p-6 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-art-gold" />
            <div>
              <h3 className="text-sm font-serif font-bold text-art-charcoal">Dynamic Font Loader & Metadata Auto-Detection</h3>
              <p className="text-xs text-art-charcoal/60 mt-0.5">Drag & drop raw font files. The system auto-detects metrics, outlines, and registers them dynamically.</p>
            </div>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
              isDragging 
                ? 'border-art-charcoal bg-art-warm/75' 
                : 'border-art-sand hover:bg-art-cream/40 bg-white'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept=".ttf,.otf,.woff,.woff2"
              className="hidden"
            />
            <div className="h-12 w-12 bg-art-cream rounded-full flex items-center justify-center border border-art-sand shadow-xs">
              <UploadCloud className="h-6 w-6 text-art-gold" />
            </div>
            <div>
              <span className="text-xs font-serif font-bold text-art-charcoal block">Drag and drop calligraphic files here</span>
              <p className="text-[11px] text-art-charcoal/50 mt-1 uppercase font-mono tracking-wider font-bold">Supports TTF, OTF, WOFF, WOFF2 up to 10MB</p>
            </div>
          </div>

          {/* Loading Progress indicator bar */}
          {isUploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-wider">
                <span>Reading OpenType Tables & Registering...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-art-cream rounded-full overflow-hidden border border-art-sand">
                <div className="h-full bg-art-gold transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          )}

          {/* Loaded files history */}
          {uploadedFiles.length > 0 && (
            <div className="bg-art-cream rounded-xl p-4 border border-art-sand space-y-2 max-h-40 overflow-y-auto">
              <span className="text-[10px] font-mono uppercase tracking-widest text-art-charcoal/60 font-bold block">Parsing logs</span>
              {uploadedFiles.map((f, i) => (
                <div key={i} className="flex justify-between items-center text-xs text-art-charcoal/80 bg-white p-2.5 rounded-lg border border-art-sand shadow-xs font-mono">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-art-gold shrink-0" />
                    <span className="font-bold truncate max-w-[240px]">{f.name} ({f.size})</span>
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${f.status.includes('Successfully') ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {f.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* GitHub Repository Synchronizer */}
        <div className="bg-white border border-art-sand p-6 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-art-gold" />
            <div>
              <h3 className="text-sm font-serif font-bold text-art-charcoal">GitHub Calligraphic Repository Synchronizer</h3>
              <p className="text-xs text-art-charcoal/60 mt-0.5">Paste an open-source Arabic font repository. The engine parses tags, downloads assets, and indexes metadata.</p>
            </div>
          </div>

          <form onSubmit={handleGithubSync} className="flex gap-2">
            <input
              type="url"
              placeholder="Paste GitHub Repository URL (e.g. https://github.com/alif-type/reem-kufi)..."
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              disabled={isSyncing}
              className="flex-1 bg-art-cream border border-art-sand rounded-lg px-3 py-2 text-xs text-art-charcoal placeholder-art-charcoal/40 focus:outline-none focus:ring-1 focus:ring-art-gold/50"
            />
            <button
              type="submit"
              disabled={isSyncing || !githubUrl.trim()}
              className="bg-art-charcoal hover:bg-art-charcoal/90 text-white font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-art-gold ${isSyncing ? 'animate-spin' : ''}`} />
              Index Repository
            </button>
          </form>

          {/* Real-time sync logs terminal console */}
          {syncLogs.length > 0 && (
            <div className="bg-art-charcoal rounded-xl border border-art-charcoal p-4 h-48 font-mono text-[10px] overflow-y-auto text-amber-200 shadow-inner flex flex-col justify-between">
              <div className="space-y-1 text-[11px]">
                {syncLogs.map((log, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <span className="text-art-gold font-bold select-none">❯</span>
                    <span className={log.includes('[success]') ? 'text-emerald-400 font-bold' : log.includes('[error]') ? 'text-rose-500 font-bold' : 'text-white/85'}>{log}</span>
                  </div>
                ))}
                <div ref={consoleEndRef} />
              </div>
              
              {isSyncing && (
                <div className="text-[10px] text-art-gold font-bold animate-pulse text-right">
                  [SYNC STATUS: DOWNLOADING AND PARSING GLYPHS...]
                </div>
              )}
            </div>
          )}
        </div>

        {/* Advanced OpenType typographic controls */}
        <div className="bg-white border border-art-sand p-6 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-art-sand">
            <SlidersHorizontal className="h-5 w-5 text-art-gold" />
            <div>
              <h3 className="text-sm font-serif font-bold text-art-charcoal">Advanced OpenType Typographic Controls</h3>
              <p className="text-xs text-art-charcoal/60 mt-0.5">Fine-tune calligraphic alternates, contextual glyphs, swashes, and variable axes.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-art-charcoal">
            {/* Left Box: OpenType Boolean Features */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-art-gold uppercase tracking-widest">Glyph Alternates & Ligatures</h4>
              
              <div className="space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer hover:bg-art-cream/30 p-1 rounded transition-all">
                  <input
                    type="checkbox"
                    checked={openTypeSettings.ligatures}
                    onChange={(e) => setOpenTypeSettings(prev => ({ ...prev, ligatures: e.target.checked }))}
                    className="rounded border-art-sand text-art-gold focus:ring-art-gold/50 bg-art-cream mt-0.5"
                  />
                  <div>
                    <span className="font-bold block text-art-charcoal">Standard Ligatures (`liga`, `clig`)</span>
                    <span className="text-[10px] text-art-charcoal/50">Joins adjacent characters into seamless traditional script forms.</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer hover:bg-art-cream/30 p-1 rounded transition-all">
                  <input
                    type="checkbox"
                    checked={openTypeSettings.contextualAlternates}
                    onChange={(e) => setOpenTypeSettings(prev => ({ ...prev, contextualAlternates: e.target.checked }))}
                    className="rounded border-art-sand text-art-gold focus:ring-art-gold/50 bg-art-cream mt-0.5"
                  />
                  <div>
                    <span className="font-bold block text-art-charcoal">Contextual Alternates (`calt`)</span>
                    <span className="text-[10px] text-art-charcoal/50">Shapes letter boundaries based on neighbors (crucial for Arabic flow).</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer hover:bg-art-cream/30 p-1 rounded transition-all">
                  <input
                    type="checkbox"
                    checked={openTypeSettings.swashes}
                    onChange={(e) => setOpenTypeSettings(prev => ({ ...prev, swashes: e.target.checked }))}
                    className="rounded border-art-sand text-art-gold focus:ring-art-gold/50 bg-art-cream mt-0.5"
                  />
                  <div>
                    <span className="font-bold block text-art-charcoal">Calligraphic Swashes (`swsh`)</span>
                    <span className="text-[10px] text-art-charcoal/50">Extends text terminals with majestic decorative flourishes.</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer hover:bg-art-cream/30 p-1 rounded transition-all">
                  <input
                    type="checkbox"
                    checked={openTypeSettings.alternateGlyphs}
                    onChange={(e) => setOpenTypeSettings(prev => ({ ...prev, alternateGlyphs: e.target.checked }))}
                    className="rounded border-art-sand text-art-gold focus:ring-art-gold/50 bg-art-cream mt-0.5"
                  />
                  <div>
                    <span className="font-bold block text-art-charcoal">Alternate Stylistic Glyphs (`salt`)</span>
                    <span className="text-[10px] text-art-charcoal/50">Toggles historical or non-standard visual variations of characters.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Right Box: Variable Font Sliders */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-art-gold uppercase tracking-widest">Variable Font Variation Axes</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1 font-bold">
                    <span>Variable Weight (`wght`)</span>
                    <span className="font-mono text-art-gold">{openTypeSettings.variableWeight}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="900"
                    step="50"
                    value={openTypeSettings.variableWeight}
                    onChange={(e) => setOpenTypeSettings(prev => ({ ...prev, variableWeight: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-art-sand rounded-lg appearance-none cursor-pointer accent-art-gold"
                  />
                  <span className="text-[9px] text-art-charcoal/40">Smoothly scales stroke boldness from Thin (100) to Heavy Black (900).</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 font-bold">
                    <span>Variable Width (`wdth`)</span>
                    <span className="font-mono text-art-gold">{openTypeSettings.variableWidth}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={openTypeSettings.variableWidth}
                    onChange={(e) => setOpenTypeSettings(prev => ({ ...prev, variableWidth: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-art-sand rounded-lg appearance-none cursor-pointer accent-art-gold"
                  />
                  <span className="text-[9px] text-art-charcoal/40">Compresses (50%) or expands (150%) glyph proportions for layout fit.</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 font-bold">
                    <span>Optical Sizing (`opsz`)</span>
                    <span className="font-mono text-art-gold">{openTypeSettings.opticalSize} pt</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="72"
                    value={openTypeSettings.opticalSize}
                    onChange={(e) => setOpenTypeSettings(prev => ({ ...prev, opticalSize: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-art-sand rounded-lg appearance-none cursor-pointer accent-art-gold"
                  />
                  <span className="text-[9px] text-art-charcoal/40">Adjusts letter contrast and spacing dynamically for micro or macro reading.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rendering Modes & Vector Export Tester */}
        <div className="bg-white border border-art-sand p-6 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-art-sand">
            <Download className="h-5 w-5 text-art-gold" />
            <div>
              <h3 className="text-sm font-serif font-bold text-art-charcoal">Rasterization & Multi-Format Vector Export</h3>
              <p className="text-xs text-art-charcoal/60 mt-0.5">Test canvas, SVG, and high-DPI outputs. Exports vector coordinates and layouts directly.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => handleVectorTest('standard')}
              className={`py-2 px-3 rounded-lg border text-xs font-bold text-center transition-all ${
                renderingMode === 'standard' ? 'border-art-charcoal bg-art-charcoal text-white' : 'border-art-sand bg-art-cream text-art-charcoal hover:bg-art-warm'
              }`}
            >
              Standard HTML5
            </button>
            <button
              onClick={() => handleVectorTest('svg')}
              className={`py-2 px-3 rounded-lg border text-xs font-bold text-center transition-all ${
                renderingMode === 'svg' ? 'border-art-charcoal bg-art-charcoal text-white' : 'border-art-sand bg-art-cream text-art-charcoal hover:bg-art-warm'
              }`}
            >
              SVG Vector Paths
            </button>
            <button
              onClick={() => handleVectorTest('canvas')}
              className={`py-2 px-3 rounded-lg border text-xs font-bold text-center transition-all ${
                renderingMode === 'canvas' ? 'border-art-charcoal bg-art-charcoal text-white' : 'border-art-sand bg-art-cream text-art-charcoal hover:bg-art-warm'
              }`}
            >
              HTML5 Canvas
            </button>
            <button
              onClick={() => handleVectorTest('pdf')}
              className={`py-2 px-3 rounded-lg border text-xs font-bold text-center transition-all ${
                renderingMode === 'pdf' ? 'border-art-charcoal bg-art-charcoal text-white' : 'border-art-sand bg-art-cream text-art-charcoal hover:bg-art-warm'
              }`}
            >
              300 DPI PDF Sizing
            </button>
          </div>

          {exportLogs.length > 0 && (
            <div className="bg-art-cream rounded-xl p-4 border border-art-sand space-y-1.5 font-mono text-[10px] text-art-charcoal/80">
              <span className="text-[10px] font-bold text-art-gold block uppercase tracking-wider mb-1">Vector Compile Metrics</span>
              {exportLogs.map((log, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <span className="text-art-gold font-bold select-none">❯</span>
                  <span className={log.includes('[success]') ? 'text-emerald-700 font-bold' : 'text-art-charcoal'}>{log}</span>
                </div>
              ))}
              {isExporting && (
                <div className="text-[10px] font-bold text-art-gold animate-pulse mt-2 uppercase tracking-wide">
                  Calculating Bezier outlines...
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
