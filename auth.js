// sets up passport with a local authentication stratgy , using a person model for user

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');


passport.use(new LocalStrategy(async (username,password,done) => {
    // authentication logic here

    try{
        console.log('Received Credentials:', username, password);
        const user = await Person.findOne({ username : username });

        if(!user)
            return done(null,false, {message:'Invalid Username'});

        const isPasswordMatch = user.password === password ? true : false;
        if(isPasswordMatch){
            return done(null, user);
        }
        else{
            return done(null,false, { message:'Incorrect Password' });
        }
    }
    catch(err){
        return done(err);
    }
}));

module.exports = passport; //Export configured passport