import { getCustomerStats, getCustomersList } from '../utils/customerDataAnalysis.js';

// API endpoint to get customer analytics
export default async (req, res) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { type } = req.query;
    
    if (type === 'stats') {
      // Get statistical data about all customers
      const stats = getCustomerStats();
      return res.status(200).json(stats);
    } else if (type === 'list') {
      // Get list of all customers with basic info
      const customers = getCustomersList();
      return res.status(200).json(customers);
    } else {
      // If no type specified, return both
      return res.status(200).json({
        stats: getCustomerStats(),
        customers: getCustomersList()
      });
    }
  } catch (error) {
    console.error('Error retrieving customer analytics:', error);
    return res.status(500).json({ error: 'Failed to retrieve customer analytics' });
  }
}; 