const app = require("../config/app.js");
const Reservation = require("../models/resevation.js");
const { Seat } = require("../models/seat.js");
const mongoose = require('mongoose')
const { validateSeatInput } = require('../middleware/validation.js')
const { findSeat, isSeatReserved } = require('../middleware/middleware.js')
const { userAuth} = require('../middleware/auth.js')
const { responseJson } = require('../utils/responseJson.js');


app.post('/cancel-reservation', validateSeatInput, userAuth, findSeat, isSeatReserved, async (req, res) => {
    const user = req.user;
    const seat = req.seat;
    const session = await mongoose.startSession();
    try {
        
        session.startTransaction();
        
        console.log(user);


        const reservationDetail = await Reservation.findOneAndUpdate({
            userId: user._id,
            seatId: seat._id,
            status: "booked"
        }, {
            status: "cancelled"
        }, { session });

        if (!reservationDetail) {
            throw new Error("Reservation not found");
        }
        console.log("Reservation Details :", reservationDetail.userId);

        const deletedReservation = await Seat.findOneAndUpdate(
            {
                _id: seat._id,
                isReserved: true,

            },
            { isReserved: false }
            , {
                session
                , new: true
            }
        );
        console.log("deletedReservation :", deletedReservation);
        if (!deletedReservation) {
            throw new Error("Seat is not currently reserved or does not exist");
        }




        await session.commitTransaction();
        responseJson(res, 200, true, "Reservation cancellation is done");
     
}  
    catch (error) {
        await session.abortTransaction();
        console.error(error.message);
        responseJson(res, 400, false, error.message);
    }
    finally {
        await session.endSession();
    }

})