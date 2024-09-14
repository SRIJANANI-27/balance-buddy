import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import connectdb from './db/db.js';
import router from './router/route.js';
import session from 'express-session';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// CORS Configuration
app.use(cors())
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));     

app.use(express.json());  

// Routes
app.use('/data', router);

app.get("/", (req, res) => {
    res.send("Hello from Balance Buddy");
});

// Start Server only after DB connection
connectdb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port} 🔥`);
    });
}).catch((err) => {
    console.error("Database connection failed:", err);
});
