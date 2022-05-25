const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll(
            {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'user_name']
                    }
                ]
            }
        )
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('post', { posts, logged_in: req.session.logged_in });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        console.log(req.session.user_id);
        const myPostData = await User.findOne({
            where: { user_name: req.session.user_id },
            include: { model: Post, attributes: ['id', 'title', 'date'] }
        })
        console.log(myPostData);
        const myPosts = myPostData.posts.map((post) => post.get({ plain: true }));
        console.log("myPosts", myPosts);
        res.render('dashboard', { myPosts, logged_in: true })
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

module.exports = router;
