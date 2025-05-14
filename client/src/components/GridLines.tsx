import { useEffect, useRef } from "react";

type GridLinesProps = {
  color?: string;
  opacity?: number;
  horizontalLines?: number;
  verticalLines?: number;
};

const GridLines: React.FC<GridLinesProps> = ({ 
  color = "currentColor", 
  opacity = 0.1,
  horizontalLines = 20,
  verticalLines = 20
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // Clear existing lines if any
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Create horizontal lines
    for (let i = 0; i < horizontalLines; i++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", "0");
      line.setAttribute("y1", `${i * (100 / horizontalLines)}%`);
      line.setAttribute("x2", "100%");
      line.setAttribute("y2", `${i * (100 / horizontalLines)}%`);
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", "1");
      line.setAttribute("stroke-opacity", opacity.toString());
      svg.appendChild(line);
    }
    
    // Create vertical lines
    for (let i = 0; i < verticalLines; i++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", `${i * (100 / verticalLines)}%`);
      line.setAttribute("y1", "0");
      line.setAttribute("x2", `${i * (100 / verticalLines)}%`);
      line.setAttribute("y2", "100%");
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", "1");
      line.setAttribute("stroke-opacity", opacity.toString());
      svg.appendChild(line);
    }
  }, [color, opacity, horizontalLines, verticalLines]);
  
  return (
    <svg 
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
};

export default GridLines;
