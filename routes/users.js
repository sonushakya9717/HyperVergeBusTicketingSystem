
const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const { check, validationResult } = require('express-validator')
const { createUser } = require('../controllers/signup');
const { login,adminLogin } = require('../controllers/login')
const { cancelTickets, getTickets } = require('../controllers/tickets')
const auth = require('../middlewares/auth')

// api/users/signup  POST route
// @ public route

router.post('/signup', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please write the valid email').isEmail(),
    check('password', 'Please enter the password 8 or more characters').isLength({ min: 8 }),
],createUser);

// api/users/login  POST route
// @ public route

router.post("/login",[
        check("email", "please include a valid email").isEmail(),
        check("password", "password is required").exists(),
],login)


// api/users/Admnlogin
// @ desc a admin can only login

router.post("/Adminlogin",[
    check("email", "please include a valid email").isEmail(),
    check("password", "password is required").exists(),
],adminLogin)

 
// @route api/users/auth
router.get('/auth', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
});

// @route /api/users/user/tickets
router.get('/user/tickets', auth, getTickets);

//@route /api/users/user/:ticketId
router.delete("/user/:ticketId",auth,
cancelTickets
);





module.exports = router;