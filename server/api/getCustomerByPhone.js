import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API endpoint to retrieve customer data by phone number
export default async (req, res) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { phone } = req.query;
    
    // Validate required parameter
    if (!phone) {
      return res.status(400).json({ error: 'Phone parameter is required' });
    }
    
    // Get list of all customer files
    const customersDir = path.join(__dirname, '..', 'data', 'customers');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(customersDir)) {
      fs.mkdirSync(customersDir, { recursive: true });
      return res.status(404).json({ error: 'No customers found' });
    }
    
    // Read all customer files
    const files = fs.readdirSync(customersDir);
    
    // Search for matching phone number in each file
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      const filePath = path.join(customersDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      try {
        const customerData = JSON.parse(fileContent);
        
        // Check if this customer has the matching phone
        if (customerData.phone === phone) {
          return res.status(200).json(customerData);
        }
      } catch (e) {
        console.error(`Error parsing customer file ${file}:`, e);
        // Continue to next file
      }
    }
    
    // If we get here, no matching customer was found
    return res.status(404).json({ error: 'No customer found with that phone number' });
    
  } catch (error) {
    console.error('Error retrieving customer by phone:', error);
    return res.status(500).json({ error: 'Failed to retrieve customer data' });
  }
}; 