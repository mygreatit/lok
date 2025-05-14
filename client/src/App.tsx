import { useEffect, useState } from "react";
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

  useEffect(() => {
    // Initialize GSAP animations
    initializeAnimations();

    // Check if device is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Track active section on scroll
    const sections = document.querySelectorAll(".section");
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionElement.id);
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {!isMobile && <CustomCursor />}
      <Navbar activeSection={activeSection} />
      
      <main>
        <EcommerceSection />
        <VideoSection />
        <DevelopmentSection />
      </main>
      
      {!isMobile && <SectionIndicator activeSection={activeSection} />}
      <Footer />
    </div>
  );
}

export default App;
