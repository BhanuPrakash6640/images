# 🎨 Client Deployment Guide for Vercel

## ✅ Fixed Client Configuration

I've simplified the `client/vercel.json` to work properly with Create React App.

---

## 🚀 How to Deploy Client to Vercel

### Step 1: Create New Project in Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `BhanuPrakash6640/images`

### Step 2: Configure the Project

**IMPORTANT:** Set these settings correctly:

- **Project Name:** `mern-oauth-unsplash-client` (or any name you want)
- **Framework Preset:** `Create React App`
- **Root Directory:** `client` ⚠️ **MUST SET THIS!**
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `build` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

### Step 3: Add Environment Variable

Click **"Environment Variables"** and add:

```
Name: REACT_APP_SERVER_URL
Value: https://your-backend-url.vercel.app
```

**Replace `your-backend-url` with your actual backend URL!**

For example:
```
REACT_APP_SERVER_URL=https://images-seven-jet.vercel.app
```

### Step 4: Deploy

Click **"Deploy"** button and wait for deployment to complete.

---

## 🔄 After Deployment

### Update Backend Environment Variables

1. Go to your **backend** project in Vercel
2. Go to **Settings** → **Environment Variables**
3. Update `CLIENT_URL` with your frontend URL:
   ```
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```
4. Click **"Save"**
5. Go to **Deployments** tab
6. Click **"Redeploy"** on the latest deployment

---

## ✅ Testing Your Deployment

1. Visit your frontend URL: `https://your-frontend-url.vercel.app`
2. You should see the app with gradient background
3. Try searching for images (e.g., "cats", "nature")
4. Check if images load from Unsplash
5. Verify top searches work
6. Check that selected images counter works

---

## 🐛 Troubleshooting

### Issue: Blank Page or 404
**Solution:** 
- Make sure Root Directory is set to `client`
- Check if build completed successfully in deployment logs

### Issue: "Network Error" when searching
**Solution:**
- Check if `REACT_APP_SERVER_URL` is set correctly
- Make sure backend URL is correct (with https://)
- Verify backend is deployed and working

### Issue: CORS Error
**Solution:**
- Update `CLIENT_URL` in backend environment variables
- Must include `https://` and exact URL
- Redeploy backend after updating

### Issue: Images not loading
**Solution:**
- Check if Unsplash API key is set in backend
- Verify backend is connected to MongoDB Atlas
- Check backend logs for errors

---

## 📋 Deployment Checklist

### Backend (Server):
- [x] Deployed to Vercel
- [x] Root directory: `server`
- [x] MongoDB Atlas URI configured
- [x] All environment variables set
- [ ] `CLIENT_URL` updated with frontend URL
- [ ] Redeployed after updating CLIENT_URL

### Frontend (Client):
- [ ] Deployed to Vercel
- [ ] Root directory: `client`
- [ ] Framework: Create React App
- [ ] `REACT_APP_SERVER_URL` set to backend URL
- [ ] Build successful
- [ ] App loads correctly

---

## 🎉 Success Indicators

When everything is working:
- ✅ Frontend loads with beautiful gradient UI
- ✅ Search works and returns images
- ✅ Top searches display (if any exist)
- ✅ Image selection works
- ✅ No console errors
- ✅ No CORS errors

---

## 📝 Example URLs

After deployment, you'll have:
- **Backend:** `https://images-seven-jet.vercel.app`
- **Frontend:** `https://mern-oauth-unsplash-client.vercel.app`

Make sure they're configured to talk to each other!

---

## 💡 Pro Tips

1. **Always set Root Directory** - This is the most common mistake
2. **Use HTTPS** - Vercel URLs always use https://
3. **Check logs** - Vercel shows detailed build and runtime logs
4. **Redeploy after env changes** - Environment variables need redeployment
5. **Test locally first** - Make sure it works on localhost before deploying

---

Need help? Check the deployment logs in Vercel dashboard!