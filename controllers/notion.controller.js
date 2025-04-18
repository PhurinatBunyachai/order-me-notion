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
      if(type==='store'){
         databaseId = process.env.APP_NOTION_STORE_INFO_DATABASE_ID;
      }
      if(type==='order-history'){
         databaseId = process.env.APP_NOTION_DATABASE_ID;
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
  },
  
  /**
   * Get order database information from Notion
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getOrderDatabase: async (req, res) => {
    try {
      const databaseId = process.env.APP_NOTION_ORDER_DATABASE_ID;
      const { query } = req.body;
      
      if (!databaseId) {
        return res.status(400).json({ 
          success: false, 
          message: 'Order database ID is not configured in environment variables' 
        });
      }

      const database = await notionModel.getDatabase(databaseId, query);
      res.status(200).json(database);
    } catch (error) {
      console.error('Error fetching order database:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch order database', 
        error: error.message 
      });
    }
  },
  
  /**
   * Get page information from Notion
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  order: async (req, res) => {
    try {
        const { pageObj } = req.body;
      
      if (!pageObj) {
        return res.status(400).json({ 
          success: false, 
          message: 'Page ID is required' 
        });
      }

      const page = await notionModel.order(pageObj);
      res.status(200).json(page);
    } catch (error) {
      console.error('Error fetching page:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch page', 
        error: error.message 
      });
    }
  }
};

module.exports = notionController;