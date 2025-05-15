import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to customers directory
const customersDir = path.join(__dirname, '..', 'data', 'customers');

/**
 * Get basic statistics about stored customers
 */
export const getCustomerStats = () => {
  try {
    // Make sure the directory exists
    if (!fs.existsSync(customersDir)) {
      fs.mkdirSync(customersDir, { recursive: true });
      return {
        totalCustomers: 0,
        totalMessages: 0,
        averageMessagesPerCustomer: 0,
        interests: {},
        projectTypes: {}
      };
    }
    
    // Get all JSON files in the directory
    const files = fs.readdirSync(customersDir).filter(file => file.endsWith('.json'));
    
    let totalMessages = 0;
    let interests = {};
    let projectTypes = {};
    
    // Process each customer file
    files.forEach(file => {
      try {
        const filePath = path.join(customersDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const customerData = JSON.parse(fileContent);
        
        // Count messages
        if (customerData.conversationHistory) {
          totalMessages += customerData.conversationHistory.length;
        }
        
        // Record interests
        if (customerData.interests && Array.isArray(customerData.interests)) {
          customerData.interests.forEach(interest => {
            interests[interest] = (interests[interest] || 0) + 1;
          });
        }
        
        // Record project types
        if (customerData.projectTypes && Array.isArray(customerData.projectTypes)) {
          customerData.projectTypes.forEach(type => {
            projectTypes[type] = (projectTypes[type] || 0) + 1;
          });
        }
      } catch (e) {
        console.error(`Error processing file ${file}:`, e);
      }
    });
    
    return {
      totalCustomers: files.length,
      totalMessages,
      averageMessagesPerCustomer: files.length > 0 ? (totalMessages / files.length).toFixed(2) : 0,
      interests,
      projectTypes
    };
  } catch (error) {
    console.error('Error getting customer stats:', error);
    return {
      error: 'Failed to get customer statistics',
      totalCustomers: 0,
      totalMessages: 0,
      averageMessagesPerCustomer: 0,
      interests: {},
      projectTypes: {}
    };
  }
};

/**
 * Get a list of all customers with basic info
 */
export const getCustomersList = () => {
  try {
    // Make sure the directory exists
    if (!fs.existsSync(customersDir)) {
      fs.mkdirSync(customersDir, { recursive: true });
      return [];
    }
    
    // Get all JSON files in the directory
    const files = fs.readdirSync(customersDir).filter(file => file.endsWith('.json'));
    
    // Process each customer file
    const customers = files.map(file => {
      try {
        const filePath = path.join(customersDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const customerData = JSON.parse(fileContent);
        
        // Return summary info
        return {
          email: customerData.email,
          name: customerData.name || 'Unknown',
          phone: customerData.phone || 'Not provided',
          lastContact: customerData.lastContact || customerData.lastSaved,
          messageCount: customerData.conversationHistory?.length || 0,
          stage: customerData.stage || 'lead'
        };
      } catch (e) {
        console.error(`Error processing file ${file}:`, e);
        return null;
      }
    }).filter(Boolean); // Filter out any errors
    
    // Sort by lastContact (recent first)
    return customers.sort((a, b) => {
      return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime();
    });
    
  } catch (error) {
    console.error('Error getting customers list:', error);
    return [];
  }
}; 