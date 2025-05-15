import { useEffect, useRef, useState } from "react";
import { ChatMessage, chatService, CustomerData } from "@/lib/chatService";
import { useChat } from "@/contexts/ChatContext";

// ChatBot props
interface ChatBotProps {
  sectionType: 'video' | 'ecommerce' | 'development';
  placeholderText?: string;
}

// User information interface
export interface UserInfo {
  email?: string;
  phone?: string;
  name?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  interests?: string[];
}

// Registration form component
export const RegistrationForm = ({ onComplete }: { onComplete: (userInfo: UserInfo) => void }) => {
  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  
  // Email validation helper
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  // Handle user registration
  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setFormError("Email is required to continue");
      return;
    }
    
    if (!validateEmail(email)) {
      setFormError("Please enter a valid email address");
      return;
    }
    
    if (!phone.trim()) {
      setFormError("Phone number is required to continue");
      return;
    }
    
    // Save user information
    const userInfoData = {
      email,
      phone,
      name: name.trim() || undefined,
      company: company.trim() || undefined,
    };
    
    onComplete(userInfoData);
  };
  
  return (
    <div className="p-6 bg-black/30">
      <h3 className="text-white text-center mb-4 font-semibold">Enter Your Information to Chat with Our AI Assistant</h3>
      
      {formError && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-sm text-center">
          {formError}
        </div>
      )}
      
      <form onSubmit={handleRegistration} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-cyan-100 text-sm mb-1 drop-shadow-[0_0_3px_rgba(0,215,255,0.3)]">
            Email Address <span className="text-red-300">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/50 text-white border border-[#16c2f2]/30 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-[#16c2f2]"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-cyan-100 text-sm mb-1 drop-shadow-[0_0_3px_rgba(0,215,255,0.3)]">
            Phone Number <span className="text-red-300">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+8801XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-black/50 text-white border border-[#16c2f2]/30 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-[#16c2f2]"
            required
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block text-cyan-100 text-sm mb-1 drop-shadow-[0_0_3px_rgba(0,215,255,0.3)]">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/50 text-white border border-[#16c2f2]/30 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-[#16c2f2]"
          />
        </div>
        
        <div>
          <label htmlFor="company" className="block text-cyan-100 text-sm mb-1 drop-shadow-[0_0_3px_rgba(0,215,255,0.3)]">
            Company Name
          </label>
          <input
            id="company"
            type="text"
            placeholder="Your Company Ltd."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-black/50 text-white border border-[#16c2f2]/30 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-[#16c2f2]"
          />
        </div>
        
        <div className="text-center">
          <button
            type="submit"
            className="btn-glow bg-[#16c2f2] text-white px-6 py-3 rounded-full hover:bg-[#00d7ff] transition-colors shadow-[0_0_10px_rgba(22,194,242,0.5)] hover:shadow-[0_0_15px_rgba(0,215,255,0.7)] active:filter active:blur-[1px] active:brightness-150"
          >
            Start Chat <i className="fas fa-chevron-right ml-2"></i>
          </button>
        </div>
        
        <div className="text-xs text-cyan-200/60 text-center mt-4 drop-shadow-[0_0_3px_rgba(0,215,255,0.3)]">
          Your information is securely stored and will be used to provide you with personalized service.
        </div>
      </form>
    </div>
  );
};

// Main ChatBot component
const ChatBot = ({ sectionType, placeholderText = "Ask about our services, pricing, or request a quote..." }: ChatBotProps) => {
  const [showRegistration, setShowRegistration] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  
  // Use ChatContext
  const { 
    messages, 
    isTyping, 
    addUserMessage, 
    userInfo, 
    setUserInfo, 
    loadConversationHistory 
  } = useChat();
  
  // Function to collect user data from messages
  const collectUserData = (message: string) => {
    // Email extraction
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const foundEmails = message.match(emailRegex);
    if (foundEmails && foundEmails.length > 0) {
      setUserInfo({ ...userInfo, email: foundEmails[0] });
    }
    
    // Phone number extraction
    const phoneRegex = /(\+\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
    const foundPhones = message.match(phoneRegex);
    if (foundPhones && foundPhones.length > 0) {
      setUserInfo({ ...userInfo, phone: foundPhones[0] });
    }
    
    // Name extraction (simple heuristic)
    if (message.toLowerCase().includes("my name is") || message.toLowerCase().includes("i'm ") || message.toLowerCase().includes("i am ")) {
      const nameMatch = message.match(/(?:my name is|i'm|i am) ([a-zA-Z ]+)/i);
      if (nameMatch && nameMatch[1]) {
        const name = nameMatch[1].trim();
        if (name.length > 2 && name.length < 40) { // Basic validation
          setUserInfo({ ...userInfo, name });
        }
      }
    }

    // Project type detection
    const projectTypes = ["commercial", "film", "movie", "documentary", "wedding", "event", "corporate", "music video", "website", "app", "ecommerce", "mobile"];
    for (const type of projectTypes) {
      if (message.toLowerCase().includes(type)) {
        setUserInfo({ ...userInfo, projectType: type });
        break;
      }
    }
    
    // Budget extraction
    const budgetMatch = message.match(/budget (?:of|is|around|about)? (?:\$)?(\d+[k]?)|(\$\d+[k]?)/i);
    if (budgetMatch) {
      const budget = budgetMatch[1] || budgetMatch[2];
      setUserInfo({ ...userInfo, budget });
    }
  };

  // Handle registration completion
  const handleRegistrationComplete = async (userData: UserInfo) => {
    setUserInfo({
      ...userInfo,
      ...userData,
      sectionType, // Track which section the user is chatting from
    });
    
    // Check for existing conversation history
    if (userData.email) {
      const historyLoaded = await loadConversationHistory(userData.email);
      if (!historyLoaded) {
        // If no history, we might want to send a custom first message based on the section
        const welcomeMessage = getWelcomeMessage(sectionType);
        addUserMessage(welcomeMessage);
      }
    }
    
    // Hide registration form and show chat
    setShowRegistration(false);
  };
  
  // Return appropriate welcome message based on section type
  const getWelcomeMessage = (section: string): string => {
    switch (section) {
      case 'video':
        return "Hi! I'm interested in video production services.";
      case 'ecommerce':
        return "Hello, I'd like information about your ecommerce solutions.";
      case 'development':
        return "Hey there, I'm looking for app or website development.";
      default:
        return "Hi! I'm interested in LaconiX services.";
    }
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === "") return;
    
    // Store current input before clearing it
    const currentMessage = inputValue.trim();
    
    // Clear input immediately so user sees their input is accepted
    setInputValue("");
    
    // Collect user data from message
    collectUserData(currentMessage);
    
    // Focus the input again
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Send message and get AI response
    await addUserMessage(currentMessage);
  };

  // Handle key press for chat
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [messages, isTyping]);

  // Define placeholder text based on section
  const getSectionPlaceholder = () => {
    switch (sectionType) {
      case 'video':
        return "Ask about video services, equipment, or pricing...";
      case 'ecommerce':
        return "Ask about ecommerce solutions, stores, or pricing...";
      case 'development':
        return "Ask about web/app development, features, or pricing...";
      default:
        return placeholderText;
    }
  };

  // Get section-specific hints
  const getSectionHints = () => {
    switch (sectionType) {
      case 'video':
        return "Try asking about equipment rental, production services, or request a custom quote";
      case 'ecommerce':
        return "Try asking about online store setup, payment gateways, or ecommerce features";
      case 'development':
        return "Try asking about web development, app creation, or custom software solutions";
      default:
        return "Try asking any questions about our services";
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-[0_0_15px_rgba(22,194,242,0.3)] border border-[#16c2f2]/30">
      {/* Chat header */}
      <div className="bg-black/60 p-4 border-b border-[#16c2f2]/20 flex items-center">
        <div className="w-3 h-3 rounded-full bg-[#16c2f2] mr-2 animate-pulse shadow-[0_0_10px_rgba(22,194,242,0.8)]"></div>
        <span className="text-white font-medium drop-shadow-[0_0_5px_rgba(0,215,255,0.5)]">LaconiX Assistant</span>
        <span className="ml-auto text-xs text-cyan-200 drop-shadow-[0_0_3px_rgba(0,215,255,0.3)]">
          Ask about our {sectionType} services
        </span>
      </div>
      
      {showRegistration ? (
        <RegistrationForm onComplete={handleRegistrationComplete} />
      ) : (
        <>
          <div 
            ref={chatContainerRef}
            className="p-4 h-[350px] overflow-y-auto flex flex-col space-y-4 bg-black/30"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser 
                      ? 'bg-[#16c2f2] text-white rounded-tr-none drop-shadow-[0_0_8px_rgba(0,215,255,0.5)]' 
                      : 'bg-black/50 text-cyan-100 rounded-tl-none border border-[#16c2f2]/30 drop-shadow-[0_0_5px_rgba(0,215,255,0.3)]'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="max-w-[80%] p-3 rounded-lg bg-black/50 text-cyan-100 rounded-tl-none border border-[#16c2f2]/30">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-[#16c2f2] animate-bounce shadow-[0_0_5px_rgba(22,194,242,0.8)]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#16c2f2] animate-bounce shadow-[0_0_5px_rgba(22,194,242,0.8)]" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#16c2f2] animate-bounce shadow-[0_0_5px_rgba(22,194,242,0.8)]" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[#16c2f2]/20 bg-black/60">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={getSectionPlaceholder()}
                className="flex-1 bg-black/70 text-white placeholder-cyan-300/50 border border-[#16c2f2]/30 rounded-l-lg p-3 focus:outline-none focus:ring-1 focus:ring-[#16c2f2]"
              />
              <button 
                type="submit"
                className="bg-[#16c2f2] text-white p-3 rounded-r-lg hover:bg-[#00d7ff] transition-colors shadow-[0_0_10px_rgba(22,194,242,0.5)] hover:shadow-[0_0_15px_rgba(0,215,255,0.7)] active:filter active:blur-[1px] active:brightness-150"
                disabled={inputValue.trim() === "" || isTyping}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <div className="mt-2 text-xs text-cyan-200/80 text-center drop-shadow-[0_0_3px_rgba(0,215,255,0.3)]">
              {getSectionHints()}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatBot; 