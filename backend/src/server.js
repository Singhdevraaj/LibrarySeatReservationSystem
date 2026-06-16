const app = require("./config/app.js")
const connectDB = require("./config/database.js")
const port = 3000;
require('./routes/signup.js');
require('./routes/login.js');
require('./routes/seats.js');



connectDB()
.then(()=>{
console.log("DataBase Is Connected Sucessfully");
app.listen(port,()=>{
  console.log(`Server is running at http://localhost:${port}`);
})
})
.catch((error)=>{
  console.log("Error Occured While connecting DB or Server");
  console.error("Error :"+error);
})