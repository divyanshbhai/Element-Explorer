
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ElementCategory } from '@/types/elements';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to get a simplified HSL color string for a category
// This is needed because CSS variables via `hsl(var(--name))` don't work directly in JS for SVG fills if not inline styled on the SVG itself.
// We will use these in the ElectronShellDiagram.
export function getCategorySimpleColor(category: ElementCategory): string {
  const categoryColorMap: Record<ElementCategory, string> = {
    'alkali metal': 'hsl(15, 90%, 65%)', // from var(--category-alkali-metal-bg)
    'alkaline earth metal': 'hsl(35, 90%, 65%)', // from var(--category-alkaline-earth-metal-bg)
    'lanthanide': 'hsl(260, 70%, 70%)', // from var(--category-lanthanide-bg)
    'actinide': 'hsl(330, 70%, 70%)', // from var(--category-actinide-bg)
    'transition metal': 'hsl(50, 80%, 60%)', // from var(--category-transition-metal-bg)
    'post-transition metal': 'hsl(205, 60%, 65%)', // from var(--category-post-transition-metal-bg)
    'metalloid': 'hsl(90, 50%, 60%)', // from var(--category-metalloid-bg)
    'diatomic nonmetal': 'hsl(230, 65%, 75%)', // from var(--category-diatomic-nonmetal-bg)
    'polyatomic nonmetal': 'hsl(225, 60%, 70%)', // from var(--category-polyatomic-nonmetal-bg)
    'halogen': 'hsl(170, 70%, 55%)', // from var(--category-halogen-bg)
    'noble gas': 'hsl(300, 80%, 75%)', // from var(--category-noble-gas-bg)
    'unknown, probably transition metal': 'hsl(0, 0%, 40%)', // from var(--category-unknown-properties-bg)
    'unknown, probably post-transition metal': 'hsl(0, 0%, 40%)',
    'unknown, probably metalloid': 'hsl(0, 0%, 40%)',
    'unknown, predicted to be noble gas': 'hsl(0, 0%, 40%)',
    'unknown, chemical properties are not yet clear': 'hsl(0, 0%, 40%)',
  };
  return categoryColorMap[category] || 'hsl(0, 0%, 60%)'; // Fallback color
}
