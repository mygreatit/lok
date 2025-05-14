import { useEffect, useRef, useState } from "react";
import GridLines from "@/components/GridLines";
import { useAnimatedSection } from "@/hooks/useAnimatedSection";
import { gsap } from "gsap";
import { videoEquipmentData } from "@/data/mockData";

type ChatMessage = {
  id: string;
  text: string;
  isUser: boolean;
  isVisible: boolean;
};

const VideoSection = () => {
  const { fadeUpElements } = useAnimatedSection();
  const bgElementsRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", text: "👋 Hi there! I'm your Video Production Assistant. How can I help you today?", isUser: false, isVisible: false },
    { id: "2", text: "I need a commercial video for my new product launch", isUser: true, isVisible: false },
    { id: "3", text: "Great! I'd be happy to help with your commercial video. Can you tell me a bit more about your product and when you're planning to launch?", isUser: false, isVisible: false }
  ]);

  useEffect(() => {
    if (bgElementsRef.current) {
      // Animate background elements
      gsap.from(bgElementsRef.current.children, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out"
      });
    }

    // Animate chat messages appearing one by one
    const messagesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#video",
        start: "top center",
        once: true
      }
    });

    chatMessages.forEach((_, index) => {
      messagesTimeline.add(() => {
        setChatMessages(prev => 
          prev.map((msg, i) => 
            i === index ? { ...msg, isVisible: true } : msg
          )
        );
      }, index * 0.5);
    });
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      isVisible: true
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setInputValue("");
    
    // Simulate assistant response after a delay
    setTimeout(() => {
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for sharing that information. Our video production team can help create a professional commercial for your product launch. When would you like to schedule a consultation?",
        isUser: false,
        isVisible: true
      };
      
      setChatMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <section id="video" className="section bg-[#151A30] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF2E7E]/5 to-[#151A30]/90"></div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <GridLines />
        <div ref={bgElementsRef} className="absolute inset-0">
          <div className="absolute top-40 right-40 w-72 h-72 rounded-full bg-[#FF2E7E]/10 blur-3xl"></div>
          <div className="absolute bottom-40 left-40 w-64 h-64 rounded-full bg-[#0066FF]/10 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-16 h-full flex flex-col justify-center relative z-10">
        <div ref={el => fadeUpElements.current.push(el)} className="text-center mb-12" data-delay="0">
          <h5 className="text-[#FF2E7E] text-lg md:text-xl mb-2 font-mono">Premium Video Services</h5>
          <h1 className="text-3xl md:text-5xl font-montserrat font-bold mb-4">Cinematic <span className="text-[#FF2E7E]">Video</span> Production</h1>
          <p className="text-[#E1E5ED] max-w-2xl mx-auto">
            Transform your vision into stunning visual content with our state-of-the-art production services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column - Service Highlights */}
          <div className="space-y-6 order-2 lg:order-1">
            <div ref={el => fadeUpElements.current.push(el)} className="bg-[#1E2542] bg-card p-6 rounded-xl shadow-lg" data-delay="0.1">
              <div className="flex items-start">
                <div className="bg-[#2A3353] p-3 rounded-lg mr-4">
                  <i className="fas fa-film text-[#FF2E7E] text-xl"></i>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Commercial Production</h3>
                  <p className="text-[#E1E5ED] text-sm">High-quality promotional videos that capture your brand's essence and message.</p>
                </div>
              </div>
            </div>
            
            <div ref={el => fadeUpElements.current.push(el)} className="bg-[#1E2542] bg-card p-6 rounded-xl shadow-lg" data-delay="0.2">
              <div className="flex items-start">
                <div className="bg-[#2A3353] p-3 rounded-lg mr-4">
                  <i className="fas fa-photo-video text-[#FF2E7E] text-xl"></i>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Content Creation</h3>
                  <p className="text-[#E1E5ED] text-sm">Regular content production for social media, websites, and marketing campaigns.</p>
                </div>
              </div>
            </div>
            
            <div ref={el => fadeUpElements.current.push(el)} className="bg-[#1E2542] bg-card p-6 rounded-xl shadow-lg" data-delay="0.3">
              <div className="flex items-start">
                <div className="bg-[#2A3353] p-3 rounded-lg mr-4">
                  <i className="fas fa-edit text-[#FF2E7E] text-xl"></i>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Post-Production</h3>
                  <p className="text-[#E1E5ED] text-sm">Professional editing, color grading, and visual effects to enhance your footage.</p>
                </div>
              </div>
            </div>
            
            {/* Video Production Stats */}
            <div ref={el => fadeUpElements.current.push(el)} className="grid grid-cols-3 gap-4" data-delay="0.4">
              <div className="bg-[#2A3353] p-4 rounded-lg text-center">
                <div className="text-[#FF2E7E] text-2xl font-bold">120+</div>
                <div className="text-[#E1E5ED] text-xs mt-1">Projects</div>
              </div>
              <div className="bg-[#2A3353] p-4 rounded-lg text-center">
                <div className="text-[#FF2E7E] text-2xl font-bold">98%</div>
                <div className="text-[#E1E5ED] text-xs mt-1">Client Satisfaction</div>
              </div>
              <div className="bg-[#2A3353] p-4 rounded-lg text-center">
                <div className="text-[#FF2E7E] text-2xl font-bold">15+</div>
                <div className="text-[#E1E5ED] text-xs mt-1">Industry Awards</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Chatbot UI */}
          <div ref={el => fadeUpElements.current.push(el)} className="bg-[#1E2542] bg-card rounded-xl shadow-lg overflow-hidden order-1 lg:order-2" data-delay="0.1">
            <div className="bg-[#2A3353] py-3 px-4 border-b border-[#151A30] flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#FF2E7E] mr-2"></div>
              <h3 className="font-montserrat text-white">Video Production Assistant</h3>
            </div>
            
            <div className="p-6 h-80 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isUser ? 'justify-end' : ''} ${message.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-300`}
                  >
                    <div className={`${message.isUser ? 'bg-[#FF2E7E]/20' : 'bg-[#2A3353]'} rounded-lg p-3 max-w-[80%]`}>
                      <p className="text-white">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-[#2A3353] border border-[#2A3353] focus:border-[#FF2E7E] rounded-l-lg py-2 px-4 text-white focus:outline-none" 
                  placeholder="Type your message..."
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-[#FF2E7E] hover:bg-[#FF5C9A] text-white p-2 rounded-r-lg transition-colors duration-300"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
            
            {/* Placeholder for video production equipment showcase */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#151A30]">
              {videoEquipmentData.map((equipment, index) => (
                <img 
                  key={index}
                  src={equipment.imageUrl} 
                  alt={equipment.alt} 
                  className="h-16 object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
