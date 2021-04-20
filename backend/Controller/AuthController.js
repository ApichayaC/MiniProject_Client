const bcrypt = require('bcrypt');
const SECRET = 'your_jwt_secret'
const passport = require('passport');
const cookie = require('cookie');
const jwt = require('jsonwebtoken'); 

exports.login = async (req, res, next) => {
    try {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log('Login: ', req.body, user, err, info)
            if (err) return next(err)
            if (user) {
                const token = jwt.sign(user,SECRET, {
                    expiresIn: '1d'
                })
                // req.cookie.token = token
                res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 60,
                        sameSite: "strict",
                        path: "/",
                    })
                );
                res.statusCode = 200
                return res.json({ user, token })
            } else
                return res.status(422).json(info)
        })(req, res, next)

    } catch (error) {
        console.log(error);
    }
};

exports.logout = async (req, res, next) => {

};

exports.register = async (req, res, next) => {

};

