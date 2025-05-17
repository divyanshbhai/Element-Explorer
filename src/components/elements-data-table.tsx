
"use client";

import type { ElementData, ElementCategory } from '@/types/elements';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getCategoryClass } from '@/data/elements'; 
import { cn } from '@/lib/utils';

interface ElementsDataTableProps {
  elements: ElementData[];
  searchQuery: string;
  activeFilters: Set<ElementCategory>;
}

export function ElementsDataTable({ elements, searchQuery, activeFilters }: ElementsDataTableProps) {
  const filteredElements = elements.filter(element => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery
      ? element.name.toLowerCase().includes(searchLower) ||
        element.symbol.toLowerCase().includes(searchLower) ||
        element.number.toString().includes(searchLower)
      : true;

    const matchesFilters = activeFilters.size > 0
      ? activeFilters.has(element.category)
      : true;

    return matchesSearch && matchesFilters;
  });

  if (!filteredElements || filteredElements.length === 0) {
    return <p className="text-center text-muted-foreground mt-8">No element data matches your criteria.</p>;
  }

  return (
    <div className="w-full px-2 md:px-4 mt-8 mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6"
          style={{ textShadow: '0 0 8px hsl(var(--accent)), 0 0 16px hsl(var(--accent))' }}>
        Element Data Overview
      </h2>
      <ScrollArea className="rounded-md border bg-card text-card-foreground shadow-md w-full">
        <Table className="min-w-full">
          <TableCaption className="py-4 text-sm">
            {searchQuery || activeFilters.size > 0 
              ? `Showing ${filteredElements.length} of ${elements.length} elements matching your criteria.`
              : `A comprehensive list of all ${elements.length} elements and their properties.`
            }
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-center">Atomic No.</TableHead>
              <TableHead className="w-[80px] text-center">Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Atomic Mass</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Phase</TableHead>
              <TableHead className="text-right">Density (g/cm³)</TableHead>
              <TableHead className="text-right">Melt (K)</TableHead>
              <TableHead className="text-right">Boil (K)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredElements.map((element) => (
              <TableRow key={element.number} className="hover:bg-muted/50">
                <TableCell className="font-medium text-center">{element.number}</TableCell>
                <TableCell className={cn("font-bold text-center")}>
                  <div className={cn("inline-block px-2 py-1 rounded-sm", getCategoryClass(element.category))}>{element.symbol}</div>
                </TableCell>
                <TableCell>{element.name}</TableCell>
                <TableCell className="text-right">{element.atomic_mass.toFixed(4)}</TableCell>
                <TableCell>
                  <span className={cn("capitalize px-2 py-0.5 rounded-full text-xs", getCategoryClass(element.category))}>
                    {element.category}
                  </span>
                </TableCell>
                <TableCell>{element.phase}</TableCell>
                <TableCell className="text-right">{element.density ?? 'N/A'}</TableCell>
                <TableCell className="text-right">{element.melt ?? 'N/A'}</TableCell>
                <TableCell className="text-right">{element.boil ?? 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
