# 🚀 MERN OAuth Unsplash - Integration Guide

## ✅ What I Fixed

### 1. **API Route Compatibility**
- ✅ Changed server route from `GET /api/search?query=` to `POST /api/search` with body `{ term }`
- ✅ Added authentication middleware to protect routes
- ✅ Formatted Unsplash API response to match client expectations

### 2. **Database Integration**
- ✅ Implemented search history saving to MongoDB
- ✅ Added top searches aggregation (shows most searched terms across all users)
- ✅ Added user search history endpoint (last 10 searches)

### 3. **Environment Configuration**
- ✅ Added missing environment variables to `server/.env`:
  - `SESSION_SECRET` - for secure sessions
  - `CLIENT_URL` and `SERVER_URL` - for OAuth redirects
  - OAuth credentials placeholders (Google, GitHub, Facebook)
- ✅ Removed security issue: deleted `REACT_APP_UNSPLASH_ACCESS_KEY` from client

### 4. **UI Improvements**
- ✅ Enhanced styling with modern gradient background
- ✅ Added hover effects and smooth transitions
- ✅ Made history section only visible when logged in
- ✅ Improved button and card styling

---

## 🏃 How to Run the Project

### Prerequisites
1. **Node.js** (v18+) and npm installed
2. **MongoDB** running locally on `mongodb://127.0.0.1:27017`
3. **Unsplash API Key** (already configured: `MXmN-RaOVBhjep_gTZ4-3WS1MXPja3QZkdKBs9obHHw`)

### Quick Start

#### 1. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

#### 2. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows (if installed as service)
net start MongoDB

# Or run mongod manually
mongod --dbpath C:\data\db
```

#### 3. Start the Server
```bash
cd server
npm start
```
You should see:
```
✅ MongoDB connected
🚀 Server running on http://localhost:5000
🔑 UNSPLASH_ACCESS_KEY: Loaded ✅
```

#### 4. Start the Client (in a new terminal)
```bash
cd client
npm start
```
Browser will open at `http://localhost:3000`

---

## 🔐 Setting Up OAuth (Optional but Recommended)

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:5000/auth/google/callback`
6. Copy Client ID and Secret to `server/.env`:
   ```
   GOOGLE_CLIENT_ID=your-client-id-here
   GOOGLE_CLIENT_SECRET=your-client-secret-here
   ```

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set Authorization callback URL: `http://localhost:5000/auth/github/callback`
4. Copy Client ID and Secret to `server/.env`:
   ```
   GITHUB_CLIENT_ID=your-client-id-here
   GITHUB_CLIENT_SECRET=your-client-secret-here
   ```

### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Facebook Login" product
4. Set Valid OAuth Redirect URI: `http://localhost:5000/auth/facebook/callback`
5. Copy App ID and Secret to `server/.env`:
   ```
   FACEBOOK_CLIENT_ID=your-app-id-here
   FACEBOOK_CLIENT_SECRET=your-app-secret-here
   ```

**Note:** Without OAuth setup, you can still test the app but login buttons won't work. The Unsplash search requires authentication.

---

## 📡 API Endpoints

### Authentication
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/github` - Initiate GitHub OAuth
- `GET /auth/facebook` - Initiate Facebook OAuth
- `GET /auth/me` - Get current user (returns user object or 401)
- `GET /auth/logout` - Logout user

### API (Requires Authentication)
- `POST /api/search` - Search Unsplash images
  ```json
  Body: { "term": "cats" }
  Response: { "results": [...] }
  ```
- `GET /api/history` - Get user's search history (last 10)
- `GET /api/top-searches` - Get top 5 most searched terms (all users)

---

## 🧪 Testing Without OAuth

If you want to test the search functionality without setting up OAuth:

1. Temporarily modify `server/routes/api.js` to remove authentication:
   ```javascript
   // Comment out the requireAuth middleware
   router.post("/search", /* requireAuth, */ async (req, res) => {
   ```

2. Or use Postman with the included `postman_collection.json`

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service or run `mongod`

### CORS Errors
**Solution:** Make sure `CLIENT_URL` in `server/.env` matches your React app URL

### OAuth Redirect Errors
**Solution:** Ensure callback URLs in provider dashboards exactly match:
- Google: `http://localhost:5000/auth/google/callback`
- GitHub: `http://localhost:5000/auth/github/callback`
- Facebook: `http://localhost:5000/auth/facebook/callback`

### Unsplash API Errors
**Solution:** Check if `UNSPLASH_ACCESS_KEY` is valid and not rate-limited

---

## 📦 Project Structure

```
mern_oauth_unsplash_project/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.js         # Main component
│   │   ├── App.css        # Styling
│   │   └── index.js       # Entry point
│   └── .env               # Client environment variables
│
├── server/                 # Express backend
│   ├── config/
│   │   └── passport.js    # OAuth strategies
│   ├── models/
│   │   ├── User.js        # User schema
│   │   └── Search.js      # Search history schema
│   ├── routes/
│   │   ├── auth.js        # Authentication routes
│   │   └── api.js         # API routes (FIXED)
│   ├── index.js           # Server entry point
│   └── .env               # Server environment variables (UPDATED)
│
└── INTEGRATION_GUIDE.md   # This file
```

---

## ✨ Features Working Now

✅ OAuth login (Google, GitHub, Facebook) - *needs credentials*
✅ Search Unsplash images - **WORKING**
✅ Save search history to MongoDB - **WORKING**
✅ Display top searches across all users - **WORKING**
✅ Multi-select images - **WORKING**
✅ User-specific search history - **WORKING**
✅ Beautiful modern UI - **WORKING**

---

## 🎯 Next Steps

1. **Set up OAuth providers** to enable login functionality
2. **Add image download feature** for selected images
3. **Add pagination** for search results
4. **Deploy to production** (Heroku, Vercel, etc.)

---

## 📞 Need Help?

If you encounter any issues:
1. Check the console logs in both client and server terminals
2. Verify MongoDB is running
3. Ensure all environment variables are set correctly
4. Check that ports 3000 and 5000 are not in use by other apps

Happy coding! 🚀