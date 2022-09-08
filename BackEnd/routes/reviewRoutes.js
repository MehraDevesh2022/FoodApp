const express = require("express");
const reviewRoute = express.Router();

const { createReviewController ,getAllReviewController} = require("../controller/reviewController");

reviewRoute.route("/")  
.post(createReviewController)
.get(getAllReviewController);

module.exports = reviewRoute;