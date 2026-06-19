const app = require("../config/app.js");
// const { authenticateUser } = require("../middleware/auth.js") // authentication 
// const { validateLoginInputs } = require('../middleware/validation.js');//input validation 
const Reservation = require("../models/resevation.js");
const { Seat } = require("../models/seat.js");
const mongoose = require('mongoose')
const {validateSeatInput} = require('../middleware/validation.js')
const {findSeat,checkNotSeatAvailability} =  require('../middleware/middleware.js')
const {authenticateUser}= require('../middleware/auth.js')


app.post('/cancel-reservation', authenticateUser,validateSeatInput, findSeat ,checkNotSeatAvailability, async (req, res) => {
    console.log("Is the control reach to the cancel-reservation.js ")
    // i have attached the userDetails while authentication and seat Details while findSeat
    const user = req.user;
    const seat = req.seat;

    const session = await mongoose.startSession();
    try {

        session.startTransaction();
        
       
        const deletedReservation = await Seat.findOneAndUpdate(
            {_id:seat._id,
                isReserved: true
            },
            { isReserved: false }
            ,{session
                ,new:true
            }
        );
        if(!deletedReservation){
            throw new Error("Seat is not currently reserved or does not exist");

        }


        await Reservation.findOneAndDelete({
            userId: user._id,
            seatId: seat._id,
            status: "booked"
        },{session});
      
      await session.commitTransaction();



        res.status(200).json({
            success: true,
            message: "Reservation cancellation is done"
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