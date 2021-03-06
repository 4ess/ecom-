const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = mongoose.model('users');
const keys = require('../config/keys');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

async function findUser(payload, done) {
    try {
        const user = await User.findById(payload.userId).select('email id');

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (e) {
        console.log(e);
    }
}

function usePassport(passport) {
    passport.use(
        new JwtStrategy(options, findUser)
    );
}

module.exports = usePassport;