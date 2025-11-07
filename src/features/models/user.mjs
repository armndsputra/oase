import mongoose from "mongoose";
const { Schema } = mongoose;

const setSchema = new Schema({
    name : { type : String, required: true },
    username : { type : String, required: true },
    email : { type : String, required: true },
    password : { type : String, required: true },
    photo : { type : String, required: true },
    created : { type : Date, required : true },
})

export default mongoose.model('users', setSchema);