const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../modules/commentsModule');

router.get('/', async (req, res) => {
    try {
        const comments = await getComments();
        res.json(comments);
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.post('/', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({
            message: `Message is required`
        });
    }

    try {
        const newComment = await addComment(message);
        res.status(201).json(newComment);
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;