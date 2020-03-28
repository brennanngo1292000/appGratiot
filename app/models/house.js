
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const houseSchema = new Schema({
    houseName:{
        type:String,
        default:'New house',
        trim: true,
    },
    userId:{
        type:String,
        trim: true,
    },
    owner:{
        type:Object,
        trim: true,
    },
    createAt:{
        type:Date,
        default: new Date(),
    }
})

const House  = mongoose.model('houses', houseSchema);

module.exports = House;
