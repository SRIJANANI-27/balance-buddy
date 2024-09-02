import express from 'express'
import cors from "cors";
import dotenv from 'dotenv'
import connectdb from './db/db.js';
import router from './router/route.js';

dotenv.config()
const app = express();
const port = process.env.PORT || 3000
// app.use(cors({
//     origin: `https://balance-buddy.onrender.com`, // or '*' for all domains, or specify multiple domains
//     credentials: true,
// }));      

app.use(cors())
app.use(express.json())  
app.use('/data',router)


app.get("/", (req ,res)=>{
    res.send("hello")
})             

app.listen(port,()=>{
    console.log("server is running 🔥");
})  

connectdb();