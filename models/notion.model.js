const { Client } = require('@notionhq/client');

/**
 * Model for Notion API operations
 */
const notionModel = {
  client: null,

  /**
   * Initialize the Notion API client
   * @returns {Object} Notion client instance
   */
  initializeClient: async () => {
    try {
      const apiKey = process.env.APP_NOTION_API_KEY;
      
      if (!apiKey || apiKey === 'your_notion_api_key') {
        throw new Error('Notion API key is not configured. Please update your .env file.');
      }

      notionModel.client = new Client({ auth: apiKey });
      
      // Verify the client by getting user information
      const user = await notionModel.client.users.me();
      return { client: notionModel.client, user };
    } catch (error) {
      console.error('Error in initializeClient:', error);
      throw error;
    }
  },

  /**
   * Get database information from Notion
   * @param {string} databaseId - The ID of the Notion database
   * @param {Object} query - Query parameters for the database
   * @returns {Object} Database information
   */
  getDatabase: async (databaseId, query) => {
    try {
      if (!notionModel.client) {
        await notionModel.initializeClient();
      }

      // Query the database
      const response = await notionModel.client.databases.query({
        database_id: databaseId,
        ...query
      });

      return response;
    } catch (error) {
      console.error('Error in getDatabase:', error);
      throw error;
    }
  },
  
  /**
   * Get page information from Notion
   * @param {string} pageId - The ID of the Notion page
   * @returns {Object} Page information
   */
  order: async (pageObj) => {
    try {
      if (!notionModel.client) {
        await notionModel.initializeClient();
      }

      // Retrieve the page
      const response = await notionModel.client.pages.create({
        ...pageObj
      });

      return response;
    } catch (error) {
      console.error('Error in order:', error);
      throw error;
    }
  },
};

module.exports = notionModel;