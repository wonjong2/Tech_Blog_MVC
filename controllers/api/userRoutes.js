const router = require('express').Router();
const { User } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        const user = userData.get({ plain: true });
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.status(201).json(user);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Handle login request 
router.post('/login', async (req, res) => {
    try {
        // Retrieve the user data from the DB
        const userData = await User.findOne({ where: { user_name: req.body.user_name } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // Compare the password from the user to it from the DB
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        const user = userData.get({ plain: true });
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.json({ user: user, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Return the current login state to the client 
router.get('/auth', (req, res) => {
    if (req.session.logged_in) {
        res.status(200).json('Logged In');
    } else {
        res.status(401).json('Need Login Again');
    }
});

module.exports = router;
