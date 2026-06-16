const User = require('../models/user.js')
async function validateUser(req, res, next) {
    const { email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            if (userExists.password === password) {
                return next();
            }
            else {
                return res.status(400).json({
                    "success": false,
                    "message": "Invalid Credentials"
                });
            }
        } else {
            return res.status(404).json({
                "success": false,
                "message": "User Does Not exists"
            });
        }
    } catch (error) {
        console.error("Error: " + error);
        return res.status(404).json({
            "success": false,
            "message": "Error in Signup"
        });
    }
}
module.exports = { validateUser };