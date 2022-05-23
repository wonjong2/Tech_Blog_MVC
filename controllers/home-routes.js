const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll(
            {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'user_name']
                    }
                ]
            }
        )
        res.status(200).json(postsData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
