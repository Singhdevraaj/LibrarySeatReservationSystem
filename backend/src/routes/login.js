const app = require("../config/app.js");
const {validateLogin} =require('../middleware/validation.js')
const {validateUser} = require('../middleware/auth.js')

app.post('/login',validateLogin,validateUser,async (req,res)=>{
        return res.status(200).send("User LoggedIn successfully"); 
})