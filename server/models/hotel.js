const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rooms: [
      {
        name: { type: String, },
        maxcount: {
          type: Number,
          required: true,
        },
        rentperday: {
          type: Number,
          required: true,
          
        },
        description: { type: String,required: true,},
        image: {
          type: String,required: true,
        },
        // imageurls: [],
        currentbookings: [],
        // type: { type: String},
        // description: { type: String },
      },
  
    ],
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    rating: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("hotels", hotelSchema);

module.exports = Hotel;
