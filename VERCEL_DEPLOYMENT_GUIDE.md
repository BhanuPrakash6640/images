# 🚀 Vercel Deployment Guide

## ⚠️ Important: Deploy Client and Server Separately

Your MERN app has two parts that need to be deployed separately:

### 📦 Part 1: Deploy Backend (Server)

1. **Go to Vercel Dashboard**
2. **Import your GitHub repository** (https://github.com/BhanuPrakash6640/images)
3. **Configure the backend deployment:**
   - **Root Directory:** `server`
   - **Framework Preset:** Other
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
   - **Install Command:** `npm install`

4. **Add Environment Variables:**
   ```
   PORT=5000
   UNSPLASH_ACCESS_KEY=MXmN-RaOVBhjep_gTZ4-3WS1MXPja3QZkdKBs9obHHw
   MONGO_URI=<your-mongodb-atlas-uri>
   SESSION_SECRET=your-secret-key-change-this
   CLIENT_URL=<your-vercel-frontend-url>
   SERVER_URL=<your-vercel-backend-url>
   ```

5. **Deploy** - You'll get a URL like: `https://your-backend.vercel.app`

---

### 🎨 Part 2: Deploy Frontend (Client)

1. **Create a NEW project in Vercel**
2. **Import the SAME GitHub repository**
3. **Configure the frontend deployment:**
   - **Root Directory:** `client`
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

4. **Add Environment Variable:**
   ```
   REACT_APP_SERVER_URL=<your-vercel-backend-url>
   ```
   (Use the backend URL from Part 1)

5. **Deploy** - You'll get a URL like: `https://your-frontend.vercel.app`

---

## 🔄 Update Environment Variables

After both are deployed:

### Update Backend:
Go to backend project settings and update:
```
CLIENT_URL=https://your-frontend.vercel.app
SERVER_URL=https://your-backend.vercel.app
```

### Update Frontend:
Go to frontend project settings and update:
```
REACT_APP_SERVER_URL=https://your-backend.vercel.app
```

**Redeploy both** after updating environment variables.

---

## 🗄️ MongoDB Atlas Setup (Required)

Since Vercel is serverless, you can't use local MongoDB. You need MongoDB Atlas:

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Create a free account**
3. **Create a cluster** (free tier)
4. **Get connection string:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/image_search?retryWrites=true&w=majority`

5. **Add to backend environment variables:**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/image_search?retryWrites=true&w=majority
   ```

6. **Whitelist Vercel IPs:**
   - In MongoDB Atlas, go to Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (or add Vercel's IP ranges)

---

## 🔧 Alternative: Single Deployment (Not Recommended for MERN)

If you want to deploy as a single app (not recommended):

1. Move all client files to root
2. Configure server to serve static files
3. Build client and serve from server

But **separate deployments are better** for:
- ✅ Better performance
- ✅ Independent scaling
- ✅ Easier debugging
- ✅ Cleaner architecture

---

## 📝 Quick Checklist

### Backend Deployment:
- [ ] Root directory set to `server`
- [ ] All environment variables added
- [ ] MongoDB Atlas URI configured
- [ ] Deployed successfully
- [ ] Note the backend URL

### Frontend Deployment:
- [ ] Root directory set to `client`
- [ ] REACT_APP_SERVER_URL points to backend
- [ ] Deployed successfully
- [ ] Note the frontend URL

### Post-Deployment:
- [ ] Update backend CLIENT_URL with frontend URL
- [ ] Update backend SERVER_URL with backend URL
- [ ] Redeploy both
- [ ] Test the live app
- [ ] OAuth redirects working (if configured)

---

## 🐛 Common Issues

### Issue: 404 Error
**Cause:** Wrong root directory or missing vercel.json
**Solution:** Set correct root directory in Vercel settings

### Issue: Environment Variables Not Working
**Cause:** Not redeployed after adding variables
**Solution:** Redeploy after adding/updating env vars

### Issue: MongoDB Connection Failed
**Cause:** Using local MongoDB URI
**Solution:** Use MongoDB Atlas URI

### Issue: CORS Errors
**Cause:** CLIENT_URL not set correctly in backend
**Solution:** Update CLIENT_URL to match frontend URL

### Issue: OAuth Not Working
**Cause:** Callback URLs not updated in provider dashboards
**Solution:** Update OAuth callback URLs to use Vercel backend URL

---

## 🎉 Success!

Once both are deployed and configured:
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app`

Your MERN app will be live! 🚀

---

## 💡 Pro Tips

1. **Use environment variables** for all sensitive data
2. **Never commit .env files** to GitHub
3. **Test locally first** before deploying
4. **Check Vercel logs** if something goes wrong
5. **Use MongoDB Atlas** for production database
6. **Set up OAuth** with production URLs

---

*Need help? Check Vercel documentation or MongoDB Atlas docs.*