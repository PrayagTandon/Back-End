const mongoose = require('mongoose');

// Defining the User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

// Creating the user model
const User = mongoose.model('User', userSchema);

module.exports = User;