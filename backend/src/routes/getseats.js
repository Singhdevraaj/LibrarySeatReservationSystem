const app = require("../config/app.js");
const { Seat } = require('../models/seat');
const { responseJson } = require('../utils/responseJson.js');
const { userAuth } = require('../middleware/auth.js');

app.get('/getSeats', userAuth, async (req, res) => {
    try {
        const stats = await Seat.aggregate([
            {
                $group: {
                    _id: null,
                    totalSeats: { $sum: 1 },

                    reservedSeats: {
                        $sum: {
                            // $cond:[{$eq:["$isReserved",true]},1,0]
                            $cond: ["$isReserved", 1, 0] // Beacause the isReserved is already boolean
                        }
                    },
                    availableSeats: {
                        $sum: {
                            // $cond:[{$eq:["$isReserved",false]},1,0]
                            $cond: ["$isReserved", 0, 1] // Beacause the isReserved is already boolean
                        }
                    }
                }
            }
        ])
        const seatDetails = await Seat.find({});
        const resultStats = stats[0] || { totalSeats: 0, reservedSeats: 0, availableSeats: 0 };

        res.status(200).json({
            success: true,
            metrics: {
                "Total Seats": resultStats.totalSeats,
                "Reserved Seats": resultStats.reservedSeats,
                "Available Seats": resultStats.availableSeats
            },
            seats: seatDetails
        });

    } catch (error) {
        responseJson(res, 400, false, "Error occure at getseat.js while getting response");
    }
})