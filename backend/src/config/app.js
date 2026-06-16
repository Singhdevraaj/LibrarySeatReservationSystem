const express = require("express");
const app = express();
app.use(express.json());
// require("../routes/login"); this create an circular dependency
// require("../routes/seatReservation.js")
// require("../middleware/middleware.js")


app.get('/', (req, res) => {
  res.status(200).send("Heloo ji This our Library seat reservation system");
  // console.log("Heloo ji This our Library seat reservation system");
})

module.exports = app;