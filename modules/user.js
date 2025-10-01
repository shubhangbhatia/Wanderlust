// Import required modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// Define the schema for the User model
const userSchema = new Schema({
    // Email field (required)
    email: {
        type: String,
        required: true,
        
    }
});

// Plugin passport-local-mongoose into the schema
// This automatically adds username and hashed password fields
// It also adds authentication helper methods like register(), authenticate(), etc.
userSchema.plugin(passportLocalMongoose);

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
