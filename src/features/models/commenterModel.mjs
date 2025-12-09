import mongoose from "mongoose";
const { Schema } = mongoose;

const setSchema = new Schema({
    // commenter : { type : String, required: true },
    commenter : { type : mongoose.Schema.Types.ObjectId, required: true , ref : 'users' },
    content : { type : mongoose.Schema.Types.ObjectId, required: true , ref : 'contents' },
    comment : { type : String, required: true },
    read : { type : Boolean, default: false },
    created : { type : Date, required : true },
})

export default mongoose.model('commenter', setSchema);