
"use client";

import React from 'react';

interface ElectronShellDiagramProps {
  shells: number[];
  elementSymbol: string;
  baseColor: string; // HSL string for the category color, e.g., 'hsl(var(--category-alkali-metal-bg))'
}

export function ElectronShellDiagram({ shells, elementSymbol, baseColor }: ElectronShellDiagramProps) {
  const width = 120;
  const height = 120;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxShells = shells.length;
  const nucleusRadius = 10;
  const shellSpacing = maxShells > 0 ? (Math.min(centerX, centerY) - nucleusRadius - 5) / Math.max(1, maxShells) : 10;
  const electronRadius = 1.5;

  // Function to parse HSL and adjust lightness for shell lines and electrons
  const getModifiedColor = (hslColor: string, lightnessAdjustment: number, alpha: number = 1): string => {
    const match = hslColor.match(/hsl\(([^,]+),\s*([^%]+)%,\s*([^%]+)%\)/);
    if (match) {
      const h = match[1];
      const s = match[2];
      let l = parseFloat(match[3]);
      l = Math.min(100, Math.max(0, l + lightnessAdjustment));
      return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
    }
    return `hsla(var(--foreground), ${alpha})`; // fallback
  };
  
  const shellStrokeColor = getModifiedColor(baseColor, 10, 0.7);
  const electronFillColor = getModifiedColor(baseColor, 20);
  const symbolFillColor = getModifiedColor(baseColor, 30);


  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-label={`Electron shell diagram for ${elementSymbol}`}>
      {/* Nucleus / Symbol */}
      <circle cx={centerX} cy={centerY} r={nucleusRadius} fill={getModifiedColor(baseColor, -20)} opacity="0.8" />
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fontWeight="bold"
        fill={symbolFillColor}
      >
        {elementSymbol}
      </text>

      {/* Shells and Electrons */}
      {shells.map((electronCount, shellIndex) => {
        const shellRadius = nucleusRadius + (shellIndex + 1) * shellSpacing;
        if (shellRadius >= Math.min(centerX, centerY) - electronRadius) return null; // Prevent drawing outside bounds

        return (
          <g key={`shell-${shellIndex}`}>
            <circle
              cx={centerX}
              cy={centerY}
              r={shellRadius}
              fill="none"
              stroke={shellStrokeColor}
              strokeWidth="1"
              opacity="0.6"
            />
            {Array.from({ length: electronCount }).map((_, electronIndex) => {
              // Distribute electrons evenly, avoid first electron at 0 angle if only one
              let angleOffset = 0;
              if (electronCount === 1) angleOffset = Math.PI / 2; // Place single electron at top
              else if (shellIndex % 2 !== 0) angleOffset = Math.PI / electronCount; // Offset alternate shells

              const angle = angleOffset + (electronIndex / electronCount) * 2 * Math.PI;
              const ex = centerX + shellRadius * Math.cos(angle);
              const ey = centerY + shellRadius * Math.sin(angle);
              return (
                <circle
                  key={`electron-${shellIndex}-${electronIndex}`}
                  cx={ex}
                  cy={ey}
                  r={electronRadius}
                  fill={electronFillColor}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
