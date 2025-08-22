const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            require: true,
            minlength: [3, 'First name should be atleast of 3 letters']
        },
        lastname:{
            type: String,
            minlength: [3, 'Last name should be atleast of 3 letters']
        }
    },
        email:{
            type:String,
            require: true,
            unique: true,
            minlength: [5, 'Email should be atleast of 5 letters']
        },
        passord: {
            type:String,
            require: true,
            select: false
        },
        socketId:{
            type: String
        }
   
})

// bcrypt the pasword
userSchema.statics.hashPassword = async function (plainPassword) {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

// compares the passwords with bcrypt ones
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET
)}


const userModel = mongoose.model("user", userSchema);
module.exports = userModel;