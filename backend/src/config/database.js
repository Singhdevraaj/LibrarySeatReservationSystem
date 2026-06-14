const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://admin:password%40123@cluster0.tq4cfpe.mongodb.net/libraryDB");
}
module.exports=connectDB;