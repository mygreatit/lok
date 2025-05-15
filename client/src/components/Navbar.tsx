import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

type NavbarProps = {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  isMobile?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionChange, isMobile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);
  
  useEffect(() => {
    // Create menu animation timeline
    menuTimeline.current = gsap.timeline({ paused: true });
    
    // Mobile menu animation setup
    if (menuTimeline.current) {
      const mobileMenu = document.querySelector(".mobile-menu");
      if (mobileMenu) {
        menuTimeline.current
          .fromTo(
            mobileMenu, 
            { opacity: 0, y: -20 }, 
            { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
          )
          .fromTo(
            ".mobile-menu-item", 
            { opacity: 0, y: -10 }, 
            { opacity: 1, y: 0, stagger: 0.05, ease: "power2.out" },
            "-=0.1"
          );
      }
    }
  }, []);
  
  // Control mobile menu animations
  useEffect(() => {
    if (menuTimeline.current) {
      if (isMenuOpen) {
        menuTimeline.current.play();
      } else {
        menuTimeline.current.reverse();
      }
    }
  }, [isMenuOpen]);
  
  // Enhanced smooth navigation to sections with motion blur
  const handleSectionClick = (sectionId: string) => {
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Add motion blur to navbar during transition
    if (navRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          // Use the callback for navigation
          onSectionChange(sectionId);
        }
      });
      
      // Fade out with blur effect (faster)
      tl.to(navRef.current, {
        opacity: 0,
        filter: "blur(5px)",
        duration: 0.2,
        ease: "power1.in" // Easy ease in
      })
      // Fade back in with blur effect after navigation (faster, less delay)
      .to(navRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.25,
        ease: "power1.out", // Easy ease out
        delay: 0.25 // Less delay
      });
    } else {
      // Fallback if ref not available
      onSectionChange(sectionId);
    }
  };
  
  // Handle scroll effects
  useEffect(() => {
    // Show/hide navbar on hover
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100 && navRef.current) {
        gsap.to(navRef.current, { y: 0, duration: 0.3, ease: "power3.out" });
      } else if (e.clientY > 150 && navRef.current) {
        gsap.to(navRef.current, { y: -80, duration: 0.3, ease: "power3.out" });
      }
    };
    
    // Initial setup for the navbar
    if (navRef.current) {
      gsap.set(navRef.current, { y: 0 });
    }
    
    document.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  // Create active navigation indicators
  const getNavLinkClass = (sectionId: string) => {
    return `nav-link relative px-4 py-2 overflow-hidden text-white transition-all duration-300 ${
      activeSection === sectionId 
        ? "active-section font-semibold text-[#0066FF]" 
        : "hover:text-[#0066FF]"
    }`;
  };
  
  return (
    <nav 
      ref={navRef} 
      className="fixed top-0 left-0 w-full z-50 transition-all will-change-transform"
    >
      <div className="flex justify-between items-center py-4 px-6 md:px-12 backdrop-blur-md bg-[#151A30]/80 shadow-lg transition-all">
        <div className="flex items-center">
          <div className="text-2xl font-montserrat font-bold text-white flex items-center">
            <div className="glitch-effect relative h-12 w-auto">
              <img src="/assets/LaconiX.png" alt="LaconiX" className="h-full w-auto object-contain max-w-none" />
            </div>
            <span className="text-xs ml-1 font-mono mt-1 opacity-70 animate-pulse-glow">CORPORATION</span>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-8 items-center">
          <a 
            href="#ecommerce"
            onClick={(e) => { e.preventDefault(); handleSectionClick("ecommerce"); }}
            className={getNavLinkClass("ecommerce")}
          >
            Ecommerce
          </a>
          <a 
            href="#video"
            onClick={(e) => { e.preventDefault(); handleSectionClick("video"); }}
            className={getNavLinkClass("video")}
          >
            Video Production
          </a>
          <a 
            href="#development"
            onClick={(e) => { e.preventDefault(); handleSectionClick("development"); }}
            className={getNavLinkClass("development")}
          >
            Development
          </a>
          <button className="btn-glow gpu-accelerated bg-[#0066FF] hover:bg-[#3385FF] text-white px-6 py-2.5 rounded-full shadow-glow-primary transition-all duration-300">
            Contact Us
          </button>
        </div>
        
        <div className="block md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none relative w-10 h-10 overflow-hidden"
            aria-label="Toggle menu"
          >
            <div className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 top-5" : "rotate-0 top-4"
            }`}></div>
            <div className={`absolute w-6 h-0.5 bg-white top-5 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}></div>
            <div className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 top-5" : "rotate-0 top-6"
            }`}></div>
          </button>
        </div>
      </div>
      
      {/* Mobile menu with enhanced animations */}
      <div className={`md:hidden mobile-menu overflow-hidden ${isMenuOpen ? "block" : "hidden"} 
                      bg-gradient-to-b from-[#1E2542]/95 to-[#151A30]/95 backdrop-blur-md`}>
        <div className="flex flex-col px-6 py-6 space-y-5">
          <a 
            href="#ecommerce"
            onClick={(e) => { e.preventDefault(); handleSectionClick("ecommerce"); }}
            className={`mobile-menu-item nav-link text-white hover:text-[#0066FF] py-2 border-b border-[#2A3353]/40 transition-all duration-300 ${
              activeSection === "ecommerce" ? "text-[#0066FF] font-semibold pl-2" : ""
            }`}
          >
            Ecommerce
          </a>
          <a 
            href="#video"
            onClick={(e) => { e.preventDefault(); handleSectionClick("video"); }}
            className={`mobile-menu-item nav-link text-white hover:text-[#0066FF] py-2 border-b border-[#2A3353]/40 transition-all duration-300 ${
              activeSection === "video" ? "text-[#0066FF] font-semibold pl-2" : ""
            }`}
          >
            Video Production
          </a>
          <a 
            href="#development"
            onClick={(e) => { e.preventDefault(); handleSectionClick("development"); }}
            className={`mobile-menu-item nav-link text-white hover:text-[#0066FF] py-2 border-b border-[#2A3353]/40 transition-all duration-300 ${
              activeSection === "development" ? "text-[#0066FF] font-semibold pl-2" : ""
            }`}
          >
            Development
          </a>
          <button className="mobile-menu-item btn-glow bg-[#0066FF] hover:bg-[#3385FF] text-white px-5 py-3 rounded-full shadow-glow-primary transition-all duration-300 my-2">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
