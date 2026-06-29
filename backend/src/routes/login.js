const app = require("../config/app.js");
const { validateLoginInputs } = require('../middleware/validation.js')
const { responseJson } = require('../utils/responseJson.js');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const { authenticateUser } = require('../middleware/auth.js');

app.post('/login', validateLoginInputs, authenticateUser, async (req, res) => {
        const user = req.user;
        console.log("user: ", user);
        const jwtToken = await user.getJWT();
        console.log(jwtToken.toString());

        res.cookie('token', jwtToken, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true,
                secure: true
        })
        responseJson(res, 200, true, "User LoggedIn successfully");
})