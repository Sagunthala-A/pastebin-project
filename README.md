# Pastebin Lite

Pastebin Lite is a simple full-stack web application that allows users to create and share text pastes using a link.  
Each paste can optionally expire after a certain time or after a limited number of views.

---

## Features

- Create and share text pastes
- Optional time-based expiry (TTL in seconds)
- Optional view count limit
- Paste becomes unavailable when:
  - Time expires, or
  - View limit is reached
- Safe rendering of paste content
- Proper error handling (404 for expired or invalid pastes)

---

## Tech Stack

**Frontend**
- React (Vite)
- JavaScript
- React Router

**Backend**
- Node.js
- Express
- TypeScript
- MongoDB Atlas

**Deployment**
- Vercel
- MongoDB Atlas (Persistence)

---

## How It Works

1. User creates a paste from the UI
2. Backend stores the paste in MongoDB
3. Backend returns a shareable URL
4. When the URL is opened:
   - Expiry time is checked
   - Remaining views are checked
5. If valid → content is shown  
   If expired → HTTP 404 is returned

---

## API Endpoints

### Health Check
GET /api/healthz

Response:
```json
{ "ok": true }

Create Paste
POST /api/pastes


Request body:

{
  "content": "Hello World",
  "ttl_seconds": 60,
  "max_views": 5
}


Response:

{
  "id": "paste_id",
  "url": "https://your-app.vercel.app/p/paste_id"
}

View Paste (API)
GET /api/pastes/:id


Returns paste content or 404 if expired.

View Paste (UI)
GET /p/:id


Displays the paste safely as plain text.

Deterministic Time for Testing

For automated testing:

If this environment variable is set:

TEST_MODE=1


Then the request header:

x-test-now-ms: <milliseconds since epoch>


is treated as the current time for expiry checks.

Environment Variables
Backend
MONGO_URI=your_mongodb_atlas_url
BASE_URL=https://your-frontend-domain.vercel.app
TEST_MODE=0

Frontend
VITE_API_BASE=/api

Run Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

Notes

No hardcoded localhost URLs in production

No secrets committed to the repository

Persistent database (not in-memory)

Clean and simple project structure

