const router = require('express').Router();
const { Post } = require('../../models');

// Create a new Post
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = {
            title,
            content,
            date: new Date(),
            creator_id: req.session.user_id
        }
        const postData = await Post.create(newPost);
        const post = postData.get({ plain: true });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
