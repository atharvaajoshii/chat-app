import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from './routes/authroutes.js'
import messageroutes from './routes/messageroutes.js'
import userroutes from './routes/userroutes.js'
import { connect } from "mongoose";
import path from "path";
import connecttomongodb from "./db/connecttomongodb.js";
import { app, server } from "./socket/socket.js"

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); //req.body
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageroutes)
app.use("/api/users", userroutes)
console.log("__dirname =", __dirname);

console.log(
    "STATIC PATH =",
    path.join(__dirname, "frontend", "dist")
);  
app.use(
  express.static(
    path.join(__dirname, "frontend", "dist")
  )
);

app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});
server.listen(port, () => {
    connecttomongodb();
    console.log(`running on ${port}`)
})