const express = require("express");
// Node v18+ has native fetch, no need to import
const router = express.Router();
const Search = require("../models/Search");

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
};

// ✅ Search photos route (POST with body)
// NOTE: Authentication temporarily disabled for testing
router.post("/search", /* requireAuth, */ async (req, res) => {
  const { term } = req.body;
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!term) {
    return res.status(400).json({ error: "Search term is required" });
  }

  if (!accessKey) {
    console.error("❌ Missing Unsplash key in backend!");
    return res.status(401).json({ error: "Missing Unsplash key" });
  }

  try {
    // Fetch from Unsplash
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(term)}&per_page=30&client_id=${accessKey}`
    );

    const data = await response.json();

    if (data.errors) {
      console.error("❌ Unsplash API error:", data.errors);
      return res.status(403).json({ error: "Unsplash authentication failed", details: data.errors });
    }

    // Save search to database (only if user is logged in)
    if (req.user) {
      try {
        await Search.create({
          userId: req.user._id,
          term: term.toLowerCase().trim(),
        });
        console.log(`💾 Saved search: "${term}" for user ${req.user.displayName}`);
      } catch (dbErr) {
        console.error("⚠️ Failed to save search:", dbErr.message);
      }
    }

    // Format results for client
    const results = (data.results || []).map(img => ({
      id: img.id,
      thumb: img.urls.small,
      full: img.urls.full,
      alt: img.alt_description || img.description || 'Unsplash image',
      author: img.user.name,
      authorUrl: img.user.links.html
    }));

    console.log(`✅ Fetched ${results.length} images for '${term}'`);
    res.json({ results });
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ✅ Get top searches (aggregated across all users)
router.get("/top-searches", async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: "$term",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          term: "$_id",
          count: 1
        }
      }
    ]);

    res.json({ top: topSearches });
  } catch (err) {
    console.error("❌ Failed to get top searches:", err);
    res.json({ top: [] });
  }
});

// ✅ Get user's search history
// NOTE: Authentication temporarily disabled for testing
router.get("/history", /* requireAuth, */ async (req, res) => {
  try {
    if (!req.user) {
      return res.json({ history: [] });
    }
    
    const history = await Search.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({ history });
  } catch (err) {
    console.error("❌ Failed to get history:", err);
    res.json({ history: [] });
  }
});

module.exports = router;