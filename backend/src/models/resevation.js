const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  seatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat",
    required: true
  },

  reservedAt: {
    type: Date,
    default: Date.now,
    required: true
  },

  status: {
    type: String,
    enum: ["booked", "cancelled"],
    default: "cancelled"
  }

}, { timestamps: true });

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;