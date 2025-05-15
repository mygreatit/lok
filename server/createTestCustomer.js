import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample customer data with enhanced properties
const sampleCustomer = {
  email: 'test.user@example.com',
  phone: '+8801722334455',
  name: 'Test User',
  company: 'Test Company Ltd.',
  lastContact: new Date().toISOString(),
  conversationHistory: [
    {
      id: 'welcome',
      text: 'Assalamu Alaikum, My name is LXAI, I\'m your virtual assistant from LaconiX Corporation. Can we start with our pricing details or any other services?',
      isUser: false,
      isVisible: true
    },
    {
      id: 'user-1651234567890',
      text: 'Hi, I\'m interested in video production services.',
      isUser: true,
      isVisible: true
    },
    {
      id: 'ai-1651234598765',
      text: 'Great to hear that! We have excellent video production services for businesses. Could you tell me a bit more about what kind of video you\'re looking to create?',
      isUser: false,
      isVisible: true
    },
    {
      id: 'user-1651234667890',
      text: 'I need a promotional video for my company website.',
      isUser: true,
      isVisible: true
    },
    {
      id: 'ai-1651234698765',
      text: 'Perfect! For company promotional videos, we offer comprehensive packages starting at 12,000 BDT. This includes scriptwriting, professional filming, editing, and delivery in multiple formats. We could also integrate some corporate branding elements to make it stand out. Would you like me to share some examples of similar work we\'ve done?',
      isUser: false,
      isVisible: true
    },
    {
      id: 'user-1651234767890',
      text: 'Yes, please. And what about the timeline?',
      isUser: true,
      isVisible: true
    },
    {
      id: 'ai-1651234798765',
      text: 'We typically complete promotional videos within 7-10 working days from script approval. Here\'s the general timeline: 2 days for concept and script, 1 day for filming, 3-5 days for editing and revisions, and 1-2 days for final delivery. I\'ve just shared some examples with you via email. Would you like to schedule a free consultation with our video team to discuss your specific requirements?',
      isUser: false,
      isVisible: true
    }
  ],
  interests: ['video', 'corporate', 'promotional'],
  budget: '12000',
  projectTypes: ['corporate', 'promotional'],
  stage: 'prospect',
  sectionTypes: ['video', 'development'], // User has engaged with multiple sections
  lastSection: 'video',
  notes: 'Interested in both video and website development. Priority is company promotional video.',
  lastSaved: new Date().toISOString()
};

// Make sure the customers directory exists
const customersDir = path.join(__dirname, 'data', 'customers');
if (!fs.existsSync(customersDir)) {
  fs.mkdirSync(customersDir, { recursive: true });
}

// Create a safe filename from email
const safeFileName = sampleCustomer.email
  .toLowerCase()
  .replace(/[^a-z0-9]/g, '_');

// Write to file
const filePath = path.join(customersDir, `${safeFileName}.json`);
fs.writeFileSync(filePath, JSON.stringify(sampleCustomer, null, 2));

// Create an alternate version with email containing dots
// This tests our filename sanitization functionality
const alternateCustomer = {
  ...sampleCustomer,
  email: 'alternate.test@example.com',
  phone: '+8801711223344',
  name: 'Alternate Test',
  company: 'Another Company Ltd.',
  lastSection: 'ecommerce',
  sectionTypes: ['ecommerce'],
  interests: ['ecommerce', 'online store'],
  projectTypes: ['online shop', 'payment gateway'],
  budget: '20000',
};

const alternateFilePath = path.join(customersDir, 'alternate_test_example_com.json');
fs.writeFileSync(alternateFilePath, JSON.stringify(alternateCustomer, null, 2));

console.log(`Test customer files created at: 
- ${filePath}
- ${alternateFilePath}`); 