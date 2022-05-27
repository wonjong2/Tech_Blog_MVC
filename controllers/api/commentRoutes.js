const router = require('express').Router();
const { Comment } = require('../../models');

// Create a new comment
router.post('/', async (req, res) => {
    try {
        const { comment, post_id } = req.body;
        const newComment = {
            comment,
            date: new Date(),
            commentor_id: req.session.user_id,
            post_id
        }
        const commentData = await Comment.create(newComment);
        const savedComment = commentData.get({ plain: true });
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router