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
import { ChatProvider } from "@/contexts/ChatContext";

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
    
    // Phase 1: Apply zoom-in and blur effect (faster)
    tl.to("body", {
      filter: "blur(10px) brightness(1.3)",
      duration: 0.25,
      ease: "power1.in", // Easy ease in
    })
    .to("#root", {
      scale: 1.1,
      duration: 0.25,
      ease: "power1.in", // Easy ease in
      opacity: 0.9,
    }, "<") // Run at the same time
    
    // Phase 2: Move to the target section while still blurred (no delay)
    .add(() => {
      if (mainRef.current) {
        // Instantly move to the new section while blurred
        gsap.set(mainRef.current, {
          x: -position * window.innerWidth
        });
        
        // Update active section
        setActiveSection(sectionId);
        
        // Reset scroll position in all sections
        document.querySelectorAll('.section').forEach(section => {
          section.scrollTop = 0;
        });
      }
    })
    
    // Phase 3: Zoom out and remove blur to reveal the new section (faster, no delay)
    .to("body", {
      filter: "blur(0px) brightness(1)",
      duration: 0.3,
      ease: "power1.out", // Easy ease out
    })
    .to("#root", {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power1.out", // Easy ease out
      onComplete: () => {
        setIsTransitioning(false);
      }
    }, "<") // Run at the same time
    
    // Execute the timeline
    tl.play();
  };

  // Initialize application with dramatic loading and transition effects
  useEffect(() => {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Set body styles
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'hidden'; // Hide vertical scrollbar for horizontal sections
    
    // Create a dramatic loading sequence
    const handleContentLoaded = () => {
      // Initialize GSAP animations
      setTimeout(() => {
        // Create a faster reveal animation
        const tl = gsap.timeline();
        
        // First fade out the loading screen (faster)
        tl.to(".loading-screen", {
          opacity: 0,
          duration: 0.4,
          ease: "power1.in", // Easy ease in
        })
        // Then reveal the main content with a zoom effect (faster)
        .fromTo("#root > div", 
          { scale: 0.95, opacity: 0.8, filter: "blur(10px)" },
          { 
            scale: 1, 
            opacity: 1, 
            filter: "blur(0px)", 
            duration: 0.5, 
            ease: "power1.out" // Easy ease out
          }
        )
        .add(() => {
          // Mark as loaded and initialize other animations
          document.body.classList.remove('loading');
          document.body.classList.add('loaded');
          setIsLoaded(true);
          initializeAnimations();
        });
      }, 300); // Much shorter delay for faster loading
    };
    
    // Wait for all resources to load
    window.addEventListener('load', handleContentLoaded);
    
    // If the load event already fired, trigger manually
    if (document.readyState === 'complete') {
      handleContentLoaded();
    }
    
    return () => {
      // Cleanup
      window.removeEventListener('load', handleContentLoaded);
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
        <div className="h-50 w-auto">
          <img src="/assets/LaconiX.png" alt="LaconiX" className="h-full w-auto object-contain max-w-none" />
        </div>
      </div>
    </div>
  );
  
  return (
    <ChatProvider>
      <div className="app-container relative">
        <CustomCursor />
        <LoadingScreen isLoaded={isLoaded} />
        
        <div className={`main-content ${isLoaded ? 'visible' : 'hidden'}`}>
          <Navbar 
            activeSection={activeSection} 
            onSectionChange={navigateToSection} 
            isMobile={isMobile} 
          />
          
          {/* Main content with horizontal sections */}
          <main ref={mainRef} className="horizontal-container">
            <EcommerceSection />
            <VideoSection />
            <DevelopmentSection />
          </main>
          
          {/* Global indicator navigation */}
          <SectionIndicator
            activeSection={activeSection}
            onSectionChange={navigateToSection}
          />
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;
