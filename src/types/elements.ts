
export type ElementCategory =
  | 'alkali metal'
  | 'alkaline earth metal'
  | 'lanthanide'
  | 'actinide'
  | 'transition metal'
  | 'post-transition metal'
  | 'metalloid'
  | 'diatomic nonmetal'
  | 'polyatomic nonmetal'
  | 'halogen'
  | 'noble gas'
  | 'unknown, probably transition metal'
  | 'unknown, probably post-transition metal'
  | 'unknown, probably metalloid'
  | 'unknown, predicted to be noble gas'
  | 'unknown, chemical properties are not yet clear';

export const ALL_ELEMENT_CATEGORIES: ElementCategory[] = [
  'alkali metal',
  'alkaline earth metal',
  'lanthanide',
  'actinide',
  'transition metal',
  'post-transition metal',
  'metalloid',
  'diatomic nonmetal',
  'polyatomic nonmetal',
  'halogen',
  'noble gas',
  'unknown, probably transition metal',
  'unknown, probably post-transition metal',
  'unknown, probably metalloid',
  'unknown, predicted to be noble gas',
  'unknown, chemical properties are not yet clear'
];

export interface ElementData {
  name: string;
  appearance?: string | null;
  atomic_mass: number;
  boil?: number | null;
  category: ElementCategory;
  density?: number | null;
  discovered_by?: string | null;
  melt?: number | null;
  molar_heat?: number | null;
  named_by?: string | null;
  number: number; // Atomic number
  period: number;
  group: number; 
  phase: 'Gas' | 'Liquid' | 'Solid';
  source?: string; // Wikipedia source URL
  spectral_img?: string | null;
  summary?: string;
  symbol: string;
  xpos: number; // Grid column for direct placement
  ypos: number; // Grid row for direct placement
  shells: number[];
  electron_configuration: string;
  electron_configuration_semantic: string;
  electron_affinity?: number | null;
  electronegativity_pauling?: number | null;
  ionization_energies: number[];
  cpk_hex?: string | null; // Not used for styling, but part of data
}
