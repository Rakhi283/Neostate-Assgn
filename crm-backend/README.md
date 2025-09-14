# CRM Backend (Node + Express + MongoDB + JWT)

## Setup (local)
1. Copy `.env.example` to `.env` and update values (MONGO_URI, JWT_SECRET).
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. API base: `http://localhost:5000/api`

## Endpoints (summary)
- POST /api/auth/signup
- POST /api/auth/login
- GET/POST/PUT/DELETE /api/leads
- POST /api/leads/:id/convert
- GET/POST/PUT/DELETE /api/opportunities
