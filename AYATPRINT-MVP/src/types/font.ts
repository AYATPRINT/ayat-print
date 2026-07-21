export type FontCategory =
  | 'Naskh'
  | 'Kufi'
  | 'Diwani'
  | 'Thuluth'
  | 'Ruqaa'
  | 'Modern'
  | 'Display'
  | 'Quran'
  | 'Handwriting';

export interface Font {
  id: string;
  name: string;
  family: string;
  style: string;
  category: FontCategory;
  license: 'SIL OFL' | 'Apache 2.0' | 'GPL' | 'MIT' | 'Proprietary';
  author: string;
  github_url?: string;
  website?: string;
  weights: number[];
  variable_font: boolean;
  supports_quran: boolean;
  supports_harakat: boolean;
  supports_ligatures: boolean;
  supports_svg: boolean;
  preview_image?: string;
  font_file?: string; // base64, blob url or local google font link
  version: string;
  
  // Custom attributes for filtering
  is_decorative?: boolean;
  is_minimal?: boolean;
  is_modern?: boolean;
  is_print_quality?: boolean;
  is_ui?: boolean;
  is_title?: boolean;
  is_body?: boolean;
  is_commercial_use?: boolean;
}

export interface OpenTypeSettings {
  ligatures: boolean;
  contextualAlternates: boolean;
  stylisticSets: { [key: string]: boolean };
  characterVariants: { [key: string]: boolean };
  swashes: boolean;
  alternateGlyphs: boolean;
  variableWeight: number;
  variableWidth: number;
  opticalSize: number;
}
