import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { connectDb } from './connnection/db.js';
import adminRouter from './routers/admin.js'

connectDb();

const app = express();

app.use(express.json({limit:'25mb'}));
app.use(express.urlencoded({limit:'25mb',extended:true}));
app.use(cors());

app.use('/admin',adminRouter);

app.listen(8000, ()=>{
    console.log(`server started at 8000`) 
})