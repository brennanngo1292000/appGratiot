const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomName:{
        type:String,
        trim:true,
        default:'New room',
    },
    houseId:{
        type:String,
        trim:true,
    },
    createAt:{
        type:Date,
        trim:true,
        default: new Date(),
    }
    
})

const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;