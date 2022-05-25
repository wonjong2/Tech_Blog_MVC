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
        res.render('post', { posts, logged_in: req.session.loggedIn });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const myPostData = await Post.findAll({
            where: { id: req.session.user }
        })
        const myPosts = myPostData.map((post) => post.get({ plain: true }));
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
