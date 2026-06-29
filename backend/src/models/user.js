const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRETKEY = "JaiShriKrishna"
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
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student",
    
  }
}, { timestamps: true })

userSchema.methods.validatePasssword=async function (passwordInputByUser){
  const user = this;
  const hashedPasswordFromDB=user.password;
  const isPasswordValid =  await bcrypt.compare(passwordInputByUser,hashedPasswordFromDB);
  return isPasswordValid;

}

userSchema.methods.getJWT=function (){
  const user = this;
  console.log("User: ",user);
  const _id = user._id.toString();
  const jwtToken = jwt.sign({_id},JWT_SECRETKEY,{expiresIn: "1d"})
  return jwtToken;
}

const User = mongoose.model("User", userSchema);

module.exports = User;