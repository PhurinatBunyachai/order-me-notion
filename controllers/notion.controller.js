const notionModel = require('../models/notion.model');

/**
 * Controller for Notion API integration
 */
const notionController = {
  /**
   * Initialize Notion API connection
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  initializeNotion: async (req, res) => {
    try {
      const client = await notionModel.initializeClient();
      res.status(200).json({ 
        success: true, 
        message: 'Notion API client initialized successfully',
        user: client.user
      });
    } catch (error) {
      console.error('Error initializing Notion client:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to initialize Notion API client', 
        error: error.message 
      });
    }
  },

  /**
   * Get database information from Notion
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getDatabase: async (req, res) => {
    try {
      let databaseId = '';
      const { type, query} = req.body;
      if(type==='product'){
         databaseId = process.env.APP_NOTION_PRODUCT_DATABASE_ID;
      }
      if (!databaseId) {
        return res.status(400).json({ 
          success: false, 
          message: 'Database ID is required' 
        });
      }

      const database = await notionModel.getDatabase(databaseId,query);
      res.status(200).json(database);
    } catch (error) {
      console.error('Error fetching database:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch database', 
        error: error.message 
      });
    }
  }
};

module.exports = notionController;