const mongoose = require('mongoose');


const reservationScheme = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"

  },
  seatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat"
  },
  reservedAt: {
    type: Date, 
    default: Date.now,
    required: true 
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled', 'expired'],
    default: 'pending'
  }
})
const Reservation = mongoose.model("Reservation", reservationScheme);

module.exports = Reservation;