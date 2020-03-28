const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deviceSchema = new Schema({
    deviceName:{
        type:String,
        default:'new device',
        trim:true,
    },
    roomId:{
        type:String,
        trim:true,
    },
    deviceModel:{
        type:String,
        trim:true,
    },
    actions:{
        type:Array,
    },
    userId:{
        type:String,
        trim:true,
    }
});

const Device = mongoose.model('devices', deviceSchema);

module.exports = Device;