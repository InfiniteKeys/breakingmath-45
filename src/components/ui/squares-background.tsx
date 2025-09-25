import React from "react";

interface SquaresBackgroundProps {
  className?: string;
  squareSize?: number;
  gap?: number;
  opacity?: number;
  color?: string;
}

export const SquaresBackground: React.FC<SquaresBackgroundProps> = ({
  className = "",
  squareSize = 40,
  gap = 20,
  opacity = 0.1,
  color = "hsl(var(--primary))"
}) => {
  const pattern = `
    <rect x="0" y="0" width="${squareSize}" height="${squareSize}" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
  `;

  const patternSize = squareSize + gap;

  return (
    <div className={`absolute inset-0 ${className}`}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="squares-pattern"
            x="0"
            y="0"
            width={patternSize}
            height={patternSize}
            patternUnits="userSpaceOnUse"
          >
            <rect 
              x="0" 
              y="0" 
              width={squareSize} 
              height={squareSize} 
              fill="none" 
              stroke={color} 
              strokeWidth="1" 
              opacity={opacity}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#squares-pattern)" />
      </svg>
    </div>
  );
};

export const SquaresDemo: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background to-muted/20">
      <SquaresBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Squares Background Demo</h1>
          <p className="text-muted-foreground">A subtle geometric pattern overlay</p>
        </div>
      </div>
    </div>
  );
};