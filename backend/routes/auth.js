const express = require("express");
const router = express.Router();
const { generateToken, sendToken } = require("../utils/token.utils");
const passport = require("passport");
const config = require("../config");
const request = require("request");
require("../passport")();

router.route("/twitter/reverse").post(function (req, res) {
  request.post(
    {
      url: "https://api.twitter.com/oauth/request_token",
      oauth: {
        oauth_callback: `${config.NODEURL}/twitter-callback`,
        consumer_key: config.twitterAuth.consumerKey,
        consumer_secret: config.twitterAuth.consumerSecret,
      },
    },
    function (err, r, body) {
      if (err) {
        return res.send(500, { message: e.message });
      }
      var jsonStr =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    }
  );
});

router.route("/twitter").post(
  (req, res, next) => {
    request.post(
      {
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
          consumer_key: config.twitterAuth.consumerKey,
          consumer_secret: config.twitterAuth.consumerSecret,
          token: req.query.oauth_token,
        },
        form: { oauth_verifier: req.query.oauth_verifier },
      },
      function (err, r, body) {
        if (err) {
          return res.send(500, { message: err.message });
        }

        const bodyString =
          '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        const parsedBody = JSON.parse(bodyString);

        req.body["oauth_token"] = parsedBody.oauth_token;
        req.body["oauth_token_secret"] = parsedBody.oauth_token_secret;
        req.body["user_id"] = parsedBody.user_id;

        next();
      }
    );
  },
  passport.authenticate("twitter-token", { session: false }),
  function (req, res, next) {
    if (!req.user) {
      return res.send(401, "User Not Authenticated");
    }
    req.auth = {
      id: req.user.id,
    };

    return next();
  },
  generateToken,
  sendToken
);

router.route("/facebook").post(
  passport.authenticate("facebook-token", { session: false }),
  function (req, res, next) {
    if (!req.user) {
      return res.send(401, "User Not Authenticated");
    }
    req.auth = {
      id: req.user.id,
    };

    next();
  },
  generateToken,
  sendToken
);

router.route("/google").post(
  passport.authenticate("google-token", { session: false }),
  function (req, res, next) {
    if (!req.user) {
      return res.send(401, "User Not Authenticated");
    }
    req.auth = {
      id: req.user.id,
    };
    next();
  },
  generateToken,
  sendToken
);

module.exports = router;
