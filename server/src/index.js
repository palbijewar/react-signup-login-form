import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './routes/route.js';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true
}).then(()=>console.log('Database connected!')).catch((error)=>console.log(error));

app.use('/v1/fw', route);

app.listen(process.env.PORT,()=>{
    console.log(`server running on port : ${process.env.PORT}`)
});

