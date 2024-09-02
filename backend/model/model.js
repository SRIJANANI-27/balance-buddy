import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title:{
        type: String,
        enum: ['Income','Expense'],
        required: true
    },
    description:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    date:{
        type:Date,
        required: true
    },
},
    {
        timestamps:true,
    }
)
export const Tracker = mongoose.model("Tracker",schema)   