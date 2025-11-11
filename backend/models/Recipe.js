const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ingredients: [String],
  instructions: String,
  moodTags: [String],
  cuisine: String,
  diet: String,
  ratings: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: Number }]
});

module.exports = mongoose.model('Recipe', RecipeSchema);
