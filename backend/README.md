# ResumeRise — Backend API 🚀

Express.js and MongoDB REST API backend for the ResumeRise platform.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your database URI and API keys:
- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 8000)
- `JWT_SECRET`: Secret key for JWT token generation
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google Cloud OAuth credentials
- `OPENAI_API_KEY`: OpenAI API key (for GPT-4o-mini powered resume descriptions)

### 3. Run Server
```bash
# Production start
npm start

# Development mode (nodemon)
npm run dev
```

Health check is available at `GET http://localhost:8000/api/health`.

For full documentation and API references, see the [Root README](../README.md).

