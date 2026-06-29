const app = require("../config/app.js");
// const { authenticateUser } = require("../middleware/auth.js") // authentication 
// const { validateLoginInputs } = require('../middleware/validation.js');//input validation 
const Reservation = require("../models/resevation.js");
const { Seat } = require("../models/seat.js");
const mongoose = require('mongoose')
const { validateSeatInput } = require('../middleware/validation.js')
const { findSeat, isSeatAvailable } = require('../middleware/middleware.js')
const { responseJson } = require('../utils/responseJson.js');
const { userAuth } = require('../middleware/auth.js');

app.post('/reserve-seat', userAuth, validateSeatInput, findSeat, isSeatAvailable, async (req, res) => {
    // i have attached the userDetails while authentication and seat Details while findSeat
    const user = req.user;
    const seat = req.seat;

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const existingReservation =
            await Reservation.findOne(
                {
                    userId: user._id,
                    status: "booked"
                },
                null,//here this is projection string 
                { session }// this is the option 
            );

        if (existingReservation) {
            await session.abortTransaction();
            responseJson(res, 409, false, "User already has an active reservation");
            throw new Error("Error: User already has an active reservation");
        }

        const reservedSeat = await Seat.findOneAndUpdate(
            {
                _id: seat._id,
                isReserved: false
            },
            { isReserved: true }
            , {
                session
                , new: true
            }
        );
        if (!reservedSeat) {
            throw new Error("Seat already reserved");
        }
        await Reservation.create([{
            userId: user._id,
            seatId: seat._id,
            status: "booked"
        }], { session });

        await session.commitTransaction();
        responseJson(res, 201, true, "Reservation is done");
    }
    catch (error) {
        await session.abortTransaction();
        console.log("User:", req.user);
        console.log("Seat:", req.seat);
        responseJson(res, 400, false, error.message);
    }
    finally {
        await session.endSession();
    }

})