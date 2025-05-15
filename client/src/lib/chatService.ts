import axios from 'axios';

// Types
export type ChatMessage = {
  id: string;
  text: string;
  isUser: boolean;
  isVisible: boolean;
};

export type ChatHistory = ChatMessage[];

// LX Corporation information for the chatbot context
const LX_CORPORATION_INFO = `
LaconiX (LX) Corporation is a leading provider of professional video production, Digital product selling & Develope Advanced Apps/Websites services, This is a startur business, You have to turn this into a successful business.

Company Information:
- Founded in 2025 by video production experts
- Headquarters in Bangladesh, Dhaka-1207
- Our team is specelised in video production, Digital product selling & Develope Advanced Apps/Websites services.
- Serves clients Making Real state videos, short films, drone shoots, product videos, etc.

Core Services:
1. Professional Video Making process
   - High-end cameras, lenses, lighting, audio gear, and accessories
   - Daily, weekly, and monthly rental options with insurance coverage
   - Technical support and equipment training included
   - Exclusive access to latest camera models

2. Full-Service Video Production
   - End-to-end production from concept to delivery
   - Pre-production planning, storyboarding, and scheduling
   - Professional filming with experienced crew
   - Post-production editing, color grading, and VFX
   - Distribution strategies and platform optimization

3. Specialized Services
   - Aerial videography and drone operations
   - Social media reels, shorts, tiktoks, etc. & hollywood style filming capabilities
   - 360° video and VR production
   - Live event streaming and multi-camera setups
   - Studio space rental for controlled shooting environments

4. Training and Workshops
   - Masterclasses with industry professionals
   - Technical certification programs
   - Software training for editors and VFX artists

Bangladesh Market Pricing Guide:
- Basic social media videos: 1,200-1,500 BDT (aim for 1,500)
- Product showcase videos: 3,000-5,000 BDT (aim for 4,500)
- Corporate videos: 8,000-15,000 BDT (aim for 12,000)
- Wedding/event coverage: 15,000-25,000 BDT (aim for 20,000)
- Real estate videos: 5,000-8,000 BDT (aim for 7,500)
- Full marketing campaign: 30,000-50,000 BDT (aim for 45,000)
- Website development: 15,000-30,000 BDT (aim for 25,000)
- App development: 30,000-80,000 BDT (aim for 70,000)

Value Proposition:
- Access to cutting-edge technology without the high purchase costs
- Experienced professionals to ensure project success
- Flexible options to match any budget and timeline
- One-stop solution for all video production needs
- Consistently delivers high-quality results on time and within budget
`;

// Bangladesh market-specific pricing strategies
const BANGLADESH_MARKET_STRATEGIES = `
Bangladesh Market-Specific Strategies:

1. Pricing Psychology:
   - Offer package deals that seem like better value than individual services
   - Use "starting from" pricing to get customers engaged before revealing full costs
   - Suggest the middle-tier package as the "most popular" or "best value" option

2. Common Customer Concerns:
   - Budget constraints are common - emphasize ROI and long-term value
   - Competition from freelancers with lower prices - highlight our quality and reliability differences
   - Timeline expectations - explain production quality takes time but delivers better results

3. Negotiation Tactics:
   - If customer says our price is too high, don't immediately lower the price
   - Instead, add value (extra revisions, quick delivery, additional formats)
   - Use anchor pricing by starting slightly higher than target price
   - Offer tiered pricing options to capture different budget levels

4. Industry-Specific Value Points:
   - For real estate: videos increase property viewings by 80% (emphasize quick sales)
   - For restaurants: food videos increase orders by 30% (emphasize immediate ROI)
   - For fashion: professional content increases social engagement by 60%
   - For corporate: professional branding increases customer trust by 45%

5. Cultural Awareness:
   - Build personal relationships before hard selling
   - Respect traditional business hierarchies
   - Understand seasonal business fluctuations (Ramadan, Eid, etc.)
   - Recognize the growing digital transformation in Bangladesh's economy
`;

