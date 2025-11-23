const express = require("express")
const router = express.Router()

const reviewController = require("../controllers/review.controller")
router.post('/review',reviewController.review)
module.exports = router