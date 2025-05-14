import { useEffect, useRef, useState } from "react";
import GridLines from "@/components/GridLines";
import { gsap } from "gsap";
import { videoEquipmentData } from "@/data/mockData";

// Define types for chat messages
type ChatMessage = {
  id: string;
  text: string;
  isUser: boolean;
  isVisible: boolean;
};

// Sample preset responses for the AI demo
const aiResponses = [
  "We offer both rental and purchase options for all our professional camera equipment. Would you like more details on rental packages?",
  "Our top camera for filmmaking is the LaconiX Pro 8K with 120fps capability. It has excellent low-light performance and dynamic range.",
  "For beginners, I'd recommend starting with the LaconiX EasyShot 4K. It's user-friendly with automatic settings but still produces professional quality.",
  "Yes, we provide full production services including pre-production planning, filming, editing, and color grading.",
  "Our team can help you with storyboarding, scripting, and content strategy for your video project.",
  "All our equipment rentals include insurance options and 24/7 technical support."
];

const VideoSection = () => {
  // State for AI chat feature
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "👋 Hi there! I'm your virtual video production assistant. How can I help you today?",
      isUser: false,
      isVisible: true
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Element references
  const sectionRef = useRef<HTMLElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const equipmentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgElementsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle chat input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  // Function to simulate AI response
  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Choose a response based on keywords in the user message
    let responseIndex = 0;
    if (userMessage.toLowerCase().includes("rent") || userMessage.toLowerCase().includes("buy")) {
      responseIndex = 0;
    } else if (userMessage.toLowerCase().includes("best") || userMessage.toLowerCase().includes("recommend")) {
      responseIndex = 1;
    } else if (userMessage.toLowerCase().includes("beginner") || userMessage.toLowerCase().includes("start")) {
      responseIndex = 2;
    } else if (userMessage.toLowerCase().includes("service") || userMessage.toLowerCase().includes("offer")) {
      responseIndex = 3;
    } else if (userMessage.toLowerCase().includes("planning") || userMessage.toLowerCase().includes("story")) {
      responseIndex = 4;
    } else {
      // Random response for anything else
      responseIndex = Math.floor(Math.random() * aiResponses.length);
    }
    
    // Add AI response after a realistic delay
    setTimeout(() => {
      setIsTyping(false);
      
      const responseMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: aiResponses[responseIndex],
        isUser: false,
        isVisible: true
      };
      
      setChatMessages(prev => [...prev, responseMessage]);
      
      // Scroll to bottom of chat
      if (chatContainerRef.current) {
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 100);
      }
    }, 1200 + Math.random() * 800); // Random delay between 1.2-2 seconds for realistic typing
  };
  
  // Handle send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === "") return;
    
    // Create new user message
    const newMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      isUser: true,
      isVisible: true
    };
    
    // Add to messages
    setChatMessages(prev => [...prev, newMessage]);
    
    // Clear input
    setInputValue("");
    
    // Simulate AI thinking/typing
    simulateAIResponse(inputValue);
    
    // Focus the input again
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Scroll to bottom of chat
    if (chatContainerRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  // Handle key press for chat
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

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
      className="section bg-[#151A30] relative flex items-center"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GridLines color="#6c0030" />
        <div ref={bgElementsRef} className="absolute inset-0">
          <div className="absolute top-[20%] right-[15%] w-[25vw] h-[25vw] rounded-full bg-[#FF2E7E]/10 blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-[15%] left-[10%] w-[20vw] h-[20vw] rounded-full bg-[#9C2779]/10 blur-3xl animate-float"></div>
          <div className="absolute top-[60%] right-[30%] w-[15vw] h-[15vw] rounded-full bg-[#5D0054]/10 blur-3xl animate-float-fast"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 py-16 relative z-10">
        <div ref={headingRef} className="text-center mb-12">
          <h5 className="text-[#FF2E7E] text-lg md:text-xl mb-4 font-mono inline-block relative">
            Professional Equipment & Services
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF2E7E]/30"></span>
          </h5>
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
            Premium <span className="text-[#FF2E7E]">Video</span> Production
          </h1>
          <p className="text-[#E1E5ED] max-w-2xl mx-auto text-lg">
            Professional video production services and equipment rental for creators and businesses.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Equipment list */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold text-white mb-6 font-montserrat">Featured Equipment</h2>
            <div ref={equipmentRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {videoEquipmentData.slice(0, 4).map((equipment) => (
                <div 
                  key={equipment.id}
                  className="bg-card bg-[#1E2542] rounded-xl overflow-hidden shadow-lg group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1F3A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <img 
                      src={equipment.imageUrl} 
                      alt={equipment.name} 
                      className="w-full h-40 object-cover"
                    />
                    <div className={`absolute top-3 right-3 ${equipment.badgeColor} text-white text-xs py-1 px-3 rounded-full shadow-md font-semibold`}>
                      {equipment.badge}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-montserrat font-semibold mb-2 line-clamp-1">{equipment.name}</h3>
                    <p className="text-[#E1E5ED] text-sm mb-3 line-clamp-2 h-10">{equipment.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#FF2E7E] font-bold">${equipment.price}/day</span>
                      <button className="btn-glow bg-[#FF2E7E] hover:bg-[#FF5C9A] text-white px-3 py-1.5 rounded-full text-sm shadow-glow-secondary transition-all duration-300">
                        Rent Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button className="btn-glow bg-[#2A3353] hover:bg-[#1E2542] text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center">
                <span>View All Equipment</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
          
          {/* AI Chat Assistant */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold text-white mb-6 font-montserrat flex items-center">
              <span className="text-[#FF2E7E] mr-2">AI</span> Production Assistant
              <span className="ml-3 px-2 py-0.5 bg-[#FF2E7E]/20 text-[#FF2E7E] text-xs rounded-full">Live Demo</span>
            </h2>
            
            <div className="bg-[#1E2542] rounded-xl overflow-hidden shadow-xl border border-[#FF2E7E]/20">
              {/* Chat header */}
              <div className="bg-[#161C34] p-4 border-b border-[#FF2E7E]/10 flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#FF2E7E] mr-2 animate-pulse"></div>
                <span className="text-white font-medium">LaconiX Assistant</span>
                <span className="ml-auto text-xs text-[#E1E5ED]/70">Ask me about video production</span>
              </div>
              
              {/* Chat messages */}
              <div 
                ref={chatContainerRef}
                className="p-4 h-[350px] overflow-y-auto flex flex-col space-y-4 bg-[#151A30]/50"
              >
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser 
                          ? 'bg-[#FF2E7E] text-white rounded-tr-none' 
                          : 'bg-[#2A3353] text-[#E1E5ED] rounded-tl-none'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fadeIn">
                    <div className="max-w-[80%] p-3 rounded-lg bg-[#2A3353] text-[#E1E5ED] rounded-tl-none">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF2E7E] animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-[#FF2E7E] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-[#FF2E7E] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Chat input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-[#FF2E7E]/10 bg-[#161C34]">
                <div className="flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about our video services..."
                    className="flex-1 bg-[#2A3353] text-white placeholder-[#8891B2] border-none rounded-l-lg p-3 focus:outline-none focus:ring-1 focus:ring-[#FF2E7E]"
                  />
                  <button 
                    type="submit"
                    className="bg-[#FF2E7E] text-white p-3 rounded-r-lg hover:bg-[#FF5C9A] transition-colors"
                    disabled={inputValue.trim() === "" || isTyping}
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
                <div className="mt-2 text-xs text-[#E1E5ED]/60 text-center">
                  Try asking about equipment rental, production services, or filmmaking tips
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
