const app = require("../config/app.js");
const Reservation = require("../models/resevation.js");
const { Seat } = require("../models/seat.js");
const mongoose = require('mongoose')
const { userAuth } = require('../middleware/auth.js')
const { responseJson } = require('../utils/responseJson.js');

app.get('/reservation-history', userAuth, async (req, res) => {
    console.log("Is the control reach to the cancel-reservation.js ")
     try {
    const reservations = await Reservation.find({
      userId: req.user._id,
      status: "cancelled"
    }).populate("seatId", "seatNumber floor");

    const transformedReservations = reservations.map((reservation) => ({
      reservationId: reservation._id,
      status: reservation.status,
      seat: {
        seatNumber: reservation.seatId?.seatNumber,
        floor: reservation.seatId?.floor
      }
    }));

    console.log("Reservations:\n", transformedReservations);

    res.status(200).json({
      success: true,
      totalReservations: reservations.length,
      data: transformedReservations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reservations",
      error: error.message
    });
  }


})