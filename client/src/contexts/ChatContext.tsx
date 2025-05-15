import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ChatMessage, chatService } from '@/lib/chatService';

// Interface for chat context
interface ChatContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  addMessage: (message: ChatMessage) => void;
  addUserMessage: (text: string) => void;
  loadConversationHistory: (email: string) => Promise<boolean>;
  clearMessages: () => void;
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
}

// User info interface
interface UserInfo {
  email?: string;
  phone?: string;
  name?: string;
  company?: string;
  sectionType?: string;
  [key: string]: any; // Allow for additional properties
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Assalamu Alaikum, My name is LXAI, I'm your virtual assistant from LaconiX Corporation. Can we start with our pricing details or any other services?",
      isUser: false,
      isVisible: true
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [currentSession, setCurrentSession] = useState<string | null>(null);

  // Check for saved user session on initial load
  useEffect(() => {
    // Try to get saved user info from localStorage
    const savedUserInfo = localStorage.getItem('lx_user_info');
    if (savedUserInfo) {
      try {
        const parsedInfo = JSON.parse(savedUserInfo);
        setUserInfo(parsedInfo);
        setCurrentSession(parsedInfo.email || null);
      } catch (e) {
        console.error("Error parsing saved user info:", e);
      }
    }
  }, []);

  // Save user info to localStorage when it changes
  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      localStorage.setItem('lx_user_info', JSON.stringify(userInfo));
      
      // If email changed, update current session
      if (userInfo.email && currentSession !== userInfo.email) {
        setCurrentSession(userInfo.email);
      }
    }
  }, [userInfo, currentSession]);

  // Add a new message to the chat
  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  // Add a user message and get AI response
  const addUserMessage = async (text: string) => {
    // Create new user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text,
      isUser: true,
      isVisible: true
    };

    // Add to messages
    setMessages(prev => [...prev, userMessage]);

    // Get AI response
    setIsTyping(true);

    // Add a realistic typing delay based on message length
    const minDelay = 1500; // Minimum delay in ms
    const typingSpeed = 20; // ms per character
    const responseDelay = Math.max(minDelay, text.length * typingSpeed);

    try {
      // Call the chat service to get a response
      const response = await chatService.getChatResponse([...messages, userMessage], userInfo);

      // Simulate natural typing delay
      await new Promise(resolve => setTimeout(resolve, responseDelay));

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: response,
        isUser: false,
        isVisible: true
      };

      // Add AI response
      setMessages(prev => [...prev, aiMessage]);

      // Save the updated conversation
      await chatService.saveChatData([...messages, userMessage, aiMessage], userInfo);

      return true;
    } catch (error) {
      console.error("Error in chat response:", error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: "I apologize for the inconvenience. Our system is experiencing temporary issues. Please try again or contact our team directly.",
        isUser: false,
        isVisible: true
      };

      setMessages(prev => [...prev, errorMessage]);
      return false;
    } finally {
      setIsTyping(false);
    }
  };

  // Load conversation history for a user
  const loadConversationHistory = async (email: string): Promise<boolean> => {
    try {
      const history = await chatService.getCustomerConversationHistory(email);
      
      if (history && history.length > 0) {
        // If we have history and it's the same user as before
        if (currentSession === email) {
          // Just continue with current messages
          return true;
        }
        
        // Add welcome back message
        const welcomeBackMessage: ChatMessage = {
          id: `welcome-back-${Date.now()}`,
          text: `Welcome back! I see we've chatted before. How can I help you today?`,
          isUser: false,
          isVisible: true
        };
        
        setMessages([...history, welcomeBackMessage]);
        setCurrentSession(email);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error loading conversation history:", error);
      return false;
    }
  };

  // Clear all messages
  const clearMessages = () => {
    setMessages([
      {
        id: "welcome",
        text: "Assalamu Alaikum, My name is LXAI, I'm your virtual assistant from LaconiX Corporation. Can we start with our pricing details or any other services?",
        isUser: false,
        isVisible: true
      }
    ]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isTyping,
        addMessage,
        addUserMessage,
        loadConversationHistory,
        clearMessages,
        userInfo,
        setUserInfo
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook for using the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 