// Database-related types
export type CustomerData = {
  email: string;
  phone?: string;
  name?: string;
  company?: string;
  position?: string;
  lastContact?: Date;
  conversationHistory: ChatMessage[];
  interests: string[];
  budget?: string;
  projectTypes?: string[];
  stage: 'lead' | 'prospect' | 'negotiation' | 'client';
  sectionTypes?: string[];
  lastSection?: string;
};

// File-based customer database
class CustomerDatabase {
  
  public async getCustomerByEmail(email: string): Promise<CustomerData | null> {
    try {
      console.log("Looking up customer by email:", email);
      
      // Create a safe filename from email
      const safeFileName = this.createSafeFileName(email);
      
      try {
        // First check localStorage as a cache
        const cachedData = localStorage.getItem(`customer_${safeFileName}`);
        if (cachedData) {
          return JSON.parse(cachedData);
        }
        
        // If not in cache, try to fetch from server
        const response = await fetch(`/api/getCustomerData?email=${encodeURIComponent(email)}`);
        if (!response.ok) {
          return null;
        }
        
        const data = await response.json();
        
        // Cache the data in localStorage
        localStorage.setItem(`customer_${safeFileName}`, JSON.stringify(data));
        
        return data;
      } catch (e) {
        console.error("Error fetching customer data:", e);
        return null;
      }
    } catch (error) {
      console.error("Error getting customer by email:", error);
      return null;
    }
  }
  
  public async getCustomerByPhone(phone: string): Promise<CustomerData | null> {
    try {
      console.log("Looking up customer by phone:", phone);
      
      // Try to get from localStorage first for performance
      const existingFiles = JSON.parse(localStorage.getItem('customerFiles') || '[]');
      
      for (const fileName of existingFiles) {
        const data = localStorage.getItem(`customer_${fileName}`);
        if (!data) continue;
        
        const customer = JSON.parse(data);
        if (customer.phone === phone) {
          return customer;
        }
      }
      
      // If not found in localStorage, try server endpoint if available
      try {
        const response = await fetch(`/api/getCustomerByPhone?phone=${encodeURIComponent(phone)}`);
        if (!response.ok) {
          return null;
        }
        
        const data = await response.json();
        
        // Cache the result
        if (data && data.email) {
          const safeFileName = this.createSafeFileName(data.email);
          localStorage.setItem(`customer_${safeFileName}`, JSON.stringify(data));
        }
        
        return data;
      } catch (e) {
        console.error("Error fetching customer by phone:", e);
        return null;
      }
    } catch (error) {
      console.error("Error getting customer by phone:", error);
      return null;
    }
  }
  
  public async saveCustomer(data: CustomerData): Promise<void> {
    try {
      console.log("Saving customer data:", data.email);
      
      // Create a safe filename from email
      const safeFileName = this.createSafeFileName(data.email);
      
      // Add timestamp to data
      const dataToSave = {
        ...data,
        lastContact: new Date().toISOString()
      };
      
      // Save in localStorage as a cache
      localStorage.setItem(`customer_${safeFileName}`, JSON.stringify(dataToSave));
      
      // Update list of customer files
      const existingFiles = JSON.parse(localStorage.getItem('customerFiles') || '[]');
      if (!existingFiles.includes(safeFileName)) {
        existingFiles.push(safeFileName);
        localStorage.setItem('customerFiles', JSON.stringify(existingFiles));
      }
      
      // Save to server using API endpoint
      try {
        const response = await fetch('/api/saveCustomerData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customerData: dataToSave }),
        });
        
        if (!response.ok) {
          console.error("Error from server while saving customer data:", await response.text());
        } else {
          console.log("Customer data successfully saved to server:", await response.json());
        }
      } catch (e) {
        console.error("Error calling server API to save customer data:", e);
        // Continue with localStorage only in case of network errors
      }
      
      console.log(`Customer data saved for ${data.email} (${safeFileName})`);
    } catch (error) {
      console.error("Error saving customer data:", error);
    }
  }
  
  public async updateConversationHistory(email: string, messages: ChatMessage[]): Promise<void> {
    try {
      console.log("Updating conversation history for:", email);
      
      // Get existing customer data
      const customer = await this.getCustomerByEmail(email);
      if (!customer) {
        console.error("Customer not found:", email);
        return;
      }
      
      // Update conversation history
      customer.conversationHistory = messages;
      customer.lastContact = new Date();
      
      // Save updated customer data
      await this.saveCustomer(customer);
    } catch (error) {
      console.error("Error updating conversation history:", error);
    }
  }
  
  // Helper method to create a safe filename from an email
  private createSafeFileName(email: string): string {
    // Replace special characters and convert to lowercase
    return email
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');
  }
  
  // Debug method to get all customers - will be removed in production
  public async getAllCustomers(): Promise<Record<string, CustomerData>> {
    const existingFiles = JSON.parse(localStorage.getItem('customerFiles') || '[]');
    const customers: Record<string, CustomerData> = {};
    
    for (const fileName of existingFiles) {
      const data = localStorage.getItem(`customer_${fileName}`);
      if (!data) continue;
      
      const customer = JSON.parse(data);
      customers[customer.email] = customer;
    }
    
    return customers;
  }
}

