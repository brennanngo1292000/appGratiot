const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceInfoSchema = new Schema({
    actions:{
        type:Object,
        trim:true,
    },
    deviceId:{
        type:String,
        trim:true,
        unique:true,
    }
});

deviceInfoSchema.index({deviceId:1}, { unique: true});

const DeviceInfo = mongoose.model('deviceinfos',deviceInfoSchema);

module.exports = DeviceInfo;

