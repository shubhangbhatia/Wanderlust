const Listing = require("../Wanderlust/modules/listing.js");
const Review = require("../Wanderlust/modules/review.js"); // adjust the path as needed

const { listingSchema, reviewSchema} = require('../Wanderlust/schema.js');
const ExpressError = require('../Wanderlust/utils/ExpressError.js');

module.exports.isLoggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);

    // Check if the logged-in user is the owner
    if (!listing.owner.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not authorized to do this!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.validateListing = (req,res,next) => {
    let { error } = listingSchema.validate(req.body);

    if(error){
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    }   else {
        next();
    }
}

module.exports.validateReview = (req,res,next) => {
    let { error } = reviewSchema.validate(req.body);

    if(error){
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    }   else {
        next();
    }
}

module.exports.isReviewAuthor = async(req, res, next) => {
    const { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    
    console.log("Review:", review);
    console.log("Current user:", res.locals.currentUser);
    // Check if the logged-in user is the owner
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not authorized to do this!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};