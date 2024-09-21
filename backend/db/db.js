import mongoose from "mongoose";


const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.db);
        console.log("db is connectedd 🤑");
    }
    catch(err){
        console.log(err);
    }
}

export default connectdb;
