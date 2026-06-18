
const { Seat } = require("../models/seat.js");

async function findSeat(req, res, next) {
    const { seatNumber, floor } = req.body;
    try {
        const seat = await Seat.findOne({ seatNumber, floor });
        if (seat) {
            req.seat = seat;
            return next();
        }
        else {
            return res.status(404).json({
                "success": false,
                "message":"hi i am in findSeat",
                "message": "Seat does not exist"
            })

        }
    } catch (error) {
        console.error("Error occurred while creating seat " + error)
        return res.status(500).json({
            "success": false,
            "message":"hi i am in findSeat",
            message: "Internal Server Error"
        })
    }
}


async function checkSeatAvailability(req, res, next) {
    const isReserved = req.seat.isReserved;
    try {
        if (!isReserved)
            return next();

        else {
            return res.status(409).json({
                "success": false,
                 "message":"hi i am in checkSeatAvailability",
                "message": "Seat is Reserved"
            })
        }
    }catch (error) {
    console.error("Error occurred while creating seat " + error)
    return res.status(500).json({
        "success": false,
         "message":"hi i am in checkSeatAvailability",
        message: "Internal Server Error"

    })
}
}


module.exports = { findSeat, checkSeatAvailability }
