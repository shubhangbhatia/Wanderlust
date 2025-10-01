const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

// Define the schema for a Listing
const listingSchema = new Schema({
    // Title of the listing (required)
    title: {
        type: String,
        required: true,
    },
    
    // Optional description of the listing
    description: String,

    // Image URL with default value and custom setter for empty string
    image: {
         url: String,
         filename: String,
    },

    // Price of the listing
    price: Number,

    // City or specific location
    location: String,

    // Country of the listing
    country: String,

    // Array of references to associated reviews
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"  // Refers to the Review model
        }
    ],
    owner: {
            type: Schema.Types.ObjectId,
            ref: "User"  // Refers to the Review model
    },
    geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

// Mongoose middleware: when a listing is deleted, also delete all its associated reviews
listingSchema.post("findOneAndDelete", async function (listing) {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

// Create and export the Listing model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
