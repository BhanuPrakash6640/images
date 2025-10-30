# 🔧 Vercel Deployment Fix

## ✅ What I Fixed

The "FUNCTION_INVOCATION_FAILED" error was caused by the server code not being compatible with Vercel's serverless environment.

### Changes Made:

1. **Modified `server/index.js`:**
   - Changed from `app.listen()` to `module.exports = app` for serverless
   - Added connection caching for MongoDB (serverless best practice)
   - Added environment check to only listen on port in local development

2. **Updated `vercel.json`:**
   - Simplified configuration for backend-only deployment
   - Added NODE_ENV=production

---

## 🚀 How to Deploy Now

### Step 1: Set Up MongoDB Atlas (REQUIRED)

You **MUST** use MongoDB Atlas for Vercel deployment (local MongoDB won't work):

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add `/image_search` before the `?` to specify database name:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/image_search?retryWrites=true&w=majority
   ```

### Step 2: Deploy Backend to Vercel

1. Go to your Vercel dashboard
2. Import your GitHub repository
3. **Configure Project:**
   - **Root Directory:** `server`
   - **Framework Preset:** Other
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)

4. **Add Environment Variables:**
   ```
   UNSPLASH_ACCESS_KEY=MXmN-RaOVBhjep_gTZ4-3WS1MXPja3QZkdKBs9obHHw
   MONGO_URI=mongodb+srv://your-connection-string-here
   SESSION_SECRET=some-random-secret-key-here
   CLIENT_URL=https://your-frontend-url.vercel.app
   SERVER_URL=https://your-backend-url.vercel.app
   NODE_ENV=production
   ```

5. Click **Deploy**

### Step 3: Deploy Frontend to Vercel

1. Create a **NEW** project in Vercel
2. Import the **SAME** GitHub repository
3. **Configure Project:**
   - **Root Directory:** `client`
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

4. **Add Environment Variable:**
   ```
   REACT_APP_SERVER_URL=https://your-backend-url.vercel.app
   ```
   (Use the backend URL from Step 2)

5. Click **Deploy**

### Step 4: Update Environment Variables

After both deployments:

1. **Update Backend Environment Variables:**
   - Go to backend project settings
   - Update `CLIENT_URL` with your frontend URL
   - Update `SERVER_URL` with your backend URL
   - **Redeploy**

2. **Update Frontend Environment Variable:**
   - Go to frontend project settings
   - Confirm `REACT_APP_SERVER_URL` points to backend
   - **Redeploy** if needed

---

## ✅ Testing

After deployment:

1. Visit your frontend URL: `https://your-frontend.vercel.app`
2. Try searching for images
3. Check if results appear
4. Verify top searches work
5. Check search history (if logged in)

---

## 🐛 If Still Not Working

### Check Vercel Logs:
1. Go to your backend project in Vercel
2. Click on the deployment
3. Click "Functions" tab
4. Check the logs for errors

### Common Issues:

**MongoDB Connection Failed:**
- Make sure you're using MongoDB Atlas URI (not localhost)
- Check if password in URI is correct
- Whitelist all IPs in MongoDB Atlas Network Access

**CORS Errors:**
- Make sure `CLIENT_URL` in backend matches your frontend URL exactly
- Include `https://` in the URL

**Environment Variables Not Working:**
- Redeploy after adding/updating variables
- Check spelling of variable names

---

## 📝 Quick Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Connection string copied and password replaced
- [ ] Backend deployed with correct root directory (`server`)
- [ ] All backend environment variables added
- [ ] Frontend deployed with correct root directory (`client`)
- [ ] Frontend environment variable added
- [ ] Both URLs updated in each other's environment variables
- [ ] Both projects redeployed
- [ ] Tested the live app

---

## 🎉 Success!

Once everything is configured:
- Your backend will be at: `https://your-backend.vercel.app`
- Your frontend will be at: `https://your-frontend.vercel.app`
- MongoDB will be hosted on Atlas

Your MERN app will be fully functional in production! 🚀