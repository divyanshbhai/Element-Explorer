
"use client";

import type { ElementCategory } from '@/types/elements';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { FilterIcon, SearchIcon, XIcon, ListFilter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchAndFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilters: Set<ElementCategory>;
  onFilterChange: (category: ElementCategory, isActive: boolean) => void;
  onClearFilters: () => void;
  allCategories: ElementCategory[];
}

export function SearchAndFilterBar({
  searchQuery,
  setSearchQuery,
  activeFilters,
  onFilterChange,
  onClearFilters,
  allCategories
}: SearchAndFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full p-2 rounded-lg bg-card border shadow-sm">
      <div className="relative w-full md:flex-grow">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search elements (name, symbol, number)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 h-10 text-sm w-full"
        />
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto h-10 text-sm">
              <ListFilter className="mr-2 h-4 w-4" />
              Filter by Category
              {activeFilters.size > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                  {activeFilters.size}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 max-h-96 overflow-y-auto">
            <DropdownMenuLabel>Element Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allCategories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={activeFilters.has(category)}
                onCheckedChange={(checked) => onFilterChange(category, !!checked)}
                className="capitalize text-xs"
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
            {activeFilters.size > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onClearFilters} className="text-xs text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <XIcon className="mr-2 h-3.5 w-3.5" />
                  Clear All Filters ({activeFilters.size})
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
