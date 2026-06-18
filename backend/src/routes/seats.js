const app = require("../config/app.js");

const { Seat } = require('../models/seat.js')
const {inputValidationSeat} = require('../middleware/validation.js')

console.log("Seat imported:", Seat);

app.post('/seats',inputValidationSeat, async (req, res) => {
    const { seatNumber, floor, isReserved } = req.body;
    try {
        const seatexists = await Seat.findOne({ seatNumber, floor });
        if (!seatexists) {
            await Seat.create({ seatNumber, floor, isReserved });
            return res.status(201).json({
                "success": true,
                "message"
                    : "New seat created Successfully"
            })
        }
        else {
            return res.status(409).json({
                "success": false,
                "message": "Seat already exists"
            })
        }

    } catch (error) {
    console.error(error);

    return res.status(400).json({
        success: false,
        message: error.message,
        stack: error.stack
    });
}

})

