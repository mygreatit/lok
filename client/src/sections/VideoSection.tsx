import { useEffect, useRef, useState } from "react";
import GridLines from "@/components/GridLines";
import { gsap } from "gsap";
import { videoEquipmentData } from "@/data/mockData";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

// Enhanced video equipment data with names, descriptions, and prices
type EnhancedVideoEquipment = {
  imageUrl: string;
  alt: string;
  name?: string;
  description?: string;
  price?: number;
};

// Enhanced equipment data with additional properties
const enhancedVideoEquipment: EnhancedVideoEquipment[] = videoEquipmentData.map((equipment, index) => ({
  ...equipment,
  name: index === 0 ? "LaconiX Pro 8K Camera" : 
        index === 1 ? "Professional Lighting Kit" : 
        index === 2 ? "DJI Inspire 3 Drone" : 
        "Post-Production Suite",
  description: index === 0 ? "High-end cinema camera with 8K resolution and exceptional low-light performance" : 
              index === 1 ? "Complete studio lighting system with LED panels and modifiers" : 
              index === 2 ? "Professional aerial platform with 8K camera and obstacle avoidance" : 
              "Complete software suite for editing, color grading, and VFX",
  price: 199 + (index * 50)
}));

// Main Video Section Component
const VideoSection = () => {
  // Element references
  const sectionRef = useRef<HTMLElement>(null);
  const equipmentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgElementsRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up entrance animations when section becomes visible
    if (!sectionRef.current) return;
    
    // Initialize background animations
    if (bgElementsRef.current) {
      gsap.from(bgElementsRef.current.children, {
        opacity: 0,
        scale: 0.7,
        duration: 2,
        stagger: 0.3,
        ease: "power2.out"
      });
    }
    
    // Animate heading elements
    if (headingRef.current) {
      const elements = headingRef.current.children;
      gsap.fromTo(
        elements, 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power2.out",
          delay: 0.2
        }
      );
    }
    
    // Animate equipment cards
    if (equipmentRef.current) {
      const cards = equipmentRef.current.children;
      gsap.fromTo(
        cards, 
        { x: -50, opacity: 0 }, 
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.7, 
          stagger: 0.15, 
          ease: "power2.out",
          delay: 0.5
        }
      );
    }
    
    // Animate chat container
    if (chatContainerRef.current) {
      gsap.fromTo(
        chatContainerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.2)", delay: 0.7 }
      );
    }
  }, []);

  return (
    <section 
      id="video"
      ref={sectionRef}
      className="section bg-gradient-to-br from-black to-[#16c2f2] relative scroll-smooth w-screen h-screen overflow-y-auto"
    >
      {/* Background elements - fixed to viewport */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GridLines />
        <div ref={bgElementsRef} className="fixed inset-0">
          <div className="absolute top-[20%] right-[15%] w-[25vw] h-[25vw] rounded-full bg-[#16c2f2]/20 blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-[15%] left-[10%] w-[20vw] h-[20vw] rounded-full bg-[#f5dd42]/10 blur-3xl animate-float"></div>
          <div className="absolute top-[60%] right-[30%] w-[15vw] h-[15vw] rounded-full bg-cyan-500/10 blur-3xl animate-float-fast"></div>
        </div>
      </div>
      
      {/* Scrollable content with footer */}
      <div className="scroll-container relative z-10 h-full">
        <div className="section-content">
          <div ref={headingRef} className="text-center mb-12">
            <h5 className="text-cyan-300 text-lg md:text-xl mb-4 font-mono inline-block relative drop-shadow-[0_0_8px_rgba(0,215,255,0.7)]">
              Professional Equipment & Services
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400/50"></span>
            </h5>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 glitch-effect text-[#f5dd42] drop-shadow-[0_0_15px_rgba(245,221,66,0.5)]">
              Premium <span className="text-white drop-shadow-[0_0_10px_rgba(0,215,255,0.7)]">Video</span> Production
            </h1>
            <p className="text-cyan-200 max-w-2xl mx-auto text-lg drop-shadow-[0_0_8px_rgba(0,215,255,0.5)]">
              Professional video production services and equipment rental for creators and businesses.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
            {/* Equipment list */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-white mb-6 font-montserrat drop-shadow-[0_0_8px_rgba(0,215,255,0.5)]">Featured Equipment</h2>
              <div ref={equipmentRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {enhancedVideoEquipment.map((equipment, index) => (
                  <div 
                    key={index}
                    className="product-card bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-[0_0_15px_rgba(22,194,242,0.3)] hover:shadow-[0_0_20px_rgba(22,194,242,0.5)] border border-[#16c2f2]/30 gpu-accelerated group"
                  >
                    <div className="card-glow bg-gradient-to-b from-[#16c2f2]/20 to-transparent"></div>
                    <div className="relative">
                      <img 
                        src={equipment.imageUrl} 
                        alt={equipment.alt} 
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-[#f5dd42] text-black text-xs font-semibold py-1 px-3 rounded-full shadow-[0_0_10px_rgba(245,221,66,0.5)]">
                        Premium
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-montserrat font-semibold mb-2 line-clamp-1 text-white drop-shadow-[0_0_5px_rgba(0,215,255,0.5)]">
                        {equipment.name}
                      </h3>
                      <p className="text-cyan-200 text-sm mb-3 line-clamp-2 h-10 drop-shadow-[0_0_3px_rgba(0,215,255,0.3)]">
                        {equipment.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f5dd42] font-bold drop-shadow-[0_0_8px_rgba(245,221,66,0.5)]">${equipment.price}/day</span>
                        <button className="btn-glow bg-[#16c2f2] hover:bg-[#00d7ff] text-white px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(22,194,242,0.5)] hover:shadow-[0_0_15px_rgba(0,215,255,0.7)] transition-all duration-300 active:filter active:blur-[1px] active:brightness-150">
                          Rent Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button className="btn-glow bg-black/50 backdrop-blur-sm hover:bg-black/70 text-[#f5dd42] border border-[#16c2f2]/50 px-6 py-3 rounded-full shadow-[0_0_15px_rgba(22,194,242,0.3)] hover:shadow-[0_0_20px_rgba(0,215,255,0.5)] transition-all duration-300 flex items-center active:filter active:blur-[1px] active:brightness-150">
                  <span className="drop-shadow-[0_0_8px_rgba(245,221,66,0.5)]">View All Equipment</span>
                  <i className="fas fa-arrow-right ml-3 text-cyan-300 drop-shadow-[0_0_5px_rgba(0,215,255,0.7)]"></i>
                </button>
              </div>
            </div>
            
            {/* AI Chat Assistant */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-white mb-6 font-montserrat flex items-center drop-shadow-[0_0_8px_rgba(0,215,255,0.5)]">
                <span className="text-[#f5dd42] mr-2 drop-shadow-[0_0_8px_rgba(245,221,66,0.5)]">AI</span> Production Assistant
                <span className="ml-3 px-2 py-0.5 bg-[#16c2f2]/20 text-[#16c2f2] text-xs rounded-full drop-shadow-[0_0_5px_rgba(0,215,255,0.5)]">Powered by Groq</span>
              </h2>
              
              <div ref={chatContainerRef}>
                <ChatBot sectionType="video" />
              </div>
            </div>
          </div>
          
          {/* Contact button */}
          <div className="flex justify-center mt-12 pb-16">
            <button className="btn-glow bg-black/50 backdrop-blur-sm hover:bg-black/70 text-[#f5dd42] border border-[#16c2f2]/50 px-8 py-4 rounded-full shadow-[0_0_15px_rgba(22,194,242,0.3)] hover:shadow-[0_0_20px_rgba(0,215,255,0.5)] transition-all duration-300 flex items-center text-lg active:filter active:blur-[1px] active:brightness-150">
              <span className="drop-shadow-[0_0_8px_rgba(245,221,66,0.5)]">Contact Video Team</span>
              <i className="fas fa-arrow-right ml-3 text-cyan-300 drop-shadow-[0_0_5px_rgba(0,215,255,0.7)]"></i>
            </button>
          </div>
        </div>
        
        {/* Include Footer at the bottom of scrollable content */}
        <Footer />
      </div>
    </section>
  );
};

export default VideoSection;
