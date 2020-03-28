const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const alarmSchema = new Schema({
  alarmName: {
    type: String,
    trim: true,
    default: "New Alarm",
  },
  hours: {
    type: String,
    trim: true,
  },
  minutes:{
      type:String,
      trim:true,
  },
  status:{
      type:Number,
      trim:true,
  },
  days: {
      type:Array,
      trim:true,
  },
  option: {
      type:Number,
      trim:true,
  },
  note:{
      type:String,
  },
  deviceId:{
      type:String,
      trim:true,
  }
});

const Alarm = mongoose.model('alarms', alarmSchema);

module.exports = Alarm;