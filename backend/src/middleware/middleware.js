
// there middleware are the 
// 1. Login
// 2. signup
// 3. reservation seat 
async function isSeatExists(req, res, next) {
    const { seatNumber, floor, isReserved } = req.body;
    try {
        const seatexists = await Seat.findOne({ seatNumber });
        if (seatexists) {
            return res.status(409).json({
                "success": false,
                "message": "Seat Already exists"
            })
        }
        else {
            
            return next();
        }
    } catch (error) {
        console.log("Error occurred while creating seat " + error)
        return res.status(400).json({
            "success": false,
            "message": "Error occure while creating seat",
            "Error": error
        })
    }
}


async function isSeatAvailable(req, res, next) {
    const { seatNumber, floor, isReserved } = req.body;
    try {
        const seatexists = await Seat.findOne({ seatNumber });
        if (!seatexists) {
            return res.status(409).json({
                "success": false,
                "message": "Seat Already exists"
            })
        }
        else {
            if(seatexists.isReserved===false){
            return next();}
            else{
                return res.status(409).json({
                "success": false,
                "message": "Seat is unavailable"
            })
            }
        }
    } catch (error) {
        console.log("Error occurred while creating seat " + error)
        return res.status(400).json({
            "success": false,
            "message": "Error occure while creating seat",
            "Error": error
        })
    }
}


module.exports = { isSeatExists,isSeatAvailable }