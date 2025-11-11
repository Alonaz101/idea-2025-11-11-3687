const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// GET /api/recipes?mood=happy - get recipes filtered by mood
router.get('/', async (req, res) => {
  try {
    const mood = req.query.mood;
    if (!mood) return res.status(400).json({ error: 'Mood query parameter required' });
    const recipes = await Recipe.find({ moodTags: mood });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/recipes/:id - get recipe details by id
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
