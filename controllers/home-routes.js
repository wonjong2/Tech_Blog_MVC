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
        res.render('post',{logged_in: req.session.loggedIn});
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
