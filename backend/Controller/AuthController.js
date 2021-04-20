const bcrypt = require('bcrypt');
const SECRET = 'your_jwt_secret'
const passport = require('passport');
const cookie = require('cookie');
const jwt = require('jsonwebtoken'); 
const database = require('../Config/Database')
exports.login = async (req, res, next) => {
    console.log(req.body);
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
    try {
        const {username , password ,email,name,surname} = req.body ;
        if(!username || !password || !email || !name || !surname){
          return res.json ( {message: "Cannot register with empty" })
        }else{
            const user = database.map( item => item.username == username ).filter(item=> item.email == email)
            if (user)
            {
                return res.json({message: "Already has user"})
            }
            else{
                let id = (database.length)?database[database.length-1].id+1 : 1
                const hash  = await bcrypt.hash(password,10)
                database.push({id,username , password : hash ,email,name,surname})
                return res.json({message:"Register success"})
            }
        }
    } catch (error) {
        res.status(422).json({ message: "Cannot register" })
    }
};

