'use strict';

var passport = require('passport');
var TwitterTokenStrategy = require('passport-twitter-token');
var FacebookTokenStrategy = require('passport-facebook-token');
var GoogleTokenStrategy = require('passport-google-token').Strategy;
var config = require('./config');

module.exports = function () {

    passport.use(new TwitterTokenStrategy({
            consumerKey: config.twitterAuth.consumerKey,
            consumerSecret: config.twitterAuth.consumerSecret,
            includeEmail: true
        },
        function (token, tokenSecret, profile, done) {
            console.log(profile);
            var newUser = {
                email: profile.emails[0].value,
                twitterProvider: {
                    id: profile.id,
                    token: token,
                    tokenSecret: tokenSecret
                },
                picture: profile.photos[0].value
            };
            return done(null, newUser);
        }));

    passport.use(new FacebookTokenStrategy({
            clientID: config.facebookAuth.clientID,
            clientSecret: config.facebookAuth.clientSecret
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            var newUser = {
                fullName: profile.displayName,
                email: profile.emails[0].value,
                facebookProvider: {
                    id: profile.id,
                    token: accessToken
                },
                picture: profile.photos[0].value
            };
            return done(null, newUser);
        }));

    passport.use(new GoogleTokenStrategy({
            clientID: config.googleAuth.clientID,
            clientSecret: config.googleAuth.clientSecret
        },
        function (accessToken, refreshToken, profile, done) {
            var newUser = {
                fullName: profile.displayName,
                email: profile.emails[0].value,
                googleProvider: {
                    id: profile.id,
                    token: accessToken
                },
                picture: profile._json.picture
            };
            return done(null, newUser);
        }));
};