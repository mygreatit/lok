import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import EcommerceSection from "@/sections/EcommerceSection";
import VideoSection from "@/sections/VideoSection";
import DevelopmentSection from "@/sections/DevelopmentSection";
import Footer from "@/components/Footer";
import SectionIndicator from "@/components/SectionIndicator";
import CustomCursor from "@/components/CustomCursor";
import { initializeAnimations } from "@/lib/animation";

function App() {
  const [activeSection, setActiveSection] = useState("ecommerce");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Map section IDs to their positions
  const sectionPositions = {
    "ecommerce": 0,
    "video": 1,
    "development": 2
  };

  // Enhanced function to navigate to a specific section with dramatic transition
  const navigateToSection = (sectionId: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Get position from mapping
    const position = sectionPositions[sectionId as keyof typeof sectionPositions] || 0;
    
    // Create dramatic transition timeline
    const tl = gsap.timeline();
    
    // Phase 1: Apply zoom-in and blur effect
    tl.to("body", {
      filter: "blur(20px) brightness(1.5)",
      duration: 0.6,
      ease: "power2.in",
    })
    .to("#root", {
      scale: 1.2,
      duration: 0.6,
      ease: "power2.in",
      opacity: 0.8,
    }, "<") // Run at the same time
    
    // Phase 2: Move to the target section while still blurred
    .add(() => {
      if (mainRef.current) {
        // Instantly move to the new section while blurred
        gsap.set(mainRef.current, {
          x: -position * window.innerWidth
        });
        
        // Update active section
        setActiveSection(sectionId);
      }
    })
    
    // Phase 3: Zoom out and remove blur to reveal the new section
    .to("body", {
      filter: "blur(0px) brightness(1)",
      duration: 0.7,
      ease: "power2.out",
      delay: 0.2,
    })
    .to("#root", {
      scale: 1,
      opacity: 1,
      duration: 0.7,
      ease: "power2.out",
      onComplete: () => {
        setIsTransitioning(false);
      }
    }, "<") // Run at the same time
    
    // Execute the timeline
    tl.play();
  };

  // Initialize application
  useEffect(() => {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Wait for all resources to load
    window.addEventListener('load', () => {
      // Initialize GSAP animations
      setTimeout(() => {
        initializeAnimations();
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        setIsLoaded(true);
      }, 200);
    });
    
    // If the load event already fired, trigger manually
    if (document.readyState === 'complete') {
      initializeAnimations();
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
      setIsLoaded(true);
    }
    
    // Set body styles
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'hidden'; // Hide vertical scrollbar for horizontal sections
    
    return () => {
      // Cleanup
      document.body.classList.remove('loading', 'loaded');
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Set up keyboard navigation and touch events
  useEffect(() => {
    if (!isLoaded) return;

    // Set initial position
    if (mainRef.current) {
      const initialPosition = sectionPositions[activeSection as keyof typeof sectionPositions] || 0;
      gsap.set(mainRef.current, { x: -initialPosition * window.innerWidth });
    }

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      const currentPosition = sectionPositions[activeSection as keyof typeof sectionPositions];
      
      if (e.key === 'ArrowRight' && currentPosition < 2) {
        // Navigate right
        const nextSection = Object.keys(sectionPositions).find(
          key => sectionPositions[key as keyof typeof sectionPositions] === currentPosition + 1
        );
        if (nextSection) navigateToSection(nextSection);
      } else if (e.key === 'ArrowLeft' && currentPosition > 0) {
        // Navigate left
        const prevSection = Object.keys(sectionPositions).find(
          key => sectionPositions[key as keyof typeof sectionPositions] === currentPosition - 1
        );
        if (prevSection) navigateToSection(prevSection);
      }
    };

    // Touch events for swipe
    let touchStartX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 100) { // Minimum swipe distance
        const currentPosition = sectionPositions[activeSection as keyof typeof sectionPositions];
        
        if (diff > 0 && currentPosition < 2) {
          // Swipe left - go right
          const nextSection = Object.keys(sectionPositions).find(
            key => sectionPositions[key as keyof typeof sectionPositions] === currentPosition + 1
          );
          if (nextSection) navigateToSection(nextSection);
        } else if (diff < 0 && currentPosition > 0) {
          // Swipe right - go left
          const prevSection = Object.keys(sectionPositions).find(
            key => sectionPositions[key as keyof typeof sectionPositions] === currentPosition - 1
          );
          if (prevSection) navigateToSection(prevSection);
        }
      }
    };
    
    // Mouse wheel navigation
    let wheelTimeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;
      
      // Clear previous timeout
      clearTimeout(wheelTimeout);
      
      // Set a debounce to prevent rapid firing
      wheelTimeout = setTimeout(() => {
        const currentPosition = sectionPositions[activeSection as keyof typeof sectionPositions];
        
        if (e.deltaX > 50 && currentPosition < 2) {
          // Scroll right
          const nextSection = Object.keys(sectionPositions).find(
            key => sectionPositions[key as keyof typeof sectionPositions] === currentPosition + 1
          );
          if (nextSection) navigateToSection(nextSection);
        } else if (e.deltaX < -50 && currentPosition > 0) {
          // Scroll left
          const prevSection = Object.keys(sectionPositions).find(
            key => sectionPositions[key as keyof typeof sectionPositions] === currentPosition - 1
          );
          if (prevSection) navigateToSection(prevSection);
        }
      }, 200);
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('wheel', handleWheel);
    
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [isLoaded, activeSection, isTransitioning]);

  // Handle resize and device detection
  useEffect(() => {
    // Check if device is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Update position on resize
    const handleResize = () => {
      checkIfMobile();
      
      // Update position based on active section
      if (mainRef.current) {
        const position = sectionPositions[activeSection as keyof typeof sectionPositions] || 0;
        gsap.set(mainRef.current, { x: -position * window.innerWidth });
      }
      
      // Refresh ScrollTrigger
      if (ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeSection]);

  // Loading screen component
  const LoadingScreen = ({ isLoaded }: { isLoaded: boolean }) => (
    <div className={`loading-screen ${isLoaded ? 'hidden' : ''}`}>
      <div className="loading-logo">
        <span className="logo-text text-[#3385FF]">Laconi</span>
        <span className="logo-text text-[#FF2E7E]">X</span>
      </div>
    </div>
  );
  
  return (
    <div className="relative min-h-screen overflow-hidden gpu-accelerated">
      {/* Loading Screen */}
      <LoadingScreen isLoaded={isLoaded} />
      
      {/* Custom Cursor */}
      {!isMobile && <CustomCursor />}
      
      {/* Navigation */}
      <Navbar 
        activeSection={activeSection} 
        onSectionChange={navigateToSection}
      />
      
      {/* Main Content - Horizontal Layout */}
      <main ref={mainRef} className="relative z-10 flex">
        <EcommerceSection />
        <VideoSection />
        <DevelopmentSection />
      </main>
      
      {/* Section Indicators */}
      {!isMobile && 
        <SectionIndicator 
          activeSection={activeSection} 
          onSectionChange={navigateToSection}
        />
      }
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
