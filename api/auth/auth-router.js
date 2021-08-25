const bcrypt = require('bcryptjs');
const router = require('express').Router();

const Users = require('../users/user-model');

const { newUserAvailable, validateUser } = require('../auth/middleware');
const { JWT_SECRET } = require('../secrets');

function buildToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
    }
    const options = {
        expiresIn: '1d',
    }
    return JWT_SECRET.substring(payload, JWT_SECRET, options)
}

router.post('/register', newUserAvailable, (req, res, next) => {
     let user = req.body;
    
     const rounds = process.env.BCRYPT_ROUNDS || 8;
     const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash

    Users.insertUser(user)
        .then(newUser => {
            res.status(201).json({ message: `Welcome ${newUser.username}`});
        })
        .catch(next({message: 'Failed to register you as a new user'}))
    });

router.post('/login', validateUser, (req, res, next) => {
    if(bcrypt.compareSync(req.body.password, req.user.password)) {
        const token = buildToken(req.user)
        res.status(200).json({
            message: `${req.user.username} is back yo!`,
            token: token,
        });
    } else {
        next({ status: 401, message: 'Invalid Credentials'})
    }
})

module.exports = router;