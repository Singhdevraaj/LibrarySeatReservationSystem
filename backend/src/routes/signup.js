const app = require("../config/app.js");
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const { validateSignupInput } = require('../middleware/validation.js')
const { responseJson } = require('../utils/responseJson.js');
const { isUserExists } = require('../utils/isUserExists.js')

app.post('/signup', validateSignupInput, isUserExists, async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        responseJson(res, 201, true, "User Account created successfully");
    } catch (error) {
        responseJson(res, 500, false, "Internal Server Error");
    }
})
