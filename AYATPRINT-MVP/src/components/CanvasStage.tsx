import React, { useRef, useState, useEffect } from 'react';
import { 
  Lock, Unlock, Eye, EyeOff, Layers, Trash2, 
  RotateCw, PlusCircle, AlignCenter, Minus, Plus, Maximize,
  Sliders, Grid, Box, Image as ImageIcon, Sparkles, CheckCircle, Info
} from 'lucide-react';
import { QuranVerse, CanvasPreset } from '../types/quran';

interface CanvasStageProps {
  viewTab: 'canvas' | 'mockup';
  setViewTab: (tab: 'canvas' | 'mockup') => void;
  selectedVerse: QuranVerse;
  currentPreset: CanvasPreset;
  fontSize: number;
  letterSpacing: number;
  arabicFont: string;
  zoom: number;
  setZoom: (z: number | ((prev: number) => number)) => void;
  rotate: number;
  setRotate: (r: number) => void;
  showGuides: boolean;
  setShowGuides: (g: boolean) => void;
  selectedLayer: 'all' | 'borders' | 'calligraphy' | 'translation' | 'metadata';
  setSelectedLayer: (l: 'all' | 'borders' | 'calligraphy' | 'translation' | 'metadata') => void;
  layoutShape: 'portrait' | 'landscape' | 'square' | 'circle' | 'arch' | 'vertical';
  frameType: string;
  decorativeFrame: string;
  borderThickness: number;
  innerPadding: number;
  cornerStyle: string;
  cornerOrnament: boolean;
  circularOrnament: boolean;
  selectedOrnament: string;
  useGoldGradient: boolean;
  canvasOpacity: number;
  showQuranMetadata: boolean;
  showTranslation: boolean;
  translationFontSize: number;
  translationColor: string;
  activeTexture: string;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  getLayoutShapeClass: () => string;
  renderCanvasWithPhysicalFrame: (children: React.ReactNode) => React.ReactNode;
  getDecorativeFrameStyles: () => React.CSSProperties;
  t: any;

