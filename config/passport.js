const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user')
const keys = require('./keys');

module.exports = (passport) => {
    //Variable que cambia sus valores
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = keys.secretOrKey;

    passport.use(new JwtStrategy(opts, (jwt_payload,done) =>{
        User.findById(jwt_payload,(err,user) =>{
            if(err){
                return done(err,false);
            } 
            if(user){
                return done(null,user);
            }
            else{
                done(null,false);
            }
        })
    }))
}