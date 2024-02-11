const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// Dashboard route
router.get('/', async (req, res) => {
  try {
    const userId = req.session.userId;
    const userPosts = await Post.findAll({ where: { userId } }); // Fetch posts created by the current user
    res.render('dashboard', { userPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Add a new blog post route
router.post('/add', async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.session.userId;
    await Post.create({ title, content, userId });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a blog post route
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.session.userId;
    await Post.destroy({ where: { id: req.params.id, userId } });
    res.send('Post deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
