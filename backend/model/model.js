import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title:{
        type: String,
        enum: ['Income','Expense'],
        required: true
    },
    description:{
        type: String,
        // enum: ['Salary','Food','Rent','Shopping','Medicine'],
        required: true
    },
    reason:{
        type: String,
        // required:true
        
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

const userschema=new mongoose.Schema({    
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:Date,
        required:true
    }
});
export const User = mongoose.model("User",userschema)