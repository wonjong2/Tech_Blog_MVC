const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll(
            {
                order: [['date', 'DESC']],
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
        const myPostData = await Post.findAll({
            where: { creator_id: req.session.user_id },
            order: [['date', 'DESC']],
        })
        const myPosts = myPostData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { myPosts, logged_in: true, page: 'Your Dashboard' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });
        res.render('editpost', { post, logged_in: true, page: 'Your Dashboard' });
    }
    catch (err) {
        console.log("newPost ERR", err);
        res.status(400).json(err);
    }
})

router.get('/login', async (req, res) => {
    res.render('login', { page: 'Your Dashboard' });
});

router.get('/signup', async (req, res) => {
    res.render('signup', { page: 'The Tech Blog' });
});

router.get('/:id', async (req, res) => {
    try {
        console.log("Received /:id Reqeust");
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['user_name'] }]
        });
        const post = postData.get({ plain: true });
        console.log("post", post);
        const commentData = await Comment.findAll({
            where: { post_id: req.params.id },
            order: [['date', 'DESC']],
            include: [{ model: User, attributes: ['user_name'] }]
        })
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        console.log("comments", comments);
        res.render('comment', { post, comments, logged_in: req.session.logged_in, page: 'The Tech Blog' });
    }
    catch (err) {
        console.log("Error", err);
        res.status(400).json(err);
    }
});

module.exports = router;
