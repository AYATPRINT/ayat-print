import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'primary' | 'icon' | 'horizontal' | 'vertical' | 'favicon' | 'appicon' | 'waxseal';
  theme?: 'light' | 'dark' | 'monochrome';
  showSubtitle?: boolean;
}

export default function Logo({ 
  className = '', 
  size = 40, 
  variant = 'primary', 
  theme = 'dark',
  showSubtitle = true 
}: LogoProps) {
  
  // Luxury Palette: Champagne Gold (#C5A059), Fine Gold (#D4AF37), Rich Black (#111111), Off-White (#FDFBF7)
  const isDark = theme === 'dark';
  const isMono = theme === 'monochrome';

  // Primary Line Color
  const primaryStroke = isMono 
    ? (isDark ? '#FFFFFF' : '#111111')
    : (isDark ? '#E2C044' : '#C5A059');

  const secondaryStroke = isMono
    ? (isDark ? '#A3A3A3' : '#525252')
    : (isDark ? '#D4AF37' : '#9A7B38');

  const textPrimary = isDark ? 'text-stone-100' : 'text-stone-900';
  const textGold = 'text-[#C5A059] dark:text-[#E2C044]';
  const textSub = isDark ? 'text-stone-400' : 'text-stone-500';

  // Master Vector Emblem (Minimal, Timeless, Sacred Geometry)
  // Integrates an open manuscript arc and a crowning crescent moon in golden harmony
  const renderIcon = (iconSize: number) => {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 select-none transition-transform duration-300 hover:scale-[1.02]"
        aria-label="AyatPrint Luxury Emblem"
      >
        <defs>
          <linearGradient id="luxuryGoldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E5AB" />
            <stop offset="35%" stopColor="#E2C044" />
            <stop offset="70%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8C6D2D" />
          </linearGradient>
          <linearGradient id="subtleShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2C044" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FDFBF7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* 1. Subtle Radial Golden Proportion Axis */}
        <circle cx="50" cy="50" r="42" stroke={primaryStroke} strokeWidth="0.5" strokeDasharray="1 3" opacity="0.3" />
        <line x1="50" y1="12" x2="50" y2="88" stroke={primaryStroke} strokeWidth="0.5" opacity="0.25" />

        {/* 2. Celestial Crescent Crown - Flowing top arc that embraces the composition */}
        <path
          d="M 22,56 C 22,30 38,14 50,14 C 62,14 78,30 78,56 C 70,36 59,22 50,22 C 41,22 30,36 22,56 Z"
          fill={isMono ? primaryStroke : "url(#luxuryGoldFoil)"}
          opacity="0.95"
        />

        {/* 3. Sacred Open Book / Manuscript Wings - Two elegant, flowing vector lines */}
        {/* Outer Left Wing */}
        <path
          d="M 50,78 C 42,66 26,62 16,66 C 26,53 43,51 50,66"
          stroke={primaryStroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Outer Right Wing */}
        <path
          d="M 50,78 C 58,66 74,62 84,66 C 74,53 57,51 50,66"
          stroke={primaryStroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Inner Parallel Parchment Flow Lines (Dual Calligraphic Strokes) */}
        <path
          d="M 50,72 C 43,62 31,59 21,62 C 29,52 42,52 50,62 C 58,52 71,52 79,62 C 69,59 57,62 50,72 Z"
          fill={primaryStroke}
          opacity="0.25"
        />

        {/* Spine Anchor Line */}
        <line x1="50" y1="65" x2="50" y2="81" stroke={primaryStroke} strokeWidth="1.4" strokeLinecap="round" />

        {/* 4. Golden Ratio Geometric Diamond / Star of Divine Grace */}
        <path
          d="M 50,30 L 53,36 L 50,42 L 47,36 Z"
          fill={isMono ? primaryStroke : "url(#luxuryGoldFoil)"}
        />
        
        {/* Subtle Accenting Orbit Dots */}
        <circle cx="37" cy="38" r="0.8" fill={secondaryStroke} opacity="0.6" />
        <circle cx="63" cy="38" r="0.8" fill={secondaryStroke} opacity="0.6" />
      </svg>
    );
  };

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderIcon(size)}
      </div>
    );
  }

  if (variant === 'favicon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderIcon(size)}
      </div>
    );
  }

  if (variant === 'appicon') {
    return (
      <div 
        className={`inline-flex flex-col items-center justify-center p-6 bg-stone-950 border border-[#C5A059]/30 shadow-2xl relative ${className}`}
        id="luxury-app-icon"
      >
        {renderIcon(size || 64)}
        <span className="text-[10px] font-serif tracking-[0.35em] text-[#E2C044] uppercase mt-3 font-medium">
          AYATPRINT
        </span>
      </div>
    );
  }

  if (variant === 'waxseal') {
    return (
      <div className={`inline-flex items-center justify-center p-3 rounded-full border border-[#C5A059]/40 bg-[#022C22] shadow-inner ${className}`}>
        {renderIcon(size || 36)}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`} id="logo-horizontal">
        {renderIcon(size)}
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1">
            <span className={`text-xl font-serif font-semibold tracking-[0.22em] uppercase ${textPrimary}`}>
              AYAT<span className={textGold}>PRINT</span>
            </span>
          </div>
          {showSubtitle && (
            <span className={`text-[8px] font-sans tracking-[0.35em] font-medium uppercase ${textSub} -mt-0.5`}>
              MAISON D'ART ISLAMIQUE
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`} id="logo-vertical">
        {renderIcon(size || 48)}
        <div className="flex flex-col items-center">
          <span className={`text-2xl font-serif font-semibold tracking-[0.28em] uppercase ${textPrimary}`}>
            AYAT<span className={textGold}>PRINT</span>
          </span>
          {showSubtitle && (
            <>
              <span className={`text-[9px] font-sans tracking-[0.38em] font-medium uppercase text-[#C5A059] mt-1`}>
                MAISON D'ART ISLAMIQUE
              </span>
              <span className="text-[8px] font-sans tracking-[0.25em] text-stone-400 mt-1 uppercase">
                DUBAI • PARIS • LONDON
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  // Primary Default Logo
  return (
    <div className={`flex items-center gap-3.5 ${className}`} id="logo-primary">
      {renderIcon(size)}
      <div className="flex flex-col justify-center">
        <span className={`text-xl font-serif font-semibold tracking-[0.25em] uppercase ${textPrimary}`}>
          AYAT<span className={textGold}>PRINT</span>
        </span>
        {showSubtitle && (
          <span className={`text-[8.5px] font-sans tracking-[0.35em] font-medium uppercase ${textSub} -mt-0.5`}>
            SACRED ART STUDIO
          </span>
        )}
      </div>
    </div>
  );
}
