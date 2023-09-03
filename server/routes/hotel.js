const express = require("express");
const router = express.Router();
const HotelController = require("../controllers/hotel");

// Route to get all hotels
router.get("/api/hotels", HotelController.readAll);
router.get("/api/hotels/:hotelId/rooms/:roomId", HotelController.findRoomInHotel);
// Route to create a new hotel
router.post("/api/hotels", HotelController.create);

router.get("/api/hotels/:id", HotelController.findOne);
router.put("/api/hotels/:id", HotelController.update);
router.delete("/api/hotels/:id", HotelController.delete);

module.exports = router;
