import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { animatePageTransition } from "@/lib/animation";

type NavbarProps = {
  activeSection: string;
};

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
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
  
  // Enhanced smooth navigation to sections
  const handleSectionClick = (sectionId: string) => {
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Get target section element
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
      // Apply more dramatic transition animation
      animatePageTransition(() => {
        // Enhanced smooth scroll
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth"
        });
      });
    }
  };
  
  // Handle scroll effects
  useEffect(() => {
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      const st = window.scrollY;
      
      // Apply background color change based on scroll position
      setIsScrolled(st > 50);
      
      // Apply show/hide effect based on scroll direction
      if (navRef.current) {
        if (st > lastScrollTop && st > 150) {
          // Scrolling down and past threshold - hide navbar
          gsap.to(navRef.current, { y: -80, duration: 0.3, ease: "power3.out" });
        } else {
          // Scrolling up - show navbar
          gsap.to(navRef.current, { y: 0, duration: 0.3, ease: "power3.out" });
        }
      }
      
      lastScrollTop = st <= 0 ? 0 : st; // Prevent negative scrollTop
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial setup for the navbar
    if (navRef.current) {
      gsap.set(navRef.current, { y: 0 });
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Create nav link animation effects
  const animateNavLink = (isActive: boolean) => {
    return {
      position: "relative",
      padding: "0.5rem 0",
      fontWeight: isActive ? 600 : 400,
      color: isActive ? "#0066FF" : "#FFFFFF",
      transition: "color 0.3s ease",
      cursor: "pointer",
      overflow: "hidden"
    };
  };
  
  return (
    <nav 
      ref={navRef} 
      className="fixed top-0 left-0 w-full z-50 transition-all will-change-transform"
    >
      <div className={`flex justify-between items-center py-4 px-6 md:px-12 backdrop-blur-md transition-all ${
        isScrolled 
          ? "bg-[#151A30]/90 shadow-lg" 
          : "bg-gradient-to-b from-[#151A30]/70 to-transparent"
      }`}>
        <div className="flex items-center">
          <div className="text-2xl font-montserrat font-bold text-white flex items-center">
            <span className="glitch-effect text-[#3385FF]">Laconi</span>
            <span className="glitch-effect text-[#FF2E7E]">X</span>
            <span className="text-xs ml-1 font-mono mt-1 opacity-70 animate-pulse-glow">CORP</span>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-8 items-center">
          <a 
            href="#ecommerce"
            onClick={(e) => { e.preventDefault(); handleSectionClick("ecommerce"); }}
            className={`nav-link relative overflow-hidden ${
              activeSection === "ecommerce" ? "active-section" : ""
            }`}
            style={animateNavLink(activeSection === "ecommerce")}
          >
            Ecommerce
          </a>
          <a 
            href="#video"
            onClick={(e) => { e.preventDefault(); handleSectionClick("video"); }}
            className={`nav-link relative overflow-hidden ${
              activeSection === "video" ? "active-section" : ""
            }`}
            style={animateNavLink(activeSection === "video")}
          >
            Video Production
          </a>
          <a 
            href="#development"
            onClick={(e) => { e.preventDefault(); handleSectionClick("development"); }}
            className={`nav-link relative overflow-hidden ${
              activeSection === "development" ? "active-section" : ""
            }`}
            style={animateNavLink(activeSection === "development")}
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
