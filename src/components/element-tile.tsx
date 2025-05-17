
"use client";

import type { ElementData } from '@/types/elements';
import { getCategoryClass } from '@/data/elements';
import { cn } from '@/lib/utils';
import React from 'react';

interface ElementTileProps {
  element: ElementData;
  onClick: (element: ElementData) => void; // Target HTMLDivElement no longer passed
  isFilteredOut: boolean;
  isSelected: boolean;
  isComparing: boolean;
}

export function ElementTile({ element, onClick, isFilteredOut, isSelected, isComparing }: ElementTileProps) {
  const tileRef = React.useRef<HTMLDivElement>(null); // Still can be used for other purposes if needed

  return (
    <div
      ref={tileRef}
      onClick={() => onClick(element)} // Pass element directly
      className={cn(
        'p-1.5 md:p-2 border rounded-md shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 hover:shadow-lg hover:z-10 relative aspect-square flex flex-col justify-between items-center text-center min-w-[60px] md:min-w-[70px]',
        getCategoryClass(element.category),
        isFilteredOut ? 'opacity-20 pointer-events-none' : 'opacity-100',
        isSelected && 'ring-2 ring-offset-1 ring-offset-background ring-primary scale-105 shadow-xl z-20',
        isComparing && !isSelected && 'ring-2 ring-offset-1 ring-offset-background ring-accent'
      )}
      style={{
        gridColumnStart: element.xpos,
        gridRowStart: element.ypos,
      }}
      role="button"
      tabIndex={0}
      aria-label={element.name}
      aria-pressed={isSelected}
    >
      <div className="absolute top-1 left-1 text-xs md:text-sm font-medium">{element.number}</div>
      <div className="text-xl md:text-2xl font-bold mt-2 md:mt-3">{element.symbol}</div>
      <div className="text-[10px] md:text-xs leading-tight">{element.name}</div>
      <div className="text-[9px] md:text-[10px] opacity-80">{typeof element.atomic_mass === 'number' ? element.atomic_mass.toFixed(3) : element.atomic_mass}</div>
    </div>
  );
}
