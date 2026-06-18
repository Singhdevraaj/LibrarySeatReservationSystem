const app = require("../config/app.js");
const {validateLoginInputs} =require('../middleware/validation.js')
const {authenticateUser} = require('../middleware/auth.js')

app.post('/login',validateLoginInputs,authenticateUser,async (req,res)=>{
        return res.status(200).send("User LoggedIn successfully"); 
})