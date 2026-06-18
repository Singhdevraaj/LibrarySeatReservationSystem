const mongoose = require('mongoose');
const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    min:1,
    required:true
  },
  floor: {
    type: Number,
    min:1,
    required:true
  },
  isReserved: {
    type: Boolean,
    default: false,
   
  }
},{timestamps:true})

seatSchema.index(
    {
        floor: 1,
        seatNumber: 1
    },
    {
        unique: true
    }
);

const Seat = mongoose.model("Seat", seatSchema);
module.exports = {Seat};