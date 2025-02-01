
# Multilingual FAQ API

## Overview

Multilingual FAQ API is a RESTful API designed to manage FAQs in multiple languages. It integrates with Google Cloud Translate to provide language translation and uses Redis for caching. This API also secures routes using JWT for authentication. 

Additionally, an **Admin Dashboard** is available where the admin can log in, create new FAQs, and delete existing FAQs. JWT is used for secure authorization of admin routes.

## Features

- **Multilingual Support**: Translates FAQs to various languages.
- **Caching**: Leverages Redis for efficient caching.
- **Authentication**: Implements JWT for secure access to protected routes.
- **CRUD Operations**: Full support for creating, reading, updating, and deleting FAQs.

## Prerequisites

- Node.js (v14+)
- MongoDB (for data storage)
- Redis (for caching)

## Installation (VS Code Environment)

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/multilingual-faq-api.git
   ```

2. Open the project in VS Code:

   ```bash
   code multilingual-faq-api
   ```

3. Install dependencies: Open the integrated terminal in VS Code and run:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file at the root of the project:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your-db-name
   JWT_SECRET=your-secret-key
   REDIS_URL=redis://localhost:6379
   GOOGLE_PROJECT_ID=your-google-project-id
   GOOGLE_CREDENTIALS=path-to-google-credentials-json
   ```

   VS Code has an extension called DotENV which you can install for easier handling of environment files.

## Running the Application (VS Code)

1. Start the server: In the VS Code integrated terminal, run:

   ```bash
   npm run dev
   ```

   This will start the API server in development mode with nodemon (auto-reload on changes).

## API Endpoints

- **GET /api/faqs**: Retrieve a list of FAQs.
- **GET /admin/login**: Get the login page for Admin.
- **GET /admin.dashboard**: Get the Dashboard for Admin.
- **POST /admin/create-faqs**: Add a new FAQ.
- **GET /api/faqs/?lang=hi**: Retrieve a list of FAQS in Hindi.
- **GET /api/faqs/?lang=bn**: Retrieve a list of FAQS in Bengali.
- **DELETE /faqs/:id**: Delete an FAQ by ID.

## Testing (VS Code)

1. Run tests: In the terminal, run:

   ```bash
   npm run test
   ```

2. VS Code Testing Tools:

   Install the Jest or Mocha extensions for VS Code to see your test results directly within the editor.

   You can also configure test scripts to run directly from the VS Code test explorer.

## Technologies

- **Express.js**: Web framework.
- **MongoDB**: NoSQL database for data storage.
- **Redis**: In-memory database for caching.
- **Google Cloud Translate API**: Provides translation functionality.
- **JWT**: For secure authentication.



