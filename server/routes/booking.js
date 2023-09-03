const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking");

router.post("/getallbookings", bookingController.getAllBookings);
router.post("/cancelbooking", bookingController.cancelBooking);
router.post("/getbookingbyuserid", bookingController.getBookingByUserId);
router.post("/bookroom", bookingController.bookRoom);

module.exports = router;
