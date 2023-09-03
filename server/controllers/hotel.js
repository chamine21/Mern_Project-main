const Hotel = require("../models/hotel");
// const Room = require("../models/room");

// Controller to get all hotels
module.exports.readAll = (req, res) => {
  Hotel.find()
    .then((allHotels) => {
      res.json(allHotels);
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
};

// Controller to create a new hotel
module.exports.create = (req, res) => {
  Hotel.create(req.body)
    .then((newHotel) => {
      res.json({ hotel: newHotel });
    })
    .catch((err) => {
      res.status(400).json({ message: "Something went wrong", error: err });
    });
};
//find one
module.exports.findOne = (req,res) =>{
  Hotel.findOne({_id:req.params.id})
  .then((findHotel)=>{
      res.json({Hotel:findHotel})
  })
  .catch((err) => {
      res.json({ message: 'Something went wrong', error: err })
  })
}
// UPDATE 
module.exports.update = (req, res) =>{
  Hotel.findOneAndUpdate({_id: req.params.id}, req.body,
  {new: true, runValidators: true})
  .then((updatedHotel)=>{
      res.json({Hotel: updatedHotel})
  })
  .catch((err) => {
      res.status(400).json(err)
  });
}

// DELETE
module.exports.delete = (req, res) => {
  Hotel.deleteOne({ _id: req.params.id })
      .then(result => {
          res.json({ result: result })
      })
      .catch((err) => {
          res.json({ message: 'Something went wrong', error: err })
      });}

// Controller to find a room in a hotel
module.exports.findRoomInHotel = (req, res) => {
  const { hotelId, roomId } = req.params;

  Hotel.findOne({ _id: hotelId, "rooms._id": roomId })
    .then((foundHotel) => {
      if (!foundHotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      // Find the specific room inside the hotel's rooms array
      const foundRoom = foundHotel.rooms.find((room) => room._id.toString() === roomId);
      if (!foundRoom) {
        return res.status(404).json({ message: "Room not found in the hotel" });
      }

      res.json({ Room: foundRoom });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
};

