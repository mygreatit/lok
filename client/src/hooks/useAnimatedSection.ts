import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make sure GSAP is registered
if (!gsap.plugins.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export function useAnimatedSection() {
  // Refs for elements to animate
  const fadeUpElements = useRef<Array<HTMLElement | null>>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    // Create animations for fade-up elements
    fadeUpElements.current.forEach((element, index) => {
      if (!element) return;
      
      const delay = element.getAttribute("data-delay") || 0;
      
      // Create scroll trigger animation
      gsap.fromTo(
        element,
        { 
          y: 30, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          delay: parseFloat(delay.toString()), 
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true
          }
        }
      );
    });
    
    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      fadeUpElements.current = [];
    };
  }, []);
  
  return { sectionRef, fadeUpElements };
}
