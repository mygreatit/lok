import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Make sure the customers directory exists
const customersDir = path.join(__dirname, '..', 'data', 'customers');
if (!fs.existsSync(customersDir)) {
  fs.mkdirSync(customersDir, { recursive: true });
}

// API endpoint to save customer data
export default async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { customerData } = req.body;
    
    // Validate required data
    if (!customerData || !customerData.email) {
      return res.status(400).json({ error: 'Missing required data' });
    }
    
    // Create a safe filename from email
    const safeFileName = customerData.email
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');
    
    // Add timestamp to data
    const dataToSave = {
      ...customerData,
      lastSaved: new Date().toISOString()
    };
    
    // Write to file
    const filePath = path.join(customersDir, `${safeFileName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));
    
    // Return success
    return res.status(200).json({ success: true, filePath });
    
  } catch (error) {
    console.error('Error saving customer data:', error);
    return res.status(500).json({ error: 'Failed to save customer data' });
  }
}; 