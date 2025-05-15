import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API endpoint to retrieve customer data by email
export default async (req, res) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { email } = req.query;
    
    // Validate required parameter
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }
    
    // Create a safe filename from email
    const safeFileName = email
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');
    
    // Construct file path
    const customersDir = path.join(__dirname, '..', 'data', 'customers');
    const filePath = path.join(customersDir, `${safeFileName}.json`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    // Read customer data
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const customerData = JSON.parse(fileContent);
    
    // Return the data
    return res.status(200).json(customerData);
    
  } catch (error) {
    console.error('Error retrieving customer data:', error);
    return res.status(500).json({ error: 'Failed to retrieve customer data' });
  }
}; 