const User = require('../models/user.js')
async function authenticateUser(req, res, next) {
    const { email, password } = req.body;
    console.log("Email: ",email);
    console.log("Password: ",password);
    try {
        const user = await User.findOne({ email });
        if (user) {
            if (user.password === password) {
                req.user = user;
                return next();
            }
            else {
                return res.status(400).json({
                    "success": false,
                    "message": "hi from authenticateUser",
                    "message": "Invalid Credentials"
                });
            }
        } else {
            return res.status(404).json({
                "success": false,
                "message": "hi from authenticateUser",
                "message": "User Does Not exists"
            });
        }
    } catch (error) {
        console.error("Error: " + error);
        return res.status(404).json({
            "success": false,
            "message": "hi from authenticateUser",
            "message": "Error in Signup"
        });
    }
}
module.exports = { authenticateUser };