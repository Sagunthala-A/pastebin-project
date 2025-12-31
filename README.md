# Pastebin Lite

Pastebin Lite is a lightweight full-stack web application that allows users to create and share text snippets using a unique link.  
Each paste can optionally expire based on time (TTL) or number of views.

This project is built with a separate frontend and backend using a clean and simple architecture.

---

## Features

- Create text pastes and share via a unique URL
- Optional time-based expiry (TTL in seconds)
- Optional view count limit
- Combined constraints (paste expires when first condition is met)
- Deterministic testing support using TEST_MODE
- Safe rendering of paste content (no script execution)
- Simple and clean user interface

---

## Tech Stack

### Frontend
- React (Vite)
- JavaScript
- React Router

### Backend
- Node.js
- Express
- TypeScript
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel (Frontend and Backend)
- MongoDB Atlas (Persistence Layer)

---

## Running Locally

### Prerequisites
- Node.js 18+
- npm or yarn package manager

---

### Installation

1. Clone the repository
```bash
git clone https://github.com/Sagunthala-A/pastebin-project.git
cd pastebin-project
```
#### Install backend dependencies

```bash
cd backend
npm install
```
#### Install frontend dependencies

```bash
cd frontend
npm install
```
### Environment Variables

#### Backend (backend/.env)
.env
```
MONGO_URI=your_mongodb_atlas_url
# Example values for local development
BASE_URL=http://localhost:5173
TEST_MODE=0
```
#### Frontend (frontend/.env)
.env
```
# Example values for local development
VITE_API_BASE=http://localhost:3000/api
```
#### Run the Application
##### Start Backend
```
cd backend
npm run dev
```
Backend runs on port 3000 by default.

```
http://localhost:3000
```
##### Start Frontend
bash
```
cd frontend
npm run dev
```
Frontend runs on:

```
http://localhost:5173
```

## Building for Production
```
npm run build
```

## API Endpoints

### Health Check

```
GET /api/healthz
```
Response:
```
json
{ "ok": true }
```

### Create a Paste

```
POST /api/pastes
```
Request Body:

```json
{
  "content": "Your text content here",
  "ttl_seconds": 60,
  "max_views": 5
}
```
Response:

json
```
{
  "id": "paste_id",
  "url": "https://your-app.vercel.app/p/paste_id"
}
```

### Fetch a Paste (API)

```
GET /api/pastes/:id
```
Response:
```
json
{
  "content": "Your text content here",
  "remaining_views": 4,
  "expires_at": "2026-01-01T00:00:00.000Z"
}
```
Returns HTTP 404 if the paste is expired or not found.

### View a Paste (HTML)

```
GET /p/:id
```
Displays the paste as plain text.
Returns HTTP 404 if unavailable.

## Deterministic Time for Testing
For automated testing, deterministic time is supported.

If this environment variable is set:

env
```
TEST_MODE=1
```
And the request header is provided:

```
x-test-now-ms: <milliseconds since epoch>
```

That value is used as the current time for expiry logic.
If not provided, real system time is used.

## Persistence Layer
MongoDB Atlas is used as the persistence layer.

#### Why MongoDB Atlas:
   - Cloud-hosted and reliable
   - Data persists across restarts
   - Works well with serverless deployments
   - Simple schema using Mongoose


## Design Decisions
   - Paste expires as soon as TTL or view limit is reached
   - Remaining views never go below zero
   - All expired or unavailable pastes return HTTP 404
   - Content is safely rendered to prevent XSS
   - Clean separation of frontend and backend

## Deployment
Push the repository to GitHub

Import the project into Vercel

Set environment variables in Vercel dashboard

Deploy

The app will be live at:

```
https://pastebin-project-frontend.vercel.app
```
No manual database setup is required after deployment.
