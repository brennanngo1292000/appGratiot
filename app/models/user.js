const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index:true,
  },
  callingCode: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  createAt: {
    type: Date,
    default: new Date(),
    trim: true
  }
});

userSchema.index({phone:1}, { unique: true});

const User = mongoose.model('users', userSchema);

module.exports = User;
