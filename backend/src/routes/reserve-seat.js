const app = require("../config/app.js");
// const { authenticateUser } = require("../middleware/auth.js") // authentication 
// const { validateLoginInputs } = require('../middleware/validation.js');//input validation 
const Reservation = require("../models/resevation.js");
const { Seat } = require("../models/seat.js");
const mongoose = require('mongoose')
const {validateSeatInput} = require('../middleware/validation.js')
const {findSeat,checkSeatAvailability} =  require('../middleware/middleware.js')
const {authenticateUser}= require('../middleware/auth.js')


app.post('/reserve-seat', authenticateUser,validateSeatInput, findSeat, checkSeatAvailability, async (req, res) => {
    // i have attached the userDetails while authentication and seat Details while findSeat
    const user = req.user;
    const seat = req.seat;

    const session = await mongoose.startSession();
    try {

        session.startTransaction();
        
       
        const reservedSeat = await Seat.findOneAndUpdate(
            {_id:seat._id,
                isReserved: false
            },
            { isReserved: true }
            ,{session
                ,new:true
            }
        );
        if(!reservedSeat){
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
console.log("User:", req.user);
console.log("Seat:", req.seat);
    return res.status(400).json({
        success: false,
       
        message: error.message
    });
}
    finally{
        await session.endSession();
    }

})