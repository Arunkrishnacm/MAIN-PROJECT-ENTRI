import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    serviceType:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","assigned","in progress","completed"],
        default:"pending"
    },
    assignTechnician:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Service",serviceSchema);