  // Pan offsets & mouse interaction
  isPanningMode: boolean;
  setIsPanningMode: (p: boolean) => void;
  panOffset: { x: number; y: number };
  setPanOffset: (o: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
  isDraggingCanvas: boolean;
  setIsDraggingCanvas: (d: boolean) => void;
  dragStart: { x: number; y: number };
  setDragStart: (s: { x: number; y: number }) => void;

  // Lock and visibility states
  lockedLayers: {[key: string]: boolean};
  setLockedLayers: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>;
  hiddenLayers: {[key: string]: boolean};
  setHiddenLayers: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>;

  // Real room backdrop
  selectedScene: any;
  customHangingOffset: number;
  customScalePercent: number;
  mockupBrightness: number;
  mockupContrast: number;
  mockupWarmth: number;
  mockupFormat: string;
  customRoomImage?: string | null;
  showTriptych?: boolean;
  customCalligraphyFile?: string | null;
  customCalligraphyScale?: number;
  customCalligraphyOpacity?: number;
}

export const CanvasStage: React.FC<CanvasStageProps> = ({
  viewTab,
  setViewTab,
  selectedVerse,
  currentPreset,
  fontSize,
  letterSpacing,
  arabicFont,
  zoom,
  setZoom,
  rotate,
  setRotate,
  showGuides,
  setShowGuides,
  selectedLayer,
  setSelectedLayer,
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
  canvasOpacity,
  showQuranMetadata,
  showTranslation,
  translationFontSize,
  translationColor,
  activeTexture,
  canvasRef,
  getLayoutShapeClass,
  renderCanvasWithPhysicalFrame,
  getDecorativeFrameStyles,
  t,
  isPanningMode,
  setIsPanningMode,
  panOffset,
  setPanOffset,
  isDraggingCanvas,
  setIsDraggingCanvas,
  dragStart,
  setDragStart,
  lockedLayers,
  setLockedLayers,
  hiddenLayers,
  setHiddenLayers,
  selectedScene,
  customHangingOffset,
  customScalePercent,
  mockupBrightness,
  mockupContrast,
  mockupWarmth,
  mockupFormat,
  customRoomImage = null,
  showTriptych = false,
  customCalligraphyFile = null,
  customCalligraphyScale = 100,
  customCalligraphyOpacity = 100
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [duplicateAnim, setDuplicateAnim] = useState<boolean>(false);
  
  // Interactive 3D Orbit Rotate state
  const [canvasMode, setCanvasMode] = useState<'flat' | '3d'>('flat');
  const [orbitRotate, setOrbitRotate] = useState<{ x: number; y: number }>({ x: 5, y: -12 });
  const [isOrbiting, setIsOrbiting] = useState<boolean>(false);
  const [orbitStart, setOrbitStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle dragging, panning or orbiting
  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewTab === 'canvas' && canvasMode === '3d' && !isPanningMode) {
      // Orbiting Mode
      setIsOrbiting(true);
      setOrbitStart({ x: e.clientX - orbitRotate.y, y: e.clientY - orbitRotate.x });
    } else if (isPanningMode || e.button === 1) {
      setIsDraggingCanvas(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingCanvas) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    } else if (isOrbiting) {
      setOrbitRotate({
        x: Math.min(30, Math.max(-30, e.clientY - orbitStart.y)), // limit vertical tilt
        y: Math.min(45, Math.max(-45, e.clientX - orbitStart.x))  // limit horizontal turn
      });
    }
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
    setIsOrbiting(false);
  };

  // Keyboard shortcut for spacebar panning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsPanningMode(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsPanningMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setIsPanningMode]);

  const toggleLockLayer = (layer: string) => {
    setLockedLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const toggleHideLayer = (layer: string) => {
    setHiddenLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const triggerDuplicateFeedback = () => {
    setDuplicateAnim(true);
    setTimeout(() => setDuplicateAnim(false), 800);
  };

  // Shared internal canvas renderer used in both 2D, 3D and Mockup views for perfect visual parity
  const renderDesignCanvasContent = (scaleFactor: number = 1, isInsideMockup: boolean = false) => {
    // Resolve textures background Unsplash images
    const activeTex = activeTexture === 'none' ? currentPreset.texture : activeTexture;
    let textureBackgroundUrl = '';
    if (activeTex === 'marble') textureBackgroundUrl = 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800';
    if (activeTex === 'emerald-silk') textureBackgroundUrl = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800';
    if (activeTex === 'textured-paper') textureBackgroundUrl = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800';
    if (activeTex === 'wood') textureBackgroundUrl = 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800';
    if (activeTex === 'parchment') textureBackgroundUrl = 'https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?auto=format&fit=crop&q=80&w=800';

    // Outer shape class selection: inside mockup or framed canvas takes w-full h-full
    const shapeClass = (isInsideMockup || frameType !== 'none') ? 'w-full h-full' : getLayoutShapeClass();

    // Auto-fit font size calculation to prevent long Quranic texts from overflowing
    const textLength = selectedVerse.arabicText ? selectedVerse.arabicText.length : 0;
    let computedFontSize = fontSize;
    if (textLength > 160) {
      computedFontSize = Math.min(fontSize, Math.max(11, Math.floor(fontSize * 0.58)));
    } else if (textLength > 90) {
      computedFontSize = Math.min(fontSize, Math.max(13, Math.floor(fontSize * 0.75)));
    }

    return (
      <div 
        onClick={(e) => { e.stopPropagation(); if (!isInsideMockup) setSelectedLayer('all'); }}
        className={`relative ${shapeClass} flex flex-col justify-between text-center transition-all duration-300 ${
          !isInsideMockup && selectedLayer === 'all' ? 'ring-2 ring-amber-500 ring-offset-4 ring-offset-neutral-950 shadow-amber-500/10' : ''
        } border border-white/5`}
        style={{ 
          backgroundColor: currentPreset.bgColor,
          opacity: canvasOpacity / 100,
          // Premium real canvas look using layered shadows and texture blend
          boxShadow: isInsideMockup 
            ? '0 10px 30px -10px rgba(0,0,0,0.7)' 
            : '0 25px 70px -15px rgba(0, 0, 0, 0.8), 0 10px 30px -10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Realistic linen artist canvas weave texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay z-[5]"
          style={{
            backgroundImage: `radial-gradient(circle, #000 10%, transparent 11%), 
                              radial-gradient(circle, #000 10%, transparent 11%)`,
            backgroundSize: '4px 4px',
            backgroundPosition: '0 0, 2px 2px',
          }}
        />

        {/* Safe print margin guides (dotted inner frame) - only show on editor */}
        {!isInsideMockup && showGuides && (
          <div className="absolute inset-4 border border-dashed border-amber-600/15 rounded-xs pointer-events-none z-10">
            <span className="absolute top-1 left-2.5 text-[6px] font-mono text-amber-600/30 uppercase tracking-widest scale-75">Safe Area</span>
          </div>
        )}

        {/* Custom background texture image layer */}
        {textureBackgroundUrl && (
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25 z-0 transition-opacity duration-300" 
            style={{ 
              backgroundImage: `url('${textureBackgroundUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}

        {/* Decorative Islamic Border Frame Container */}
        {!hiddenLayers.borders && (
          <div 
            onClick={(e) => { e.stopPropagation(); if(!lockedLayers.borders && !isInsideMockup) setSelectedLayer('borders'); }}
            className={`absolute inset-0 pointer-events-none z-10 transition-all duration-300 ${
              !isInsideMockup && selectedLayer === 'borders' ? 'outline-2 outline-dashed outline-amber-500 outline-offset-2 z-20' : ''
            }`} 
            style={getDecorativeFrameStyles() as React.CSSProperties}
          >
            {/* Corner Floral Medallions */}
            {cornerOrnament && (
              <>
                <div 
                  className="absolute text-amber-500/70 opacity-80 pointer-events-none transition-all duration-300"
                  style={{
                    top: `${innerPadding * 0.4 + 4}px`,
                    left: `${innerPadding * 0.4 + 4}px`,
                    width: `${Math.max(12, 18 * scaleFactor)}px`,
                    height: `${Math.max(12, 18 * scaleFactor)}px`,
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-current fill-none stroke-current stroke-2">
                    <path d="M 5,5 L 35,5 C 25,15 15,25 5,35 Z M 10,10 C 15,10 20,15 20,20 C 20,25 15,30 10,30 C 5,30 5,20 10,10 Z" />
                  </svg>
                </div>
                <div 
                  className="absolute text-amber-500/70 opacity-80 pointer-events-none rotate-90 transition-all duration-300"
                  style={{
                    top: `${innerPadding * 0.4 + 4}px`,
                    right: `${innerPadding * 0.4 + 4}px`,
                    width: `${Math.max(12, 18 * scaleFactor)}px`,
                    height: `${Math.max(12, 18 * scaleFactor)}px`,
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-current fill-none stroke-current stroke-2">
                    <path d="M 5,5 L 35,5 C 25,15 15,25 5,35 Z M 10,10 C 15,10 20,15 20,20 C 20,25 15,30 10,30 C 5,30 5,20 10,10 Z" />
                  </svg>
                </div>
                <div 
                  className="absolute text-amber-500/70 opacity-80 pointer-events-none -rotate-90 transition-all duration-300"
                  style={{
                    bottom: `${innerPadding * 0.4 + 4}px`,
                    left: `${innerPadding * 0.4 + 4}px`,
                    width: `${Math.max(12, 18 * scaleFactor)}px`,
                    height: `${Math.max(12, 18 * scaleFactor)}px`,
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-current fill-none stroke-current stroke-2">
                    <path d="M 5,5 L 35,5 C 25,15 15,25 5,35 Z M 10,10 C 15,10 20,15 20,20 C 20,25 15,30 10,30 C 5,30 5,20 10,10 Z" />
                  </svg>
                </div>
                <div 
                  className="absolute text-amber-500/70 opacity-80 pointer-events-none rotate-180 transition-all duration-300"
                  style={{
                    bottom: `${innerPadding * 0.4 + 4}px`,
                    right: `${innerPadding * 0.4 + 4}px`,
                    width: `${Math.max(12, 18 * scaleFactor)}px`,
                    height: `${Math.max(12, 18 * scaleFactor)}px`,
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-current fill-none stroke-current stroke-2">
                    <path d="M 5,5 L 35,5 C 25,15 15,25 5,35 Z M 10,10 C 15,10 20,15 20,20 C 20,25 15,30 10,30 C 5,30 5,20 10,10 Z" />
                  </svg>
                </div>
              </>
            )}
          </div>
        )}

        {/* Text Composition Content Area */}
        <div 
          className="relative z-10 w-full h-full flex flex-col justify-between text-center my-auto transition-all duration-300"
          style={{ padding: `${Math.max(12, 28 * scaleFactor)}px` }}
        >
          {/* 1. Header Details / Quranic Metadata block */}
          {!hiddenLayers.metadata && (
            <div 
              onClick={(e) => { e.stopPropagation(); if(!lockedLayers.metadata && !isInsideMockup) setSelectedLayer('metadata'); }}
              className={`flex flex-col items-center transition-all p-1 rounded ${
                !isInsideMockup && selectedLayer === 'metadata' ? 'ring-2 ring-amber-500 bg-amber-500/5' : ''
              }`}
              style={{ marginTop: `${Math.max(2, 12 * scaleFactor)}px` }}
            >
              {showQuranMetadata && (
                <div 
                  className="flex justify-center items-center gap-1.5 font-mono text-amber-600/80 mb-1 font-bold uppercase tracking-widest transition-all"
                  style={{ fontSize: `${Math.max(5, 8.5 * scaleFactor)}px` }}
                >
                  <span>Juz' {selectedVerse.juz || '1'}</span>
                  <span>•</span>
                  <span>Hizb {selectedVerse.hizb || '1'}</span>
                  <span>•</span>
                  <span>{(selectedVerse.revelationType || 'Makki').toUpperCase()}</span>
                </div>
              )}
              <div 
                className="bg-amber-600/30 mb-1 transition-all"
                style={{ height: '1px', width: `${Math.max(16, 48 * scaleFactor)}px` }}
              />
              <span 
                className="font-mono uppercase tracking-[0.2em] text-amber-500 font-bold transition-all"
                style={{ fontSize: `${Math.max(4.5, 7.5 * scaleFactor)}px` }}
              >
                Islamic Heritage Press
              </span>
            </div>
          )}

          {/* 2. Core Arabic Calligraphy block */}
          {!hiddenLayers.calligraphy && (
            <div 
              onClick={(e) => { e.stopPropagation(); if(!lockedLayers.calligraphy && !isInsideMockup) setSelectedLayer('calligraphy'); }}
              className={`my-auto py-2 flex flex-col items-center justify-center relative transition-all rounded-lg ${
                !isInsideMockup && selectedLayer === 'calligraphy' ? 'ring-2 ring-amber-500 p-2 bg-amber-500/5' : ''
              } ${duplicateAnim ? 'scale-105 opacity-70' : ''}`}
            >
              {/* Focal ornament star above calligraphy */}
              {selectedOrnament === 'eight-point-star' && (
                <div 
                  className="text-amber-500/70 mb-2 transition-all"
                  style={{
                    width: `${Math.max(10, 24 * scaleFactor)}px`,
                    height: `${Math.max(10, 24 * scaleFactor)}px`,
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-current fill-none stroke-current stroke-1.5">
                    <path d="M 50,0 L 65,35 L 100,50 L 65,65 L 50,100 L 35,65 L 0,50 L 35,35 Z" />
                  </svg>
                </div>
              )}

              {customCalligraphyFile ? (
                <div className="flex items-center justify-center my-auto py-2 relative">
                  <img 
                    src={customCalligraphyFile} 
                    alt="Custom Calligraphy"
                    className="max-h-[220px] max-w-full object-contain transition-all"
                    style={{
                      transform: `scale(${((customCalligraphyScale || 100) / 100) * scaleFactor})`,
                      opacity: (customCalligraphyOpacity || 100) / 100,
                      filter: useGoldGradient ? 'drop-shadow(0px 2px 8px rgba(197,160,89,0.5))' : 'none'
                    }}
                  />
                </div>
              ) : (
                <h2 
                  dir="rtl"
                  className="font-serif font-medium text-center select-all leading-loose text-balance transition-all text-shadow"
                  style={{ 
                    fontFamily: arabicFont, 
                    fontSize: `${computedFontSize * scaleFactor}px`, 
                    color: useGoldGradient ? '#C5A059' : currentPreset.textColor,
                    letterSpacing: `${letterSpacing * scaleFactor}px`,
                    textShadow: '0 2px 4px rgba(0,0,0,0.35)'
                  }}
                >
                  {selectedVerse.arabicText}
                </h2>
              )}
            </div>
          )}

          {/* 3. English Translation / Footer block */}
          {!hiddenLayers.translation && showTranslation && (
            <div 
              onClick={(e) => { e.stopPropagation(); if(!lockedLayers.translation && !isInsideMockup) setSelectedLayer('translation'); }}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-all relative ${
                !isInsideMockup && selectedLayer === 'translation' ? 'ring-2 ring-amber-500 rounded bg-amber-500/5 p-2' : ''
              }`}
              style={{ marginBottom: `${Math.max(4, 16 * scaleFactor)}px` }}
            >
              <span 
                className="font-serif leading-loose text-amber-500/70 italic font-medium transition-all"
                style={{ fontSize: `${Math.max(6, 10 * scaleFactor)}px` }}
              >
                صَدَقَ اللَّهُ الْعَظِيمُ
              </span>
              <p 
                className="italic leading-relaxed max-w-xs mx-auto transition-all font-serif"
                style={{ 
                  fontSize: `${translationFontSize * scaleFactor}px`, 
                  color: translationColor,
                  textShadow: '0 1px 2px rgba(0,0,0,0.4)'
                }}
              >
                "{selectedVerse.englishTranslation}"
              </p>
            </div>
          )}

          {/* Surah reference footer banner */}
          <div 
            className="tracking-[0.18em] font-bold text-amber-500 uppercase transition-all"
            style={{ 
              fontSize: `${Math.max(5.5, 8.5 * scaleFactor)}px`, 
              marginBottom: `${Math.max(2, 6 * scaleFactor)}px` 
            }}
          >
            SURAH {selectedVerse.surahNameEnglish.toUpperCase()} • AYAH {selectedVerse.ayah}
          </div>
        </div>

        {/* 300 DPI Print Bleed & Safe Margin Guides Overlay */}
        {showGuides && !isInsideMockup && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* Outer Bleed Margin Line (3mm red dashed) */}
            <div className="absolute inset-2 border border-dashed border-rose-500/60 rounded-xs">
              <span className="absolute top-1 left-2 text-[7px] font-mono font-bold text-rose-500 uppercase bg-black/60 px-1 rounded">3mm Print Bleed Margin</span>
            </div>
            {/* Safe Zone Margin Line (12mm green dashed) */}
            <div className="absolute inset-6 border border-dashed border-emerald-500/60 rounded-xs">
              <span className="absolute bottom-1 right-2 text-[7px] font-mono font-bold text-emerald-400 uppercase bg-black/60 px-1 rounded">12mm Safe Text Zone</span>
            </div>
            {/* Center Crosshair Lines */}
            <div className="absolute top-1/2 left-0 w-full border-t border-amber-500/30"></div>
            <div className="absolute left-1/2 top-0 h-full border-l border-amber-500/30"></div>
            {/* Resolution Badge */}
            <div className="absolute top-2 right-2 bg-stone-900/90 text-amber-400 font-mono text-[8px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 shadow-md">
              300 DPI • TANZIL OK
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render companion canvases for triptych groupings in exact styling matching the active design
  const renderCompanionCanvasContent = (side: 'left' | 'right', scaleFactor: number = 1) => {
    const activeTex = activeTexture === 'none' ? currentPreset.texture : activeTexture;
    let textureBackgroundUrl = '';
    if (activeTex === 'marble') textureBackgroundUrl = 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800';
    if (activeTex === 'emerald-silk') textureBackgroundUrl = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800';
    if (activeTex === 'textured-paper') textureBackgroundUrl = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800';
    if (activeTex === 'wood') textureBackgroundUrl = 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800';
    if (activeTex === 'parchment') textureBackgroundUrl = 'https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?auto=format&fit=crop&q=80&w=800';

    const sideText = side === 'left' ? 'اللَّه جَلَّ جَلَالُهُ' : 'مُحَمَّد صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ';
    const sideTranslation = side === 'left' 
      ? 'ALLAH • Glorious is His Majesty, Creator of all Blessing & Light.'
      : 'MUHAMMAD • Peace and Blessings of Allah be upon Him, the Guide of Mercy.';
    const sidePanelCode = side === 'left' ? 'BESPOKE GALLERY SUITE • PANEL A' : 'BESPOKE GALLERY SUITE • PANEL C';

    return (
      <div 
        className={`relative ${getLayoutShapeClass()} flex flex-col justify-between text-center transition-all duration-300 border border-white/5`}
        style={{ 
          backgroundColor: currentPreset.bgColor,
          opacity: canvasOpacity / 100,
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.7)', 
        }}
      >
        {/* Weave texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay z-[5]"
          style={{
            backgroundImage: `radial-gradient(circle, #000 10%, transparent 11%), radial-gradient(circle, #000 10%, transparent 11%)`,
            backgroundSize: '4px 4px',
            backgroundPosition: '0 0, 2px 2px',
          }}
        />

        {textureBackgroundUrl && (
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25 z-0 transition-opacity duration-300" 
            style={{ 
              backgroundImage: `url('${textureBackgroundUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}

        {/* Decorative Border Frame Container */}
        {!hiddenLayers.borders && (
          <div 
            className="absolute inset-0 pointer-events-none z-10 transition-all duration-300" 
            style={getDecorativeFrameStyles() as React.CSSProperties}
          >
            {cornerOrnament && (
              <>
                <div 
                  className="absolute text-amber-500/70 opacity-80 pointer-events-none transition-all duration-300"
                  style={{
                    top: `${innerPadding * 0.4 + 4}px`,
                    left: `${innerPadding * 0.4 + 4}px`,
                    width: `${Math.max(12, 18 * scaleFactor)}px`,
                    height: `${Math.max(12, 18 * scaleFactor)}px`,
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-current fill-none stroke-current stroke-2">
                    <path d="M 5,5 L 35,5 C 25,15 15,25 5,35 Z M 10,10 C 15,10 20,15 20,20 C 20,25 15,30 10,30 C 5,30 5,20 10,10 Z" />
                  </svg>
                </div>
                <div 
                  className="absolute text-amber-500/70 opacity-80 pointer-events-none rotate-90 transition-all duration-300"
                  style={{
                    top: `${innerPadding * 0.4 + 4}px`,
                    right: `${innerPadding * 0.4 + 4}px`,
                    width: `${Math.max(12, 18 * scaleFactor)}px`,
                    height: `${Math.max(12, 18 * scaleFactor)}px`,
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-current fill-none stroke-current stroke-2">
                    <path d="M 5,5 L 35,5 C 25,15 15,25 5,35 Z M 10,10 C 15,10 20,15 20,20 C 20,25 15,30 10,30 C 5,30 5,20 10,10 Z" />
                  </svg>
                </div>
                <div 
                  className="absolute text-amber-500/70 opacity-80 pointer-events-none -rotate-90 transition-all duration-300"
                  style={{
                    bottom: `${innerPadding * 0.4 + 4}px`,
                    left: `${innerPadding * 0.4 + 4}px`,
                    width: `${Math.max(12, 18 * scaleFactor)}px`,
                    height: `${Math.max(12, 18 * scaleFactor)}px`,
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-current fill-none stroke-current stroke-2">
                    <path d="M 5,5 L 35,5 C 25,15 15,25 5,35 Z M 10,10 C 15,10 20,15 20,20 C 20,25 15,30 10,30 C 5,30 5,20 10,10 Z" />
                  </svg>
                </div>
                <div 
                  className="absolute text-amber-500/70 opacity-80 pointer-events-none rotate-180 transition-all duration-300"
                  style={{
                    bottom: `${innerPadding * 0.4 + 4}px`,
                    right: `${innerPadding * 0.4 + 4}px`,
                    width: `${Math.max(12, 18 * scaleFactor)}px`,
                    height: `${Math.max(12, 18 * scaleFactor)}px`,
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-current fill-none stroke-current stroke-2">
                    <path d="M 5,5 L 35,5 C 25,15 15,25 5,35 Z M 10,10 C 15,10 20,15 20,20 C 20,25 15,30 10,30 C 5,30 5,20 10,10 Z" />
                  </svg>
                </div>
              </>
            )}
          </div>
        )}

        <div 
          className="relative z-10 w-full h-full flex flex-col justify-between text-center my-auto transition-all duration-300"
          style={{ padding: `${Math.max(12, 28 * scaleFactor)}px` }}
        >
          {/* Header Details */}
          {!hiddenLayers.metadata && (
            <div 
              className="flex flex-col items-center transition-all p-1 rounded"
              style={{ marginTop: `${Math.max(2, 12 * scaleFactor)}px` }}
            >
              {showQuranMetadata && (
                <div 
                  className="flex justify-center items-center gap-1.5 font-mono text-amber-600/80 mb-1 font-bold uppercase tracking-widest transition-all"
                  style={{ fontSize: `${Math.max(5, 8.5 * scaleFactor)}px` }}
                >
                  <span>MUSEUM GRADE</span>
                  <span>•</span>
                  <span>HAND GILDED</span>
                  <span>•</span>
                  <span>SACRED ATELIER</span>
                </div>
              )}
              <div 
                className="bg-amber-600/30 mb-1 transition-all"
                style={{ height: '1px', width: `${Math.max(16, 48 * scaleFactor)}px` }}
              />
              <span 
                className="font-mono uppercase tracking-[0.2em] text-amber-500 font-bold transition-all"
                style={{ fontSize: `${Math.max(4.5, 7.5 * scaleFactor)}px` }}
              >
                Islamic Heritage Press
              </span>
            </div>
          )}

          {/* Calligraphy */}
          <div className="my-auto py-2 flex flex-col items-center justify-center relative transition-all rounded-lg">
            {selectedOrnament === 'eight-point-star' && (
              <div 
                className="text-amber-500/70 mb-2 transition-all"
                style={{
                  width: `${Math.max(10, 24 * scaleFactor)}px`,
                  height: `${Math.max(10, 24 * scaleFactor)}px`,
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-current fill-none stroke-current stroke-1.5">
                  <path d="M 50,0 L 65,35 L 100,50 L 65,65 L 50,100 L 35,65 L 0,50 L 35,35 Z" />
                </svg>
              </div>
            )}
            
            <h2 
              dir="rtl"
              className="font-serif font-medium text-center leading-loose text-balance transition-all text-shadow"
              style={{ 
                fontFamily: arabicFont, 
                fontSize: `${fontSize * 1.15 * scaleFactor}px`, 
                color: useGoldGradient ? '#C5A059' : currentPreset.textColor,
                letterSpacing: `${letterSpacing * scaleFactor}px`,
                textShadow: '0 2px 4px rgba(0,0,0,0.35)'
              }}
            >
              {sideText}
            </h2>
          </div>

          {/* Translation */}
          {!hiddenLayers.translation && showTranslation && (
            <div 
              className="flex flex-col items-center gap-1 transition-all relative"
              style={{ marginBottom: `${Math.max(4, 16 * scaleFactor)}px` }}
            >
              <span 
                className="font-serif leading-loose text-amber-500/70 italic font-medium transition-all"
                style={{ fontSize: `${Math.max(6, 10 * scaleFactor)}px` }}
              >
                صَدَقَ اللَّهُ الْعَظِيمُ
              </span>
              <p 
                className="italic leading-relaxed max-w-xs mx-auto transition-all font-serif"
                style={{ 
                  fontSize: `${(translationFontSize - 1) * scaleFactor}px`, 
                  color: translationColor,
                  textShadow: '0 1px 2px rgba(0,0,0,0.4)'
                }}
              >
                "{sideTranslation}"
              </p>
            </div>
          )}

          {/* Panel Identifier */}
          <div 
            className="tracking-[0.18em] font-bold text-amber-500 uppercase transition-all"
            style={{ 
              fontSize: `${Math.max(5.5, 8.5 * scaleFactor)}px`, 
              marginBottom: `${Math.max(2, 6 * scaleFactor)}px` 
            }}
          >
            {sidePanelCode}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative flex-1 bg-[#101012] flex flex-col items-center justify-between overflow-hidden border-y border-stone-800/80 h-full min-h-[620px] select-none ${
        isPanningMode ? (isDraggingCanvas ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
      }`}
    >
      {/* 1. Header Viewport Controls Mode Switcher (Tab overlay) */}
      <div className="w-full bg-[#161619]/90 backdrop-blur-md border-b border-stone-800/80 px-6 py-2.5 flex justify-between items-center z-30 select-none">
        {/* Rulers Toggle or Perspective Toggles */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold text-stone-400 font-sans tracking-wider uppercase mr-2.5">Studio Mode:</span>
          <button
            onClick={() => { setViewTab('canvas'); setCanvasMode('flat'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              viewTab === 'canvas' && canvasMode === 'flat'
                ? 'bg-amber-500 text-stone-950 font-extrabold shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Box className="h-3.5 w-3.5" /> 2D Flat Master
          </button>
          
          <button
            onClick={() => { setViewTab('canvas'); setCanvasMode('3d'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              viewTab === 'canvas' && canvasMode === '3d'
                ? 'bg-amber-500 text-stone-950 font-extrabold shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> 3D Gallery Wrap
          </button>

          <button
            onClick={() => setViewTab('mockup')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              viewTab === 'mockup'
                ? 'bg-amber-500 text-stone-950 font-extrabold shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" /> Wall Projection
          </button>
        </div>

        {/* Informative tips */}
        <div className="hidden lg:flex items-center gap-1.5 text-[9px] text-stone-500 font-mono">
          <Info className="h-3.5 w-3.5 text-amber-500" />
          <span>
            {viewTab === 'canvas' && canvasMode === '3d' && "Drag Canvas to Orbit Rotate in 3D Space"}
            {viewTab === 'canvas' && canvasMode === 'flat' && "Spacebar + Drag to Pan • Scroll to Zoom"}
            {viewTab === 'mockup' && "Fine adjustments on Left Sidebar under Mockup tab"}
          </span>
        </div>
      </div>

      {/* Grid background overlay for precise design layout feeling */}
      <div className="absolute inset-0 bg-[radial-gradient(#25252a_1.2px,transparent_1.2px)] [background-size:20px_20px] opacity-40 pointer-events-none z-0"></div>

      {/* Rulers (Horizontal & Vertical edge indicators) - only show in flat editor */}
      {viewTab === 'canvas' && canvasMode === 'flat' && showGuides && (
        <>
          <div className="absolute top-11 left-0 right-0 h-4 bg-[#141416] border-b border-stone-800 text-[7.5px] font-mono text-stone-500 flex items-center px-4 pointer-events-none z-20">
            <span>0"</span><span className="ml-16">6"</span><span className="ml-16">12"</span><span className="ml-16">18"</span><span className="ml-16">24"</span><span className="ml-16">30"</span>
          </div>
          <div className="absolute top-11 left-0 bottom-0 w-4 bg-[#141416] border-r border-stone-800 text-[7.5px] font-mono text-stone-500 flex flex-col items-center pt-8 pointer-events-none z-20">
            <span>0"</span><span className="mt-16">6"</span><span className="mt-16">12"</span><span className="mt-16">18"</span><span className="mt-16">24"</span>
          </div>
        </>
      )}

      {/* 2. Main Stage Area Rendering View modes */}
      <div className="flex-1 w-full flex items-center justify-center p-6 md:p-12 overflow-hidden relative">
        
        {/* VIEW: 2D FLAT MASTER */}
        {viewTab === 'canvas' && canvasMode === 'flat' && (
          <div 
            className="transition-all duration-300 ease-out flex items-center justify-center relative select-none"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotate}deg) translate(${panOffset.x}px, ${panOffset.y}px)`,
              transformOrigin: 'center center',
            }}
          >
            {/* Center alignment guide crosshair */}
            {showGuides && (
              <>
                <div className="absolute top-[-900px] bottom-[-900px] left-1/2 border-l border-dashed border-amber-500/30 z-25 pointer-events-none"></div>
                <div className="absolute left-[-900px] right-[-900px] top-1/2 border-t border-dashed border-amber-500/30 z-25 pointer-events-none"></div>
              </>
            )}

            {renderCanvasWithPhysicalFrame(renderDesignCanvasContent(1, false))}
          </div>
        )}

        {/* VIEW: 3D GALLERY WRAPPED PERSPECTIVE */}
        {viewTab === 'canvas' && canvasMode === '3d' && (
          <div 
            className="flex items-center justify-center relative select-none"
            style={{
              perspective: '1200px',
              transform: `scale(${zoom / 100}) translate(${panOffset.x}px, ${panOffset.y}px)`,
              transformOrigin: 'center center',
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* 3D Wrapper node */}
            <div 
              className="transition-transform duration-300 ease-out flex items-center justify-center"
              style={{
                transform: `rotateX(${orbitRotate.x}deg) rotateY(${orbitRotate.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Outer physical framing wrapper container */}
              <div 
                className="relative"
                style={{
                  transformStyle: 'preserve-3d',
                  // Soft multilayer shadows mapping physical depths
                  boxShadow: '-32px 42px 70px -10px rgba(0, 0, 0, 0.8), -15px 20px 30px -15px rgba(0, 0, 0, 0.6), inset -2px -2px 12px rgba(0,0,0,0.1)',
                }}
              >
                {/* 3D Side edge wood panel - wrap left side */}
                <div 
                  className="absolute top-0 bottom-0 left-0 w-[24px] origin-left border-r border-stone-800"
                  style={{
                    backgroundColor: currentPreset.bgColor,
                    filter: 'brightness(0.35)',
                    transform: 'rotateY(-90deg) translateZ(1px)',
                    boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.8)'
                  }}
                />
                
                {/* 3D Side edge wood panel - wrap right side */}
                <div 
                  className="absolute top-0 bottom-0 right-0 w-[24px] origin-right border-l border-stone-800"
                  style={{
                    backgroundColor: currentPreset.bgColor,
                    filter: 'brightness(0.45)',
                    transform: 'rotateY(90deg) translateZ(1px)',
                    boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.8)'
                  }}
                />

                {/* 3D Bottom edge wood panel */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[24px] origin-bottom border-t border-stone-800"
                  style={{
                    backgroundColor: currentPreset.bgColor,
                    filter: 'brightness(0.25)',
                    transform: 'rotateX(-90deg) translateZ(1px)',
                    boxShadow: 'inset 0 -5px 15px rgba(0,0,0,0.8)'
                  }}
                />

                {/* 3D Top edge wood panel */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[24px] origin-top border-b border-stone-800"
                  style={{
                    backgroundColor: currentPreset.bgColor,
                    filter: 'brightness(0.55)',
                    transform: 'rotateX(90deg) translateZ(1px)',
                    boxShadow: 'inset 0 5px 15px rgba(0,0,0,0.8)'
                  }}
                />

                {/* Actual front canvas layer with custom frame support */}
                {renderCanvasWithPhysicalFrame(renderDesignCanvasContent(1, false))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: LIVE ROOM PROJECTION MOCKUP */}
        {viewTab === 'mockup' && (
          <div 
            className={`relative rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 shadow-3xl border border-stone-800/85 bg-[#141416] select-none ${
              mockupFormat === '1:1' ? 'w-full aspect-square max-w-[500px]' :
              mockupFormat === '4:3' ? 'w-full aspect-[4/3] max-w-[520px]' :
              mockupFormat === '2:3' ? 'h-[520px] aspect-[2/3] max-w-[340px]' :
              'w-full aspect-[16/9] max-w-[580px]'
            }`}
          >
            {/* High resolution interior photo image */}
            <img 
              src={customRoomImage || selectedScene.imageUrl} 
              alt="Luxury Room Interior" 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
              style={{
                filter: `brightness(${mockupBrightness}%) contrast(${mockupContrast}%) sepia(${(100 - mockupWarmth) * 0.15}%)`,
              }}
            />
            
            {/* Ambient shadowing mask */}
            <div className="absolute inset-0 bg-stone-950/10 pointer-events-none"></div>

            {/* Sizing advisor overlay badge */}
            {customRoomImage && (
              <div className="absolute top-4 right-4 bg-amber-500/90 text-neutral-950 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest flex items-center gap-1 z-30 shadow-lg">
                <Sparkles className="w-2.5 h-2.5" />
                AI Space Designer Active
              </div>
            )}

            {/* Canvas physical projection in perspective coordinates */}
            {showTriptych ? (
              <>
                {/* Left Companion Canvas */}
                <div 
                  className={`absolute flex flex-col justify-between text-center select-none transition-all duration-500 z-10 ${selectedScene.shadow} ${selectedScene.rotation}`}
                  style={{ 
                    left: customRoomImage ? '35%' : selectedScene.canvasX, 
                    top: `calc(${customRoomImage ? '25%' : selectedScene.canvasY} + ${customHangingOffset}px)`, 
                    width: `calc(${customRoomImage ? '25%' : selectedScene.canvasW} * ${customScalePercent / 100})`, 
                    height: `calc(${customRoomImage ? '33%' : selectedScene.canvasH} * ${customScalePercent / 100})`,
                    perspective: '1000px',
                    transform: 'translateX(-115%) scale(0.9) rotateY(15deg)',
                    transformOrigin: 'right center',
                  }}
                >
                  {renderCanvasWithPhysicalFrame(renderCompanionCanvasContent('left', 0.24))}
                </div>

                {/* Center Main Design Canvas */}
                <div 
                  className={`absolute flex flex-col justify-between text-center select-none transition-all duration-500 z-20 ${selectedScene.shadow} ${selectedScene.rotation}`}
                  style={{ 
                    left: customRoomImage ? '35%' : selectedScene.canvasX, 
                    top: `calc(${customRoomImage ? '25%' : selectedScene.canvasY} + ${customHangingOffset}px)`, 
                    width: `calc(${customRoomImage ? '25%' : selectedScene.canvasW} * ${customScalePercent / 100})`, 
                    height: `calc(${customRoomImage ? '33%' : selectedScene.canvasH} * ${customScalePercent / 100})`,
                    perspective: '1000px',
                    transform: 'scale(1)',
                  }}
                >
                  {renderCanvasWithPhysicalFrame(renderDesignCanvasContent(0.24, true))}
                </div>

                {/* Right Companion Canvas */}
                <div 
                  className={`absolute flex flex-col justify-between text-center select-none transition-all duration-500 z-10 ${selectedScene.shadow} ${selectedScene.rotation}`}
                  style={{ 
                    left: customRoomImage ? '35%' : selectedScene.canvasX, 
                    top: `calc(${customRoomImage ? '25%' : selectedScene.canvasY} + ${customHangingOffset}px)`, 
                    width: `calc(${customRoomImage ? '25%' : selectedScene.canvasW} * ${customScalePercent / 100})`, 
                    height: `calc(${customRoomImage ? '33%' : selectedScene.canvasH} * ${customScalePercent / 100})`,
                    perspective: '1000px',
                    transform: 'translateX(115%) scale(0.9) rotateY(-15deg)',
                    transformOrigin: 'left center',
                  }}
                >
                  {renderCanvasWithPhysicalFrame(renderCompanionCanvasContent('right', 0.24))}
                </div>
              </>
            ) : (
              /* Single Canvas projection */
              <div 
                className={`absolute flex flex-col justify-between text-center select-none transition-all duration-500 z-10 ${selectedScene.shadow} ${selectedScene.rotation}`}
                style={{ 
                  left: customRoomImage ? '38%' : selectedScene.canvasX, 
                  top: `calc(${customRoomImage ? '25%' : selectedScene.canvasY} + ${customHangingOffset}px)`, 
                  width: `calc(${customRoomImage ? '24%' : selectedScene.canvasW} * ${customScalePercent / 100})`, 
                  height: `calc(${customRoomImage ? '32%' : selectedScene.canvasH} * ${customScalePercent / 100})`,
                  perspective: '1000px',
                }}
              >
                {renderCanvasWithPhysicalFrame(renderDesignCanvasContent(0.24, true))}
              </div>
            )}

            {/* Little indicator tab of room */}
            <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-800 text-[8px] font-mono text-stone-300 tracking-wider">
              {customRoomImage ? 'AI BACKDROP: CUSTOM LIVING SPACE' : `SCENE: ${selectedScene.name.toUpperCase()}`}
            </div>
          </div>
        )}
      </div>

      {/* 3. Contextual Floating Action Toolbar when a layer is selected */}
      {viewTab === 'canvas' && selectedLayer !== 'all' && (
        <div className="absolute top-18 right-6 bg-[#161618]/95 backdrop-blur-md border border-stone-800 rounded-xl p-2.5 flex items-center gap-3 shadow-2xl z-40 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col">
            <span className="text-[7.5px] font-mono font-bold text-amber-500 uppercase tracking-widest leading-none">
              Editing: {selectedLayer.toUpperCase()}
            </span>
            <span className="text-[9.5px] font-sans font-bold text-white mt-1 capitalize">
              {lockedLayers[selectedLayer] ? 'Element Locked' : 'Active Selection'}
            </span>
          </div>

          <div className="h-6 w-[1px] bg-stone-800"></div>

          <div className="flex items-center gap-1.5">
            {/* Lock/Unlock Toggle */}
            <button
              onClick={() => toggleLockLayer(selectedLayer)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                lockedLayers[selectedLayer] 
                  ? 'bg-amber-500 text-stone-950 font-bold' 
                  : 'text-stone-400 hover:bg-stone-800 hover:text-white'
              }`}
              title={lockedLayers[selectedLayer] ? 'Unlock Element' : 'Lock Element'}
            >
              {lockedLayers[selectedLayer] ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
            </button>

            {/* Hide/Show Toggle */}
            <button
              onClick={() => toggleHideLayer(selectedLayer)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                hiddenLayers[selectedLayer] 
                  ? 'bg-rose-500/20 text-rose-400' 
                  : 'text-stone-400 hover:bg-stone-800 hover:text-white'
              }`}
              title={hiddenLayers[selectedLayer] ? 'Show Element' : 'Hide Element'}
            >
              {hiddenLayers[selectedLayer] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>

            {/* Quick Duplicate Simulation */}
            <button
              onClick={() => {
                triggerDuplicateFeedback();
              }}
              disabled={lockedLayers[selectedLayer]}
              className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-800 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
              title="Duplicate Element"
            >
              <PlusCircle className="h-3.5 w-3.5" />
            </button>

            {/* Align Center simulation */}
            <button
              className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-800 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
              disabled={lockedLayers[selectedLayer]}
              title="Align to Workspace Center"
            >
              <AlignCenter className="h-3.5 w-3.5" />
            </button>

            {/* Reset elements bounds */}
            <button
              className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-800 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
              disabled={lockedLayers[selectedLayer]}
              title="Fit Zoom to Selection"
              onClick={() => setZoom(100)}
            >
              <Maximize className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Floating Zoom controllers overlay in bottom-right corner */}
      <div className="absolute bottom-5 right-5 bg-stone-900/90 backdrop-blur-md border border-stone-800 px-3 py-1.5 rounded-xl flex items-center gap-2.5 shadow-lg z-30 pointer-events-auto select-none">
        <button 
          onClick={() => setZoom(prev => Math.max(40, prev - 10))}
          className="p-1 text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-all cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="text-[10px] font-mono font-bold text-white min-w-[32px] text-center">
          {zoom}%
        </span>
        <button 
          onClick={() => setZoom(prev => Math.min(180, prev + 10))}
          className="p-1 text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-all cursor-pointer"
          title="Zoom In"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
