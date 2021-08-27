// const { default: jwtDecode } = require('jwt-decode');
// const { JWT_DECODE } = require('../secrets/index');
// const jwt = require('jsonwebtoken');
const { findBy, findById } = require('../users/user-model');

const newUserAvailable = async(req, res, next) => { //register
    try {
        const [user] = await findBy({username: req.body.username})
        if(user) {
            next ({ status: 422, message: 'Username taken!'})
        } else {
            req.user = user;
            next()
        }
    } catch(err) {
        next(err)
    }
}

const validateUser = async(req, res, next) => {//login 
 try {
     const [user] = await findBy({username: req.body.username});
     if(!user) {
         next ({ status: 422, message: 'Invalid Credentials'})
     } else {
         console.log(user)
        req.user = user
        next()
     }
 } catch (err){
     next({ message: `Oops ${err}`})
 }
}

module.exports = {
    newUserAvailable,
    validateUser,
}