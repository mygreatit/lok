import { useEffect, useRef } from "react";
import GridLines from "@/components/GridLines";
import { gsap } from "gsap";
import Footer from "@/components/Footer";
import { ChatProvider } from "@/contexts/ChatContext";
import ChatBot from "@/components/ChatBot";

// Development services data
const developmentServices = [
  {
    title: "Website Development",
    description: "Modern, responsive websites built with the latest technologies.",
    icon: "fas fa-laptop-code",
    price: "Starting at 25,000 BDT"
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for Android and iOS.",
    icon: "fas fa-mobile-alt",
    price: "Starting at 70,000 BDT"
  },
  {
    title: "Web Applications",
    description: "Custom web applications with advanced features and integrations.",
    icon: "fas fa-window-restore",
    price: "Starting at 45,000 BDT"
  },
  {
    title: "API Development",
    description: "Secure and scalable APIs for seamless integration between systems.",
    icon: "fas fa-code",
    price: "Starting at 30,000 BDT"
  }
];

// Main Development Section Content
const DevelopmentSectionContent = () => {
  // Element references
  const sectionRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgElementsRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up entrance animations
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
    
    // Animate service cards
    if (servicesRef.current) {
      const cards = servicesRef.current.children;
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
      id="development"
      ref={sectionRef}
      className="section bg-gradient-to-br from-black to-[#3ee283] relative scroll-smooth w-screen h-screen overflow-y-auto"
    >
      {/* Background elements - fixed to viewport */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GridLines />
        <div ref={bgElementsRef} className="fixed inset-0">
          <div className="absolute top-[20%] right-[15%] w-[25vw] h-[25vw] rounded-full bg-[#3ee283]/20 blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-[15%] left-[10%] w-[20vw] h-[20vw] rounded-full bg-[#f5dd42]/10 blur-3xl animate-float"></div>
          <div className="absolute top-[60%] right-[30%] w-[15vw] h-[15vw] rounded-full bg-green-500/10 blur-3xl animate-float-fast"></div>
        </div>
      </div>
      
      {/* Scrollable content with footer */}
      <div className="scroll-container relative z-10 h-full">
        <div className="section-content">
          <div ref={headingRef} className="text-center mb-12">
            <h5 className="text-green-300 text-lg md:text-xl mb-4 font-mono inline-block relative drop-shadow-[0_0_8px_rgba(62,226,131,0.7)]">
              Custom Software Solutions
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400/50"></span>
            </h5>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 glitch-effect text-[#f5dd42] drop-shadow-[0_0_15px_rgba(245,221,66,0.5)]">
              <span className="text-white drop-shadow-[0_0_10px_rgba(62,226,131,0.7)]">Development</span> Services
            </h1>
            <p className="text-green-200 max-w-2xl mx-auto text-lg drop-shadow-[0_0_8px_rgba(62,226,131,0.5)]">
              Transform your ideas into reality with our expert development team and cutting-edge technologies.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
            {/* Services list */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-white mb-6 font-montserrat drop-shadow-[0_0_8px_rgba(62,226,131,0.5)]">Our Development Services</h2>
              <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {developmentServices.map((service, index) => (
                  <div 
                    key={index}
                    className="product-card bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-[0_0_15px_rgba(62,226,131,0.3)] hover:shadow-[0_0_20px_rgba(62,226,131,0.5)] border border-[#3ee283]/30 gpu-accelerated group"
                  >
                    <div className="card-glow bg-gradient-to-b from-[#3ee283]/20 to-transparent"></div>
                    <div className="p-6">
                      <div className="text-4xl mb-4 text-[#3ee283] drop-shadow-[0_0_5px_rgba(62,226,131,0.7)]">
                        <i className={service.icon}></i>
                      </div>
                      <h3 className="text-lg font-montserrat font-semibold mb-2 line-clamp-1 text-white drop-shadow-[0_0_5px_rgba(62,226,131,0.5)]">
                        {service.title}
                      </h3>
                      <p className="text-green-200 text-sm mb-3 line-clamp-2 h-10 drop-shadow-[0_0_3px_rgba(62,226,131,0.3)]">
                        {service.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f5dd42] font-bold drop-shadow-[0_0_8px_rgba(245,221,66,0.5)]">{service.price}</span>
                        <button className="btn-glow bg-[#3ee283] hover:bg-[#2dd072] text-black font-medium px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(62,226,131,0.5)] hover:shadow-[0_0_15px_rgba(62,226,131,0.7)] transition-all duration-300 active:filter active:blur-[1px] active:brightness-150">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button className="btn-glow bg-black/50 backdrop-blur-sm hover:bg-black/70 text-[#f5dd42] border border-[#3ee283]/50 px-6 py-3 rounded-full shadow-[0_0_15px_rgba(62,226,131,0.3)] hover:shadow-[0_0_20px_rgba(62,226,131,0.5)] transition-all duration-300 flex items-center active:filter active:blur-[1px] active:brightness-150">
                  <span className="drop-shadow-[0_0_8px_rgba(245,221,66,0.5)]">View All Services</span>
                  <i className="fas fa-arrow-right ml-3 text-green-300 drop-shadow-[0_0_5px_rgba(62,226,131,0.7)]"></i>
                </button>
              </div>
            </div>
            
            {/* AI Chat Assistant */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-white mb-6 font-montserrat flex items-center drop-shadow-[0_0_8px_rgba(62,226,131,0.5)]">
                <span className="text-[#f5dd42] mr-2 drop-shadow-[0_0_8px_rgba(245,221,66,0.5)]">AI</span> Development Advisor
                <span className="ml-3 px-2 py-0.5 bg-[#3ee283]/20 text-[#3ee283] text-xs rounded-full drop-shadow-[0_0_5px_rgba(62,226,131,0.5)]">Powered by Groq</span>
              </h2>
              
              <div ref={chatContainerRef}>
                <ChatBot sectionType="development" />
              </div>
            </div>
          </div>
          
          {/* Contact button */}
          <div className="flex justify-center mt-12 pb-16">
            <button className="btn-glow bg-black/50 backdrop-blur-sm hover:bg-black/70 text-[#f5dd42] border border-[#3ee283]/50 px-8 py-4 rounded-full shadow-[0_0_15px_rgba(62,226,131,0.3)] hover:shadow-[0_0_20px_rgba(62,226,131,0.5)] transition-all duration-300 flex items-center text-lg active:filter active:blur-[1px] active:brightness-150">
              <span className="drop-shadow-[0_0_8px_rgba(245,221,66,0.5)]">Contact Development Team</span>
              <i className="fas fa-arrow-right ml-3 text-green-300 drop-shadow-[0_0_5px_rgba(62,226,131,0.7)]"></i>
            </button>
          </div>
        </div>
        
        {/* Include Footer at the bottom of scrollable content */}
        <Footer />
      </div>
    </section>
  );
};

// Wrapper with ChatProvider
const DevelopmentSection = () => {
  return (
    <ChatProvider>
      <DevelopmentSectionContent />
    </ChatProvider>
  );
};

export default DevelopmentSection;
