
"use client";

import type { ElementData, ElementCategory } from '@/types/elements';
import { ALL_ELEMENT_CATEGORIES } from '@/types/elements';
import { elements as allElements } from '@/data/elements';
import { PeriodicTable } from '@/components/periodic-table';
import { ElementInfoCard } from '@/components/element-info-card';
import { SearchAndFilterBar } from '@/components/search-and-filter-bar';
import { ElementsDataTable } from '@/components/elements-data-table';
import { ComparisonPane } from '@/components/comparison-pane';
import { Toaster } from "@/components/ui/toaster";
import React, { useState, useCallback, useEffect } from 'react';

export default function ElementExplorerPage() {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<ElementCategory>>(new Set());
  const [comparisonElements, setComparisonElements] = useState<ElementData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleElementClick = useCallback((element: ElementData) => {
    if (selectedElement && selectedElement.number === element.number) {
      setSelectedElement(null); // Unpin if clicking the same element
    } else {
      setSelectedElement(element); // Pin new element
    }
  }, [selectedElement]);

  const handleCloseInfoCard = useCallback(() => {
    setSelectedElement(null);
  }, []);

  const handleFilterChange = useCallback((category: ElementCategory, isActive: boolean) => {
    setActiveFilters(prevFilters => {
      const newFilters = new Set(prevFilters);
      if (isActive) {
        newFilters.add(category);
      } else {
        newFilters.delete(category);
      }
      return newFilters;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveFilters(new Set());
  }, []);

  const toggleCompareElement = useCallback((element: ElementData) => {
    setComparisonElements(prev => {
      const isAlreadyComparing = prev.find(el => el.number === element.number);
      if (isAlreadyComparing) {
        return prev.filter(el => el.number !== element.number);
      } else {
        if (prev.length < 2) { // Max 2 elements for comparison
          return [...prev, element];
        }
        // Optionally, add a toast notification here if trying to add more than 2
        return prev; 
      }
    });
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonElements([]);
  }, []);

  const getInfoCardStyle = () => {
    if (!selectedElement || !isClient) return { display: 'none' };

    return {
      position: 'fixed' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 100, // Ensure card is above backdrop
    };
  };

  if (!isClient) {
    // Render nothing or a loading indicator on the server
    // to prevent hydration mismatches with browser-specific calculations
    return null; 
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <header className="w-full flex items-center justify-center gap-3 md:gap-6 flex-shrink-0 py-4 md:py-6 border-b border-border">
        <div className="text-primary opacity-60 hidden sm:block">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="50" cy="50" r="8" fill="currentColor"/>
            <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="5" strokeOpacity="0.7"/>
            <ellipse cx="50" cy="50" rx="38" ry="13" stroke="currentColor" strokeWidth="5" strokeOpacity="0.7" transform="rotate(30 50 50)"/>
            <ellipse cx="50" cy="50" rx="38" ry="13" stroke="currentColor" strokeWidth="5" strokeOpacity="0.7" transform="rotate(-30 50 50)"/>
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono font-extrabold tracking-tight text-foreground">
            Element Explorer
          </h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base md:text-lg tracking-wide">
            Interactive Periodic Table
          </p>
        </div>
        <div className="text-accent opacity-60 hidden sm:block">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="33" cy="38" r="10" stroke="currentColor" strokeWidth="5" />
            <circle cx="67" cy="62" r="10" stroke="currentColor" strokeWidth="5" />
            <line x1="36" y1="42" x2="64" y2="58" stroke="currentColor" strokeWidth="5" />
            <circle cx="33" cy="38" r="5" fill="currentColor" fillOpacity="0.8"/>
            <circle cx="67" cy="62" r="5" fill="currentColor" fillOpacity="0.8"/>
          </svg>
        </div>
      </header>

      <div className="w-full px-2 md:px-4 mt-6 mb-6">
        <SearchAndFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          allCategories={ALL_ELEMENT_CATEGORIES}
        />
      </div>

      {comparisonElements.length > 0 && (
        <div className="w-full px-2 md:px-4 mb-4">
          <ComparisonPane 
            elements={comparisonElements} 
            onRemove={toggleCompareElement}
            onClearAll={clearComparison}
          />
        </div>
      )}

      <main className="flex-grow flex flex-col items-center w-full overflow-x-auto px-2 md:px-4 py-4">
        <PeriodicTable
          elements={allElements}
          onElementClick={handleElementClick}
          activeFilters={activeFilters}
          selectedElement={selectedElement}
          comparisonElements={comparisonElements}
          searchQuery={searchQuery} 
        />
      </main>
      
      {selectedElement && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            onClick={handleCloseInfoCard} // Close card on backdrop click
            aria-hidden="true"
          />
          <div
            style={getInfoCardStyle()}
            key={selectedElement.symbol} // Ensure re-render if element changes for animations/transitions
          >
            <ElementInfoCard 
              element={selectedElement} 
              onClose={handleCloseInfoCard}
              onToggleCompare={toggleCompareElement}
              isComparing={comparisonElements.some(el => el.number === selectedElement.number)}
            />
          </div>
        </>
      )}
      
      <div className="w-full mt-8">
        <ElementsDataTable 
          elements={allElements} 
          searchQuery={searchQuery}
          activeFilters={activeFilters}
        />
      </div>
      <Toaster />
    </div>
  );
}
