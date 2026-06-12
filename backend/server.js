import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from './routes/authroutes.js'
import messageroutes from './routes/messageroutes.js'
import userroutes from './routes/userroutes.js'
import { connect } from "mongoose";
import connecttomongodb from "./db/connecttomongodb.js";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); //req.body
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageroutes)
app.use("/api/users",userroutes)


// app.get("/",(req,res)=>{
//     res.send("ready")
// })

app.listen(port,()=>{
    connecttomongodb();
    console.log(`running on ${port}`)
})