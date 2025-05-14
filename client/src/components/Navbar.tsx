import { useState, useEffect } from "react";
import { animatePageTransition } from "@/lib/animation";

type NavbarProps = {
  activeSection: string;
};

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const handleSectionClick = (sectionId: string) => {
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Get target section element
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
      // Apply transition animation
      animatePageTransition(() => {
        targetSection.scrollIntoView({ behavior: "smooth" });
      });
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className={`flex justify-between items-center py-4 px-6 md:px-12 backdrop-blur-md transition-all ${
        isScrolled ? "bg-[#151A30]/80" : "bg-[#151A30]/70"
      }`}>
        <div className="flex items-center">
          <div className="text-2xl font-montserrat font-bold text-white flex items-center">
            <span className="text-[#3385FF]">Laconi</span>
            <span className="text-[#FF2E7E]">X</span>
            <span className="text-xs ml-1 font-mono mt-1 opacity-70">CORP</span>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-8 items-center">
          <a 
            href="#ecommerce"
            onClick={(e) => { e.preventDefault(); handleSectionClick("ecommerce"); }}
            className={`nav-link text-white hover:text-[#0066FF] transition-colors duration-300 ${
              activeSection === "ecommerce" ? "active-section" : ""
            }`}
          >
            Ecommerce
          </a>
          <a 
            href="#video"
            onClick={(e) => { e.preventDefault(); handleSectionClick("video"); }}
            className={`nav-link text-white hover:text-[#0066FF] transition-colors duration-300 ${
              activeSection === "video" ? "active-section" : ""
            }`}
          >
            Video Production
          </a>
          <a 
            href="#development"
            onClick={(e) => { e.preventDefault(); handleSectionClick("development"); }}
            className={`nav-link text-white hover:text-[#0066FF] transition-colors duration-300 ${
              activeSection === "development" ? "active-section" : ""
            }`}
          >
            Development
          </a>
          <button className="btn-glow bg-[#0066FF] hover:bg-[#3385FF] text-white px-5 py-2 rounded-full shadow-glow-primary transition-all duration-300">
            Contact Us
          </button>
        </div>
        
        <div className="block md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-[#1E2542]/95 backdrop-blur-md`}>
        <div className="flex flex-col px-6 py-4 space-y-4">
          <a 
            href="#ecommerce"
            onClick={(e) => { e.preventDefault(); handleSectionClick("ecommerce"); }}
            className={`nav-link text-white hover:text-[#0066FF] py-2 border-b border-[#2A3353] transition-colors duration-300 ${
              activeSection === "ecommerce" ? "text-[#0066FF] font-semibold" : ""
            }`}
          >
            Ecommerce
          </a>
          <a 
            href="#video"
            onClick={(e) => { e.preventDefault(); handleSectionClick("video"); }}
            className={`nav-link text-white hover:text-[#0066FF] py-2 border-b border-[#2A3353] transition-colors duration-300 ${
              activeSection === "video" ? "text-[#0066FF] font-semibold" : ""
            }`}
          >
            Video Production
          </a>
          <a 
            href="#development"
            onClick={(e) => { e.preventDefault(); handleSectionClick("development"); }}
            className={`nav-link text-white hover:text-[#0066FF] py-2 border-b border-[#2A3353] transition-colors duration-300 ${
              activeSection === "development" ? "text-[#0066FF] font-semibold" : ""
            }`}
          >
            Development
          </a>
          <button className="btn-glow bg-[#0066FF] hover:bg-[#3385FF] text-white px-5 py-2 rounded-full shadow-glow-primary transition-all duration-300 my-2">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
