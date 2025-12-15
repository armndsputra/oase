import mongoose from "mongoose"
const { Schema } = mongoose

const setSchema = new Schema({
    ip : { type : String},
    userID : { type : String, ref : 'users' },
    username : { type : String },
    userAgent : { type : String },
    url : { type : String },
    method : { type : String },
    referrer : { type : String },
    timestamp : { type : Date },
    createdAt : { type : Date, default : Date.now }
})

export default mongoose.model('trafficLogs', setSchema)