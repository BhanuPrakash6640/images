# MERN Image Search + OAuth (Internship Task)

## What this is
A complete starter project implementing the assignment:
- OAuth login (Google, GitHub, Facebook) with Passport.js
- Search images from Unsplash API (server-side) and store searches in MongoDB
- Top searches banner (aggregated across users)
- Multi-select grid of images
- User search history

## What you need to run (you must do these)
1. Node.js (v18+ recommended) and npm
2. MongoDB running locally or a MongoDB URI
3. Register apps for OAuth providers (Google, GitHub, Facebook) and get client IDs/secrets
4. Create an Unsplash developer application and get an access key

## Setup
1. Copy `/server/.env.example` to `/server/.env` and fill the values (UNSPLASH_ACCESS_KEY, OAUTH keys, MONGO_URI, SESSION_SECRET).
2. In project root run:
   - `cd server && npm install`
   - `cd ../client && npm install`
3. Start server: `cd server && npm run start`
4. Start client: `cd client && npm run start`
5. Open http://localhost:3000

## Important notes
- OAuth redirect URLs must match `SERVER_URL + /auth/<provider>/callback` that you set on provider dashboards.
- This repo includes placeholders. The app **will not** contact Unsplash or allow real OAuth until you fill `.env` values.

## API endpoints (examples)
- `GET /auth/me` — returns current user (requires cookie)
- `GET /api/top-searches` — top 5 terms
- `POST /api/search` — search images (body: `{ term: "cats" }`) — requires authentication
- `GET /api/history` — user history — requires authentication

## Postman
A Postman collection `postman_collection.json` is included for quickly testing endpoints.

---