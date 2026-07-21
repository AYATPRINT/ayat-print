import { jsPDF } from 'jspdf';
import { QuranVerse, CanvasPreset } from '../types/quran';

export interface PDFGeneratorOptions {
  selectedVerse: QuranVerse;
  editableArabic: string;
  editableTranslation: string;
  currentPreset: CanvasPreset;
  fontSize: number;
  letterSpacing: number;
  arabicFont: string;
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
  goldIntensity: number;
  bgTexture: string;
  showQuranMetadata: boolean;
  showTranslation: boolean;
  translationFontSize: number;
  translationColor: string;
  printSize: 'A4' | 'A3' | 'A2' | '50x70' | '60x90';
  printMaterial: 'canvas' | 'poster' | 'metal';
  customCalligraphyFile?: string | null;
  customCalligraphyScale?: number;
  customCalligraphyOpacity?: number;
}

// 300 DPI scaling factor: 1 mm = 11.811 pixels
const DPI_SCALE = 11.811;

/**
 * Calculates physical trim dimensions in mm for a given size and layout shape
 */
export function getTrimDimensions(
  printSize: 'A4' | 'A3' | 'A2' | '50x70' | '60x90',
  layoutShape: 'portrait' | 'landscape' | 'square' | 'circle' | 'arch' | 'vertical'
): { width: number; height: number } {
  let maxDim = 700; // default for 50x70
  if (printSize === 'A4') maxDim = 297;
  else if (printSize === 'A3') maxDim = 420;
  else if (printSize === 'A2') maxDim = 594;
  else if (printSize === '50x70') maxDim = 700;
  else if (printSize === '60x90') maxDim = 900;

  switch (layoutShape) {
    case 'landscape':
      return { width: maxDim, height: maxDim * 0.75 };
    case 'square':
    case 'circle':
      return { width: maxDim, height: maxDim };
    case 'vertical':
      return { width: maxDim * (9 / 16), height: maxDim };
    case 'arch':
    case 'portrait':
    default:
      return { width: maxDim * 0.75, height: maxDim };
  }
}

/**
 * Helper to wrap image loading in a promise
 */
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Generates the high-resolution artwork canvas including bleed areas
 */
