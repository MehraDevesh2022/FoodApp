const express = require("express");
const bookingRoutes = express.Router();


const {
  initiateBookingController,
  verifyPayment,
  getAllBookings,
  getBookingByID,
} = require("../controller/bookingController");
const { protectRoute } = require("../controller/authController");

bookingRoutes.route("/verification").post(verifyPayment);


bookingRoutes.route("/")
.post(initiateBookingController)
.get(getAllBookings);
bookingRoutes.route("/:bookingID")
.get(getBookingByID);

module.exports = bookingRoutes;