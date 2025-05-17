
"use client";

import type { ElementData } from '@/types/elements';
import { ElementTile } from './element-tile';
import { cn } from '@/lib/utils';

interface PeriodicTableProps {
  elements: ElementData[];
  onElementClick: (element: ElementData) => void;
  activeFilters: Set<ElementData['category']>;
  selectedElement: ElementData | null;
  comparisonElements: ElementData[];
  searchQuery: string;
}

export function PeriodicTable({ elements, onElementClick, activeFilters, selectedElement, comparisonElements, searchQuery }: PeriodicTableProps) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
    gridTemplateRows: 'repeat(7, auto) minmax(1rem, auto) repeat(2, auto)', 
    gap: '2px md:4px',
  };

  return (
    <div style={gridStyle} className="p-1 md:p-2 max-w-full overflow-x-auto">
      {elements.map((element) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = searchQuery
          ? element.name.toLowerCase().includes(searchLower) ||
            element.symbol.toLowerCase().includes(searchLower) ||
            element.number.toString().includes(searchLower)
          : true;

        const matchesFilters = activeFilters.size > 0
          ? activeFilters.has(element.category)
          : true;

        const isFilteredOut = !(matchesSearch && matchesFilters);
        const isSelected = selectedElement?.number === element.number;
        const isComparing = comparisonElements.some(ce => ce.number === element.number);

        return (
          <ElementTile
            key={element.number}
            element={element}
            onClick={() => onElementClick(element)}
            isFilteredOut={isFilteredOut}
            isSelected={isSelected}
            isComparing={isComparing}
          />
        );
      })}
      {/* Lanthanide/Actinide series labels */}
      <div style={{ gridColumnStart: 2, gridRowStart: 9 }} className="flex items-center justify-center text-[10px] md:text-xs text-muted-foreground p-0.5 md:p-1">*La-Lu</div>
      <div style={{ gridColumnStart: 2, gridRowStart: 10 }} className="flex items-center justify-center text-[10px] md:text-xs text-muted-foreground p-0.5 md:p-1">**Ac-Lr</div>
    </div>
  );
}
