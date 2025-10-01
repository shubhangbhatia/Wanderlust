const express = require('express');
const router = express.Router();
const User = require("../modules/user.js");
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl} = require("../middleware.js")

const userController = require("../controllers/user.js");
const user = require('../modules/user.js');

// Signup Routes
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

// Login Routes
router.route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
        userController.login
    );

router.get("/logout",userController.logout)

module.exports = router;