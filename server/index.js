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

// MongoDB + Server setup
const PORT = process.env.PORT || 5000;
const MONGO =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/mern_oauth_unsplash";

// Mongo connection
mongoose
  .connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    app.listen(PORT, () =>
      console.log(`🚀 Server running on ${PORT} (without DB)`)
    );
  });

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Backend running successfully ✅",
    unsplashKey: !!process.env.UNSPLASH_ACCESS_KEY,
  });
});
