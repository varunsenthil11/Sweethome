const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    address:String,
    addphotos:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkin:Number,
    checkout:Number,
    maxguests:Number
})
module.exports=  mongoose.model("Place",userSchema)