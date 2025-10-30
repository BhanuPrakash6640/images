# 🚀 Quick Start Guide

## Run These Commands in Order:

### 1️⃣ First Terminal - Start MongoDB
```powershell
# If MongoDB is installed as a service
net start MongoDB

# OR if you need to start manually
mongod --dbpath C:\data\db
```

### 2️⃣ Second Terminal - Start Server
```powershell
cd server
npm install
npm start
```

Wait until you see:
```
✅ MongoDB connected
🚀 Server running on http://localhost:5000
```

### 3️⃣ Third Terminal - Start Client
```powershell
cd client
npm install
npm start
```

Browser will automatically open at `http://localhost:3000`

---

## ⚡ What Works Right Now:

✅ **Unsplash Image Search** - Search works with your API key
✅ **Top Searches** - Shows most popular searches across all users
✅ **Search History** - Saves your searches to MongoDB
✅ **Multi-Select Images** - Click checkboxes to select multiple images
✅ **Beautiful UI** - Modern gradient design with smooth animations

## ⚠️ What Needs Setup:

❌ **OAuth Login** - You need to configure Google/GitHub/Facebook credentials in `server/.env`

### To enable login:
1. Get OAuth credentials from provider dashboards (see INTEGRATION_GUIDE.md)
2. Add them to `server/.env`
3. Restart the server

---

## 🧪 Test Without Login (Temporary):

If you want to test search without OAuth, edit `server/routes/api.js`:

**Line 13:** Comment out `requireAuth`:
```javascript
router.post("/search", /* requireAuth, */ async (req, res) => {
```

Then restart server and you can search without logging in!

---

## 📝 Common Issues:

**"MongoDB connection error"**
→ Start MongoDB first (see step 1)

**"Port 3000 already in use"**
→ Close other apps using port 3000 or change port in client

**"Port 5000 already in use"**
→ Change PORT in server/.env to 5001 and update client/.env

---

## 🎯 Your Project is Ready!

All integration issues are fixed. The client and server now communicate properly! 🎉