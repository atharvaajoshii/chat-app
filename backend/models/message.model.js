import mongoose from "mongoose";
const messageschema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message:{
        type:String,
        required: true
    }
},{timestamps:true})

const message = mongoose.model("message",messageschema)

export default message;