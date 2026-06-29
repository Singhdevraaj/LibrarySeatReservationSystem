const User = require('../models/user.js')
const jwt = require('jsonwebtoken');
const { responseJson } = require('../utils/responseJson.js');
const JWT_SECRETKEY = "JaiShriKrishna"
const bcrypt = require('bcrypt');

const userAuth = async (req, res, next) => {
    const token = req.cookies.token;

    try {

        const decodedToken = jwt.verify(token, JWT_SECRETKEY);

        const userId = decodedToken._id;


        const user = await User.findOne({_id:userId});

        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Invalid Token"
            })
        } else {
            req.user = user;
            next();
        }

    } catch (error) {
       
        return res.status(400).send("Error Namasta ji Kaisa ho aao kuch sikhata hu: \n"+error)
    }
}

module.exports = { userAuth };



async function authenticateUser(req, res, next){
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if(!user){
            responseJson(res,404,false,"message Invalid Credentials user doesn't exists");
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            responseJson(res,404,false,"message Invalid Credentials user doesn't exists");
        }
        req.user=user;
        next();

    }
    catch(error) {
        console.error("Error: " + error);
        return res.status(404).json({
            "success": false,
            "message": "hi from authenticateUser",
            "message": "Error in Signup"
        });
    }
}




function checkAdmin(req, res, next) {
    if (req.user.role === "admin") {
        next();
    }
    else {

        return res.status(401).json({
            success: false,
            "message": "Error unauthorized only admin can create seat"
        })

    }
}
module.exports = { authenticateUser, checkAdmin,userAuth };


