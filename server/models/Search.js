const mongoose = require('mongoose');
const SearchSchema = new mongoose.Schema({
  userId: { type: require('mongoose').Schema.Types.ObjectId, ref: 'User' },
  term: String,
  timestamp: { type: Date, default: Date.now }
});
module.exports = require('mongoose').model('Search', SearchSchema);
