
"use client";

import type { ElementData } from '@/types/elements';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ElectronShellDiagram } from './electron-shell-diagram';
import { XIcon, PlusCircleIcon, MinusCircleIcon, ScaleIcon } from 'lucide-react';
import { cn, getCategorySimpleColor } from '@/lib/utils';

interface ElementInfoCardProps {
  element: ElementData;
  onClose: () => void;
  onToggleCompare: (element: ElementData) => void;
  isComparing: boolean;
}

export function ElementInfoCard({ element, onClose, onToggleCompare, isComparing }: ElementInfoCardProps) {
  if (!element) {
    return null; 
  }

  const categoryVarName = `--category-${element.category.replace(/\s/g, '-')}-bg`;
  const categoryColorHSL = `hsl(var(${categoryVarName}))`;
  const categorySimpleColor = getCategorySimpleColor(element.category);

  return (
    <Card
      className={cn(
        "w-96 md:w-[450px] shadow-xl transition-all duration-200 border-2 flex flex-col",
        "bg-card text-card-foreground"
      )}
      style={{
        borderColor: categoryColorHSL,
        maxHeight: 'calc(100vh - 60px)', // Ensure it doesn't overflow viewport
        boxShadow: `0 0 15px 2px ${categoryColorHSL}, 0 0 25px 5px hsla(var(--primary), 0.5)`
      }}
    >
      <CardHeader className="text-center pb-2 relative pt-4">
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={onClose}>
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <CardTitle className="text-2xl font-bold">{element.symbol}</CardTitle>
        <CardDescription className="font-semibold text-md">{element.name}</CardDescription>
        <div className="text-xs opacity-80">Atomic Number: {element.number}</div>
      </CardHeader>
      <CardContent className="space-y-1.5 text-xs overflow-y-auto flex-grow px-4 pb-4 pt-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <div className="my-1 flex justify-center items-center h-28 md:h-32">
          <ElectronShellDiagram 
            shells={element.shells} 
            elementSymbol={element.symbol}
            baseColor={categorySimpleColor}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] md:text-xs">
          <p><strong>Category:</strong> <span className="capitalize">{element.category}</span></p>
          <p><strong>Atomic Mass:</strong> {element.atomic_mass.toFixed(4)} u</p>
          <p><strong>Phase:</strong> {element.phase}</p>
          {element.density && <p><strong>Density:</strong> {element.density} g/cm³</p>}
          {element.melt && <p><strong>Melting Point:</strong> {element.melt} K</p>}
          {element.boil && <p><strong>Boiling Point:</strong> {element.boil} K</p>}
          {element.electronegativity_pauling !== null && typeof element.electronegativity_pauling !== 'undefined' && (
            <p><strong>Electronegativity:</strong> {element.electronegativity_pauling}</p>
          )}
          <p><strong>Period:</strong> {element.period}</p>
          <p><strong>Group:</strong> {element.group}</p>
          {element.appearance && <p><strong>Appearance:</strong> <span className="capitalize">{element.appearance}</span></p>}
          {element.molar_heat && <p><strong>Molar Heat:</strong> {element.molar_heat} J/(mol·K)</p>}
        </div>
        <p className="mt-1"><strong>Electron Shells (config):</strong> {element.shells.join(', ')}</p>
        <p className="mt-1"><strong>Electron Config.:</strong> {element.electron_configuration}</p>
        <p className="mt-1"><strong>Semantic Config.:</strong> {element.electron_configuration_semantic}</p>

        {element.discovered_by && <p className="mt-1"><strong>Discovered By:</strong> {element.discovered_by}</p>}
        {element.named_by && <p className="mt-1"><strong>Named By:</strong> {element.named_by}</p>}
        
        {element.summary &&
          <p
            className="mt-2 pt-2 border-t text-[11px] leading-relaxed opacity-90"
            style={{borderColor: 'hsla(var(--foreground), 0.3)'}}
          >
            {element.summary}
          </p>
        }
      </CardContent>
      <CardFooter className="p-3 border-t">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => onToggleCompare(element)}
        >
          {isComparing ? <MinusCircleIcon className="mr-2 h-4 w-4" /> : <PlusCircleIcon className="mr-2 h-4 w-4" />}
          {isComparing ? 'Remove from Compare' : 'Add to Compare'}
          <ScaleIcon className="ml-auto h-4 w-4 opacity-70" />
        </Button>
      </CardFooter>
    </Card>
  );
}

