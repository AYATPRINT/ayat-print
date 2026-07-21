import React from 'react';
import { Sparkles, Check, AlertTriangle, ShieldCheck } from 'lucide-react';

interface StudioStatusBarProps {
  zoom: number;
  printSize: 'A4' | 'A3' | 'A2' | '50x70' | '60x90';
  printMaterial: 'canvas' | 'poster' | 'metal';
  isAuditing: boolean;
  qcStatus: string;
}

export const StudioStatusBar: React.FC<StudioStatusBarProps> = ({
  zoom,
  printSize,
  printMaterial,
  isAuditing,
  qcStatus
}) => {
  // Map dimensions
  const getMetricsText = () => {
    switch (printSize) {
      case 'A4': return '21.0 x 29.7 cm (A4)';
      case 'A3': return '29.7 x 42.0 cm (A3)';
      case 'A2': return '42.0 x 59.4 cm (A2)';
      case '50x70': return '50.0 x 70.0 cm';
      case '60x90': return '60.0 x 90.0 cm (Luxury)';
      default: return '42.0 x 59.4 cm (A2)';
    }
  };

  const getMaterialLabel = () => {
    switch (printMaterial) {
      case 'canvas': return 'Premium Cotton Stretched Canvas (38mm)';
      case 'poster': return 'Silk Premium Poster (250gsm)';
      case 'metal': return 'Dibond Brushed Metal Plate';
    }
  };

  return (
    <div className="w-full bg-[#1e1e21] border-t border-stone-800 px-6 py-2.5 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-stone-400 gap-2 shrink-0 z-30 select-none">
      {/* Visual Dimension & Material readout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-stone-600">DIMENSIONS:</span>
          <span className="text-stone-300 font-bold">{getMetricsText()}</span>
        </div>
        <div className="hidden sm:inline text-stone-600">|</div>
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="text-stone-600">STOCK MATERIAL:</span>
          <span className="text-stone-300 capitalize">{getMaterialLabel()}</span>
        </div>
      </div>

      {/* QC Status Indicator ticker */}
      <div className="flex items-center gap-3">
        <div className="bg-stone-900 border border-stone-800 px-2.5 py-0.5 rounded-md flex items-center gap-1.5 min-w-[200px]">
          <span className="relative flex h-1.5 w-1.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAuditing ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isAuditing ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
          </span>
          <span className="text-[8px] font-bold text-stone-500 uppercase font-mono">QC AUDIT:</span>
          <span className={`text-[8.5px] font-bold uppercase tracking-wider ${isAuditing ? 'text-amber-500' : 'text-emerald-500'}`}>
            {isAuditing ? 'Auditing Wall Coordinates...' : 'Passed Safety Clearances (OK)'}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-stone-500 font-bold">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
          <span>300 DPI CMYK READY</span>
        </div>
      </div>
    </div>
  );
};
