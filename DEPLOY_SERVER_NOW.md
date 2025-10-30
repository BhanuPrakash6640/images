# 🚀 Deploy Your Server to Vercel - Step by Step

## Current Situation
✅ Client is deployed and running
❌ Server is NOT deployed yet

You need to create a **SECOND Vercel project** for the backend.

---

## 📋 Steps to Deploy the Server

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**

### Step 2: Import Your Repository Again
1. Select your GitHub repository: `BhanuPrakash6640/images`
2. Click **"Import"**

### Step 3: Configure the Server Deployment
⚠️ **CRITICAL:** Set these configurations correctly!

**Project Name:** Give it a different name (e.g., `images-backend` or `images-server`)

**Root Directory:** 
- Click **"Edit"** next to Root Directory
- Select **`server`** from the dropdown
- This tells Vercel to deploy ONLY the server folder

**Framework Preset:** 
- Select **"Other"**

**Build Command:** 
- Leave EMPTY (no build needed for backend)

**Output Directory:** 
- Leave EMPTY

**Install Command:** 
- Leave as default (`npm install`)

### Step 4: Add Environment Variables
Click on **"Environment Variables"** and add these:

```
UNSPLASH_ACCESS_KEY=MXmN-RaOVBhjep_gTZ4-3WS1MXPja3QZkdKBs9obHHw
SESSION_SECRET=mySecretKey123ChangeLater
NODE_ENV=production
```

**MongoDB - IMPORTANT:**
```
MONGO_URI=<your-mongodb-atlas-connection-string>
```
⚠️ You MUST use MongoDB Atlas (not localhost)!
- Sign up at: https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string
- Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/image_search?retryWrites=true&w=majority`

**URLs (Add these after deployment):**
```
CLIENT_URL=<your-frontend-vercel-url>
SERVER_URL=<will-be-generated-after-deploy>
```

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment to complete
3. Copy your backend URL (e.g., `https://images-backend.vercel.app`)

---

## 🔄 Step 6: Update Environment Variables

### Update Backend:
1. Go to your backend project settings
2. Add/Update:
   ```
   CLIENT_URL=<your-frontend-url>
   SERVER_URL=<your-backend-url>
   ```
3. Click **"Redeploy"**

### Update Frontend:
1. Go to your frontend project settings
2. Add/Update:
   ```
   REACT_APP_SERVER_URL=<your-backend-url>
   ```
3. Click **"Redeploy"**

---

## ✅ Verification

After both are deployed, test:

1. **Backend health check:**
   - Visit: `https://your-backend-url.vercel.app/`
   - Should see: `{"message":"Backend running successfully ✅",...}`

2. **Frontend works:**
   - Visit: `https://your-frontend-url.vercel.app/`
   - Try searching for images
   - Should fetch results from backend

---

## 🐛 If You Get Errors

### "FUNCTION_INVOCATION_FAILED" 
✅ Already fixed! The passport configuration is now properly loaded.

### "MongoDB connection failed"
❌ You're using localhost instead of MongoDB Atlas
✅ Get MongoDB Atlas URI and add it to environment variables

### "CORS error"
❌ CLIENT_URL not set correctly in backend
✅ Make sure CLIENT_URL matches your frontend URL exactly

### "404 Not Found"
❌ Root directory not set to `server`
✅ Go to project settings → General → Root Directory → Edit → Select `server`

---

## 📝 Quick Summary

You need **TWO** Vercel projects:

| Project | Root Directory | Purpose |
|---------|---------------|---------|
| Project 1 (Frontend) | `client` | Serves React app |
| Project 2 (Backend) | `server` | API endpoints |

Both projects use the SAME GitHub repository, just different root directories!

---

## 🎯 Next Steps

1. ✅ Fix is already in GitHub (passport configuration)
2. 🔄 Deploy server as NEW Vercel project (root: `server`)
3. 🔄 Get MongoDB Atlas connection string
4. 🔄 Update environment variables in both projects
5. 🔄 Redeploy both
6. ✅ Test your app!

---

*Once the server is deployed, your full MERN app will be live! 🚀*
