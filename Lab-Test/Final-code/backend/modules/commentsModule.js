// Node JS module to define the addComment and getComments methods..
const Comment = require('../models/comment');

// Function to add a new Comment
async function addComment(message) {
    try {
        const newComment = new Comment({ message });
        await newComment.save();
        return newComment;
    } catch (err) {
        throw new Error(`Failed to add Comment: ${err.message}`);
    }
};

// Function to get all Comments from the Database
async function getComments() {
    try {
        return await Comment.find();
    } catch (err) {
        throw new Error(`Failed to fetch coments: ${err.message}`);
    }
};

module.exports = {
    addComment,
    getComments,
}