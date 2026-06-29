const app = require("../config/app.js");
const { Seat } = require('../models/seat.js');
const { validateSeatInput } = require('../middleware/validation.js');
const { checkAdmin, userAuth } = require('../middleware/auth.js');
const { responseJson } = require('../utils/responseJson.js');


app.post('/create-seat', userAuth, checkAdmin, validateSeatInput, async (req, res) => {
    const { seatNumber, floor, isReserved } = req.body;

    try {
        const seatexists = await Seat.findOne({ seatNumber, floor });
        if (seatexists) {
            responseJson(res, 409, "Seat Already Exists");
        }
        else {
            await Seat.create({ seatNumber, floor, isReserved });
            responseJson(res, 201, true, "New seat created Successfully");
        }
    } catch (error) {
        responseJson(res, 400, false, error.message);
    }

})

