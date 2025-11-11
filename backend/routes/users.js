const express = require('express');
const User = require('../models/User');
const router = express.Router();

// POST /api/users/:id/savedRecipes - save a recipe to user's saved recipes
router.post('/:id/savedRecipes', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { recipeId } = req.body;
    if (user.savedRecipes.includes(recipeId)) {
      return res.status(400).json({ error: 'Recipe already saved' });
    }
    user.savedRecipes.push(recipeId);
    await user.save();
    res.json({ message: 'Recipe saved' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users/:id/moodHistory - get user mood history
router.get('/:id/moodHistory', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.moodHistory);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
