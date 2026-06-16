const app = require("../config/app.js");

const {Seat} = require('../models/seat.js')




app.post('/seats',async (req,res)=>{
        const {seatNumber,floor,isReserved} = req.body;
        try{
            const seatexists = await Seat.findOne({seatNumber});
            if(!seatexists){
                await Seat.create({seatNumber,floor,isReserved});
                return res.status(200).json({
                    "success":true,
                    "message"
:"New seat created Successfully"
})
            }
            else{
                return res.status(409).json({
                    "success":false,
                    "message":"Seat Already exists"
                })
            }

        }catch(error){
            console.log("Error occurred while creating seat "+error)
            return res.status(400).json({
                "success":false,
            "message":"Error occure while creating seat",
            "Error":error
        })
        }
        
})

