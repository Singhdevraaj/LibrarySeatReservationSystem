const app = require("../config/app.js");
const {validateUser} = require("../middleware/auth.js")
const {validateLogin} = require('../middleware/validation.js');
const { Seat } = require("../models/seat.js");


app.post('/seatReservation',validateLogin,validateUser,isSeatExists,isSeatAvailable,async(req,res)=>{
    const const {seatNumber,floor,isReserved} = req.body;
    await Seat.updateOne({})
})