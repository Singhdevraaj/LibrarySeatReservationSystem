const app = require("../config/app.js");
const { validateUser } = require("../middleware/auth.js") // authentication 
const { validateLogin } = require('../middleware/validation.js');//input validation 
const Reservation = require("../models/resevation.js");
const { Seat } = require("../models/seat.js");
const mongoose = require('mongoose')
const {inputValidationSeat} = require('../middleware/validation.js')
const {isSeatExists,isSeatAvailable} =  require('../middleware/middleware.js')


app.post('/seatReservation', inputValidationSeat, isSeatExists, isSeatAvailable, async (req, res) => {
    // i have attached the userDetails while authentication and seat Details while isSeatExists
    const user = req.user;
    const seat = req.seat;

    const session = await mongoose.startSession();
    try {

        session.startTransaction();
        
       
        const updateSeat = await Seat.findOneAndUpdate(
            {_id:seat._id,
                isReserved: false
            },
            { isReserved: true }
            ,{session
                ,new:true
            }
        );
        if(!updateSeat){
            throw new Error ("Seat already reserved");
        }


        await Reservation.create([{
            userId: user._id,
            seatId: seat._id,
            status: "booked"
        }],{session});
      
      await session.commitTransaction();



        res.status(201).json({
            success: true,
            message: "Reservation is done"
        })
    } 
    catch (error) {
    await session.abortTransaction();

    return res.status(400).json({
        success: false,
        message: error.message
    });
}
    finally{
        await session.endSession();
    }

})