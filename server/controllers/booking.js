const moment = require("moment");
const stripe = require("stripe")("sk_test_51NVUJMLnKGfzbvT6dggC2BGIm8xEGvjIf3q20jyCdagnpLc9DPKwec9XpQNfUEgIUFTgUQSQ9jaegnNJ3CGYaMye00iCjFjg9x");
const { v4: uuidv4 } = require("uuid");
const Booking = require("../models/booking");
const Hotel = require("../models/hotel");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error retrieving bookings", error });
  }
};

const cancelBooking = async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    // Controller logic for cancelBooking route

    // Example: Update booking status
    const booking = await Booking.findOne({ _id: bookingid });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = "cancelled";
    await booking.save();

    // Example: Update room's currentbookings
    const hotel = await Hotel.findOne({ "rooms._id": roomid });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    const room = hotel.rooms.find((room) => room._id.toString() === roomid);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const temp = room.currentbookings.filter((x) => x.bookingid.toString() !== bookingid);
    room.currentbookings = temp;
    await hotel.save();

    res.json({ message: "Your booking cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error cancelling booking", error });
  }
};

const getBookingByUserId = async (req, res) => {
  const { userid } = req.body;
  try {
    // Controller logic for getBookingByUserId route
    const bookings = await Booking.find({ userid: userid });
    res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error retrieving bookings", error });
  }
};

const bookRoom = async (req, res) => {
  try {
    

    // Create customer and charge payment
    const { room, userid, fromdate, todate, totalAmount, totaldays, token } = req.body;
    // console.log(room);
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create({
      amount: totalAmount * 100,
      customer: customer.id,
      currency: "USD",
      receipt_email: token.email,
    }, {
      idempotencyKey: uuidv4(),
    });
    if (!payment) {
      return res.status(400).json({ message: "Payment failed" });
    }

    // Create new booking
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalamount: totalAmount,
      totaldays,
      transactionid: uuidv4(),
    });
    const booking = await newBooking.save();

    res.json({ message: "Payment Successful, Your Room is booked" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error booking room", error });
  }
};

module.exports = {
  getAllBookings,
  cancelBooking,
  getBookingByUserId,
  bookRoom,
};
