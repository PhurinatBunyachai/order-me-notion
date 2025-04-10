const express = require('express');
const router = express.Router();
const notionController = require('../controllers/notion.controller');

// Route to initialize Notion API connection
router.get('/init', notionController.initializeNotion);

// Route to interact with Notion databases
router.post('/database', notionController.getDatabase);

// Route to interact with Notion order database
router.post('/database/order', notionController.getOrderDatabase);

// Route to retrieve a Notion page
router.post('/page', notionController.order);

module.exports = router;