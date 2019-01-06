const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const keys = require('../config/keys');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwt;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (payload, done) => {
        try {
            const user = await User.findById(payload.userId).select('email id');

            if(user) {
                done(null, user)
            } else {
                done(null, false)
            }
        } catch(e) {
            console.log(e);
        }
    }));
};
