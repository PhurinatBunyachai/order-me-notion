# Notion API Integration

A simple Express.js application that integrates with the Notion API using MVC pattern.

## Project Structure

```
notion-api/
├── controllers/        # Controllers for handling business logic
├── models/             # Models for data operations
├── routes/             # Route definitions
├── .env                # Environment variables
├── app.js              # Express application setup
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure your `.env` file with your Notion API key:
   ```
   PORT=3000
   NOTION_API_KEY=your_notion_api_key
   ```
   You can obtain your Notion API key from https://www.notion.so/my-integrations

## Running the Application

```
node app.js
```

Or if you have nodemon installed:

```
nodemon app.js
```

## API Endpoints

### Initialize Notion API

```
GET /notion/innit
```

Initializes the Notion API client and verifies the connection.

### Get Database Information

```
GET /notion/database?databaseId=YOUR_DATABASE_ID
```

Retrieves information about a specific Notion database.

## Error Handling

The application includes error handling middleware that will return appropriate error responses for various scenarios.

## Dependencies

- Express.js: Web framework
- @notionhq/client: Official Notion SDK
- dotenv: Environment variable management# order-me-notion
