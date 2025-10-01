const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require("../modules/review.js");
const Listing = require("../modules/listing.js");
const wrapAsync = require('../utils/wrapAsync.js');
const { validateReview,isLoggedin,isReviewAuthor } = require('../middleware.js');

const reviewController = require("../controllers/review.js")
//Post Route

router.post("/",isLoggedin, validateReview,   wrapAsync(reviewController.createReview));

 //Delete Route
 router.delete("/:reviewId",isLoggedin,isReviewAuthor, wrapAsync(reviewController.destroyReview));

 module.exports = router;