const { Seat } = require("../models/seat.js");
const { responseJson } = require("../utils/responseJson.js");

async function findSeat(req, res, next) {
    const { seatNumber, floor } = req.body;
    try {
        const seat = await Seat.findOne({ seatNumber, floor });
        if (seat) {
            req.seat = seat;
            return next();
        }
        else {
            responseJson(res, 404, false, "Seat does not exist");
        }
    } catch (error) {

        responseJson(res, 500, false, "Internal Server Error")
    }
}


async function isSeatAvailable(req, res, next) {1
    try {
        if (!req.seat.isReserved)
            return next();

        else {

            responseJson(res, 409, false, "Seat is unavailable to Reserve helloji");
        }
    } catch (error) {

        responseJson(res, 500, false, "Internal Server Error");
    }
}

async function isSeatReserved(req, res, next) {
    try {
        if (req.seat.isReserved) {
            return next();
        } else {

            responseJson(res, 409, false, "Seat is unreserve");
        }
    } catch (error) {

        responseJson(res, 500, false, "Internal Server Error");
    }
}

module.exports = { findSeat, isSeatAvailable, isSeatReserved }
