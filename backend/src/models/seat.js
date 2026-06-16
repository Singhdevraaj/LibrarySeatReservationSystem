const mongoose = require('mongoose');
const seatScheme = new mongoose.Schema({
  seatNumber: {
    type: Number,
    unique: true,
    min:1,
    required:true
  },
  floor: {
    type: Number,
    min:1,
    reqiured:true
  },
  isReserved: {
    type: Boolean,
    default: false,
   
  }
},{timestamps:true})

const Seat = mongoose.model("Seat", seatScheme);
module.exports = {Seat};