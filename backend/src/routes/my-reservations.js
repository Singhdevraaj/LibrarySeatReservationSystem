const app = require('../config/app.js');
const { authenticateUser } = require('../middleware/auth.js');
const Reservation = require('../models/resevation.js');

app.get('/my-reservations', authenticateUser, async (req, res) => {
  try {
    const reservations = await Reservation.find({
      userId: req.user._id,
      status: "booked"
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
});
