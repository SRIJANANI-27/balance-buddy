import express from 'express'
import cors from "cors";
import dotenv from 'dotenv'
import connectdb from './db/db.js';
import router from './router/route.js';
// import session from 'express-session';

dotenv.config()
const app = express();
const port = process.env.PORT || 3000
// app.use(cors({
//     origin: `https://balance-buddy.onrender.com`, // or '*' for all domains, or specify multiple domains
//     credentials: true,
// }));      

app.use(cors())
// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set to true if using HTTPS
// }));

app.use(express.json())  
app.use('/',router)


app.get("/", (req ,res)=>{
    res.send("hello")
})             

app.listen(port,()=>{
    console.log("server is running 🔥");
})  

connectdb();