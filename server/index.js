// Load environment variables
require("dotenv").config();
console.log("🔑 UNSPLASH_ACCESS_KEY:", process.env.UNSPLASH_ACCESS_KEY ? "Loaded ✅" : "❌ Missing!");

// Imports
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");
const bodyParser = require("body-parser");

// Routes
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");

const app = express();

// Load passport configuration
require("./config/passport");

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "keyboard cat"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// MongoDB connection
const MONGO =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_oauth_unsplash";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

// Connect to DB on startup
connectDB();

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Backend running successfully ✅",
    unsplashKey: !!process.env.UNSPLASH_ACCESS_KEY,
    mongoConnected: mongoose.connection.readyState === 1,
  });
});

// ✅ Always listen on a port (Render needs this)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running and listening on port ${PORT}`);
});
