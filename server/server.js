import express from 'express';
import "dotenv/config";
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRouter from './routes/authRoutes.js';
import storeRouter from './routes/storeRoutes.js';
import ratingRouter from './routes/ratingRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT

connectDB();

app.get('/',(req,res)=>{
    res.send(`server is live on http://localhost:${port}`);
});

//api endpoints

app.use('/auth',authRouter);
app.use('/store',storeRouter);
app.use('/store',ratingRouter);
app.use('/dashboard',dashboardRouter);
app.listen(port,()=>{
    console.log((`server is running on ${port}`));
    
})