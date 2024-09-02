import mongoose from "mongoose";


const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.db);
        console.log("db is connected 🤑");
    }
    catch(err){
        console.log(err);
    }
}

export default connectdb;
