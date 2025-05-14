import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Only show cursor once we have a position
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" || 
        target.tagName.toLowerCase() === "input" || 
        target.tagName.toLowerCase() === "select" || 
        target.tagName.toLowerCase() === "textarea" ||
        target.closest(".product-card") !== null ||
        target.closest(".template-card") !== null;
      
      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className="cursor-dot w-2 h-2 bg-[#0066FF] rounded-full fixed pointer-events-none z-[9999]"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.1s ease-out"
        }}
      />
      <div 
        className={`cursor-outline fixed rounded-full pointer-events-none z-[9998] border-2 border-[#0066FF]/50 transition-all duration-300 ${
          isHovering ? "w-20 h-20 border-[#0066FF]/80" : "w-10 h-10"
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          transition: "transform 0.15s ease-out, width 0.3s ease, height 0.3s ease, border-color 0.3s ease"
        }}
      />
    </>
  );
};

export default CustomCursor;
