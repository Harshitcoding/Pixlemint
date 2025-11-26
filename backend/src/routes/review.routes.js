const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const reviewController = require("../controllers/review.controller");

// Optional auth - create middleware that doesn't fail if no token
const optionalAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            // Invalid token, but continue anyway
        }
    }
    next();
};

router.post('/review', optionalAuth, reviewController.review);

module.exports = router;