const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 50,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    lowercase: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Please Create an Strong password'],
  },
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student",
    
  }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

module.exports = User;