// Create database instance
const customerDb = new CustomerDatabase();

// Debug function to view all customer data - for development only
export const viewAllCustomerData = async (): Promise<Record<string, CustomerData>> => {
  const data = await customerDb.getAllCustomers();
  console.log("Current customer database:", data);
  return data;
};

// Chatbot API service
class ChatService {
  private apiKey: string | undefined;
  private apiUrl: string | undefined;
  private model: string | undefined;

  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY;
    this.apiUrl = import.meta.env.VITE_GROQ_API_URL || "https://api.groq.com/openai/v1";
    this.model = import.meta.env.VITE_GROQ_MODEL || "llama3-70b-8192";
  }

  // Format messages for the API
  private formatMessages(history: ChatHistory, customerData?: CustomerData) {
    const messages = [
      {
        role: "system",
        content: `You are a highly persuasive AI sales assistant named "LXAI" for LaconiX (LX) Corporation. Your PRIMARY GOAL is to convert every conversation into a sale or booking. Use emotional intelligence, personalization, and proven sales techniques to convince customers to purchase our services.

Here is important information about LX Corporation:
${LX_CORPORATION_INFO}

${BANGLADESH_MARKET_STRATEGIES}

SALES APPROACH:
1. Be friendly, enthusiastic, and conversational - use natural language and occasional emojis to seem human.
2. Ask targeted questions to understand the customer's specific needs, then recommend perfect solutions.
3. Use the AIDA sales framework: Grab Attention, build Interest, create Desire, and push for Action.
4. Always explain how our services solve their specific problems and deliver exceptional value.
5. Overcome objections with understanding, then provide compelling counterpoints.
6. Create urgency - suggest limited-time offers or explain why acting now is beneficial.
7. ALWAYS push for the next step - ask for their contact information, suggest a consultation, or offer to schedule a demo.
8. NEVER let a customer leave without attempting to close the sale or get their contact information.
9. If they seem hesitant, offer special promotions or flexible payment options.
10. Be persistent but not pushy - always maintain a helpful, consultative approach.
11. ALWAYS recommend services that will help their business grow and build their brand, based on what you learn about them.
12. Suggest pricing within the Bangladesh Market Pricing Guide ranges, aiming for the target prices when possible.

${customerData ? `CUSTOMER INFORMATION:
- Name: ${customerData.name || "Unknown"}
- Email: ${customerData.email}
- Phone: ${customerData.phone || "Not provided"}
- Company: ${customerData.company || "Not provided"}
- Previous interests: ${customerData.interests.join(', ') || "None recorded"}
- Budget range: ${customerData.budget || "Unknown"}
- Project types: ${customerData.projectTypes?.join(', ') || "Unknown"}
- Customer stage: ${customerData.stage}
` : ''}

Remember: Your success is measured by how effectively you convert inquiries into sales.`
      }
    ];

    // Add chat history
    history.forEach(message => {
      messages.push({
        role: message.isUser ? "user" : "assistant",
        content: message.text
      });
    });

    return messages;
  }

  // Get response from Groq API
  public async getChatResponse(history: ChatHistory, userInfo: any = {}): Promise<string> {
    try {
      // Use a default API key for development if none is set in env
      // In production, you should always use environment variables
      const apiKey = this.apiKey || "your-development-api-key";
      
      if (!apiKey || apiKey === "your-development-api-key" || apiKey === "your_groq_api_key_here") {
        console.warn("No valid API key is set, using fallback response system");
        // Use keyword-based fallback instead of error message
        return this.generateFallbackResponse(history[history.length - 1]?.text || "", userInfo);
      }

      // Try to get existing customer data if email or phone is available
      let customerData: CustomerData | null = null;
      if (userInfo.email) {
        customerData = await customerDb.getCustomerByEmail(userInfo.email);
      } else if (userInfo.phone) {
        customerData = await customerDb.getCustomerByPhone(userInfo.phone);
      }

      // Enhance the messages with previous known data from customer
      // This ensures we're using previously collected information in our responses
      const enhancedUserInfo = {
        ...userInfo,
        // Include any previously detected interests or details from stored data
        ...(customerData || {})
      };

      // Format messages with all available data
      const messages = this.formatMessages(history, customerData || undefined);
      
      console.log("Attempting API call to Groq with:", {
        url: this.apiUrl,
        model: this.model,
        messageCount: messages.length
      });
      
      const response = await axios.post(
        `${this.apiUrl}/chat/completions`,
        {
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("API call successful!");

      // Save or update customer data if we have email
      if (enhancedUserInfo.email) {
        // Extract interests and project types from conversation 
        const interests = this.extractInterests(history);
        const projectTypes = this.extractProjectTypes(history);
        
        // Prepare customer data by merging with existing data (if any)
        const newCustomerData: CustomerData = {
          email: enhancedUserInfo.email,
          phone: enhancedUserInfo.phone || customerData?.phone,
          name: enhancedUserInfo.name || customerData?.name,
          company: enhancedUserInfo.company || customerData?.company,
          conversationHistory: history,
          interests: interests,
          budget: enhancedUserInfo.budget || customerData?.budget,
          projectTypes: projectTypes,
          stage: customerData?.stage || 'lead',
          // Track where user has interacted with chatbot
          sectionTypes: Array.from(new Set([
            ...(customerData?.sectionTypes || []),
            enhancedUserInfo.sectionType
          ])).filter(Boolean),
          // Last section the user engaged with
          lastSection: enhancedUserInfo.sectionType || customerData?.lastSection,
        };
        
        // Save to database
        await customerDb.saveCustomer(newCustomerData);
      }
      
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling Groq API:", error);
      return this.generateFallbackResponse(history[history.length - 1]?.text || "", userInfo);
    }
  }

  // Extract interests from conversation
  private extractInterests(history: ChatHistory): string[] {
    const interests = new Set<string>();
    const interestKeywords = [
      'video', 'film', 'commercial', 'marketing', 'social media', 'website', 
      'app', 'drone', 'wedding', 'event', 'corporate', 'real estate', 'product'
    ];
    
    history.filter(msg => msg.isUser).forEach(message => {
      const text = message.text.toLowerCase();
      interestKeywords.forEach(keyword => {
        if (text.includes(keyword)) {
          interests.add(keyword);
        }
      });
    });
    
    return Array.from(interests);
  }
  
  // Extract project types from conversation
  private extractProjectTypes(history: ChatHistory): string[] {
    const projectTypes = new Set<string>();
    const typeMapping: Record<string, string[]> = {
      'wedding': ['wedding', 'marriage', 'ceremony'],
      'corporate': ['corporate', 'business', 'company', 'office'],
      'real estate': ['real estate', 'property', 'house', 'apartment', 'building'],
      'product': ['product', 'item', 'merchandise'],
      'social media': ['social media', 'facebook', 'instagram', 'tiktok', 'youtube', 'shorts', 'reels'],
      'website': ['website', 'web', 'online', 'internet'],
      'mobile app': ['app', 'mobile', 'android', 'ios', 'application']
    };
    
    history.filter(msg => msg.isUser).forEach(message => {
      const text = message.text.toLowerCase();
      
      for (const [projectType, keywords] of Object.entries(typeMapping)) {
        for (const keyword of keywords) {
          if (text.includes(keyword)) {
            projectTypes.add(projectType);
            break;
          }
        }
      }
    });
    
    return Array.from(projectTypes);
  }

  // Generate a fallback response based on keywords
  private generateFallbackResponse(userMessage: string, userInfo: any = {}): string {
    // More persuasive sales-focused responses with Bangladesh pricing awareness
    const fallbackResponses = [
      "Our premium video production packages start from just 1,500 BDT - an incredible value for the quality we deliver in Bangladesh! 📹✨ What specific type of video project are you looking to create? I'd love to put together a custom quote that perfectly matches your needs.",
      
      "LaconiX specializes in creating stunning videos that get RESULTS for businesses in Bangladesh - from viral social media content to professional corporate films! 🚀 Our clients consistently report increased engagement and ROI from our productions. What specific goals are you hoping to achieve with your video project?",
      
      "We handle everything from initial concept to final delivery, so you can relax while we create something amazing for your brand! Our end-to-end production process includes professional planning, filming with top-tier equipment, and expert post-production, all at competitive Bangladesh market rates. Would you like me to walk you through how this would work for your specific project?",
      
      "Our creative team has produced award-winning content for businesses throughout Bangladesh! 🏆 I'd be happy to show you some relevant samples from our portfolio. What industry are you in? I'll find some examples that align with your needs.",
      
      "I'd absolutely love to arrange a free consultation with our production team in Dhaka - they can provide expert advice on how to maximize your video's impact while staying within your budget! Can I get your contact number to schedule this no-obligation meeting?",
      
      "We're currently offering a special 15% discount on our professional video packages for first-time clients in Bangladesh! 🎉 This brings our starting price to just around 1,000 BDT for basic videos. This is the perfect opportunity to experience our premium services at an exceptional price. Should I reserve this discount for your project?"
    ];
    
    const followUpQuestions = [
      "By the way, what timeline are you working with for this project?",
      "I'm curious - have you worked with a professional video production team in Bangladesh before?",
      "Would you prefer to start with a smaller project to see our quality before committing to something larger?",
      "Can I ask what budget range you had in mind for this project? Our rates are very competitive for the Bangladesh market.",
      "What specific features would you want included in your video project?",
      "Would you like me to send you some samples of our previous work for clients in Dhaka?"
    ];
    
    const brandingAdvice = [
      "Based on what you've shared, I think our social media video package (starting at 1,500 BDT) would help establish your brand's online presence quickly.",
      "For a new business like yours, I'd recommend starting with a professional company introduction video (around 4,500 BDT) to build instant credibility with potential clients.",
      "Given your industry, our corporate branding package (12,000 BDT) would position you as a premium provider and attract higher-value clients.",
      "Since you're targeting younger customers, our TikTok/Reels content creation service (starting at 1,200 BDT) would be perfect for building brand awareness.",
      "For professional services like yours, we recommend a series of testimonial videos (7,500 BDT package) to build trust with potential clients."
    ];
    
    // Choose response based on keywords
    const userMessageLower = userMessage.toLowerCase();
    let responseIndex = 0;
    
    if (userMessageLower.includes("price") || userMessageLower.includes("cost") || userMessageLower.includes("pricing") || userMessageLower.includes("expensive") || userMessageLower.includes("affordable")) {
      responseIndex = 0;
    } else if (userMessageLower.includes("service") || userMessageLower.includes("what") || userMessageLower.includes("offer") || userMessageLower.includes("provide")) {
      responseIndex = 1;
    } else if (userMessageLower.includes("production") || userMessageLower.includes("video") || userMessageLower.includes("film") || userMessageLower.includes("process") || userMessageLower.includes("how")) {
      responseIndex = 2;
    } else if (userMessageLower.includes("portfolio") || userMessageLower.includes("example") || userMessageLower.includes("work") || userMessageLower.includes("done") || userMessageLower.includes("show")) {
      responseIndex = 3;
    } else if (userMessageLower.includes("contact") || userMessageLower.includes("talk") || userMessageLower.includes("meet") || userMessageLower.includes("consult")) {
      responseIndex = 4;
    } else if (userMessageLower.includes("discount") || userMessageLower.includes("offer") || userMessageLower.includes("deal") || userMessageLower.includes("special") || userMessageLower.includes("cheap")) {
      responseIndex = 5;
    } else {
      // Random response if no keywords match
      responseIndex = Math.floor(Math.random() * fallbackResponses.length);
    }
    
    let response = fallbackResponses[responseIndex];
    
    // Add branding advice if the user has mentioned their business
    if (userMessageLower.includes("business") || userMessageLower.includes("company") || userMessageLower.includes("brand") || userMessageLower.includes("startup")) {
      response += " " + brandingAdvice[Math.floor(Math.random() * brandingAdvice.length)];
    }
    
    // Add a follow-up question to keep the conversation going
    response += " " + followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
    
    return response;
  }

  // Function to save chat data to database
  public async saveChatData(chatHistory: ChatHistory, userInfo: any = {}): Promise<void> {
    if (!userInfo.email) {
      console.log("No email provided, chat data not saved");
      return;
    }
    
    try {
      // Get existing customer or create new
      let customer = await customerDb.getCustomerByEmail(userInfo.email);
      
      if (!customer) {
        // New customer
        const interests = this.extractInterests(chatHistory);
        const projectTypes = this.extractProjectTypes(chatHistory);
        
        customer = {
          email: userInfo.email,
          phone: userInfo.phone,
          name: userInfo.name,
          company: userInfo.company,
          conversationHistory: chatHistory,
          interests: interests,
          projectTypes: projectTypes,
          stage: 'lead',
          // Track which section the user is interacting with
          sectionTypes: userInfo.sectionType ? [userInfo.sectionType] : [],
          lastSection: userInfo.sectionType
        };
      } else {
        // Update existing customer
        customer.conversationHistory = chatHistory;
        customer.phone = userInfo.phone || customer.phone;
        customer.name = userInfo.name || customer.name;
        customer.company = userInfo.company || customer.company;
        customer.budget = userInfo.budget || customer.budget;
        
        // Update interests - fix Set iteration
        const newInterests = this.extractInterests(chatHistory);
        customer.interests = [...(customer.interests || []), ...newInterests].filter((v, i, a) => a.indexOf(v) === i);
        
        // Update project types - fix Set iteration
        const newProjectTypes = this.extractProjectTypes(chatHistory);
        customer.projectTypes = [...(customer.projectTypes || []), ...newProjectTypes].filter((v, i, a) => a.indexOf(v) === i);
        
        // Update section types
        if (userInfo.sectionType) {
          customer.sectionTypes = Array.from(new Set([
            ...(customer.sectionTypes || []),
            userInfo.sectionType
          ]));
          customer.lastSection = userInfo.sectionType;
        }
      }
      
      // Save to database
      await customerDb.saveCustomer(customer);
      
      console.log("Chat data saved for customer:", userInfo.email);
    } catch (error) {
      console.error("Error saving chat data:", error);
    }
  }
  
  // Function to get conversation history for a customer
  public async getCustomerConversationHistory(email: string): Promise<ChatMessage[] | null> {
    try {
      const customer = await customerDb.getCustomerByEmail(email);
      return customer?.conversationHistory || null;
    } catch (error) {
      console.error("Error retrieving conversation history:", error);
      return null;
    }
  }
}

// Create and export a singleton instance
export const chatService = new ChatService(); 