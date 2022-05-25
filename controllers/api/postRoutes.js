const router = require('express').Router();
const { Post } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
    try {
        console.log("Create a new POST!!!!!!!!!!")
        const { title, content } = req.body;
        const newPost = {
            title,
            content,
            date: new Date(),
            creator_id: req.session.user_id
        }
        console.log("newPost", newPost);
        const postData = await Post.create(newPost);
        const post = postData.get({ plain: true });
        console.log("post", post);
        res.status(200).json(post);
    } catch (err) {
        console.log("newPost ERR", err);
        res.status(400).json(err);
    }
});

module.exports = router;