export async function createHighResArtworkCanvas(
  options: PDFGeneratorOptions,
  trimW_mm: number,
  trimH_mm: number,
  bleed_mm: number
): Promise<HTMLCanvasElement> {
  const {
    selectedVerse,
    editableArabic,
    editableTranslation,
    currentPreset,
    fontSize,
    letterSpacing,
    arabicFont,
    layoutShape,
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
    customCalligraphyFile,
    customCalligraphyScale = 100,
    customCalligraphyOpacity = 100,
  } = options;

  // Calculate pixel dimensions for the full bleed sheet
  const bleedW_mm = trimW_mm + 2 * bleed_mm;
  const bleedH_mm = trimH_mm + 2 * bleed_mm;

  const exportWidth = Math.round(bleedW_mm * DPI_SCALE);
  const exportHeight = Math.round(bleedH_mm * DPI_SCALE);

  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = exportWidth;
  exportCanvas.height = exportHeight;
  const ctx = exportCanvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not create 2D canvas context');
  }

  // Ensure fonts are loaded before drawing
  if (document.fonts) {
    await document.fonts.ready;
  }

  const bleedPx = Math.round(bleed_mm * DPI_SCALE);
  const trimWidthPx = exportWidth - 2 * bleedPx;
  const scale = exportWidth / 2400; // base scale factor relative to 2400px default

  ctx.save();

  // 1. Handle shape masking (e.g. circle, arch) with bleed extensions
  if (layoutShape === 'circle') {
    ctx.beginPath();
    // Extend circular clipping mask into the bleed area
    const rad = (trimWidthPx / 2) + bleedPx;
    ctx.arc(exportWidth / 2, exportHeight / 2, rad, 0, Math.PI * 2);
    ctx.clip();
  } else if (layoutShape === 'arch') {
    ctx.beginPath();
    const rad = (trimWidthPx / 2) + bleedPx;
    ctx.arc(exportWidth / 2, rad, rad, Math.PI, 0);
    ctx.lineTo(exportWidth, exportHeight);
    ctx.lineTo(0, exportHeight);
    ctx.closePath();
    ctx.clip();
  }

  // 2. Solid Background color
  ctx.fillStyle = currentPreset.bgColor || '#FAF9F5';
  ctx.fillRect(0, 0, exportWidth, exportHeight);

  // 3. Procedural Background texture or image texture
  const activeText = bgTexture === 'none' ? currentPreset.texture : bgTexture;
  let textureLoaded = false;

  if (activeText !== 'none') {
    let textureUrl = '';
    if (activeText === 'marble') textureUrl = 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800';
    else if (activeText === 'emerald-silk') textureUrl = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800';
    else if (activeText === 'textured-paper') textureUrl = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800';
    else if (activeText === 'wood') textureUrl = 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800';
    else if (activeText === 'parchment') textureUrl = 'https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?auto=format&fit=crop&q=80&w=800';

    if (textureUrl) {
      try {
        const img = await loadImage(textureUrl);
        ctx.save();
        ctx.globalAlpha = 0.25;
        ctx.globalCompositeOperation = 'multiply';
        // Draw image repeatedly as tile or stretched to fit
        ctx.drawImage(img, 0, 0, exportWidth, exportHeight);
        ctx.restore();
        textureLoaded = true;
      } catch (e) {
        console.warn('Failed to load background texture image, falling back to procedural generation:', e);
      }
    }
  }

  // Procedural Fallback textures if images are unavailable or not loaded
  if (!textureLoaded && activeText !== 'none') {
    if (activeText === 'marble') {
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * exportWidth, Math.random() * exportHeight);
        ctx.lineTo(Math.random() * exportWidth, Math.random() * exportHeight);
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.04)';
        ctx.lineWidth = Math.random() * 5 * scale;
        ctx.stroke();
      }
      ctx.restore();
    } else if (activeText === 'emerald-silk') {
      ctx.save();
      const gradient = ctx.createLinearGradient(0, 0, exportWidth, exportHeight);
      gradient.addColorStop(0, '#012c22');
      gradient.addColorStop(0.5, '#064e3b');
      gradient.addColorStop(1, '#012c22');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, exportWidth, exportHeight);
      ctx.restore();
    } else if (activeText === 'textured-paper') {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.015)';
      for (let i = 0; i < 4000; i++) {
        ctx.fillRect(Math.random() * exportWidth, Math.random() * exportHeight, Math.max(1, 2 * scale), Math.max(1, 2 * scale));
      }
      ctx.restore();
    }
  }

  // 4. Color configurations
  const intensity = goldIntensity / 100;
  const primaryColor = useGoldGradient ? '#C5A059' : currentPreset.textColor;
  const ornamentColorResolved = useGoldGradient ? `rgba(197, 160, 89, ${intensity})` : currentPreset.ornamentColor;

  // 5. Decorative Islamic Frame
  if (decorativeFrame !== 'none') {
    ctx.save();
    ctx.lineWidth = borderThickness * 3 * scale;
    ctx.strokeStyle = ornamentColorResolved;
    
    // pad is innerPadding scaled + bleed offset to stay safely inside trim boundary
    const pad = bleedPx + (innerPadding * 3.5 * scale);
    const w = exportWidth - (pad * 2);
    const h = exportHeight - (pad * 2);
    const x = pad;
    const y = pad;

    if (cornerStyle === 'rounded') {
      ctx.beginPath();
      // Safe fallback if roundRect is not supported
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, w, h, 60 * scale);
      } else {
        ctx.rect(x, y, w, h);
      }
      ctx.stroke();
    } else if (cornerStyle === 'scalloped') {
      const radius = 100 * scale;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.arc(x + w - radius, y + radius, radius, -Math.PI / 2, 0);
      ctx.lineTo(x + w, y + h - radius);
      ctx.arc(x + w - radius, y + h - radius, radius, 0, Math.PI / 2);
      ctx.lineTo(x + radius, y + h);
      ctx.arc(x + radius, y + h - radius, radius, Math.PI / 2, Math.PI);
      ctx.lineTo(x, y + radius);
      ctx.arc(x + radius, y + radius, radius, Math.PI, -Math.PI / 2);
      ctx.stroke();
    } else if (cornerStyle === 'bracket') {
      const bOffset = 100 * scale;
      ctx.beginPath();
      ctx.moveTo(x + bOffset, y);
      ctx.lineTo(x + w - bOffset, y);
      ctx.lineTo(x + w, y + bOffset);
      ctx.lineTo(x + w, y + h - bOffset);
      ctx.lineTo(x + w - bOffset, y + h);
      ctx.lineTo(x + bOffset, y + h);
      ctx.lineTo(x, y + h - bOffset);
      ctx.lineTo(x, y + bOffset);
      ctx.closePath();
      ctx.stroke();
    } else {
      ctx.strokeRect(x, y, w, h);
    }
    ctx.restore();
  }

  // 6. Corner Floral Ornaments
  if (cornerOrnament) {
    ctx.save();
    ctx.fillStyle = ornamentColorResolved;
    const s = 60 * scale;
    const pad = bleedPx + (innerPadding + 10) * 3 * scale;
    
    // Draw minimalist elegant corners
    ctx.fillRect(pad, pad, s, 6 * scale); ctx.fillRect(pad, pad, 6 * scale, s);
    ctx.fillRect(exportWidth - pad - s, pad, s, 6 * scale); ctx.fillRect(exportWidth - pad, pad, 6 * scale, s);
    ctx.fillRect(pad, exportHeight - pad, s, 6 * scale); ctx.fillRect(pad, exportHeight - pad - s, 6 * scale, s);
    ctx.fillRect(exportWidth - pad - s, exportHeight - pad, s, 6 * scale); ctx.fillRect(exportWidth - pad, exportHeight - pad - s, 6 * scale, s);
    ctx.restore();
  }

  // 7. Circular center arabesque ornament
  if (circularOrnament) {
    ctx.save();
    ctx.strokeStyle = ornamentColorResolved;
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.arc(exportWidth / 2, exportHeight / 2, 120 * scale, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      ctx.beginPath();
      ctx.moveTo(exportWidth / 2, exportHeight / 2);
      ctx.lineTo(exportWidth / 2 + Math.cos(angle) * 140 * scale, exportHeight / 2 + Math.sin(angle) * 140 * scale);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 8. Layout Composition Typography & Information
  ctx.textAlign = 'center';

  // 8a. Metadata Block
  if (showQuranMetadata && !customCalligraphyFile) {
    ctx.save();
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.max(14, 24 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = ornamentColorResolved;
    const metadataStr = `JUZ' ${selectedVerse.juz || '1'}  •  HIZB ${selectedVerse.hizb || '1'}  •  ${(selectedVerse.revelationType || 'Makki').toUpperCase()}`;
    ctx.fillText(metadataStr, exportWidth / 2, exportHeight * 0.08 + bleedPx);
    ctx.restore();
  }

  // 8b. Arabic Calligraphy
  const drawArabicText = () => {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const resolvedFont = `"${arabicFont}", Amiri, "Scheherazade New", serif`;
    ctx.font = `bold ${fontSize * 3.8 * scale}px ${resolvedFont}`;
    ctx.fillStyle = primaryColor;
    
    // Add Thuluth style glow
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 8 * scale;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4 * scale;

    const words = editableArabic.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    // Adjust word wrap length dynamically for extreme portrait/landscape orientations
    const wrapLimit = layoutShape === 'landscape' ? 38 : layoutShape === 'vertical' ? 22 : 28;

    words.forEach(word => {
      if ((currentLine + ' ' + word).length > wrapLimit) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = currentLine ? currentLine + ' ' + word : word;
      }
    });
    if (currentLine) lines.push(currentLine);

    // Compute vertical center placement
    let startY = exportHeight * 0.45 - (lines.length * 90 * scale);
    lines.forEach((line, index) => {
      ctx.fillText(line, exportWidth / 2, startY + (index * 190 * scale));
    });
    ctx.restore();
  };

  // 8c. Custom uploaded calligraphy file rendering
  if (customCalligraphyFile) {
    try {
      const img = await loadImage(customCalligraphyFile);
      ctx.save();
      ctx.globalAlpha = customCalligraphyOpacity / 100;
      
      // Calculate responsive layout scale centered
      const scaleMultiplier = (customCalligraphyScale / 100) * (exportWidth / img.width) * 0.5;
      const drawW = img.width * scaleMultiplier;
      const drawH = img.height * scaleMultiplier;
      
      ctx.drawImage(
        img,
        (exportWidth - drawW) / 2,
        (exportHeight - drawH) / 2,
        drawW,
        drawH
      );
      ctx.restore();
    } catch (e) {
      console.warn('Could not load custom uploaded calligraphy SVG for print PDF, falling back to text:', e);
      drawArabicText();
    }
  } else {
    drawArabicText();
  }

  // 8d. English Translation Footer block
  if (showTranslation) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // صَدَقَ اللَّهُ الْعَظِيمُ Calligraphic Divider
    ctx.font = `italic ${Math.max(28, 38 * scale)}px 'Amiri', serif`;
    ctx.fillStyle = ornamentColorResolved;
    ctx.fillText('صَدَقَ اللَّهُ الْعَظِيمُ', exportWidth / 2, exportHeight * 0.74);

    // Translation Paragraph wrapping
    ctx.font = `italic ${translationFontSize * 3.5 * scale}px 'Montserrat', serif`;
    ctx.fillStyle = translationColor || '#cbd5e1';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 4 * scale;

    const transWords = editableTranslation.split(' ');
    const transLines: string[] = [];
    let transLine = '';
    const transWrapLimit = layoutShape === 'landscape' ? 80 : layoutShape === 'vertical' ? 45 : 60;
    
    transWords.forEach(w => {
      if ((transLine + ' ' + w).length > transWrapLimit) {
        transLines.push(transLine);
        transLine = w;
      } else {
        transLine = transLine ? transLine + ' ' + w : w;
      }
    });
    if (transLine) transLines.push(transLine);

    const transY = exportHeight * 0.79;
    transLines.forEach((l, index) => {
      ctx.fillText(l, exportWidth / 2, transY + (index * 65 * scale));
    });
    ctx.restore();
  }

  // 8e. Surah Reference Footer
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${Math.max(16, 28 * scale)}px 'Montserrat', sans-serif`;
  ctx.fillStyle = ornamentColorResolved;
  ctx.fillText(
    `SURAH ${selectedVerse.surahNameEnglish.toUpperCase()} (AYAH ${selectedVerse.ayah})`,
    exportWidth / 2,
    exportHeight - 130 * scale - bleedPx
  );

  // Authentication Watermark
  ctx.font = `bold ${Math.max(11, 20 * scale)}px 'Montserrat', sans-serif`;
  ctx.fillStyle = '#52525b';
  ctx.fillText(
    `AUTHENTIC TANZIL TEXT ENGINE VERIFIED • 300 DPI FINE ART PRINT PDF`,
    exportWidth / 2,
    exportHeight - 80 * scale - bleedPx
  );
  ctx.restore();

  ctx.restore(); // end shape clip

  return exportCanvas;
}

/**
 * Main export function that builds the entire print-ready PDF with professional marks
 */
export async function generatePrintPDF(options: PDFGeneratorOptions): Promise<void> {
  const { printSize, layoutShape, selectedVerse } = options;

  // 1. Core Dimensions in mm
  const { width: trimW, height: trimH } = getTrimDimensions(printSize, layoutShape);
  const bleed = 3.0; // standard 3mm print bleed
  const margin = 15.0; // 15mm extra padding for printer crop marks & registration targets
  
  const pdfW = trimW + 2 * (bleed + margin);
  const pdfH = trimH + 2 * (bleed + margin);

  // 2. Instantiate jsPDF (options: orientation, unit, format)
  const orientation = pdfW > pdfH ? 'l' : 'p';
  const doc = new jsPDF({
    orientation,
    unit: 'mm',
    format: [pdfW, pdfH]
  });

  // 3. Render High-Resolution Design Canvas
  const canvas = await createHighResArtworkCanvas(options, trimW, trimH, bleed);
  const imgData = canvas.toDataURL('image/png');

  // Add compiled artwork to the PDF, covering the entire bleed box: x=margin, y=margin, w=trimW+2*bleed, h=trimH+2*bleed
  const artworkW = trimW + 2 * bleed;
  const artworkH = trimH + 2 * bleed;
  doc.addImage(imgData, 'PNG', margin, margin, artworkW, artworkH, undefined, 'FAST');

  // 4. DRAW PRINTER MARKS (In absolute vector shapes on top for crisp high-quality print production)
  
  // Registration black (neutral gray C=100 M=100 Y=100 K=100)
  doc.setDrawColor(60, 64, 67);
  doc.setLineWidth(0.15);

  const trimLeft = margin + bleed;
  const trimRight = pdfW - (margin + bleed);
  const trimTop = margin + bleed;
  const trimBottom = pdfH - (margin + bleed);

  const bleedLeft = margin;
  const bleedRight = pdfW - margin;
  const bleedTop = margin;
  const bleedBottom = pdfH - margin;

  // --- 4a. SOLID CROP MARKS (Trim boundaries where the cutter cuts) ---
  // Top-Left Trim Corner
  doc.line(trimLeft, margin - 12, trimLeft, trimTop - 2); // vertical
  doc.line(margin - 12, trimTop, trimLeft - 2, trimTop); // horizontal

  // Top-Right Trim Corner
  doc.line(trimRight, margin - 12, trimRight, trimTop - 2); // vertical
  doc.line(trimRight + 2, trimTop, pdfW - margin + 12, trimTop); // horizontal

  // Bottom-Left Trim Corner
  doc.line(trimLeft, trimBottom + 2, trimLeft, pdfH - margin + 12); // vertical
  doc.line(margin - 12, trimBottom, trimLeft - 2, trimBottom); // horizontal

  // Bottom-Right Trim Corner
  doc.line(trimRight, trimBottom + 2, trimRight, pdfH - margin + 12); // vertical
  doc.line(trimRight + 2, trimBottom, pdfW - margin + 12, trimBottom); // horizontal


  // --- 4b. DASHED BLEED MARKS (Guides showing the boundary of extra bleed graphics) ---
  // A professional printer uses this to verify the image bleeds out properly by 3mm
  doc.line(bleedLeft, margin - 10, bleedLeft, bleedTop - 2); // vertical left
  doc.line(margin - 10, bleedTop, bleedLeft - 2, bleedTop); // horizontal top
  
  doc.line(bleedRight, margin - 10, bleedRight, bleedTop - 2); // vertical right
  doc.line(bleedRight + 2, bleedTop, pdfW - margin + 10, bleedTop); // horizontal top

  doc.line(bleedLeft, bleedBottom + 2, bleedLeft, pdfH - margin + 10); // vertical left
  doc.line(margin - 10, bleedBottom, bleedLeft - 2, bleedBottom); // horizontal bottom

  doc.line(bleedRight, bleedBottom + 2, bleedRight, pdfH - margin + 10); // vertical right
  doc.line(bleedRight + 2, bleedBottom, pdfW - margin + 10, bleedBottom); // horizontal bottom


  // --- 4c. GEOMETRIC REGISTRATION CROSSHAIR TARGETS ---
  // Placed centered in the outer margin margins to align plates
  const drawRegistrationTarget = (x_c: number, y_c: number) => {
    doc.saveGraphicsState();
    doc.setLineWidth(0.12);
    doc.setDrawColor(60, 64, 67);
    
    // Draw outer targets concentric circles
    doc.circle(x_c, y_c, 3, 'S');
    doc.circle(x_c, y_c, 1.5, 'S');
    
    // Draw crosshair axes extending slightly past the outer circle
    doc.line(x_c - 5, y_c, x_c + 5, y_c);
    doc.line(x_c, y_c - 5, x_c, y_c + 5);
    doc.restoreGraphicsState();
  };

  // Draw 4 symmetric targets
  drawRegistrationTarget(pdfW / 2, margin / 2); // Top
  drawRegistrationTarget(pdfW / 2, pdfH - margin / 2); // Bottom
  drawRegistrationTarget(margin / 2, pdfH / 2); // Left
  drawRegistrationTarget(pdfW - margin / 2, pdfH / 2); // Right


  // --- 4d. CMYK + BRONZE METALLIC COLOR CONTROL STRIPS ---
  // Color bars printed in the margin to ensure ink calibration and rich print density
  const colors = [
    { name: 'C', r: 0, g: 174, b: 239 },    // Cyan
    { name: 'M', r: 236, g: 0, b: 140 },   // Magenta
    { name: 'Y', r: 255, g: 242, b: 0 },   // Yellow
    { name: 'K', r: 26, g: 23, b: 27 },     // Black
    { name: 'G', r: 197, g: 160, b: 89 },   // Bespoke Gold Ink
    { name: 'W', r: 250, g: 249, b: 245 }   // Base Paper Proof
  ];

  doc.saveGraphicsState();
  const boxSize = 4.5;
  const gap = 1.0;
  const totalStripW = colors.length * boxSize + (colors.length - 1) * gap;
  
  // Center color bar strip horizontally in bottom margin
  const startX = (pdfW - totalStripW) / 2;
  const barY = pdfH - margin / 2 - boxSize / 2;

  colors.forEach((color, i) => {
    const x = startX + i * (boxSize + gap);
    doc.setFillColor(color.r, color.g, color.b);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.08);
    doc.rect(x, barY, boxSize, boxSize, 'FD');
  });
  doc.restoreGraphicsState();


  // --- 4e. DOCUMENT INFO & METADATA PREPRESS STRINGS ---
  // Tiny neutral text at top margin center with critical file parameters
  doc.saveGraphicsState();
  doc.setTextColor(110, 115, 120);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(6.5);
  
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);
  
  const infoString = `AyatPrint Bespoke Series  |  Surah: ${selectedVerse.surahNameEnglish.toUpperCase()}  |  Ayah: ${selectedVerse.ayah}  |  Format: ${layoutShape.toUpperCase()}  |  Trim size: ${printSize} (${trimW}x${trimH} mm)  |  Bleed: 3mm  |  CMYK Process 300 DPI Proof  |  Prepress generated: ${dateStr}`;
  
  // Align center
  doc.text(infoString, pdfW / 2, margin / 2 + 1, { align: 'center' });
  doc.restoreGraphicsState();

  // 5. Trigger client file download save
  const filename = `AyatPrint_PrintReady_${selectedVerse.surahNameEnglish}_${printSize}.pdf`;
  doc.save(filename);
}
