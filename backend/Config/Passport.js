const userDB = require("./Database")
const SECRET = 'your_jwt_secret'
const passport = require('passport')
const bcrypt = require('bcrypt')

const passportJWT = require("passport-jwt"),
    ExtractJWT = passportJWT.ExtractJwt,
    JWTStrategy = passportJWT.Strategy,
    LocalStrategy = require('passport-local').Strategy

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, cb) => {
        console.log('User: ', username, password)
        const user = userDB.find(item => item.username == username)
        if (user) {
            if (user.password == password) {
                return cb(null,
                    user ,
                    { message: 'Logged In Successfully' })
            }
            else{
                return cb(null, false, { message: 'Incorrect user or password.' })
            }
        }
        else{
            return cb(null,false,
                { message : 'User not found !!'})
        }
        // const index = db.checkExistingUser(username)
        // if (index !== db.NOT_FOUND && await db.isValidUser(username, password)) {
        //     const { id, username, email } = users.users[index]
        //     return cb(null,
        //         { id, username, email },
        //         { message: 'Logged In Successfully' })
        // }
        // else
        //     return cb(null, false, { message: 'Incorrect user or password.' })


    }));

passport.use(
    new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET
    },
        (jwtPayload, cb) => {
            try {
                // find the user in db if needed
                console.log('jwt strategy')
                const user = userDB.find(item => item.username == username)
                if(user){
                    return cb(null,user);
                }
                else{
                    return cb(null,false)
                }
                // const index = db.checkExistingUser(jwtPayload.username)
                // if (index !== db.NOT_FOUND) {
                //     // Strip password out
                //     const { id, username, email } = users.users[index]
                //     //Return to caller via req.user
                //     return cb(null, { id, username, email });
                // } else {
                //     return cb(null, false);
                // }
            } catch (error) {
                return cb(error, false);
            }
        }
    ));
