
"use client";

import type { ElementData } from '@/types/elements';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XIcon, Trash2Icon } from 'lucide-react';
import { cn, getCategorySimpleColor } from '@/lib/utils';
import { ElectronShellDiagram } from './electron-shell-diagram';

interface ComparisonPaneProps {
  elements: ElementData[];
  onRemove: (element: ElementData) => void;
  onClearAll: () => void;
}

export function ComparisonPane({ elements, onRemove, onClearAll }: ComparisonPaneProps) {
  if (elements.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-card-foreground">Element Comparison</CardTitle>
          {elements.length > 0 && (
             <Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs h-7 px-2">
                <Trash2Icon className="mr-1 h-3.5 w-3.5" />
                Clear All
            </Button>
          )}
        </div>
        <CardDescription className="text-xs">Comparing {elements.length} element(s). Select up to 2.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className={cn(
            "grid gap-4",
            elements.length === 1 ? "grid-cols-1" : "grid-cols-2"
        )}>
          {elements.map((element) => {
            const categoryVarName = `--category-${element.category.replace(/\s/g, '-')}-bg`;
            const categoryColorHSL = `hsl(var(${categoryVarName}))`;
            const categorySimpleColor = getCategorySimpleColor(element.category);

            return (
              <Card key={element.number} className="bg-background/70 border-2 relative" style={{ borderColor: categoryColorHSL }}>
                <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 z-10" onClick={() => onRemove(element)}>
                    <XIcon className="h-3.5 w-3.5" />
                    <span className="sr-only">Remove from comparison</span>
                </Button>
                <CardHeader className="text-center pb-2 pt-3">
                  <CardTitle className="text-xl font-bold">{element.symbol}</CardTitle>
                  <CardDescription className="font-semibold text-sm">{element.name}</CardDescription>
                  <div className="text-xs opacity-70">#{element.number}</div>
                </CardHeader>
                <CardContent className="space-y-1 text-[11px] px-3 pb-3">
                   <div className="my-1 flex justify-center items-center h-20">
                     <ElectronShellDiagram 
                        shells={element.shells} 
                        elementSymbol={element.symbol}
                        baseColor={categorySimpleColor} // Use the direct HSL color
                     />
                    </div>
                  <p><strong>Mass:</strong> {element.atomic_mass.toFixed(3)}</p>
                  <p><strong>Category:</strong> <span className="capitalize">{element.category}</span></p>
                  <p><strong>Phase:</strong> {element.phase}</p>
                  <p><strong>Shells:</strong> {element.shells.join(', ')}</p>
                  {element.density && <p><strong>Density:</strong> {element.density} g/cm³</p>}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
