const mongoose = require('mongoose');
const seatScheme = new mongoose.Schema({
  seatNumber: {
    type: Number,
    unique: true
  },
  floor: Number,
  isReserved: {
    type: Boolean,
    default: false
  }
})

const Seat = mongoose.model("Seat", seatScheme);
module.exports = Seat;