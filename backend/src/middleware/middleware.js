
const { Seat } = require("../models/seat.js");

async function isSeatExists(req, res, next) {
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
                "message": "Seat does not exist"
            })

        }
    } catch (error) {
        console.error("Error occurred while creating seat " + error)
        return res.status(500).json({
            "success": false,
            message: "Internal Server Error"
        })
    }
}


async function isSeatAvailable(req, res, next) {
    const isReserved = req.seat.isReserved;
    try {
        if (!isReserved)
            return next();

        else {
            return res.status(409).json({
                "success": false,
                "message": "Seat is Reserved"
            })
        }
    }catch (error) {
    console.error("Error occurred while creating seat " + error)
    return res.status(500).json({
        "success": false,
        message: "Internal Server Error"

    })
}
}


module.exports = { isSeatExists, isSeatAvailable }
