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
        res.render('post', { posts, logged_in: req.session.logged_in, page: 'The Tech Blog' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const myPostData = await User.findOne({
            where: { id: req.session.user_id },
            include: { model: Post, attributes: ['id', 'title', 'date'] }
        })
        const myPosts = myPostData.posts.map((post) => post.get({ plain: true }));
        res.render('dashboard', { myPosts, logged_in: true, page: 'Your Dashboard' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    res.render('login', { page: 'Your Dashboard' });
});

router.get('/signup', async (req, res) => {
    res.render('signup', { page: 'The Tech Blog' });
});

module.exports = router;
