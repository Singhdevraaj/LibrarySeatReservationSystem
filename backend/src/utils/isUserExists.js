const User = require('../models/user.js');
const { responseJson } = require('./responseJson.js');

async function isUserExists(req, res, next) {
    try {
        const { email } = req.body;
        console.log(email);
        const getUser = await User.findOne({ email });
        console.log(getUser);
        if (!getUser) {
            console.log("next from isUserExist");
            return next();
        } else {
            responseJson(res,409, false, "User already exists");
        }
    } catch (error) {
        responseJson(res, 404, false, "error in isUserExist");

    }
}

module.exports = { isUserExists };